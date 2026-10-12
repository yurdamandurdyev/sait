import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,defaultProfile,recipes,dayMeals,shopping,mealTags,candidates} from './model.js';
import {recipeIllustration} from './art.js';

test('Mifflin calculation uses sex and activity',()=>{
 const p={...defaultProfile,weight:70,height:175,age:30,activity:1.2};
 assert.equal(calculate(p).bmr,1649);
 assert.equal(calculate({...p,sex:'female'}).bmr,1483);
 assert.ok(calculate({...p,activity:1.725}).calories>calculate(p).calories);
});
test('every day matches calorie target across goals, diets and menu versions',()=>{
 for(const goal of ['lose','maintain','gain'])for(const diet of ['all','vegetarian'])for(const menuVersion of [0,1,2])for(let day=0;day<7;day++){
  const p={...defaultProfile,goal,diet,menuVersion};
  assert.ok(Math.abs(dayMeals(p,day).reduce((s,r)=>s+r.kcal,0)-calculate(p).calories)<=2);
 }
});
test('all seven days have different dishes in every meal slot, including vegetarian plans',()=>{
 assert.equal(recipes.length,56);
 for(const diet of ['all','vegetarian'])for(const menuVersion of [0,1,7])for(let slot=0;slot<4;slot++){
  const ids=Array.from({length:7},(_,day)=>dayMeals({...defaultProfile,diet,menuVersion},day)[slot].id);
  assert.equal(new Set(ids).size,7,`${diet}: ${mealTags[slot]} must vary`);
 }
});
test('all recipes contain ingredients, nutrition, useful steps and embedded illustrations',()=>{
 const names=new Set();
 for(const r of recipes){assert.ok(!names.has(r.name));names.add(r.name);assert.ok(r.ingredients.length>=3);assert.ok(r.steps.length>=2);assert.ok(r.kcal>0&&r.protein>=0&&r.fat>=0&&r.carbs>=0);assert.match(recipeIllustration(r),/^data:image\/svg\+xml/)}
});
test('vegetarian plans exclude meat and fish in all meal slots',()=>{
 const forbidden=/Куриное|индейки|Говядина|Лосось|Треска|Тунец|Креветки/;
 for(let day=0;day<7;day++)for(const recipe of dayMeals({...defaultProfile,diet:'vegetarian'},day)){
  assert.equal(recipe.vegetarian,true);
  for(const [name]of recipe.ingredients)assert.ok(!forbidden.test(name));
 }
 assert.throws(()=>calculate({...defaultProfile,age:17}));
});
test('changing a meal affects the selected day and updates shopping amounts',()=>{
 const original=dayMeals(defaultProfile,3)[1];
 const replacement=candidates(defaultProfile,'Обед').find(r=>r.id!==original.id);
 const changed={...defaultProfile,mealOverrides:{'3-1':replacement.id}};
 assert.equal(dayMeals(changed,3)[1].id,replacement.id);
 assert.deepEqual(dayMeals(changed,2),dayMeals(defaultProfile,2));
 assert.notDeepEqual(shopping(changed),shopping(defaultProfile));
 const sums=new Map();
 for(let d=0;d<7;d++)for(const r of dayMeals(changed,d))for(const [name,amount,unit]of r.ingredients)sums.set(name+unit,(sums.get(name+unit)||0)+amount);
 for(const item of shopping(changed))assert.equal(item.amount,sums.get(item.name+item.unit));
});
test('new menu versions change the week and invalid vegetarian overrides are ignored',()=>{
 assert.notDeepEqual(dayMeals({...defaultProfile,menuVersion:1},0),dayMeals(defaultProfile,0));
 const meat=recipes.find(r=>!r.vegetarian&&r.tag==='Обед');
 assert.notEqual(dayMeals({...defaultProfile,diet:'vegetarian',mealOverrides:{'0-1':meat.id}},0)[1].id,meat.id);
});
