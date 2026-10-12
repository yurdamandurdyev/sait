import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProfile} from './model.js';
import {createWorkoutPlan,workoutDefaults,exercises,progression,validateWorkout,progressSummary,addDays,availableEquipment} from './training.js';
import {techniqueMarkup,muscleMap} from './technique.js';
const p={...defaultProfile,...workoutDefaults},monday='2026-10-12';
const record=(id='db-floor-press',extra={})=>({id:'1',date:monday,finishedAt:1,title:'Верх',feedback:'normal',pain:false,exercises:[{id,plannedSets:2,plannedMax:12,unit:'повт.',sets:[{done:true,reps:12,weight:10,rir:3},{done:true,reps:12,weight:10,rir:2}]}],...extra});

test('calendar has seven days, exact selected training days and rest days',()=>{
 const plan=createWorkoutPlan(p,[],monday);assert.equal(plan.split,'full');assert.equal(plan.days.length,7);assert.deepEqual(plan.workouts.map(w=>w.day),[0,2,4]);assert.ok(plan.days[1].rest);assert.equal(plan.days[4].date,'2026-10-16');
 assert.ok(plan.workouts.every(w=>w.groups.length>0&&w.exercises.length>=3));
});
test('schedule adapts to frequency and split preferences',()=>{
 assert.deepEqual(createWorkoutPlan({...p,trainingDays:[0,1,3,4],level:'experienced'},[],monday).workouts.map(w=>w.type),['upper','lower','upper','lower']);
 assert.deepEqual(createWorkoutPlan({...p,trainingDays:[0,2,4],splitPreference:'ppl'},[],monday).workouts.map(w=>w.type),['push','pull','legs']);
 const six=createWorkoutPlan({...p,trainingDays:[0,1,2,3,4,5],level:'advanced'},[],monday);assert.deepEqual(six.workouts.map(w=>w.type),['push','pull','legs','push','pull','legs']);
 assert.ok(!six.workouts.filter(w=>w.type==='pull').flatMap(w=>w.exercises).some(e=>e.muscles.includes('hamstrings')));
 const consecutive=createWorkoutPlan({...p,trainingDays:[0,1,6],programStart:monday},[],monday);
 const next=createWorkoutPlan({...p,trainingDays:[0,1,6],programStart:monday},[],addDays(monday,7));assert.notEqual(consecutive.days[6].type,next.days[0].type);
});
test('equipment and movement exclusions are respected for every selected exercise',()=>{
 for(const mode of ['gym','home','body'])for(const limitations of [[],['knees'],['back','wrists'],['shoulders']]){
  const configured={...p,trainingMode:mode,limitations};const equipment=availableEquipment(configured);const plan=createWorkoutPlan(configured,[],monday);
  for(const e of plan.workouts.flatMap(w=>w.exercises)){assert.ok(e.equipment.every(x=>equipment.includes(x)||(x==='chair'&&equipment.includes('bench'))));assert.ok(!e.restrictions.some(x=>limitations.includes(x)))}
 }
 const bare=createWorkoutPlan({...p,trainingMode:'body',equipmentByMode:{body:[]}},[],monday);assert.ok(bare.workouts.flatMap(w=>w.exercises).every(e=>!e.equipment.length));
});
test('time budgets, age, experience and goals change volume and targets',()=>{
 for(const level of ['beginner','experienced','advanced'])for(const sessionMinutes of [20,30,45,60,75])for(const trainingGoal of ['fitness','strength','endurance']){
  const plan=createWorkoutPlan({...p,level,sessionMinutes,trainingGoal},[],monday);assert.ok(plan.workouts.every(w=>w.minutes<=sessionMinutes),`${level}, ${sessionMinutes}, ${trainingGoal}`)
 }
 const older=createWorkoutPlan({...p,age:65},[],monday),young=createWorkoutPlan(p,[],monday);assert.ok(older.sets<young.sets);
 const strength=createWorkoutPlan({...p,level:'experienced',trainingGoal:'strength'},[],monday);assert.equal(strength.workouts[0].exercises[0].target.min,5);assert.equal(strength.rest,120);
 const endurance=createWorkoutPlan({...p,trainingGoal:'endurance'},[],monday);assert.equal(endurance.workouts[0].exercises[0].target.min,12);
});
test('no fabricated starting weights; load grows only after completed sets with sufficient reserve',()=>{
 const exercise=exercises.find(e=>e.id==='db-floor-press');assert.equal(progression(exercise,p,[],monday).weight,null);
 const next=progression(exercise,{...p,weightIncrement:2.5},[record()],addDays(monday,7));assert.equal(next.action,'increase');assert.equal(next.weight,12.5);
 const partial=record();partial.exercises[0].sets[1].done=false;assert.equal(progression(exercise,p,[partial],monday).action,'hold');
 const difficult=record('db-floor-press',{feedback:'hard'});assert.equal(progression(exercise,p,[difficult],monday).action,'recover');assert.ok(progression(exercise,p,[difficult],monday).weight<10);
 assert.equal(progression(exercise,p,[{...record(),date:'2026-10-20'}],monday).weight,null);
});
test('bodyweight progresses in reps; deload reduces volume and avoids load increase',()=>{
 const push=exercises.find(e=>e.id==='pushup');const logged=record('pushup');logged.exercises[0].sets.forEach(s=>s.weight=0);
 const target=progression(push,p,[logged],addDays(monday,7));assert.equal(target.action,'reps');assert.equal(target.weight,0);assert.equal(target.min,13);
 const normal=createWorkoutPlan({...p,programStart:monday},[record()],monday),deload=createWorkoutPlan({...p,programStart:monday},[record()],addDays(monday,21));assert.equal(deload.week,4);assert.equal(deload.deload,true);assert.ok(deload.sets<normal.sets);
 assert.ok(deload.workouts.flatMap(w=>w.exercises).filter(e=>e.target.source).every(e=>e.target.action==='deload'));
});
test('medical clearance and reported pain pause automatic strength plans',()=>{
 assert.ok(createWorkoutPlan({...p,healthStatus:'needs-clearance'},[],monday).blocked);
 assert.ok(createWorkoutPlan(p,[record('db-floor-press',{pain:true})],monday).blocked);
 assert.ok(!createWorkoutPlan({...p,healthStatus:'cleared'},[record('db-floor-press',{pain:true})],monday).blocked);
 assert.ok(createWorkoutPlan({...p,trainingDays:[0]},[],monday).blocked);
});
test('journals reject zero completed sets and invalid performance values',()=>{
 const valid=record();assert.equal(validateWorkout(valid),2);
 const empty=record();empty.exercises[0].sets.forEach(s=>s.done=false);assert.throws(()=>validateWorkout(empty));
 for(const [key,value]of [['reps',0],['weight',-1],['rir',6]]){const invalid=record();invalid.exercises[0].sets[0][key]=value;assert.throws(()=>validateWorkout(invalid))}
 const summary=progressSummary([valid],monday);assert.equal(summary.sets,2);assert.equal(summary.volume.chest,2);assert.equal(summary.weekly,1);
});
test('all planned exercises have movement-specific technique, cues and muscle maps',()=>{
 for(const e of exercises){assert.ok(e.cues.length>=3);assert.ok(e.mistakes.length>=2);assert.match(techniqueMarkup(e),new RegExp('data-exercise-animation="'+e.id+'"'));assert.match(muscleMap(e.muscles,e.secondary),/<svg/)}
});
test('advanced hypertrophy, priorities and bodyweight pulling change the programme',()=>{
 const growth=createWorkoutPlan({...p,level:'advanced',trainingGoal:'hypertrophy',sessionMinutes:60},[],monday);
 const fitness=createWorkoutPlan({...p,level:'advanced',trainingGoal:'fitness',sessionMinutes:60},[],monday);
 assert.ok(growth.sets>fitness.sets);
 const back=createWorkoutPlan({...p,priority:'back'},[],monday);assert.ok(back.workouts[0].exercises[0].muscles.includes('back'));
 const body=createWorkoutPlan({...p,trainingMode:'body',level:'experienced',equipmentByMode:{body:['mat','chair','pullup']}},[],monday);assert.ok(body.workouts[0].exercises.some(e=>e.id==='pullup'));
});
