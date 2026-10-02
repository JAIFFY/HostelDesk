import { z } from 'zod';
export const registerSchema=z.object({name:z.string().min(2).max(100),email:z.string().email(),password:z.string().min(8).max(100),role:z.enum(['STUDENT','WARDEN','ADMIN']).default('STUDENT'),studentId:z.string().max(50).optional(),roomNumber:z.string().max(30).optional(),hostelBlock:z.string().max(10).optional()});
export const loginSchema=z.object({email:z.string().email(),password:z.string().min(1)});
export const complaintSchema=z.object({description:z.string().min(10).max(500),location:z.string().max(100).optional(),roomNumber:z.string().max(30).optional(),isAnonymous:z.boolean().default(false),photoUrl:z.string().url().optional()});
export const assignSchema=z.object({team:z.enum(['Electrical Team','Plumbing Team','Housekeeping','Security','Hostel Supervisor']),assignedToId:z.string().optional()});
export const statusSchema=z.object({status:z.enum(['Submitted','Assigned','In Progress','Resolved','Closed']),comment:z.string().max(1000).optional()});
export const patchComplaintSchema=z.object({category:z.enum(['Electrical','Plumbing','Water Supply','Internet/Wi-Fi','Cleaning','Furniture','Food/Mess','Security','Room Maintenance','Other']).optional(),priority:z.enum(['Critical','High','Medium','Low']).optional(),assignedTeam:z.enum(['Electrical Team','Plumbing Team','Housekeeping','Security','Hostel Supervisor']).optional()});
export const commentSchema=z.object({body:z.string().min(1).max(1000)});
