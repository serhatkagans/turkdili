import test from 'node:test';
import assert from 'node:assert/strict';
import {seedWords,seedWorks,slug,usesWord} from '../lib/words.ts';
test('Kelime kullanımı Türkçe ses olaylarını tanır',()=>{
 assert.ok(usesWord('Şafağı izledik.','Şafak'));
 assert.ok(usesWord('İnce bir hilal gördük.','Hilâl'));
 assert.ok(usesWord('Gönlümüzü iyilikle doldurduk.','Gönül'));
 assert.ok(usesWord('Aklıma harika bir fikir geldi.','Akıl'));
 assert.ok(usesWord('KOPUZU çaldı.','kopuz'));
 assert.ok(!usesWord('Bu cümlede kelime yok.','Semaver'));
});
test('Başlangıç kelimeleri tutarlı',()=>{
 const ids=new Set();for(const w of seedWords){assert.ok(!ids.has(w.id),`yinelenen kimlik ${w.id}`);ids.add(w.id);assert.ok(seedWorks.some(k=>k.id===w.work),`${w.id} için eser yok`);assert.ok(usesWord(w.example,w.word),`${w.id} örnek cümlesi kelimeyi içermiyor`);}
 assert.equal(slug('Çalıkuşu'),'calikusu');assert.equal(slug('Vatan Yahut Silistre'),'vatan-yahut-silistre');
});
