export const fitnessSources=typeof embeddedFitness!=='undefined'?embeddedFitness:['./assets/fitness/editorial.webp','./assets/fitness/anatomy.webp'];
const fitnessLabels=['Атлет в зале','Тренировка дома','Оборудование для силовой тренировки','Восстановление после тренировки'];
export function fitnessPhoto(tile=0,extra=''){
 const width=1536,height=1024,cw=width/2,ch=height/2;
 return `<div class="fitness-photo ${extra}" data-depth-photo><svg viewBox="${tile%2*cw+3} ${Math.floor(tile/2)*ch+3} ${cw-6} ${ch-6}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${fitnessLabels[tile]}"><image href="${fitnessSources[0]}" width="${width}" height="${height}"/></svg><div class="photo-shine"></div></div>`;
}
export function bindVisualInteractions(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.addEventListener('pointermove',event=>{const el=event.target.closest('[data-depth-photo]');if(!el||reduced.matches||document.documentElement.dataset.motion==='off')return;const r=el.getBoundingClientRect();el.style.setProperty('--photo-x',`${((event.clientX-r.left)/r.width-.5)*10}deg`);el.style.setProperty('--photo-y',`${-((event.clientY-r.top)/r.height-.5)*8}deg`);});
 document.addEventListener('pointerout',event=>{const el=event.target.closest('[data-depth-photo]');if(el&&!el.contains(event.relatedTarget)){el.style.removeProperty('--photo-x');el.style.removeProperty('--photo-y');}});
 document.addEventListener('click',event=>{const button=event.target.closest('[data-inspect-muscle]');if(!button)return;const atlas=button.closest('.muscle-atlas');const active=button.getAttribute('aria-pressed')!=='true';atlas.querySelectorAll('[data-inspect-muscle]').forEach(b=>b.setAttribute('aria-pressed',String(active&&b===button)));atlas.querySelectorAll('[data-muscle-region]').forEach(region=>region.classList.toggle('inspecting',active&&region.dataset.muscleRegion===button.dataset.inspectMuscle));atlas.querySelector('.atlas-selection').textContent=active?button.textContent:'Выбери группу, чтобы увидеть её расположение.';});
}
