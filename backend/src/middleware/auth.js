import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/db.js';
export async function auth(req,res,next){
  try{const h=req.headers.authorization||''; if(!h.startsWith('Bearer ')) return res.status(401).json({success:false,message:'Authentication required'}); const token=h.slice(7); const p=jwt.verify(token,env.JWT_SECRET); const user=await prisma.user.findUnique({where:{id:p.sub}}); if(!user) return res.status(401).json({success:false,message:'User not found'}); req.user=user; next();}catch(e){return res.status(401).json({success:false,message:'Invalid or expired token'});}
}
export const roles=(...allowed)=>(req,res,next)=>allowed.includes(req.user.role)?next():res.status(403).json({success:false,message:'Insufficient permissions'});
