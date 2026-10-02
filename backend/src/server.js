import {app} from './app.js';import {env} from './config/env.js';import {prisma} from './config/db.js';
const server=app.listen(env.PORT,()=>console.log(`HostelDesk API listening on http://localhost:${env.PORT}`));
const shutdown=async()=>{server.close(async()=>{await prisma.$disconnect();process.exit(0)})};process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
