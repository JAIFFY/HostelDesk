import 'dotenv/config';
import bcrypt from 'bcryptjs';
import {PrismaClient} from '@prisma/client';
import {classify} from '../src/classifier/index.js';
const prisma=new PrismaClient();
const samples=[
['Exposed electrical wire hanging near the switchboard','Rohan Verma','C-312','Submitted',12,false],
['Water supply in Block B bathrooms has stopped since morning, around 18 students are affected','Kabir Singh','B-110','Submitted',84,false],
['No electricity in the corridor and the emergency lights are not working','Ishaan Gupta','D-021','Assigned',40,false],
['Ceiling fan is making a loud noise','Neha Arora','A-118','In Progress',300,false],
['Request for an additional study table in the room','Simran Kaur','A-207','Submitted',1500,false],
['Wi-Fi has been unavailable in Block A since last night','Tanvi Joshi','A-301','Resolved',720,false],
['The washroom tap has been leaking continuously','Harsh Vardhan','B-014','In Progress',410,false],
['Food served at dinner was extremely cold','Anonymous','Mess','Submitted',200,true],
['Corridor lights are not working on the second floor','Manpreet Singh','C-204','Assigned',960,false],
['There is a spark coming from the switchboard and the fan suddenly stopped working','Aarav Mehta','B-204','In Progress',180,false],
['Garbage has not been collected from the floor dustbins for three days','Pooja Nair','C-109','Assigned',2000,false],
['An unknown person was roaming near the Block D entrance at night','Vikram Rao','D-110','Resolved',1800,false],
['My bed mattress is torn and very uncomfortable','Aarav Mehta','B-204','Submitted',2500,false],
['Hot water is not available in the Block B washrooms','Sahil Khan','B-305','Assigned',600,false],
['The router in the common room keeps disconnecting','Diya Kapoor','Common Area','Resolved',3000,false],
['The mess ran out of chapatis during dinner','Anonymous','Mess','Closed',4000,true],
['Washroom floor is slippery and has not been cleaned since morning','Yash Malhotra','A-020','Resolved',1200,false],
['Window latch is broken and the room does not lock properly','Arjun Reddy','D-205','Assigned',500,false],
['Water is seeping from the ceiling whenever it rains','Karan Bhatia','C-306','Submitted',260,false],
['The laundry machine has been out of order for two days','Ananya Das','Laundry','Submitted',1400,false],
['Sparking observed in the extension board near my study table','Rhea Sharma','A-410','Assigned',90,false],
['Wi-Fi speed is very slow every evening in Block D','Lakshya Jain','D-312','In Progress',2200,false],
['Cockroaches spotted in the mess kitchen area','Anonymous','Mess','Assigned',350,true],
['The tubelight outside my room was flickering','Aarav Mehta','B-204','Resolved',2600,false]
];
const statusMap={Submitted:'Submitted',Assigned:'Assigned','In Progress':'InProgress',Resolved:'Resolved',Closed:'Closed'};
const catMap={'Electrical':'Electrical','Plumbing':'Plumbing','Water Supply':'WaterSupply','Internet/Wi-Fi':'InternetWiFi','Cleaning':'Cleaning','Furniture':'Furniture','Food/Mess':'FoodMess','Security':'Security','Room Maintenance':'RoomMaintenance','Other':'Other'};
const teamMap={'Electrical Team':'ElectricalTeam','Plumbing Team':'PlumbingTeam','Housekeeping':'Housekeeping','Security':'Security','Hostel Supervisor':'HostelSupervisor'};
const password='HostelDesk@2026!';
async function user(name,email,role,extra={}){return prisma.user.upsert({where:{email},update:{},create:{name,email,passwordHash:await bcrypt.hash(password,12),role,...extra}})}
await prisma.complaintHistory.deleteMany();await prisma.complaintComment.deleteMany();await prisma.complaint.deleteMany();await prisma.user.deleteMany();
const aarav=await user('Aarav Mehta','student@hosteldesk.demo','STUDENT',{studentId:'STU-1001',roomNumber:'B-204',hostelBlock:'B'});
const warden=await user('Rajiv Sharma','warden@hosteldesk.demo','WARDEN');
const admin=await user('HostelDesk Admin','admin@hosteldesk.demo','ADMIN');
for(let i=0;i<samples.length;i++){const [description,studentName,room,status,minutes,anon]=samples[i];let student=aarav;if(studentName!=='Aarav Mehta'){const email=`${studentName.toLowerCase().replace(/[^a-z]+/g,'.')}@seed.hosteldesk.demo`;student=await user(studentName,email,'STUDENT',{studentId:`SEED-${1002+i}`,roomNumber:room,hostelBlock:/^[A-D]/.test(room)?room[0]:undefined});}const c=classify(description,room);const createdAt=new Date(Date.now()-minutes*60000);const complaint=await prisma.complaint.create({data:{complaintCode:`HD-2026-${1033+i}`,studentId:student.id,description,location:/^[A-D]/.test(room)?`Hostel Block ${room[0]}`:room,roomNumber:room,category:catMap[c.category],priority:c.priority,confidence:Math.max(70,c.confidence-((i+1)%4)),assignedTeam:teamMap[c.team],status:statusMap[status],affectedStudents:c.affectedStudents,hostelBlock:c.block||(/^[A-D]/.test(room)?room[0]:null),recommendedAction:c.recommendedAction,expectedResponse:c.expectedResponse,aiReasoning:c.reason,isAnonymous:anon,createdAt,updatedAt:createdAt,resolvedAt:['Resolved','Closed'].includes(status)?createdAt:null}});await prisma.complaintHistory.create({data:{complaintId:complaint.id,changedBy:warden.id,newStatus:'Submitted',comment:'Seeded demo complaint.' ,createdAt}});if(status!=='Submitted'){await prisma.complaintHistory.create({data:{complaintId:complaint.id,changedBy:warden.id,oldStatus:'Submitted',newStatus:statusMap[status],comment:`Seed data status: ${status}.`,createdAt:new Date(createdAt.getTime()+1000)}})}}
console.log(`Seeded ${samples.length} complaints.`);console.log('Demo password for seeded users:',password);await prisma.$disconnect();
