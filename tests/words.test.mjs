import test from 'node:test';
import assert from 'node:assert/strict';
import {months,seedWords,seedWorks,slug,usesWord} from '../lib/words.ts';
test('Kelime kullanımı Türkçe ses olaylarını tanır',()=>{
 assert.ok(usesWord('Şafağı izledik.','Şafak'));
 assert.ok(usesWord('İnce bir hilal gördük.','Hilâl'));
 assert.ok(usesWord('Gönlümüzü iyilikle doldurduk.','Gönül'));
 assert.ok(usesWord('Aklıma harika bir fikir geldi.','Akıl'));
 assert.ok(usesWord('KOPUZU çaldı.','kopuz'));
 assert.ok(!usesWord('Bu cümlede kelime yok.','Semaver'));
});
test('Başlangıç kelimeleri tutarlı',()=>{
 const ids=new Set();for(const w of seedWords){assert.ok(!ids.has(w.id),`yinelenen kimlik ${w.id}`);ids.add(w.id);assert.ok(seedWorks.some(k=>k.id===w.work),`${w.id} için eser yok`);assert.ok(usesWord(w.example,w.word),`${w.id} örnek cümlesi kelimeyi içermiyor`);assert.ok(w.oldMeaning&&w.meaning,`${w.id} anlamı eksik`);}
 for(const k of seedWorks)assert.ok(months.includes(k.month),`${k.id} ayı geçersiz`);
 for(const m of months)assert.ok(seedWorks.some(k=>k.month===m),`${m} ayına eser yok`);
 assert.ok(seedWorks.some(k=>k.kind==='atasozu')&&seedWorks.some(k=>k.kind==='yabanci'));
 assert.ok(seedWords.filter(w=>w.work==='istiklal-marsi').length>=3,'İstiklâl Marşı afişi için en az üç kelime');
 assert.equal(slug('Çalıkuşu'),'calikusu');assert.equal(slug('yalŋuk'),'yalnuk');assert.equal(slug('muñ'),'mun');assert.equal(slug('Vatan Yahut Silistre'),'vatan-yahut-silistre');
});
test('Kelime sözcük başında aranır, deyimlerde fiil çekimi kabul edilir',()=>{
 assert.ok(!usesWord('Şafak vakti dalgalanan al sancak.','âfâk'),'şafak içindeki afak sayılmaz');
 assert.ok(usesWord('Bütün âfâk kızıla boyandı.','âfâk'));assert.ok(!usesWord('Bugün hava sıcak.','öd'));assert.ok(usesWord('Öd çok hızlı geçti.','öd'));
 assert.ok(usesWord('“Selfie” yerine özçekim diyelim.','selfie'));assert.ok(usesWord('Hep birlikte e-postayla gönderdik ama önce e-mail dedik.','e-mail'));
 assert.ok(usesWord('Karnesini görünce ağzı kulaklarına vardı.','ağzı kulaklarına varmak'));assert.ok(!usesWord('Ağzı açık kaldı.','ağzı kulaklarına varmak'));
 assert.ok(usesWord('Dedem doğu serhaddinde görev yaptı.','serhat'));assert.ok(usesWord('Tarihî mabedin kubbesi parlıyordu.','mabet'));
});
