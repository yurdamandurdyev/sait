import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {defaultProfile,recipes,calculate,nutritionWeek,dayMeals,shopping,eligibleRecipes,nutritionStatus,recipeAllergens,adaptRecipe,mealSlots} from './model.js';
import {photoSources,photoSizes,photoMarkup} from './photos.js';

test('meal count changes the daily structure and all meals sum to personal calorie target',()=>{
 for(const mealCount of [3,4,5])for(const goal of ['lose','maintain','gain']){
  const profile={...defaultProfile,mealCount,goal};for(const day of nutritionWeek(profile).days){assert.equal(day.length,mealCount);assert.equal(day.reduce((sum,r)=>sum+r.kcal,0),calculate(profile).calories)}
 }
 assert.deepEqual(mealSlots({mealCount:3}),['Завтрак','Обед','Ужин']);
});
test('allergens, excluded ingredients, cooking time and preparation constraints are enforced',()=>{
 const profile={...defaultProfile,allergens:['nuts','peanut','fish','shellfish'],excludedFoods:'Грибы, авокадо',maxCookingMinutes:25,allowAhead:false};
 const week=nutritionWeek(profile);assert.ok(week.status.ok);
 for(const r of week.days.flat()){assert.ok(!r.allergens.some(a=>profile.allergens.includes(a)));assert.ok(!r.ingredients.some(([n])=>/грибы|авокадо/i.test(n)));assert.ok(r.time<=25);assert.equal(r.needsAhead,false)}
});
test('lactose-free products remain milk allergens and do not bypass exclusion',()=>{
 const oats=recipes[0],adapted=adaptRecipe(oats,{dairyPreference:'lactose-free'});assert.ok(adapted.ingredients.some(([n])=>n.includes('безлактозное')));assert.ok(recipeAllergens(adapted).includes('milk'));
 const candidates=eligibleRecipes({...defaultProfile,dairyPreference:'lactose-free',allergens:['milk']});assert.ok(candidates.length);assert.ok(candidates.every(r=>!r.allergens.includes('milk')));
});
test('vegan variants replace animal ingredients and recalculate nutrition; pescatarian excludes meat',()=>{
 const vegan=nutritionWeek({...defaultProfile,diet:'vegan'});assert.ok(vegan.status.ok);
 for(const r of vegan.days.flat()){assert.ok(!r.allergens.some(a=>['milk','eggs','fish','shellfish'].includes(a)));assert.ok(!r.ingredients.some(([n])=>/Куриное|индейки|Говядина|^Мёд$/.test(n)))}
 const adapted=adaptRecipe(recipes[0],{diet:'vegan'});assert.ok(adapted.ingredients.some(([n])=>n==='Соевый напиток'));assert.notEqual(adapted.kcal,recipes[0].kcal);
 const fish=nutritionWeek({...defaultProfile,diet:'pescatarian'});assert.ok(fish.status.ok);assert.ok(fish.days.flat().every(r=>!r.ingredients.some(([n])=>/Куриное|индейки|Говядина/.test(n))));
});
test('contradictory or clinical requirements block menus instead of silently using forbidden foods',()=>{
 const impossible={...defaultProfile,excludedFoods:'Овсяные, молоко, яйцо, хлеб, гречка, йогурт, творог, банан, чиа, киноа, хумус'};
 assert.equal(nutritionStatus(impossible).ok,false);assert.equal(dayMeals(impossible).length,0);assert.equal(shopping(impossible).length,0);
 assert.equal(nutritionStatus({...defaultProfile,nutritionHealth:'clinical'}).ok,false);
});
test('restricted variety is reported honestly and economy choices reduce estimated costs',()=>{
 const limited=nutritionWeek({...defaultProfile,allergens:['milk'],dairyPreference:'lactose-free'});assert.ok(limited.status.ok);assert.ok(limited.warnings.some(s=>s.includes('часть повторится')));
 const economy=nutritionWeek({...defaultProfile,foodBudget:'economy'}),flexible=nutritionWeek({...defaultProfile,foodBudget:'flexible'});assert.ok(economy.estimate<flexible.estimate);
});
test('protein focus and strength goals influence targets; favorites never override allergens',()=>{
 assert.ok(calculate({...defaultProfile,nutritionFocus:'protein'}).protein>calculate(defaultProfile).protein);assert.ok(calculate({...defaultProfile,trainingGoal:'strength'}).protein>calculate(defaultProfile).protein);
 const profile={...defaultProfile,favoriteFoods:'арахис, миндаль',allergens:['peanut','nuts']};assert.ok(nutritionWeek(profile).days.flat().every(r=>!r.allergens.some(a=>profile.allergens.includes(a))));
});
test('shopping includes every adapted ingredient and manual replacement retains the other dish identities',()=>{
 const p={...defaultProfile,diet:'vegan',mealCount:5};const base=dayMeals(p,2);const replacement=eligibleRecipes(p).find(r=>r.tag===base[1].tag&&r.id!==base[1].id);const changed={...p,mealOverrides:{'2-1':replacement.id}};const meals=dayMeals(changed,2);assert.equal(meals[1].id,replacement.id);
 for(const slot of [0,2,3,4])assert.equal(meals[slot].id,base[slot].id);
 const totals=new Map();for(const day of nutritionWeek(changed).days)for(const r of day)for(const [n,a,u]of r.ingredients)totals.set(n+u,(totals.get(n+u)||0)+a);
 for(const item of shopping(changed))assert.equal(item.amount,totals.get(item.name+item.unit));
});
test('all 56 photos have unique source cells and all seven embedded WebP sheets exist',async()=>{
 const cells=new Set();for(const r of recipes){const cell=Math.floor(r.id/8)+'-'+r.id%8;assert.ok(!cells.has(cell));cells.add(cell);assert.match(photoMarkup(r),/preserveAspectRatio="xMidYMid slice"/)}assert.equal(cells.size,56);assert.equal(photoSources.length,7);assert.equal(photoSizes.length,7);
 for(let i=0;i<7;i++){const bytes=await readFile(new URL(`./assets/food/sheet-${i}.webp`,import.meta.url));assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP')}
});
test('common ingredient names such as chicken, fish and eggs match stored ingredient names',()=>{
 const excluded=eligibleRecipes({...defaultProfile,excludedFoods:'курица, рыба, яйца'});assert.ok(excluded.length);assert.ok(excluded.every(r=>!r.ingredients.some(([n])=>/Куриное|Лосось|Треска|Тунец|Яйцо/.test(n))));
 const vegan=nutritionWeek({...defaultProfile,diet:'vegan',favoriteFoods:'курица'});assert.ok(vegan.warnings.some(w=>w.includes('любимых продуктов')));
});
