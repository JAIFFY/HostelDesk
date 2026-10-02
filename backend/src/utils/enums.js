export const CATEGORIES=['Electrical','Plumbing','Water Supply','Internet/Wi-Fi','Cleaning','Furniture','Food/Mess','Security','Room Maintenance','Other'];
export const PRIORITIES=['Critical','High','Medium','Low'];
export const STATUSES=['Submitted','Assigned','In Progress','Resolved','Closed'];
export const TEAMS=['Electrical Team','Plumbing Team','Housekeeping','Security','Hostel Supervisor'];
export const categoryDb=Object.fromEntries(CATEGORIES.map(x=>[x,x.replaceAll('/','').replaceAll(' ','')]))
export const priorityDb=Object.fromEntries(PRIORITIES.map(x=>[x,x]));
export const statusDb={Submitted:'Submitted',Assigned:'Assigned', 'In Progress':'InProgress',Resolved:'Resolved',Closed:'Closed'};
export const teamDb={'Electrical Team':'ElectricalTeam','Plumbing Team':'PlumbingTeam','Housekeeping':'Housekeeping','Security':'Security','Hostel Supervisor':'HostelSupervisor'};
export const fromCategoryDb=Object.fromEntries(Object.entries(categoryDb).map(([a,b])=>[b,a]));
export const fromTeamDb=Object.fromEntries(Object.entries(teamDb).map(([a,b])=>[b,a]));
export const fromStatusDb=Object.fromEntries(Object.entries(statusDb).map(([a,b])=>[b,a]));
