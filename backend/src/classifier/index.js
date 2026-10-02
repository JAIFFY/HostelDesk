const TEAMS=['Electrical Team','Plumbing Team','Housekeeping','Security','Hostel Supervisor'];
const RU=[
[/spark|burning|exposed|shock|short.?circuit|no electricity|smoke|fire/i,'Electrical','Critical',98,0,'Dispatch electrical maintenance immediately and isolate the affected circuit.','Within 1 hour','a possible electrical safety hazard that could cause injury or property damage'],
[/no (hot )?water|water (supply|is not|not)|without water/i,'Water Supply','High',94,1,'Restore the water supply and inspect the tank and pump.','Within 3 hours','an interruption of an essential hostel service'],
[/leak|tap|pipe|flush|drain|clog|overflow/i,'Plumbing','Medium',90,1,'Schedule a plumber visit.','Within 24 hours','a repairable fault that is not immediately dangerous'],
[/wi-?fi|internet|router|network/i,'Internet/Wi-Fi','Medium',91,4,'Check the access point and uplink for the block.','Within 6 hours','a connectivity issue affecting study and communication'],
[/food|mess|dinner|lunch|breakfast|chapati|cockroach/i,'Food/Mess','Medium',89,4,'Raise it with the mess contractor and inspect the kitchen.','Within 24 hours','a food-quality concern that needs follow-up'],
[/stranger|unknown person|theft|stolen|cctv|harass|unsafe|roaming/i,'Security','High',92,3,'Alert security and review CCTV for the area.','Within 30 minutes','a possible risk to student safety'],
[/fan|light|bulb|socket|switch|tube|electric|extension/i,'Electrical','Medium',92,0,'Send an electrician during working hours.','Within 24 hours','a fault that is inconvenient but not hazardous'],
[/window|latch|door|paint|wall|ceiling|roof|seep/i,'Room Maintenance','Medium',87,4,'Schedule a maintenance visit to the room.','Within 48 hours','a room repair that is important but not dangerous'],
[/table|chair|bed|mattress|cupboard|almirah|desk|furniture/i,'Furniture','Low',90,4,'Add to the furniture requests list.','Within 3 days','a minor, non-urgent request'],
[/dirty|clean|garbage|dustbin|toilet|washroom|slippery/i,'Cleaning','Medium',88,2,'Notify housekeeping for a cleaning round.','Within 12 hours','a hygiene issue that needs timely attention'],
[/[\s\S]/,'Other','Low',72,4,'Review manually and route to the right team.','Within 3 days','a general request without urgent indicators']
];
export function classify(text,room=''){
  const x=RU.find(r=>r[0].test(text))||RU[RU.length-1];
  const n=+(text.match(/(\d+)\s*(students|boys|girls|people|residents)/i)||[])[1]||1;
  const b=(room.match(/^([A-D])-?\d/i)||room.match(/block\s*([a-d])/i)||text.match(/block\s*([a-d])/i)||[])[1];
  let priority=x[2]; if(n>=10 && priority==='Medium') priority='High';
  return {category:x[1],priority,confidence:x[3],team:TEAMS[x[4]],recommendedAction:x[5],expectedResponse:x[6],reason:x[7],affectedStudents:n,block:(b||'').toUpperCase()};
}
