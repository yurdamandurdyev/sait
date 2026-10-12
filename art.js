// Local, deterministic illustrations. No images or fonts are fetched from the network.
export function recipeIllustration(recipe){
 let seed=recipe.id*7919+31;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const palettes=['#2d2024','#30271e','#202d27','#262334','#2a2825'];const bg=palettes[recipe.id%palettes.length];
 const ellipse=(x,y,rx,ry,color,angle=0)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${color}" transform="rotate(${angle} ${x} ${y})"/>`;
 let food='';const art=recipe.art;
 if(art==='smoothie'){
  food='<ellipse cx="350" cy="300" rx="75" ry="20" fill="#0005"/><path d="M288 91L309 297Q350 317 392 297L413 91Z" fill="url(#glass)" stroke="#e9d9d477" stroke-width="3"/><path d="M297 120L316 285Q350 300 385 285L403 120Z" fill="url(#cream)"/><ellipse cx="350" cy="120" rx="53" ry="12" fill="#edb6bc"/><path d="M366 123L398 47" stroke="#df785d" stroke-width="10" stroke-linecap="round"/>';
  for(let i=0;i<18;i++)food+=ellipse(315+random()*67,140+random()*137,2+random()*2,2,'#ac7562');
 }else{
  food='<ellipse cx="355" cy="207" rx="167" ry="120" fill="#0006" filter="url(#shadow)"/><ellipse cx="350" cy="184" rx="163" ry="123" fill="url(#plate)"/><ellipse cx="350" cy="184" rx="131" ry="96" fill="#bca680"/>';
  if(['porridge','berries','soup','curry'].includes(art)){
   const col=art==='soup'?'#dc954e':art==='curry'?'#d79a48':art==='porridge'?'#d7c09b':'#e9ddd1';food+=ellipse(350,184,130,94,col);
   for(let i=0;i<85;i++){const a=random()*Math.PI*2,r=Math.sqrt(random())*115;food+=ellipse(350+Math.cos(a)*r,184+Math.sin(a)*r*.7,art==='berries'?6:2,art==='berries'?5:1.5,art==='berries'?['#69506d','#a95862','#d58b83'][i%3]:'#a9845333')}
   if(art==='porridge')for(let i=0;i<7;i++)food+=ellipse(290+i*18,181+Math.sin(i*.6)*22,16,11,'#f0d392',15);
  }else if(art==='toast'){
   food+='<path d="M257 139Q246 114 283 110L377 123Q404 128 397 153L374 251L250 234Z" fill="#b98248" stroke="#d6a366" stroke-width="9"/><path d="M267 143L383 153L363 239L258 224Z" fill="#d4c59a"/>';
   for(let i=0;i<5;i++)food+=ellipse(289+i*14,175+i*5,14,34,'#a1b064',-24);
   food+=ellipse(367,175,35,28,'#eee4cc',20)+ellipse(367,173,14,12,'#eeb746');
  }else if(art==='pancakes'||art==='patties'){
   for(let i=0;i<4;i++)food+=ellipse(313+(i%2)*68,155+Math.floor(i/2)*61,47,32,art==='pancakes'?'#c69355':'#b78b59',i*13)+ellipse(310+(i%2)*68,152+Math.floor(i/2)*61,37,22,art==='pancakes'?'#deb879':'#c7a16a',i*13);
   food+=ellipse(387,158,29,18,'#eee4db');for(let i=0;i<9;i++)food+=ellipse(270+random()*130,134+random()*100,5,4,'#9d5060');
  }else if(art==='eggs'){
   food+='<path d="M260 167Q242 135 294 132Q324 96 353 134Q410 126 406 162Q440 199 397 213Q374 249 339 224Q282 250 272 219Q232 209 260 167Z" fill="#f3e5cb"/>';
   food+=ellipse(305,174,25,22,'#f0b72e')+ellipse(376,184,24,22,'#eeb13e');for(let i=0;i<17;i++)food+=ellipse(250+random()*200,115+random()*130,6,2,'#638652',random()*180);
  }else if(art==='pasta'){
   for(let i=0;i<95;i++){const a=random()*Math.PI*2,r=Math.sqrt(random())*111;food+=ellipse(350+Math.cos(a)*r,184+Math.sin(a)*r*.72,14,5,['#dca857','#d19b46','#e8bd73'][i%3],random()*180)}
   for(let i=0;i<12;i++)food+=ellipse(290+random()*120,140+random()*90,8,6,i%2?'#a8563c':'#537e48',random()*180);
  }else if(art==='wrap'){
   food+='<path d="M260 128L403 150L420 250L273 227Z" fill="#d6bd8c" stroke="#a68c61" stroke-width="3"/><path d="M282 139L280 215M314 143L312 220M346 150L344 224M378 155L376 228" stroke="#ad905e55" stroke-width="6"/><ellipse cx="268" cy="178" rx="18" ry="49" fill="#91a46a"/><path d="M267 142L280 151L263 178L281 199L266 219" stroke="#b66747" stroke-width="10" fill="none"/>';
  }else if(art==='fruit'){
   for(let i=0;i<5;i++)food+=ellipse(281+i*26,169+Math.sin(i*.8)*26,25,43,i%2?'#e2b161':'#c5b56d',-24+i*10)+ellipse(283+i*26,164+Math.sin(i*.8)*26,17,34,'#e9d4a0',-24+i*10);
   for(let i=0;i<12;i++)food+=ellipse(282+random()*145,210+random()*24,7,4,'#a1764d',random()*180);
  }else{
   for(let i=0;i<100;i++){const a=random()*Math.PI*2,r=Math.sqrt(random())*115;food+=ellipse(350+Math.cos(a)*r,184+Math.sin(a)*r*.7,art==='grain'?4:9,art==='grain'?2:6,['#9fae61','#6d8850','#c7b36f','#d38953','#eee0b2'][i%5],random()*180)}
   if(art==='fish')food+='<path d="M277 157Q344 131 407 167L383 234Q319 226 267 193Z" fill="url(#salmon)" stroke="#f0bc90" stroke-width="3"/><path d="M298 153L284 200M326 149L311 209M355 155L339 217M384 165L368 227" stroke="#f9d2aa" stroke-width="4" opacity=".7"/>';
   if(art==='roast')for(let i=0;i<7;i++)food+=ellipse(280+random()*140,140+random()*90,17,11,'#d5a568',random()*180);
   if(art==='bowl')food+='<path d="M383 118Q445 145 411 217Q377 242 350 204Q329 158 383 118Z" fill="#3e6147"/><path d="M382 126Q432 147 404 207Q377 229 358 199Q341 160 382 126Z" fill="#b5c478"/><ellipse cx="382" cy="177" rx="18" ry="25" fill="#a67e4c"/>';
  }
 }
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 380"><defs><radialGradient id="plate"><stop stop-color="#f3eee1"/><stop offset=".8" stop-color="#e7dfce"/><stop offset="1" stop-color="#b6ad9e"/></radialGradient><linearGradient id="salmon" x2="1" y2="1"><stop stop-color="#efb18a"/><stop offset="1" stop-color="#c77553"/></linearGradient><linearGradient id="cream" x2="1" y2="1"><stop stop-color="#dca6ad"/><stop offset="1" stop-color="#a7677b"/></linearGradient><linearGradient id="glass"><stop stop-color="#eee5dd99"/><stop offset=".5" stop-color="#ffffff11"/><stop offset="1" stop-color="#c3c4c488"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="12"/></filter></defs><rect width="700" height="380" fill="${bg}"/><path d="M0 0L120 0L288 380H0Z" fill="#ffffff03"/><circle cx="610" cy="50" r="150" fill="#ffffff02"/>${food}<path d="M549 80L536 310" stroke="#928b80" stroke-width="7" stroke-linecap="round"/><ellipse cx="550" cy="74" rx="13" ry="28" fill="#b0a99b"/><path d="M109 283Q79 244 107 226Q151 243 109 283" fill="#789365"/><path d="M106 279L129 238" stroke="#b9c598" stroke-width="2"/></svg>`;
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
