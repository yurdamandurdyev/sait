export const defaultProfile={name:'Алекс',age:28,sex:'male',height:178,weight:75,activity:1.55,goal:'maintain',body:'average',level:'beginner',diet:'all',menuVersion:0,mealOverrides:{}};
export function calculate(p){if(p.age<18||p.age>90||p.height<120||p.height>230||p.weight<35||p.weight>250)throw new Error('Проверь возраст, рост и вес. Расчёт доступен для взрослых от 18 лет.');const bmr=10*p.weight+6.25*p.height-5*p.age+(p.sex==='male'?5:-161);const maintenance=Math.round(bmr*Number(p.activity));const calories=Math.max(p.sex==='male'?1500:1200,Math.round((maintenance+(p.goal==='lose'?-350:p.goal==='gain'?250:0))/10)*10);const factor=p.nutritionFocus==='protein'?1.9:p.goal==='gain'||['strength','hypertrophy'].includes(p.trainingGoal)?1.8:1.6;const protein=Math.min(Math.round(p.weight*factor),Math.round(calories*.32/4));const fat=Math.round(Math.min(calories*.35/9,Math.max(calories*.2/9,p.weight*.9)));return {bmr:Math.round(bmr),maintenance,calories,protein,fat,carbs:Math.max(0,Math.round((calories-protein*4-fat*9)/4)),water:Math.round(p.weight*30/100)/10};}
// Approximate food composition per 100 g (or 100 ml for milk): kcal, protein, fat, carbs.
export const foodComposition={
 'Овсяные хлопья':[370,13,7,62],'Молоко':[52,3,2.5,4.7],'Греческий йогурт':[73,9,2,4],
 'Ягоды':[45,1,.5,9],'Банан':[89,1.1,.3,23],'Яблоко':[52,.3,.2,14],
 'Груша':[57,.4,.1,15],'Апельсин':[47,.9,.1,12],'Киви':[61,1.1,.5,15],
 'Творог 5%':[121,17,5,1.8],'Яйцо без скорлупы':[143,12.6,9.5,.7],
 'Цельнозерновой хлеб':[247,13,4,41],'Цельнозерновая мука':[340,13,2.5,66],
 'Рис сухой':[360,7,1,79],'Гречка сухая':[343,13,3,62],'Булгур сухой':[342,12,1,76],
 'Киноа сухая':[368,14,6,64],'Паста сухая':[350,12,2,71],
 'Куриное филе':[110,23,1.5,0],'Филе индейки':[114,24,1,0],'Говядина нежирная':[158,21,8,0],
 'Лосось':[208,20,13,0],'Треска':[82,18,.7,0],'Тунец в собственном соку':[116,26,1,0],
 'Креветки очищенные':[85,20,.5,0],'Тофу':[120,13,7,2],
 'Нут готовый':[164,9,2.6,27],'Чечевица сухая':[352,25,1,60],
 'Фасоль готовая':[127,9,.5,23],'Хумус':[166,8,10,14],
 'Помидоры':[18,.9,.2,3.9],'Огурцы':[15,.7,.1,3.6],'Брокколи':[34,2.8,.4,7],
 'Шпинат':[23,2.9,.4,3.6],'Зелень':[30,2,.5,4],'Кабачок':[17,1.2,.3,3],
 'Баклажан':[25,1,.2,6],'Морковь':[41,.9,.2,10],'Лук':[40,1.1,.1,9],
 'Болгарский перец':[31,1,.3,6],'Грибы':[22,3,.3,3],'Тыква':[26,1,.1,6],
 'Картофель':[77,2,.1,17],'Батат':[86,1.6,.1,20],
 'Авокадо':[160,2,15,9],'Оливковое масло':[884,0,100,0],
 'Орехи':[620,18,57,16],'Миндаль':[579,21,50,22],'Арахисовая паста':[588,25,50,20],
 'Семена чиа':[486,17,31,42],'Льняное семя':[534,18,42,29],
 'Сыр фета':[264,14,21,4],'Сыр твёрдый':[350,25,27,1.5],
 'Моцарелла':[250,18,19,2],'Томатная пассата':[30,1.5,.2,5],
 'Мёд':[304,0,0,82],'Какао':[228,20,14,58],
 'Тёмный шоколад':[550,7,38,46],'Изюм':[299,3,.5,79],
 'Финики':[277,2,.2,75],'Кефир':[53,3,2.5,4],
 'Лаваш цельнозерновой':[270,9,2,54],'Кускус сухой':[376,13,.6,77],
 'Кукуруза готовая':[96,3.4,1.5,21],'Кокосовое молоко':[170,1.5,17,3],'Соевый напиток':[40,3.3,1.8,2.5],'Соевый йогурт':[55,4,2.5,3],'Рисовый напиток':[54,.2,1,11],'Кокосовый йогурт':[95,1,7,7],'Сироп финиковый':[310,0,0,77],'Тёмный шоколад веганский':[550,7,38,46]
};
const ingredients=(...items)=>items.map(([name,amount])=>[name,amount,name==='Молоко'||name==='Кефир'?'мл':'г']);
function make(name,tag,time,vegetarian,art,items,steps){
 const list=ingredients(...items);const values=[0,0,0,0];
 for(const [name,amount]of list){const composition=foodComposition[name];if(!composition)throw new Error('Нет состава: '+name);composition.forEach((v,i)=>values[i]+=v*amount/100)}
 return {name,tag,time,vegetarian,art,ingredients:list,steps,kcal:Math.round(values[0]),protein:Math.round(values[1]),fat:Math.round(values[2]),carbs:Math.round(values[3])};
}
const breakfast=(n,t,art,i,s)=>make(n,'Завтрак',t,true,art,i,s);
const lunch=(n,t,v,art,i,s)=>make(n,'Обед',t,v,art,i,s);
const dinner=(n,t,v,art,i,s)=>make(n,'Ужин',t,v,art,i,s);
const snack=(n,t,art,i,s)=>make(n,'Перекус',t,true,art,i,s);
export const recipes=[
 breakfast('Овсянка с ягодами и миндалём',10,'porridge',[['Овсяные хлопья',60],['Молоко',180],['Ягоды',80],['Миндаль',15]],['Вари хлопья с молоком 5–7 минут, помешивая.','Добавь ягоды и нарезанный миндаль.']),
 breakfast('Омлет со шпинатом и тостом',15,'eggs',[['Яйцо без скорлупы',120],['Шпинат',60],['Цельнозерновой хлеб',70],['Помидоры',100],['Оливковое масло',5]],['Припусти шпинат в сковороде с маслом.','Взбей яйца и готовь под крышкой до полной готовности.','Подсуши хлеб, подай с омлетом и помидорами.']),
 breakfast('Сырники с йогуртом',25,'pancakes',[['Творог 5%',180],['Яйцо без скорлупы',40],['Цельнозерновая мука',30],['Греческий йогурт',60],['Ягоды',50],['Оливковое масло',5]],['Смешай творог, яйцо и муку, сформируй небольшие сырники.','Готовь на слабом огне с маслом по 4–5 минут с каждой стороны.','Подай с йогуртом и ягодами.']),
 breakfast('Тост с авокадо и яйцом',15,'toast',[['Цельнозерновой хлеб',80],['Авокадо',70],['Яйцо без скорлупы',100],['Помидоры',100]],['Отвари яйца 9–10 минут до полной готовности.','Подсуши хлеб и разомни авокадо вилкой.','Собери тосты, добавь яйца и помидоры.']),
 breakfast('Гречневая каша с грибами',25,'grain',[['Гречка сухая',70],['Грибы',120],['Лук',40],['Яйцо без скорлупы',60],['Оливковое масло',5]],['Отвари гречку по инструкции на упаковке.','Обжарь нарезанные грибы и лук на масле.','Добавь гречку; подай с варёным яйцом.']),
 breakfast('Йогурт-боул с бананом',5,'berries',[['Греческий йогурт',220],['Банан',100],['Овсяные хлопья',40],['Орехи',15]],['Замочи хлопья в йогурте на 10 минут или на ночь в холодильнике.','Добавь нарезанный банан и орехи.']),
 breakfast('Банановые панкейки',20,'pancakes',[['Банан',100],['Яйцо без скорлупы',100],['Овсяные хлопья',45],['Греческий йогурт',70],['Оливковое масло',5]],['Измельчи хлопья, смешай с размятым бананом и яйцами.','Готовь небольшие панкейки на слабом огне по 2–3 минуты с каждой стороны до готовности.','Подай с йогуртом.']),
 breakfast('Чиа-пудинг с киви',10,'berries',[['Семена чиа',30],['Молоко',180],['Греческий йогурт',100],['Киви',100],['Мёд',10]],['Смешай чиа с молоком и убери в холодильник на ночь.','Перед подачей добавь йогурт, кусочки киви и мёд.']),
 breakfast('Шакшука с цельнозерновым хлебом',25,'eggs',[['Яйцо без скорлупы',120],['Томатная пассата',150],['Болгарский перец',100],['Лук',40],['Цельнозерновой хлеб',60],['Оливковое масло',5]],['Обжарь лук и перец 5 минут, добавь пассату.','Сделай углубления, добавь яйца и готовь под крышкой до полной готовности.','Подай с хлебом.']),
 breakfast('Творожный боул с грушей',5,'berries',[['Творог 5%',180],['Груша',140],['Орехи',20],['Греческий йогурт',50],['Мёд',10]],['Смешай творог с йогуртом.','Нарежь грушу и добавь в боул вместе с орехами и мёдом.']),
 breakfast('Овсянка «яблочный пирог»',15,'porridge',[['Овсяные хлопья',60],['Молоко',180],['Яблоко',130],['Арахисовая паста',20]],['Нарежь яблоко кубиками и прогрей с небольшим количеством воды.','Добавь хлопья и молоко, вари 5–7 минут.','Вмешай арахисовую пасту; корицу добавь по вкусу.']),
 breakfast('Тосты с хумусом и овощами',10,'toast',[['Цельнозерновой хлеб',90],['Хумус',80],['Огурцы',100],['Помидоры',100],['Сыр фета',30]],['Подсуши хлеб и намажь хумусом.','Добавь овощи и раскрошенную фету.']),
 breakfast('Киноа с молоком и изюмом',25,'porridge',[['Киноа сухая',65],['Молоко',200],['Изюм',20],['Миндаль',15]],['Промой киноа, отвари в воде 12–15 минут.','Добавь молоко и изюм, прогрей 3–5 минут.','Посыпь миндалём.']),
 breakfast('Скрэмбл с грибами и сыром',15,'eggs',[['Яйцо без скорлупы',120],['Грибы',100],['Сыр твёрдый',25],['Цельнозерновой хлеб',60],['Оливковое масло',5]],['Обжарь грибы на масле.','Добавь взбитые яйца, помешивай на слабом огне до готовности.','Добавь сыр и подай с тостом.']),
 lunch('Боул с курицей и авокадо',25,false,'bowl',[['Куриное филе',160],['Рис сухой',70],['Авокадо',60],['Помидоры',100],['Зелень',25],['Оливковое масло',5]],['Отвари рис.','Нарежь курицу и обжарь до полной готовности.','Собери боул с рисом, курицей, авокадо, помидорами и зеленью.']),
 lunch('Индейка с булгуром и перцем',30,false,'grain',[['Филе индейки',160],['Булгур сухой',75],['Болгарский перец',150],['Лук',40],['Оливковое масло',10]],['Отвари булгур по инструкции.','Обжарь лук и перец, добавь кусочки индейки.','Готовь до полной готовности мяса и подай с булгуром.']),
 lunch('Паста с тунцом и томатами',20,false,'pasta',[['Паста сухая',85],['Тунец в собственном соку',120],['Томатная пассата',140],['Шпинат',50],['Оливковое масло',8]],['Отвари пасту до готовности.','Прогрей пассату с маслом, добавь тунец и шпинат.','Смешай со слитой пастой.']),
 lunch('Говядина с гречкой',35,false,'grain',[['Говядина нежирная',150],['Гречка сухая',75],['Морковь',100],['Лук',50],['Оливковое масло',7]],['Отвари гречку.','Нарежь мясо тонкими полосками и обжарь с овощами.','Добавь немного воды и туши до мягкости и полной готовности.']),
 lunch('Рис с креветками и брокколи',25,false,'bowl',[['Креветки очищенные',170],['Рис сухой',80],['Брокколи',150],['Оливковое масло',10]],['Отвари рис.','Готовь брокколи на пару 5–7 минут.','Обжарь креветки до готовности, соедини с рисом и брокколи.']),
 lunch('Куриный ролл с хумусом',25,false,'wrap',[['Куриное филе',140],['Лаваш цельнозерновой',80],['Хумус',50],['Огурцы',100],['Помидоры',100],['Оливковое масло',5]],['Обжарь курицу до полной готовности и нарежь.','Намажь лаваш хумусом, выложи курицу и овощи.','Сверни ролл и слегка прогрей на сухой сковороде.']),
 lunch('Лосось с киноа и зеленью',30,false,'fish',[['Лосось',150],['Киноа сухая',70],['Огурцы',120],['Зелень',30],['Оливковое масло',5]],['Промой и отвари киноа.','Запекай лосось при 200 °C 15–20 минут до готовности.','Подай с киноа, огурцами и зеленью.']),
 lunch('Боул с нутом и овощами',20,true,'bowl',[['Нут готовый',180],['Рис сухой',60],['Помидоры',120],['Авокадо',60],['Зелень',30]],['Отвари рис и промой готовый нут.','Нарежь овощи и авокадо.','Собери боул, добавь зелень и специи по вкусу.']),
 lunch('Чечевичный суп с тостом',35,true,'soup',[['Чечевица сухая',85],['Морковь',100],['Лук',50],['Томатная пассата',120],['Цельнозерновой хлеб',60],['Оливковое масло',8]],['Обжарь лук и морковь, добавь промытую чечевицу и пассату.','Залей водой и вари 20–25 минут до мягкости чечевицы.','Подай с подсушенным хлебом.']),
 lunch('Паста с грибами и шпинатом',25,true,'pasta',[['Паста сухая',85],['Грибы',180],['Шпинат',60],['Греческий йогурт',70],['Сыр твёрдый',20],['Оливковое масло',7]],['Отвари пасту. Обжарь грибы с маслом.','Добавь шпинат и немного воды от пасты.','Сними с огня, вмешай йогурт, пасту и сыр.']),
 lunch('Киноа с тофу и овощами',25,true,'bowl',[['Киноа сухая',75],['Тофу',170],['Брокколи',120],['Болгарский перец',100],['Оливковое масло',8]],['Промой и отвари киноа.','Нарежь тофу, обжарь с овощами 8–10 минут.','Соедини с киноа, добавь специи по вкусу.']),
 lunch('Фасоль с рисом по-мексикански',25,true,'bowl',[['Фасоль готовая',180],['Рис сухой',70],['Кукуруза готовая',70],['Томатная пассата',100],['Болгарский перец',80],['Оливковое масло',5]],['Отвари рис.','Прогрей фасоль, кукурузу и нарезанный перец в пассате с маслом.','Смешай с рисом; паприку добавь по вкусу.']),
 lunch('Гречка с грибами и фетой',25,true,'grain',[['Гречка сухая',80],['Грибы',180],['Лук',50],['Сыр фета',60],['Оливковое масло',8]],['Отвари гречку.','Обжарь лук и грибы, смешай с гречкой.','Добавь раскрошенную фету перед подачей.']),
 lunch('Кускус с запечёнными овощами',30,true,'grain',[['Кускус сухой',80],['Нут готовый',120],['Кабачок',120],['Баклажан',100],['Сыр фета',40],['Оливковое масло',10]],['Нарежь овощи, смешай с маслом и запекай при 200 °C 20–25 минут.','Завари кускус по инструкции.','Добавь нут, запечённые овощи и фету.']),
 dinner('Лосось с овощами',30,false,'fish',[['Лосось',150],['Брокколи',150],['Картофель',200],['Оливковое масло',5]],['Разогрей духовку до 200 °C.','Нарежь картофель, смешай с маслом и запекай 15 минут.','Добавь лосось и брокколи; запекай ещё 15–20 минут до готовности.']),
 dinner('Курица с бататом',35,false,'roast',[['Куриное филе',170],['Батат',250],['Кабачок',150],['Оливковое масло',10]],['Нарежь батат и кабачок, смешай с маслом.','Выложи в форму с курицей.','Запекай при 200 °C 25–35 минут до полной готовности курицы.']),
 dinner('Треска с картофелем и зеленью',35,false,'fish',[['Треска',200],['Картофель',280],['Помидоры',150],['Зелень',25],['Оливковое масло',10]],['Нарежь картофель и запекай 20 минут при 200 °C.','Добавь треску и помидоры, готовь ещё 15–20 минут до готовности.','Посыпь зеленью.']),
 dinner('Тефтели из индейки с пастой',35,false,'pasta',[['Филе индейки',170],['Паста сухая',75],['Томатная пассата',160],['Лук',50],['Оливковое масло',8]],['Измельчи индейку с луком, сформируй небольшие тефтели.','Туши в пассате с маслом и небольшим количеством воды до полной готовности.','Отвари пасту и подай с тефтелями.']),
 dinner('Тёплый салат с говядиной',25,false,'salad',[['Говядина нежирная',150],['Картофель',200],['Помидоры',120],['Огурцы',100],['Зелень',30],['Оливковое масло',10]],['Отвари картофель и нарежь.','Обжарь тонко нарезанную говядину до готовности.','Соедини с овощами и зеленью, заправь маслом.']),
 dinner('Креветки с булгуром',25,false,'grain',[['Креветки очищенные',180],['Булгур сухой',80],['Болгарский перец',150],['Оливковое масло',10]],['Отвари булгур по инструкции.','Обжарь перец, затем добавь креветки и готовь до готовности.','Соедини с булгуром.']),
 dinner('Курица в йогурте с рисом',30,false,'bowl',[['Куриное филе',180],['Греческий йогурт',80],['Рис сухой',75],['Морковь',100],['Оливковое масло',8]],['Нарежь курицу и смешай с йогуртом и специями.','Обжарь морковь, добавь курицу и туши до полной готовности.','Подай с отварным рисом.']),
 dinner('Тофу с рисом и брокколи',25,true,'bowl',[['Тофу',200],['Рис сухой',70],['Брокколи',180],['Оливковое масло',8]],['Отвари рис и приготовь брокколи на пару.','Обжарь кубики тофу 6–8 минут на масле.','Собери тарелку, добавь любимые специи.']),
 dinner('Чечевичные котлеты с салатом',40,true,'patties',[['Чечевица сухая',90],['Цельнозерновая мука',20],['Морковь',70],['Помидоры',120],['Огурцы',100],['Греческий йогурт',80],['Оливковое масло',8]],['Отвари чечевицу до мягкости, слей воду и разомни с тёртой морковью и мукой.','Сформируй котлеты и запекай при 200 °C около 20 минут.','Подай с овощами и йогуртом.']),
 dinner('Запечённый батат с фасолью',40,true,'roast',[['Батат',280],['Фасоль готовая',170],['Греческий йогурт',80],['Зелень',25],['Оливковое масло',7]],['Разрежь батат вдоль, смажь маслом.','Запекай при 200 °C 30–40 минут до мягкости.','Прогрей фасоль, выложи на батат, добавь йогурт и зелень.']),
 dinner('Овощная фриттата с картофелем',30,true,'eggs',[['Яйцо без скорлупы',150],['Картофель',180],['Брокколи',120],['Сыр твёрдый',30],['Оливковое масло',5]],['Отвари картофель и брокколи, нарежь.','Выложи в форму, залей взбитыми яйцами, посыпь сыром.','Запекай при 180 °C 20–25 минут до полной готовности яиц.']),
 dinner('Карри с нутом и рисом',30,true,'curry',[['Нут готовый',170],['Рис сухой',65],['Кокосовое молоко',70],['Томатная пассата',100],['Шпинат',60]],['Отвари рис.','Прогрей нут в пассате и кокосовом молоке 10–15 минут.','Добавь шпинат, смесь карри по вкусу; подай с рисом.']),
 dinner('Рататуй с киноа и фетой',40,true,'roast',[['Киноа сухая',75],['Кабачок',150],['Баклажан',150],['Помидоры',150],['Сыр фета',60],['Оливковое масло',8]],['Нарежь овощи, выложи в форму с маслом.','Запекай при 200 °C 25–30 минут; параллельно отвари киноа.','Подай с киноа и фетой.']),
 dinner('Паста с томатами и моцареллой',20,true,'pasta',[['Паста сухая',85],['Томатная пассата',160],['Моцарелла',80],['Зелень',20],['Оливковое масло',5]],['Отвари пасту.','Прогрей пассату с маслом и смешай с пастой.','Добавь моцареллу и зелень, подавай сразу.']),
 snack('Йогурт с орехами',5,'berries',[['Греческий йогурт',180],['Орехи',20],['Ягоды',50]],['Выложи йогурт в миску.','Добавь ягоды и измельчённые орехи.']),
 snack('Яблоко с арахисовой пастой',5,'fruit',[['Яблоко',160],['Арахисовая паста',25],['Греческий йогурт',100]],['Нарежь яблоко дольками.','Подай с пастой и йогуртом.']),
 snack('Творог с ягодами',5,'berries',[['Творог 5%',150],['Ягоды',100],['Мёд',10]],['Выложи творог в миску.','Добавь ягоды и мёд.']),
 snack('Хумус с овощными палочками',10,'salad',[['Хумус',90],['Морковь',100],['Огурцы',100],['Цельнозерновой хлеб',40]],['Нарежь морковь и огурец палочками.','Подай с хумусом и хлебом.']),
 snack('Банановый смузи',5,'smoothie',[['Банан',100],['Кефир',220],['Овсяные хлопья',20],['Арахисовая паста',10]],['Измельчи все ингредиенты блендером.','Подавай сразу или храни недолго в холодильнике.']),
 snack('Груша с сыром и миндалём',5,'fruit',[['Груша',150],['Сыр твёрдый',35],['Миндаль',15]],['Нарежь грушу и сыр.','Подай с миндалём.']),
 snack('Шоколадный творожный крем',5,'berries',[['Творог 5%',150],['Греческий йогурт',60],['Какао',10],['Банан',60]],['Измельчи творог, йогурт, какао и банан блендером до кремовой текстуры.','Охлади перед подачей по желанию.']),
 snack('Кефир с бананом и льном',5,'smoothie',[['Кефир',250],['Банан',100],['Льняное семя',15]],['Измельчи льняное семя.','Смешай с кефиром и нарезанным бананом.']),
 snack('Тост с творогом и помидорами',10,'toast',[['Цельнозерновой хлеб',60],['Творог 5%',100],['Помидоры',100],['Зелень',15]],['Подсуши хлеб.','Намажь творогом, добавь помидоры и зелень.']),
 snack('Апельсин, йогурт и шоколад',5,'fruit',[['Апельсин',160],['Греческий йогурт',150],['Тёмный шоколад',15]],['Очисти апельсин и нарежь.','Подай с йогуртом и кусочками шоколада.']),
 snack('Энергетические шарики',15,'patties',[['Финики',40],['Овсяные хлопья',25],['Миндаль',20],['Какао',5]],['Удали косточки из фиников, при необходимости замочи в тёплой воде.','Измельчи финики, хлопья, миндаль и какао.','Сформируй небольшие шарики и охлади.']),
 snack('Чиа-йогурт с ягодами',10,'berries',[['Семена чиа',20],['Греческий йогурт',180],['Ягоды',100],['Мёд',8]],['Смешай чиа и йогурт; убери в холодильник минимум на 2 часа.','Перед подачей добавь ягоды и мёд.']),
 snack('Киви с творогом и орехами',5,'fruit',[['Киви',120],['Творог 5%',140],['Орехи',15]],['Очисти и нарежь киви.','Соедини с творогом, посыпь орехами.']),
 snack('Запечённое яблоко с творогом',25,'roast',[['Яблоко',180],['Творог 5%',120],['Изюм',15],['Мёд',10]],['Вырежи сердцевину яблока, не прорезая дно.','Начини творогом с изюмом и мёдом.','Запекай при 180 °C 20 минут до мягкости.'])
].map((recipe,id)=>({...recipe,id}));
export const mealTags=['Завтрак','Обед','Перекус','Ужин'];
export const nutritionDefaults={mealCount:4,maxCookingMinutes:60,allowAhead:true,foodBudget:'everyday',allergens:[],excludedFoods:'',favoriteFoods:'',dairyPreference:'all',nutritionFocus:'balanced',nutritionHealth:'general'};
export const allergenNames={milk:'Молоко',eggs:'Яйца',gluten:'Глютен',nuts:'Орехи',peanut:'Арахис',soy:'Соя',fish:'Рыба',shellfish:'Ракообразные',sesame:'Кунжут'};
const ingredientPrices={
 'Овсяные хлопья':160,'Молоко':100,'Греческий йогурт':380,'Ягоды':550,'Банан':160,'Яблоко':160,'Груша':210,'Апельсин':190,'Киви':300,'Творог 5%':440,'Яйцо без скорлупы':240,'Цельнозерновой хлеб':260,'Цельнозерновая мука':140,'Рис сухой':160,'Гречка сухая':160,'Булгур сухой':230,'Киноа сухая':650,'Паста сухая':180,'Куриное филе':450,'Филе индейки':620,'Говядина нежирная':950,'Лосось':1900,'Треска':900,'Тунец в собственном соку':1000,'Креветки очищенные':1300,'Тофу':500,'Нут готовый':300,'Чечевица сухая':250,'Фасоль готовая':270,'Хумус':550,'Помидоры':260,'Огурцы':230,'Брокколи':340,'Шпинат':650,'Зелень':700,'Кабачок':180,'Баклажан':260,'Морковь':80,'Лук':75,'Болгарский перец':320,'Грибы':350,'Тыква':120,'Картофель':80,'Батат':350,'Авокадо':650,'Оливковое масло':1100,'Орехи':1000,'Миндаль':1200,'Арахисовая паста':600,'Семена чиа':800,'Льняное семя':350,'Сыр фета':800,'Сыр твёрдый':1100,'Моцарелла':850,'Томатная пассата':250,'Мёд':800,'Какао':900,'Тёмный шоколад':1300,'Изюм':450,'Финики':600,'Кефир':100,'Лаваш цельнозерновой':300,'Кускус сухой':280,'Кукуруза готовая':230,'Кокосовое молоко':500,'Соевый напиток':180,'Соевый йогурт':600,'Рисовый напиток':180,'Кокосовый йогурт':600,'Сироп финиковый':900,'Тёмный шоколад веганский':1500
};
const canonical=name=>name.replace(' безлактозное','').replace(' безлактозный','').replace(' безлактозная','');
export function nutritionValues(items){const totals=[0,0,0,0];for(const [name,amount]of items){const source=foodComposition[canonical(name)];if(!source)throw new Error('Неизвестный ингредиент: '+name);source.forEach((n,i)=>totals[i]+=n*amount/100)}return {kcal:Math.round(totals[0]),protein:Math.round(totals[1]),fat:Math.round(totals[2]),carbs:Math.round(totals[3])}}
export function recipeAllergens(recipe){const found=new Set();for(const [name]of recipe.ingredients){
 if(/Молоко|Греческий йогурт|Творог|Кефир|Сыр|Моцарелла/.test(name))found.add('milk');
 if(/Яйцо/.test(name))found.add('eggs');if(/хлопья|хлеб|мука|Булгур|Паста|Лаваш|Кускус/.test(name))found.add('gluten');
 if(/Орехи|Миндаль/.test(name))found.add('nuts');if(/Арахис|Орехи/.test(name))found.add('peanut');
 if(/Тофу|Соевый/.test(name))found.add('soy');if(/Лосось|Треска|Тунец/.test(name))found.add('fish');if(/Креветки/.test(name))found.add('shellfish');if(/Хумус/.test(name))found.add('sesame');
 }return [...found];
}
export function adaptRecipe(recipe,raw){const p={...nutritionDefaults,...raw};let replacement={};
 const plant=p.diet==='vegan'||p.dairyPreference==='none';const soyFree=p.allergens.includes('soy');
 if(plant)replacement={'Молоко':soyFree?'Рисовый напиток':'Соевый напиток','Кефир':soyFree?'Рисовый напиток':'Соевый напиток','Греческий йогурт':soyFree?'Кокосовый йогурт':'Соевый йогурт','Творог 5%':'Тофу','Сыр фета':'Тофу','Сыр твёрдый':'Тофу','Моцарелла':'Тофу'};
 if(p.diet==='vegan')replacement={...replacement,'Мёд':'Сироп финиковый','Тёмный шоколад':'Тёмный шоколад веганский'};
 if(p.dairyPreference==='lactose-free'&&!plant)replacement={'Молоко':'Молоко безлактозное','Кефир':'Кефир безлактозный','Греческий йогурт':'Греческий йогурт безлактозный','Творог 5%':'Творог 5% безлактозный'};
 const ingredients=recipe.ingredients.map(([name,amount,unit])=>[replacement[name]||name,amount,unit]);
 const adapted=ingredients.some((item,i)=>item[0]!==recipe.ingredients[i][0]);
 const nutrients=nutritionValues(ingredients);const cost=Math.round(ingredients.reduce((s,[name,amount])=>s+(ingredientPrices[canonical(name)]||0)*amount/1000,0));
 const needsAhead=recipe.steps.some(step=>/ночь|часа|минимум на 2/.test(step)&&!/или/.test(step));
 const replacements=Object.entries(replacement).filter(([name])=>recipe.ingredients.some(i=>i[0]===name));
 let name=recipe.name,steps=recipe.steps;
 if(plant&&adapted){name=recipe.name.replace(/творогом/gi,'тофу').replace(/творог/gi,'тофу').replace(/Творожный/gi,'Растительный').replace(/творожный/gi,'растительный').replace(/сыром/gi,'тофу').replace(/фетой/gi,'тофу').replace(/моцареллой/gi,'тофу').replace(/молоком/gi,'растительным напитком').replace(/Кефир/gi,'Растительный напиток');
  steps=recipe.steps.map(step=>step.replace(/творог/gi,'мягкий тофу').replace(/йогурт/gi,'растительный йогурт').replace(/молоко/gi,'растительный напиток').replace(/кефир/gi,'растительный напиток').replace(/мёд/gi,'финиковый сироп').replace(/фету|моцареллу|сыр/gi,'тофу'));
  if(replacements.some(([original])=>original==='Творог 5%'))steps=['Для кремовой текстуры используй мягкий тофу; разомни или измельчи его перед сборкой блюда.',...steps];
 }
 return {...recipe,...nutrients,ingredients,name,steps,cost,needsAhead,adapted,replacements,allergens:recipeAllergens({ingredients}),vegan:recipe.vegetarian&&!recipe.ingredients.some(([n])=>n==='Яйцо без скорлупы')&&(plant||!recipeAllergens(recipe).includes('milk'))};
}
export function ingredientMatches(name,term){const value=name.toLocaleLowerCase('ru'),query=term.toLocaleLowerCase('ru').trim();
 const aliases=[[/^куриц|^курин/,/куриное/],[/^рыб/,/лосось|треска|тунец/],[/^мяс/,/куриное|индейки|говядина/],[/^морепродукт/,/креветки|лосось|треска|тунец/],[/^яйц/,/яйцо/],[/^сыр/,/сыр|моцарелла/],[/^орех/,/орехи|миндаль|арахис/],[/^молоч|^молочка/,/молоко|греческий йогурт|творог|кефир|сыр|моцарелла/]];
 const alias=aliases.find(([pattern])=>pattern.test(query));return alias?alias[1].test(value):value.includes(query);
}
const terms=value=>Array.isArray(value)?value:String(value||'').split(',').map(s=>s.trim().toLocaleLowerCase('ru')).filter(Boolean);
export function compatibleRecipe(recipe,p){
 if(p.diet==='vegetarian'&&!recipe.vegetarian)return false;
 if(p.diet==='vegan'&&(!recipe.vegetarian||recipe.ingredients.some(([n])=>n==='Яйцо без скорлупы')))return false;
 if(p.diet==='pescatarian'&&!recipe.vegetarian&&!recipe.allergens.some(a=>['fish','shellfish'].includes(a)))return false;
 if((p.allergens||[]).some(allergen=>recipe.allergens.includes(allergen)))return false;
 if(terms(p.excludedFoods).some(term=>recipe.ingredients.some(([name])=>ingredientMatches(name,term))))return false;
 if(recipe.time>Number(p.maxCookingMinutes||60))return false;
 if(p.allowAhead===false&&recipe.needsAhead)return false;
 return true;
}
export function eligibleRecipes(raw){const p={...nutritionDefaults,...raw};return recipes.map(r=>adaptRecipe(r,p)).filter(r=>compatibleRecipe(r,p))}
export function candidates(p,tag){return eligibleRecipes(p).filter(r=>r.tag===tag)}
export function mealSlots(p){const count=Number(p.mealCount)||4;return count===3?['Завтрак','Обед','Ужин']:count===5?['Завтрак','Обед','Перекус','Ужин','Перекус']:mealTags}
export function nutritionStatus(raw){const p={...nutritionDefaults,...raw};const missing=[...new Set(mealSlots(p))].filter(tag=>!candidates(p,tag).length);
 if(p.nutritionHealth==='clinical')return {ok:false,missing:[],reason:'Для лечебной диеты, беременности или другого специального питания нужен индивидуальный рацион специалиста. Автоматическое меню здесь не назначается.'};
 return {ok:!missing.length,missing,reason:missing.length?'По выбранным ограничениям нет подходящих блюд: '+missing.join(', ')+'. Проверь время готовки и исключения; обязательные аллергены не снимай ради заполнения меню.':''};
}
const shares=count=>count===3?[.27,.38,.35]:count===5?[.23,.3,.1,.27,.1]:[.25,.35,.13,.27];
function portionFit(chosen,target){const ideal=shares(chosen.length);let fractions=[...ideal];
 const score=values=>{let protein=0,fat=0,carbs=0,penalty=0;chosen.forEach((r,i)=>{const scale=values[i]*target.calories/r.kcal;protein+=r.protein*scale;fat+=r.fat*scale;carbs+=r.carbs*scale;penalty+=.08*((values[i]-ideal[i])/ideal[i])**2;if(scale<.45||scale>2.8)penalty+=8*(Math.max(.45-scale,0)+Math.max(scale-2.8,0))**2});return 4*((protein-target.protein)/Math.max(1,target.protein))**2+2*((fat-target.fat)/Math.max(1,target.fat))**2+((carbs-target.carbs)/Math.max(1,target.carbs))**2+penalty};
 let best=score(fractions);
 for(const step of [.025,.01])for(let sweep=0;sweep<14;sweep++){let changed=false;for(let i=0;i<fractions.length;i++)for(let j=0;j<fractions.length;j++){if(i===j||fractions[j]-step<.06||fractions[i]+step>.49)continue;const proposal=[...fractions];proposal[i]+=step;proposal[j]-=step;const value=score(proposal);if(value<best-1e-6){fractions=proposal;best=value;changed=true}}if(!changed)break}
 return {fractions,score:best};
}
const weekCache=new Map();
export function nutritionWeek(raw){const p={...nutritionDefaults,...raw},status=nutritionStatus(p);if(!status.ok)return {status,days:Array.from({length:7},()=>[]),warnings:[status.reason],estimate:0};
 const target=calculate(p),slots=mealSlots(p),version=Number(p.menuVersion)||0;
 const key=JSON.stringify({target,slots,diet:p.diet,allergens:p.allergens,excluded:p.excludedFoods,favorite:p.favoriteFoods,time:p.maxCookingMinutes,ahead:p.allowAhead,budget:p.foodBudget,dairy:p.dairyPreference,version,overrides:p.mealOverrides});if(weekCache.has(key))return weekCache.get(key);
 const pools=slots.map(tag=>candidates(p,tag)),used=slots.map(()=>new Set()),days=[];
 const preferenceScore=recipe=>{const favorites=terms(p.favoriteFoods),liked=favorites.filter(term=>recipe.ingredients.some(([name])=>ingredientMatches(name,term))).length;return (p.foodBudget==='economy'?.22:p.foodBudget==='everyday'?.06:0)*recipe.cost/200-.05*Math.min(liked,3)};
 for(let day=0;day<7;day++){
  let chosen=pools.map((pool,slot)=>{const available=pool.filter(r=>!used[slot].has(r.id));const list=available.length?available:pool;return list[(day+version*3+slot*3)%list.length]});
  for(let pass=0;pass<2;pass++)for(let slot=0;slot<slots.length;slot++){
   const available=pools[slot].filter(r=>!used[slot].has(r.id));const options=available.length?available:pools[slot];let best=Infinity,pick=chosen[slot];
   // Keep a rotating shortlist when options are broad, so healthy macro fitting also keeps variety.
   const offset=(version*3+day+slot*3)%options.length;const shortlist=[chosen[slot],...(options.length>7?Array.from({length:7},(_,i)=>options[(offset+i)%options.length]):options)].filter((r,i,list)=>!used[slot].has(r.id)&&list.findIndex(x=>x.id===r.id)===i);if(!shortlist.length)shortlist.push(...options);
   for(const option of shortlist){if(slots[slot]==='Перекус'&&chosen.some((r,i)=>i!==slot&&r.id===option.id)&&options.length>1)continue;const trial=[...chosen];trial[slot]=option;const value=portionFit(trial,target).score+preferenceScore(option);if(value<best){best=value;pick=option}}
   chosen[slot]=pick;
  }
  chosen.forEach((r,slot)=>used[slot].add(r.id));
  // Manual swaps affect the requested dish and all portion sizes, not other dish identities.
  chosen=chosen.map((recipe,slot)=>pools[slot].find(r=>r.id===p.mealOverrides?.[`${day}-${slot}`])||recipe);
  const fit=portionFit(chosen,target),meals=chosen.map((r,i)=>{const scale=fit.fractions[i]*target.calories/r.kcal;return {...r,scale,slot:i,label:slots[i]==='Перекус'&&slots.length===5?'Перекус '+(i===2?'1':'2'):slots[i],kcal:Math.round(r.kcal*scale),protein:Math.round(r.protein*scale),fat:Math.round(r.fat*scale),carbs:Math.round(r.carbs*scale),cost:Math.round(r.cost*scale),ingredients:r.ingredients.map(([n,a,u])=>[n,Math.max(1,Math.round(a*scale)),u])}});
  meals.at(-1).kcal=target.calories-meals.slice(0,-1).reduce((s,r)=>s+r.kcal,0);days.push(meals);
 }
 const warnings=[];for(const tag of [...new Set(slots)]){const count=pools[slots.indexOf(tag)].length;if(count<7)warnings.push(`${tag}: доступно ${count} блюд, поэтому часть повторится.`)}
 const lowProtein=days.some(meals=>meals.reduce((s,r)=>s+r.protein,0)<target.protein*.8),highProtein=days.some(meals=>meals.reduce((s,r)=>s+r.protein,0)>target.protein*1.2);if(lowProtein)warnings.push('В некоторые дни доступные блюда дают меньше 80% целевого белка. Проверь фактические БЖУ и расширь выбор разрешённых продуктов.');if(highProtein)warnings.push('В некоторые дни меню содержит больше белка, чем ориентир. Сверяй фактические БЖУ каждого дня с целями.');
 if(days.some(meals=>meals.some(r=>r.scale>2.8)))warnings.push('Некоторые порции получились большими. Рассмотри 5 приёмов пищи или другой выбор блюд.');
 const available=eligibleRecipes(p);if(terms(p.favoriteFoods).some(term=>recipes.some(r=>r.ingredients.some(([name])=>ingredientMatches(name,term)))&&!available.some(r=>r.ingredients.some(([name])=>ingredientMatches(name,term)))))warnings.push('Часть любимых продуктов не используется: обязательные ограничения питания имеют приоритет.');
 const result={status,days,warnings,estimate:days.flat().reduce((sum,r)=>sum+r.cost,0),target};weekCache.set(key,result);if(weekCache.size>20)weekCache.delete(weekCache.keys().next().value);return result;
}
export function dayMeals(p,day=0){return nutritionWeek(p).days[day]||[]}
export function shopping(p){const totals=new Map();for(const meals of nutritionWeek(p).days)for(const recipe of meals)for(const [name,amount,unit]of recipe.ingredients){const key=name+unit;const item=totals.get(key)||{name,amount:0,unit};item.amount+=amount;totals.set(key,item)}return [...totals.values()].sort((a,b)=>a.name.localeCompare(b.name,'ru'))}
