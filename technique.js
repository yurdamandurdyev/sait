import {muscleNames} from './training.js';
export function muscleMap(groups=[],secondary=[]){
 const color=(name)=>groups.includes(name)?'var(--accent)':secondary.includes(name)?'#bd9670':'var(--track)';
 return `<svg class="muscle-map" viewBox="0 0 300 280" role="img" aria-label="Основные мышцы: ${groups.map(g=>muscleNames[g]).join(', ')}"><g fill="var(--track)" stroke="var(--line)" stroke-width="2"><circle cx="78" cy="29" r="17"/><path d="M66 48L51 58L40 94L32 154L44 159L58 109L58 164L50 227L50 261L66 261L76 186L80 186L91 261L107 261L104 227L97 163L98 109L113 159L125 154L118 94L105 58L90 48Z"/><circle cx="222" cy="29" r="17"/><path d="M210 48L195 58L184 94L176 154L188 159L202 109L202 164L194 227L194 261L210 261L220 186L224 186L235 261L251 261L248 227L241 163L242 109L257 159L269 154L262 94L249 58L234 48Z"/></g><g stroke="var(--bg)" stroke-width="2"><path d="M60 65Q78 55 76 93L61 101Z M80 64Q96 58 97 101L80 93Z" fill="${color('chest')}"/><path d="M51 62Q60 57 58 88L44 97Z M101 62Q112 64 115 97L100 88Z" fill="${color('shoulders')}"/><path d="M47 97L56 94L49 126L40 130Z M100 94L110 98L119 131L109 126Z" fill="${color('biceps')}"/><path d="M64 104L92 104L92 148L79 163L63 147Z" fill="${color('core')}"/><path d="M61 169L75 170L68 216L54 226Z M82 170L96 169L104 226L91 216Z" fill="${color('quads')}"/><path d="M205 67L220 62L222 99L204 133Z M225 62L239 67L241 133L225 99Z" fill="${color('back')}"/><path d="M195 62L203 62L201 91L187 98Z M243 62L251 64L259 98L244 92Z" fill="${color('shoulders')}"/><path d="M190 97L200 94L193 127L183 131Z M244 94L254 98L262 131L252 127Z" fill="${color('triceps')}"/><path d="M203 143L222 151L220 177L202 177Z M225 151L240 143L242 177L224 177Z" fill="${color('glutes')}"/><path d="M203 180L219 180L211 217L196 228Z M226 180L240 180L248 227L235 217Z" fill="${color('hamstrings')}"/><path d="M198 230L211 220L211 249L197 250Z M235 220L248 231L249 250L236 249Z" fill="${color('calves')}"/></g><g fill="var(--muted)" font-size="9" font-family="Arial" text-anchor="middle"><text x="78" y="278">СПЕРЕДИ</text><text x="222" y="278">СЗАДИ</text></g></svg>`;
}
const standing={head:[150,42],shoulder:[150,76],hip:[150,143],elbow:[173,115],wrist:[176,169],knee:[150,189],ankle:[150,235],elbow2:[132,116],wrist2:[129,169],knee2:[140,188],ankle2:[138,234]};
const pose=(overrides)=>({...standing,...overrides});
function poses(ex){const type=ex.animation;
 if(ex.id==='db-floor-press'){const base=pose({head:[58,218],shoulder:[90,220],hip:[177,220],knee:[215,178],ankle:[246,235],knee2:[203,178],ankle2:[231,235],elbow:[128,236],wrist:[129,188],elbow2:[95,234],wrist2:[95,185]});return [base,pose({...base,elbow:[106,168],wrist:[106,119],elbow2:[93,168],wrist2:[93,119]})]}
 if(ex.id==='band-row'){const base=pose({elbow:[194,94],wrist:[236,112],elbow2:[191,88],wrist2:[233,106]});return [base,pose({...base,elbow:[133,122],wrist:[177,136],elbow2:[132,113],wrist2:[174,129]})]}
 if(ex.id==='cable-row'){const base=pose({head:[150,73],shoulder:[150,106],hip:[148,173],knee:[204,184],ankle:[211,235],knee2:[191,182],ankle2:[198,233],elbow:[195,114],wrist:[241,126],elbow2:[192,108],wrist2:[238,120]});return [base,pose({...base,elbow:[129,140],wrist:[177,148],elbow2:[128,132],wrist2:[174,140]})]}
 if(ex.id==='band-triceps')return [pose({elbow:[171,124],wrist:[193,93],elbow2:[131,124],wrist2:[114,94]}),pose({elbow:[171,124],wrist:[172,177],elbow2:[131,124],wrist2:[128,177]})];
 if(ex.id==='pullup'){const base=pose({head:[150,75],shoulder:[150,108],hip:[150,175],knee:[150,211],ankle:[150,244],knee2:[138,211],ankle2:[138,244],elbow:[131,82],wrist:[129,50],elbow2:[171,82],wrist2:[173,50]});return [base,pose({...base,head:[150,25],shoulder:[150,58],hip:[150,125],knee:[150,164],ankle:[150,202],knee2:[138,164],ankle2:[138,202],elbow:[113,72],elbow2:[188,72]})]}

 if(type==='squat')return [pose({elbow:[184,102],wrist:[193,79],elbow2:[145,99],wrist2:[167,81]}),pose({head:[174,93],shoulder:[162,124],hip:[122,163],knee:[172,184],ankle:[150,235],knee2:[154,185],ankle2:[133,234],elbow:[188,146],wrist:[200,125],elbow2:[157,147],wrist2:[182,125]})];
 if(type==='hinge'||type==='row'||type==='triceps'){
 const bent=pose({head:[205,75],shoulder:[184,107],hip:[124,150],knee:[148,190],knee2:[134,190],elbow:[183,150],wrist:[182,196],elbow2:[167,149],wrist2:[166,194]});
 if(type==='hinge')return [pose({wrist:[162,169],wrist2:[142,169]}),bent];
 if(type==='row')return [bent,pose({...bent,elbow:[144,116],wrist:[153,156],elbow2:[137,128],wrist2:[151,163]})];
 return [pose({...bent,elbow:[145,119],wrist:[153,158]}),pose({...bent,elbow:[145,119],wrist:[102,139]})];
 }
 if(type==='lunge')return [standing,pose({head:[147,55],shoulder:[147,89],hip:[139,155],knee:[169,186],ankle:[186,235],knee2:[96,212],ankle2:[62,231],elbow:[169,128],wrist:[169,174],elbow2:[119,127],wrist2:[116,175]})];
 if(type==='bridge'){
 const down=pose({head:[53,218],shoulder:[84,222],hip:[158,220],knee:[212,184],ankle:[237,235],knee2:[197,188],ankle2:[224,235],elbow:[103,228],wrist:[136,230],elbow2:[97,215],wrist2:[129,218]});return [down,pose({...down,hip:[158,199],knee2:[198,188],elbow:[110,216],wrist:[145,220]})];
 }
 if(type==='bench'){
 const base=pose({head:[58,139],shoulder:[89,151],hip:[176,156],knee:[214,192],ankle:[229,235],knee2:[198,192],ankle2:[213,234],elbow:[128,166],wrist:[130,112],elbow2:[95,171],wrist2:[94,117]});return [base,pose({...base,elbow:[110,99],wrist:[111,50],elbow2:[93,98],wrist2:[94,52]})];
 }
 if(type==='wallpush')return [pose({head:[186,48],shoulder:[174,80],hip:[191,152],knee:[202,193],ankle:[214,235],ankle2:[203,235],elbow:[216,86],wrist:[260,80],elbow2:[218,90],wrist2:[258,84]}),pose({head:[249,49],shoulder:[237,82],hip:[225,153],knee:[220,194],ankle:[214,235],ankle2:[203,235],elbow:[220,106],wrist:[260,80],elbow2:[219,111],wrist2:[258,84]})];
 if(type==='pushup'){
 const incline=ex.id==='incline-pushup';const base=pose({head:[268,incline?107:118],shoulder:[242,incline?135:146],hip:[164,189],knee:[116,214],ankle:[65,235],knee2:[114,207],ankle2:[62,226],elbow:[244,incline?159:189],wrist:[245,incline?184:234],elbow2:[237,incline?161:186],wrist2:[235,incline?184:232]});return [base,pose({...base,head:[271,incline?152:189],shoulder:[245,incline?169:207],hip:[164,incline?203:221],knee:[116,225],elbow:[219,incline?183:224],elbow2:[213,incline?181:220]})];
 }
 if(type==='overhead')return [pose({elbow:[189,82],wrist:[185,43],elbow2:[111,82],wrist2:[114,43]}),pose({elbow:[165,35],wrist:[162,14],elbow2:[136,35],wrist2:[138,14]})];
 if(type==='lateral')return [pose({elbow:[179,121],wrist:[191,165],elbow2:[120,121],wrist2:[109,165]}),pose({elbow:[200,78],wrist:[244,74],elbow2:[100,78],wrist2:[56,74]})];
 if(ex.id==='self-curl')return [pose({elbow:[168,123],wrist:[177,174],elbow2:[200,127],wrist2:[182,172]}),pose({elbow:[168,123],wrist:[186,80],elbow2:[210,107],wrist2:[190,83]})];
 if(type==='curl')return [pose({elbow:[168,123],wrist:[177,174]}),pose({elbow:[168,123],wrist:[186,80]})];
 if(type==='pulldown')return [pose({head:[150,73],shoulder:[150,106],hip:[148,173],knee:[204,184],ankle:[211,235],knee2:[191,182],ankle2:[198,233],elbow:[180,66],wrist:[176,25],elbow2:[118,65],wrist2:[124,25]}),pose({head:[150,73],shoulder:[150,106],hip:[148,173],knee:[204,184],ankle:[211,235],knee2:[191,182],ankle2:[198,233],elbow:[183,136],wrist:[187,94],elbow2:[116,134],wrist2:[113,93]})];
 if(type==='prone')return [pose({elbow:[107,91],wrist:[109,53],elbow2:[192,91],wrist2:[190,53]}),pose({elbow:[110,85],wrist:[112,47],elbow2:[189,85],wrist2:[187,47]})];
 if(type==='deadbug'){
 const base=pose({head:[59,218],shoulder:[90,218],hip:[181,219],elbow:[89,178],wrist:[89,139],elbow2:[101,181],wrist2:[104,144],knee:[186,168],ankle:[234,168],knee2:[175,157],ankle2:[221,157]});return [base,pose({...base,elbow:[55,205],wrist:[22,194],knee:[234,215],ankle:[283,221]})];
 }
 if(type==='birddog'){
 const base=pose({head:[240,128],shoulder:[216,155],hip:[136,159],elbow:[218,196],wrist:[218,235],elbow2:[205,194],wrist2:[205,234],knee:[138,207],ankle:[86,231],knee2:[125,204],ankle2:[76,222]});return [base,pose({...base,elbow:[255,154],wrist:[290,154],knee2:[88,161],ankle2:[42,161]})];
 }
 if(type==='plank'){const p=pose({head:[257,155],shoulder:[230,178],hip:[157,204],knee:[109,220],ankle:[60,235],knee2:[106,214],ankle2:[57,228],elbow:[237,231],wrist:[274,233],elbow2:[227,224],wrist2:[259,225]});return [p,p]}
 if(type==='calf')return [standing,pose(Object.fromEntries(Object.entries(standing).map(([key,[x,y]])=>[key,[x,y-10]])))];
 if(type==='march')return [standing,pose({knee:[191,159],ankle:[193,201],elbow:[176,112],wrist:[194,100]})];
 return [standing,standing];
}
export function techniqueMarkup(ex){return `<div class="technique-stage"><svg class="technique-animation" viewBox="0 0 330 265" data-exercise-animation="${ex.id}" role="img" aria-label="Схематическое выполнение: ${ex.name}"></svg><div class="phase-label"><span>01 · Исходное положение</span><span>02 · Движение</span></div></div>`}
export function createTechniquePlayer(ex,svg){
 const [a,b]=poses(ex);let id,paused=matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='off';let position=0;
 const draw=(amount)=>{
  const points={};for(const key of Object.keys(a))points[key]=a[key].map((v,i)=>v+(b[key][i]-v)*amount);
  const line=(one,two,color,width=9)=>`<line x1="${points[one][0]}" y1="${points[one][1]}" x2="${points[two][0]}" y2="${points[two][1]}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
  const leg=ex.muscles.some(g=>['quads','hamstrings','glutes','calves'].includes(g))?'var(--accent)':'#aaa7b0';const arm=ex.muscles.some(g=>['chest','back','shoulders','biceps','triceps'].includes(g))?'var(--accent)':'#aaa7b0';
  const weightJoints=ex.id==='hip-thrust'?['hip']:['db-row','db-curl','db-triceps'].includes(ex.id)?['wrist']:['wrist','wrist2'];const weights=ex.equipment.includes('dumbbells')?weightJoints.map(key=>`<rect x="${points[key][0]-10}" y="${points[key][1]-5}" width="20" height="10" rx="3" fill="#d3c6bb"/>`).join(''):'';
  let props='<line x1="20" y1="246" x2="310" y2="246" stroke="var(--line)" stroke-width="2"/>';
  if(ex.animation==='wallpush')props+='<path d="M271 26V246" stroke="var(--track)" stroke-width="8"/>';
  if(ex.animation==='bench'&&ex.id!=='db-floor-press')props+='<path d="M52 171H187M66 172V245M174 172V245" stroke="var(--track)" stroke-width="7"/>';
  if(ex.id==='incline-pushup')props+='<path d="M234 191H298V247" fill="none" stroke="var(--track)" stroke-width="8"/>';
  if(ex.id==='chair-squat')props+='<path d="M97 180H142M103 180V246M133 180V246" stroke="var(--track)" stroke-width="7"/>';
  if(ex.id==='prone-w')props='<rect x="81" y="9" width="138" height="235" rx="13" fill="var(--accent-soft)" stroke="var(--line)"/><text x="165" y="259" fill="var(--muted)" font-size="8" text-anchor="middle">ВИД СВЕРХУ · ЛЁЖА НА ЖИВОТЕ</text>';
  if(['db-row','db-triceps'].includes(ex.id))props+='<path d="M146 199H185M150 199V246M181 199V246" stroke="var(--track)" stroke-width="7"/>';
  if(ex.id==='barbell-squat')props+=`<line x1="${points.shoulder[0]-38}" y1="${points.shoulder[1]-6}" x2="${points.shoulder[0]+38}" y2="${points.shoulder[1]-6}" stroke="#d3c6bb" stroke-width="7"/>`;
  if(ex.id==='calf'||ex.id==='db-calf')props+=`<path d="M${points.ankle[0]},${points.ankle[1]}L180 246" stroke="#aaa7b0" stroke-width="7" stroke-linecap="round"/>`;
  if(ex.id==='band-triceps'||ex.id==='band-row')props+=`<line x1="${ex.id==='band-row'?285:195}" y1="${ex.id==='band-row'?113:15}" x2="${points.wrist[0]}" y2="${points.wrist[1]}" stroke="var(--accent)" stroke-width="2"/>`;
  if(ex.animation==='pulldown')props+=`<line x1="${points.wrist[0]}" y1="${points.wrist[1]}" x2="${points.wrist2[0]}" y2="${points.wrist2[1]}" stroke="#d3c6bb" stroke-width="6" stroke-linecap="round"/>`;
  svg.innerHTML=props+line('hip','knee2','#64626d',11)+line('knee2','ankle2','#64626d',10)+line('shoulder','elbow2','#64626d',8)+line('elbow2','wrist2','#64626d',7)+line('shoulder','hip',ex.muscles.includes('core')?'var(--accent)':'#c3bcc4',17)+line('shoulder','head','#c3bcc4',8)+line('hip','knee',leg,13)+line('knee','ankle',leg,11)+line('shoulder','elbow',arm,10)+line('elbow','wrist',arm,8)+`<circle cx="${points.head[0]}" cy="${points.head[1]}" r="14" fill="#ddd4d3"/>`+['shoulder','hip','knee','elbow'].map(key=>`<circle cx="${points[key][0]}" cy="${points[key][1]}" r="4" fill="var(--bg)"/>`).join('')+weights;
 };
 function tick(time){if(!paused){position=(1-Math.cos(time/1500*Math.PI))/2;draw(position)}id=requestAnimationFrame(tick)}
 draw(0);id=requestAnimationFrame(tick);
 return {pause(){paused=!paused;return paused},phase(value){paused=true;position=value;draw(value)},dispose(){cancelAnimationFrame(id)}};
}
