export const muscleNames={chest:'Грудь',back:'Спина',shoulders:'Плечи',biceps:'Бицепс',triceps:'Трицепс',quads:'Квадрицепсы',hamstrings:'Задняя поверхность бедра',glutes:'Ягодицы',core:'Кор',calves:'Икры'};
export const dayNames=['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
export const equipmentNames={dumbbells:'Гантели',barbell:'Штанга',rack:'Стойка со страховкой',bench:'Скамья',cable:'Блочный тренажёр',bands:'Резинки',pullup:'Турник',chair:'Устойчивая опора',mat:'Коврик'};
export const defaultEquipment={gym:['dumbbells','barbell','rack','bench','cable','mat'],home:['bands','chair','mat'],body:['chair','mat']};
export const workoutDefaults={trainingMode:'gym',trainingDays:[0,2,4],sessionMinutes:45,trainingGoal:'fitness',splitPreference:'auto',weightIncrement:1,priority:'balanced',pushupAbility:'low',limitations:[],healthStatus:'none',equipmentByMode:{},programStart:null};
const ex=(id,name,pattern,muscles,secondary,equipment,animation,cues,mistakes,restrictions=[])=>({id,name,pattern,muscles,secondary,equipment,animation,cues,mistakes,restrictions});
export const exercises=[
 ex('chair-squat','Приседание к опоре','squat',['quads','glutes'],['core'],['chair'],'squat',['Стопы на ширине плеч, носки слегка наружу.','Отведи таз назад и коснись устойчивой опоры, сохраняя контроль.','Колени движутся в сторону носков. Поднимись через всю стопу.'],['Падать на опору.','Сводить колени внутрь или отрывать пятки.'],['knees']),
 ex('squat','Приседание с собственным весом','squat',['quads','glutes'],['core'],[],'squat',['Держи стопы устойчиво, корпус собран.','Сгибай колени и тазобедренные суставы одновременно.','Опускайся только до комфортной глубины и вставай без рывка.'],['Отрывать пятки.','Округлять спину или сводить колени.'],['knees']),
 ex('goblet-squat','Приседание с гантелью','squat',['quads','glutes'],['core'],['dumbbells'],'squat',['Держи одну гантель у груди, локти направлены вниз.','Сядь между стопами, колени следуют за носками.','Поднимись, не меняя положение спины.'],['Резко проваливаться вниз.','Отрывать пятки и заваливать колени.'],['knees','back']),
 ex('barbell-squat','Приседание со штангой','squat',['quads','glutes'],['core'],['barbell','rack'],'squat',['Используй стойку со страховочными упорами; сначала освой движение без веса.','Зафиксируй корпус, опускайся с контролем до комфортной глубины.','Поднимай таз и грудь вместе. Для первой тренировки нужен контроль тренера.'],['Брать вес без контроля техники.','Сгибать поясницу или заваливать колени.'],['knees','back']),
 ex('reverse-lunge','Обратный выпад','lunge',['quads','glutes'],['hamstrings','core'],[],'lunge',['Из устойчивой стойки сделай шаг назад.','Передняя стопа остаётся полностью на полу, корпус стабилен.','Опускай заднее колено без удара, вернись усилием передней ноги.'],['Слишком узкая постановка стоп.','Наклонять таз и сводить переднее колено.'],['knees']),
 ex('db-lunge','Выпад с гантелями','lunge',['quads','glutes'],['hamstrings','core'],['dumbbells'],'lunge',['Гантели держи по бокам.','Шагни назад, удерживая переднюю стопу на полу.','Поднимись без отталкивания задней ногой. Повтори на другую сторону.'],['Раскачиваться с весом.','Ударять коленом о пол.'],['knees','back']),
 ex('bridge','Ягодичный мост','bridge',['glutes','hamstrings'],['core'],['mat'],'bridge',['Ляг на спину, стопы на полу близко к тазу.','Выдохни и подними таз до линии плечи — таз — колени.','Сожми ягодицы, опусти таз медленно.'],['Переразгибать поясницу.','Толкаться носками вместо всей стопы.']),
 ex('hip-thrust','Ягодичный мост с гантелью','bridge',['glutes','hamstrings'],['core'],['dumbbells','mat'],'bridge',['Ляг на спину, размести защищённую мягкой подкладкой гантель на тазу и придерживай её.','Подними таз до прямой линии корпуса.','Не прогибай поясницу; опускайся с контролем.'],['Не придерживать гантель.','Поднимать таз за счёт поясницы.'],['back']),
 ex('rdl','Румынская тяга с гантелями','hinge',['hamstrings','glutes'],['back','core'],['dumbbells'],'hinge',['Колени слегка согнуты, гантели близко к ногам.','Отводи таз назад, сохраняя нейтральное положение спины.','Остановись при натяжении задней поверхности бедра, затем выпрямись.'],['Округлять спину или опускаться ниже контролируемой глубины.','Превращать наклон в приседание.'],['back']),
 ex('hinge','Наклон с отведением таза','hinge',['hamstrings','glutes'],['core'],[],'hinge',['Слегка согни колени, положи руки на таз.','Отводи таз назад, сохраняя длинную прямую линию спины.','Вернись в стойку, напрягая ягодицы.'],['Округлять поясницу.','Резко запрокидывать корпус назад.'],['back']),
 ex('wall-pushup','Отжимание от стены','push',['chest','triceps'],['shoulders','core'],[],'wallpush',['Ладони на стене немного шире плеч.','Сохраняй прямую линию корпуса и сгибай локти примерно под 30–45° к туловищу.','Подойди грудью к стене и оттолкнись с выдохом.'],['Разводить локти строго в стороны.','Проваливаться в пояснице.'],['wrists','shoulders']),
 ex('incline-pushup','Отжимание от высокой опоры','push',['chest','triceps'],['shoulders','core'],['chair'],'pushup',['Используй неподвижную опору, которая не опрокинется.','Держи корпус единым блоком, опускай грудь к опоре.','Локти направлены назад и в стороны под 30–45°.'],['Использовать скользкую или неустойчивую мебель.','Провисать в пояснице.'],['wrists','shoulders']),
 ex('pushup','Отжимание от пола','push',['chest','triceps'],['shoulders','core'],[],'pushup',['Ладони немного шире плеч; напряги пресс и ягодицы.','Опускай корпус как единый блок, локти под 30–45°.','Оттолкнись от пола без прогиба в пояснице.'],['Проваливать таз.','Поднимать плечи к ушам и разводить локти на 90°.'],['wrists','shoulders']),
 ex('db-floor-press','Жим гантелей лёжа на полу','push',['chest','triceps'],['shoulders'],['dumbbells','mat'],'bench',['Ляг на пол, стопы устойчивы, гантели над грудью.','Опускай руки до мягкого касания плечами пола, локти под 30–45°.','Выжимай вверх с выдохом, не сталкивая гантели.'],['Бросать руки на пол.','Резко выпрямлять локти или прогибаться.'],['shoulders']),
 ex('db-bench','Жим гантелей на скамье','push',['chest','triceps'],['shoulders'],['dumbbells','bench'],'bench',['Лопатки собраны, стопы на полу, скамья устойчива.','Опускай гантели по сторонам груди, локти под 30–45°.','Выжимай с контролем, сохраняя положение плеч.'],['Отрывать таз и раскачивать гантели.','Уходить в болезненную глубину.'],['shoulders']),
 ex('band-row','Тяга резинки к поясу','pull',['back'],['biceps'],['bands'],'row',['Закрепи резинку на надёжной опоре на уровне живота.','Тяни локти назад к корпусу, не поднимая плечи.','Верни руки вперёд медленно, сохраняя корпус неподвижным.'],['Использовать ненадёжное крепление.','Откидывать корпус назад.']),
 ex('db-row','Тяга гантели с опорой','pull',['back'],['biceps'],['dumbbells','chair'],'row',['Упрись свободной рукой в устойчивую опору.','Спина нейтральна, тяни гантель к тазу, ведя локоть назад.','Опускай вес с контролем; повтори на другую сторону.'],['Разворачивать корпус.','Дёргать вес и тянуть плечо к уху.'],['back','wrists']),
 ex('cable-row','Горизонтальная тяга блока','pull',['back'],['biceps'],['cable'],'row',['Сядь устойчиво, спина нейтральна.','Тяни рукоять к нижним рёбрам, направляя локти назад.','Возвращай рукоять плавно, без движения поясницей.'],['Раскачиваться всем корпусом.','Поднимать плечи к ушам.']),
 ex('prone-w','Сведение лопаток лёжа — W','pull',['back'],['shoulders'],['mat'],'prone',['Ляг на живот, лоб на сложенном полотенце, руки буквой W.','Слегка подними руки и сведи лопатки без прогиба в пояснице.','Задержись на секунду и медленно опусти руки.'],['Сильно запрокидывать голову.','Поднимать грудь за счёт поясницы.'],['shoulders']),
 ex('standing-w','Сведение лопаток стоя','pull',['back'],['shoulders'],[],'prone',['Встань ровно, согни руки буквой W.','Плавно сведи лопатки, не поднимая плечи и не прогибаясь.','Удержи секунду и расслабься. Это лёгкое упражнение для контроля лопаток, а не замена тяге с сопротивлением.'],['Поднимать плечи к ушам.','Прогибать поясницу.'],['shoulders']),
 ex('pulldown','Тяга верхнего блока','verticalPull',['back'],['biceps'],['cable'],'pulldown',['Сядь, закрепи бёдра, возьми рукоять комфортным хватом.','Тяни к верхней части груди, ведя локти вниз.','Верни вес без рывка; не тяни за голову.'],['Тянуть рукоять за шею.','Раскачиваться и резко отпускать вес.'],['shoulders']),
 ex('pullup','Подтягивание с контролем','verticalPull',['back'],['biceps','core'],['pullup'],'pulldown',['Используй надёжный турник; при необходимости снизь нагрузку подходящей резинкой.','Начни движение лопатками, затем веди локти вниз.','Поднимись без маха и опустись с контролем.'],['Раскачиваться и тянуться шеей.','Падать в нижнюю точку.'],['shoulders','wrists']),
 ex('db-press','Жим гантелей вверх','shoulder',['shoulders'],['triceps','core'],['dumbbells'],'overhead',['Гантели у плеч, рёбра над тазом, живот напряжён.','Выжимай вверх по комфортной траектории без прогиба.','Опускай медленно к плечам.'],['Прогибать поясницу.','Продолжать движение при боли в плече.'],['shoulders','back']),
 ex('lateral-raise','Подъём гантелей в стороны','shoulder',['shoulders'],[],['dumbbells'],'lateral',['Возьми лёгкий вес, локти слегка согнуты.','Поднимай руки в стороны немного впереди корпуса до уровня плеч.','Опускай медленно, не раскачиваясь.'],['Поднимать плечи к ушам.','Махать слишком тяжёлыми гантелями.'],['shoulders']),
 ex('wall-slide','Скольжение рук у стены','shoulder',['shoulders'],['back'],[],'overhead',['Встань спиной к стене, сохрани нейтральное положение поясницы.','Скользи руками вверх в комфортном диапазоне.','Опускай медленно, не отрывая рёбра вперёд.'],['Форсировать амплитуду.','Прогибать поясницу.'],['shoulders']),
 ex('db-curl','Сгибание рук с гантелями','curl',['biceps'],[],['dumbbells'],'curl',['Локти у корпуса, запястья нейтральны.','Согни руки без движения плечами.','Опускай гантели медленно, сохраняя локти на месте.'],['Раскачиваться корпусом.','Заламывать запястья.']),
 ex('band-curl','Сгибание рук с резинкой','curl',['biceps'],[],['bands'],'curl',['Встань на целую резинку обеими стопами.','Сгибай руки, удерживая локти у корпуса.','Возвращай кисти вниз медленно, контролируя натяжение.'],['Наступать на край или повреждённую резинку.','Двигать локтями вперёд.']),
 ex('self-curl','Сгибание руки с самосопротивлением','curl',['biceps'],[],[],'curl',['Одна рука создаёт умеренное сопротивление другой.','Сгибай рабочую руку медленно, локоть держи у корпуса.','Уменьши сопротивление при дискомфорте, затем поменяй руки.'],['Максимально давить второй рукой.','Задерживать дыхание.']),
 ex('band-triceps','Разгибание рук с резинкой','triceps',['triceps'],[],['bands'],'triceps',['Закрепи целую резинку на надёжной верхней опоре.','Прижми локти к корпусу и выпрями руки вниз.','Верни кисти вверх с контролем, не двигая плечами.'],['Использовать слабое крепление.','Двигать локтями и раскачиваться.']),
 ex('db-triceps','Разгибание руки в наклоне','triceps',['triceps'],[],['dumbbells','chair'],'triceps',['Обопрись свободной рукой, спина нейтральна.','Рабочий локоть рядом с корпусом, выпрями предплечье назад.','Опусти вес с контролем, плечо остаётся неподвижным.'],['Размахивать весом.','Сгибать поясницу.'],['back','wrists']),
 ex('close-wall','Отжимание от стены узким хватом','triceps',['triceps'],['chest'],[],'wallpush',['Ладони на стене на ширине плеч.','Сгибай локти ближе к туловищу и приближай грудь к стене.','Оттолкнись, сохраняя корпус прямым.'],['Заламывать кисти.','Разводить локти в стороны.'],['wrists','shoulders']),
 ex('deadbug','Мёртвый жук','core',['core'],[],['mat'],'deadbug',['Ляг на спину, руки вверх, колени согнуты на 90°.','С выдохом опускай противоположные руку и ногу, сохраняя поясницу стабильной.','Вернись и поменяй сторону; уменьшай амплитуду, если теряешь контроль.'],['Отрывать поясницу от пола.','Быстро махать руками и ногами.']),
 ex('bird-dog','Птица-собака','core',['core'],['glutes','back'],['mat'],'birddog',['Встань на четвереньки, кисти под плечами, колени под тазом.','Вытяни противоположные руку и ногу до линии корпуса.','Удержи таз ровно и вернись, затем поменяй сторону.'],['Разворачивать таз.','Задирать ногу и прогибать поясницу.'],['wrists','knees']),
 ex('plank','Планка на предплечьях','core',['core'],['shoulders'],['mat'],'plank',['Локти под плечами, голова продолжает линию спины.','Напряги живот и ягодицы, удерживай корпус прямым.','Дыши спокойно; останови подход до потери положения.'],['Провисать в пояснице.','Задерживать дыхание.'],['shoulders']),
 ex('calf','Подъём на носки','calf',['calves'],[],[],'calf',['Стой устойчиво, при необходимости держись за надёжную опору.','Плавно поднимись на носки обеих ног.','Опускай пятки медленно, сохраняя равновесие.'],['Пружинить и заваливать стопы.','Поднимать вес за счёт рывка.']),
 ex('db-calf','Подъём на носки с гантелями','calf',['calves'],[],['dumbbells'],'calf',['Держи гантели по бокам, стопы параллельны.','Плавно поднимись на носки.','Опускайся медленно; выбирай вес, при котором устойчив.'],['Раскачиваться.','Заваливать стопы внутрь.']),
 ex('march','Ходьба на месте','cardio',['quads','calves'],[],[],'march',['Держи корпус вертикально, плечи расслаблены.','Чередуй шаги и естественные движения рук.','Выбирай темп, при котором можешь говорить фразами.'],['Форсировать темп при плохом самочувствии.','Поднимать колени выше комфортной высоты.'])
];
export function localDate(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
export function mondayDate(offset=0){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(d.getDay()+6)%7+offset*7);return localDate(d)}
export function addDays(date,n){const d=new Date(date+'T12:00:00');d.setDate(d.getDate()+n);return localDate(d)}
export function availableEquipment(p,mode=p.trainingMode||'gym'){const allowed=mode==='body'?['mat','chair','pullup']:mode==='home'?['dumbbells','bench','bands','pullup','chair','mat']:Object.keys(equipmentNames);return (p.equipmentByMode?.[mode]||defaultEquipment[mode]||[]).filter(e=>allowed.includes(e))}
export function allowedExercises(p,mode=p.trainingMode||'gym'){
 const eq=availableEquipment(p,mode),limitations=p.limitations||[];
 return exercises.filter(e=>e.equipment.every(item=>eq.includes(item)||(item==='chair'&&eq.includes('bench')))&&!e.restrictions.some(r=>limitations.includes(r)));
}
export function programmeWeek(p,start){if(!p.programStart)return 1;return Math.max(1,Math.floor((new Date(start+'T12:00:00')-new Date(p.programStart+'T12:00:00'))/604800000)+1)}
const groupPatterns={full:['squat','push','pull','hinge','core','shoulder','calf'],upper:['push','pull','shoulder','verticalPull','curl','triceps'],lower:['squat','hinge','core','calf','bridge'],push:['push','shoulder','triceps','core'],pull:['pull','verticalPull','curl','core'],legs:['squat','hinge','core','calf','bridge']};
const splitNames={full:'Всё тело',upper:'Верх тела',lower:'Низ тела',push:'Жим · грудь и плечи',pull:'Тяга · спина и бицепс',legs:'Ноги и ягодицы'};
function chooseExercise(p,pattern,options,phase){
 let pool=options.filter(e=>e.pattern===pattern);if(pattern==='pull'&&p.trainingMode==='body'&&p.level!=='beginner'){const pullup=options.find(e=>e.id==='pullup');if(pullup)return pullup;}if(!pool.length)return null;
 if(pattern==='push'&&!availableEquipment(p).includes('dumbbells')){const id=p.pushupAbility==='high'?'pushup':p.pushupAbility==='medium'?'incline-pushup':'wall-pushup';const match=pool.find(e=>e.id===id);if(match)return match}
 if(pattern==='squat'&&p.level==='beginner'){return pool.find(e=>e.id==='goblet-squat')||pool.find(e=>e.id==='chair-squat')||pool[0]}
 if(pattern==='verticalPull'&&p.level==='beginner')pool=pool.filter(e=>e.id!=='pullup');
 if(!pool.length)return null;
 const weighted=pool.filter(e=>e.equipment.some(x=>['dumbbells','barbell','cable','bands'].includes(x)));
 if(weighted.length)pool=weighted;
 return pool[phase%pool.length];
}
export function progression(exercise,p,history,date){
 const sessions=history.filter(s=>s.date<=date).sort((a,b)=>b.date.localeCompare(a.date)||b.finishedAt-a.finishedAt);
 const last=sessions.map(s=>({session:s,row:s.exercises?.find(e=>e.id===exercise.id)})).find(x=>x.row?.sets?.some(set=>set.done));
 const isTimed=exercise.id==='plank';const range=isTimed?[20,40]:p.trainingGoal==='strength'&&p.level!=='beginner'&&['squat','push','pull','hinge','lunge','verticalPull'].includes(exercise.pattern)?[5,8]:p.trainingGoal==='endurance'?[12,18]:[8,12];
 if(!last)return {min:range[0],max:range[1],unit:isTimed?'сек':'повт.',weight:null,action:'start',note:isTimed?'Держи позицию только пока сохраняешь технику.':'Выбери сопротивление, с которым остаётся 2–3 повтора в запасе.',source:null};
 const sets=last.row.sets.filter(s=>s.done),minReps=Math.min(...sets.map(s=>Number(s.reps))),weight=Math.min(...sets.map(s=>Number(s.weight)||0));
 const full=sets.length>=last.row.plannedSets;
 const previousMax=Number(last.row.plannedMax)||range[1];const step=Number(p.weightIncrement)||1;const ready=full&&minReps>=previousMax&&sets.every(s=>Number(s.rir)>=2)&&last.session.feedback!=='hard'&&!last.session.pain;
 const hard=last.session.feedback==='hard'||sets.some(s=>Number(s.rir)<1)||last.session.pain;
 const external=exercise.equipment.some(x=>['dumbbells','barbell','cable'].includes(x))&&weight>0;
 if(hard)return {min:range[0],max:range[1],unit:isTimed?'сек':'повт.',weight:external?Math.max(0,Math.floor(weight*.95/step)*step):weight,action:'recover',note:'Прошлая нагрузка была тяжёлой. Уменьши сопротивление или повторы, сохрани 3 повтора в запасе.',source:last.session.date};
 if(ready&&external)return {min:range[0],max:range[1],unit:'повт.',weight:Math.min(400,weight+Math.max(step,Math.round(weight*.025/step)*step)),action:'increase',note:'Все подходы достигли верхней границы с запасом. Попробуй минимальное доступное увеличение веса и вернись к нижней границе повторов.',source:last.session.date};
 if(ready&&!isTimed&&minReps>=20)return {min:16,max:20,unit:'повт.',weight,action:'variation',note:'Достигнуты 20 повторов с запасом. Дальше повышай сложность или натяжение, а не количество повторов; сохрани технику.',source:last.session.date};
 if(ready&&!isTimed)return {min:Math.min(20,minReps+1),max:Math.min(20,minReps+2),unit:'повт.',weight,action:'reps',note:'Добавь 1 повтор в каждом подходе. Для резинок и собственного веса сопротивление меняется вручную только при уверенной технике.',source:last.session.date};
 if(ready&&isTimed)return {min:Math.min(60,minReps+5),max:Math.min(60,minReps+10),unit:'сек',weight:0,action:'reps',note:'Добавь 5 секунд, сохраняя положение корпуса и спокойное дыхание.',source:last.session.date};
 return {min:Math.min(range[0],previousMax),max:previousMax,unit:isTimed?'сек':'повт.',weight,action:'hold',note:'Сохрани нагрузку. Постепенно добавляй повторы внутри диапазона, оставляя 2–3 в запасе.',source:last.session.date};
}
export function createWorkoutPlan(raw,history=[],start=mondayDate()){
 const p={...workoutDefaults,...raw};const days=[...new Set((p.trainingDays||[]).map(Number))].filter(n=>n>=0&&n<7).sort((a,b)=>a-b);
 if(days.length<2||days.length>6)return {blocked:true,reason:'Выбери от 2 до 6 дней занятий в профиле.',days:[]};
 const latest=[...history].sort((a,b)=>b.date.localeCompare(a.date)||b.finishedAt-a.finishedAt)[0];
 if(p.healthStatus==='needs-clearance'||(latest?.pain&&p.healthStatus!=='cleared'))return {blocked:true,reason:'При острой боли, восстановлении после травмы или медицинских ограничениях автоматический силовой план не составляется. Сначала согласуй допустимые движения и нагрузки со специалистом.',days:[]};
 const consecutive=days.some((day,i)=>days.includes((day+1)%7));
 let split=days.length<=3&&!consecutive?'full':days.length<=4?'upperLower':days.length===5?'mixed':'ppl';
 if(p.splitPreference==='upperLower')split='upperLower';if(p.splitPreference==='ppl'&&days.length>=3)split='ppl';if(p.splitPreference==='full'&&days.length<=3&&!consecutive)split='full';
 const week=programmeWeek({...p,programStart:p.programStart||mondayDate()},start),deload=week%4===0;
 const types=split==='full'?days.map(()=> 'full'):split==='upperLower'?days.map((_,i)=>(i+(days.length%2?(week-1)%2:0))%2?'lower':'upper'):split==='mixed'?['upper','lower','push','pull','legs']:days.map((_,i)=>['push','pull','legs'][(i+(week-1)*days.length)%3]);
 const available=allowedExercises(p);const missing=new Set();
 const baseSets=p.level==='beginner'?2:p.level==='advanced'&&p.trainingGoal==='hypertrophy'?4:3;
 const conservative=p.age>=60||Number(p.activity)<=1.2;
 let sets=Math.max(1,baseSets-(deload?1:0)-(conservative?1:0));
 const rest=p.trainingGoal==='strength'?120:p.level==='beginner'||p.trainingGoal==='hypertrophy'?90:p.trainingGoal==='endurance'?60:75;
 const timeBudget=Math.max(13,Number(p.sessionMinutes)-7);while(sets>1&&3*(sets*.7+(sets-1)*rest/60+1)>timeBudget)sets--;const preferredCount=Number(p.sessionMinutes)<=20?3:Number(p.sessionMinutes)<=30?4:Number(p.sessionMinutes)<=45?5:6;const maxCount=Math.min(preferredCount,Math.floor(timeBudget/(sets*.7+(sets-1)*rest/60+1)));
 const priorityPattern={chest:'push',back:'pull',shoulders:'shoulder',legs:'squat',glutes:'bridge',core:'core'}[p.priority];
 const workouts=days.map((day,i)=>{
  const type=types[i];let patterns=[...groupPatterns[type]];
  // Keep paired large muscle groups first; rotate accessories on full-body days.
  if(type==='full'){const base=i%2?['hinge','push','pull']:['squat','push','pull'];const extras=i%3===0?['core','shoulder','calf']:i%3===1?['bridge','core','curl']:['lunge','core','triceps'];patterns=[...base,...extras]}
  if(priorityPattern&&patterns.includes(priorityPattern)){patterns=patterns.filter(x=>x!==priorityPattern);patterns.unshift(priorityPattern)}
  const date=addDays(start,day),chosen=[];
  for(const pattern of patterns){const exercise=chooseExercise(p,pattern,available,i);if(!exercise){missing.add(pattern);continue}if(chosen.length>=maxCount)break;let target=progression(exercise,p,history,date);if(deload&&target.source)target={...target,weight:target.weight>0?Math.max(0,Math.floor(target.weight*.9/(Number(p.weightIncrement)||1))*(Number(p.weightIncrement)||1)):0,action:'deload',note:'Восстановительная неделя: снизь нагрузку и оставь 4 повтора в запасе. Без повышения веса.'};if(['db-row','db-triceps','self-curl','reverse-lunge','db-lunge','deadbug','bird-dog'].includes(exercise.id))target={...target,unit:'повт./стор.'};chosen.push({...exercise,sets:exercise.pattern==='core'?Math.min(sets,3):sets,target,rest,rir:deload?4:target.action==='recover'||p.level==='beginner'?3:2})}
  const groups=[...new Set(chosen.flatMap(e=>e.muscles))];
  const secondary=[...new Set(chosen.flatMap(e=>e.secondary))].filter(g=>!groups.includes(g));
  const workMinutes=chosen.reduce((sum,e)=>sum+e.sets*(e.id==='plank'?.5:.7)+(e.sets-1)*rest/60,0)+chosen.length;
  return {day,date,type,title:splitNames[type],groups,secondary,exercises:chosen,minutes:Math.ceil(workMinutes+7),warmup:5,cooldown:2};
 });
 const explanations=[`Опыт: ${p.level==='beginner'?'начальный':p.level==='advanced'?'продвинутый':'средний'}; ${days.length} занятий, до ${p.sessionMinutes} мин.`,split==='full'?'Силовая на всё тело с днём восстановления между занятиями.':split==='upperLower'?'Верх и низ чередуются, чтобы соседние дни не повторяли основные группы.':'Разделение нагрузки на жим, тягу и ноги с отдельными днями восстановления.',conservative?'Начальный объём снижен с учётом возраста или низкой повседневной активности.':'Объём и отдых выбраны по опыту и тренировочной цели.',deload?'Четвёртая неделя: уменьшенное число подходов и больший запас повторов.':'Прогрессия рассчитывается по фактически записанным подходам, а не автоматически по календарю.'];
 if(p.splitPreference==='full'&&split!=='full')explanations.push('Для выбранных соседних дней или высокой частоты вместо всего тела используется разделение групп, чтобы дать им восстановиться.');
 if(p.splitPreference==='ppl'&&days.length<3)explanations.push('Для жима/тяги/ног нужно минимум 3 дня; при двух днях используется более полный вариант.');
 if(p.priority!=='balanced')explanations.push('Приоритетная группа ставится раньше в подходящие дни; остальные основные группы сохраняются.');
 if(missing.size)explanations.push('Некоторые движения исключены из-за оборудования или выбранных ограничений; проверь состав плана.');
 if(p.trainingGoal==='endurance')explanations.push('В дни отдыха добавь комфортную ходьбу 15–30 минут; силовые выполняй без отказа.');
 if(!availableEquipment(p).some(eq=>['dumbbells','cable','bands','pullup'].includes(eq)))explanations.push('Без турника, резинки или веса упражнения для спины развивают контроль лопаток, но не заменяют полноценные тяги с сопротивлением.');
 if(p.goal==='lose')explanations.push('Для снижения веса сохраняем силовую нагрузку и рекомендуем ходьбу в дни отдыха; дефицит калорий задаётся в питании.');
 const schedule=Array.from({length:7},(_,day)=>workouts.find(w=>w.day===day)||{day,date:addDays(start,day),rest:true,title:'Восстановление',groups:[],exercises:[]});
 return {blocked:false,days:schedule,workouts,split,week,deload,explanations,sets,rest,missing:[...missing]};
}
export function validateWorkout(record){
 if(!record.exercises?.length)throw new Error('Добавь выполненные подходы.');
 let count=0;
 for(const exercise of record.exercises)for(const set of exercise.sets||[]){if(!set.done)continue;count++;if(!Number.isFinite(Number(set.reps))||Number(set.reps)<1||Number(set.reps)>300)throw new Error('Укажи число повторов или секунд от 1 до 300.');if(!Number.isFinite(Number(set.weight))||Number(set.weight)<0||Number(set.weight)>400)throw new Error('Вес должен быть от 0 до 400 кг.');if(!Number.isFinite(Number(set.rir))||Number(set.rir)<0||Number(set.rir)>5)throw new Error('Запас повторов должен быть от 0 до 5.');}
 if(!count)throw new Error('Отметь хотя бы один выполненный подход.');
 return count;
}
export function progressSummary(history,start=mondayDate()){
 const end=addDays(start,7),week=history.filter(s=>s.date>=start&&s.date<end);
 const volume={},allSets=history.reduce((sum,s)=>sum+s.exercises.reduce((n,e)=>n+e.sets.filter(x=>x.done).length,0),0);
 for(const s of week)for(const row of s.exercises){const exercise=exercises.find(e=>e.id===row.id);if(!exercise)continue;const count=row.sets.filter(x=>x.done).length;for(const group of exercise.muscles)volume[group]=(volume[group]||0)+count}
 return {sessions:history.length,weekly:week.length,sets:allSets,volume,week};
}
