// Seven generated contact sheets, each with 2 columns and 4 rows.
// SVG viewports present the individual photograph without changing the source artwork.
export const photoSources=typeof embeddedPhotos!=='undefined'?embeddedPhotos:Array.from({length:7},(_,i)=>`./assets/food/sheet-${i}.webp`);
export const photoSizes=[[1086,1448],[1024,1536],[1024,1536],[1024,1536],[1024,1536],[1024,1536],[1024,1536]];
export function photoMarkup(recipe,extra=''){
 const sheet=Math.floor(recipe.id/8),tile=recipe.id%8,[width,height]=photoSizes[sheet];const column=tile%2,row=Math.floor(tile/2),cellW=width/2,cellH=height/4;
 const label=String(recipe.name).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return `<svg class="food-photo ${extra}" viewBox="${column*cellW+5} ${row*cellH+5} ${cellW-10} ${cellH-10}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" data-photo-id="${recipe.id}"><image href="${photoSources[sheet]}" width="${width}" height="${height}"/></svg>`;
}
