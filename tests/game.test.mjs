import test from 'node:test';
import assert from 'node:assert/strict';
import {choices,fold,inTitle,mask,pages,sameWord,shuffle} from '../lib/game.ts';
test('Serbest metin tahmini harf farklarını tolere eder',()=>{
 assert.ok(sameWord('yalnuk','yalŋuk'));assert.ok(sameWord('MUN','muñ'));assert.ok(sameWord('edgu','edgü'));assert.ok(sameWord(' Nigah ','nigâh'));assert.ok(sameWord('KÖRKLÜG','körklüg'));
 assert.ok(!sameWord('kutlu','kut'));assert.ok(!sameWord('','kut'));assert.equal(fold('Tuğyan'),'tugyan');
});
test('Maskeleme oranı uygular, en az bir harf gizler ve açık bırakır',()=>{
 const hidden=m=>m.split(' ').filter(c=>c==='_').length;
 assert.equal(hidden(mask('kut',.3)),1);assert.equal(hidden(mask('kut',.7)),2);assert.equal(hidden(mask('öd',.7)),1);
 assert.equal(hidden(mask('tahassür',.3)),2);assert.equal(hidden(mask('tahassür',.7)),6);
 assert.equal(mask('yalŋuk',.5),mask('yalŋuk',.5),'aynı kelime her seferinde aynı maskelenir');
 assert.ok(/^[A-ZÇĞİÖŞÜÂŊ_ ]+$/u.test(mask('yalŋuk',.5)));
});
test('Şıklar doğru cevabı içerir ve tekrar etmez',()=>{
 const pool=['kut','bilig','edgü','yablak','öd','hikmet'].map((w,i)=>({id:w,word:w,work:i<5?'kb':'h'}));
 for(let i=0;i<20;i++){const c=choices(pool[0],pool,4);assert.equal(c.length,4);assert.ok(c.some(x=>x.id==='kut'));assert.equal(new Set(c.map(x=>x.id)).size,4);assert.ok(!c.some(x=>x.work==='h'),'önce aynı eserden çeldirici');}
 assert.deepEqual(shuffle([1,2,3]).sort(),[1,2,3]);
});
test('Sayfalama tek maddelik son sayfa bırakmaz',()=>{
 assert.deepEqual(pages([1,2,3,4,5,6],5),[[1,2,3,4,5,6]]);assert.deepEqual(pages([1,2,3,4,5,6,7,8],5),[[1,2,3,4,5],[6,7,8]]);assert.deepEqual(pages([1],5),[[1]]);
});
test('CSV: Excel ayraçları, tırnaklar ve başlık eşleme',async()=>{
 const {parseCsv,rowsToEntries,toCsv}=await import('../lib/csv.ts');
 const semi='﻿Kelime;Eser;Eserdeki anlamı;Örnek cümle\r\nbilig;Kutadgu Bilig;"Bilgi, akıl";"Onun ""bilig"" sözü; güzel."\r\n';
 assert.deepEqual(rowsToEntries(parseCsv(semi))[0],{word:'bilig',work:'Kutadgu Bilig',oldMeaning:'Bilgi, akıl',meaning:'',example:'Onun "bilig" sözü; güzel.',addedBy:''});
 const tab='kut\tKutadgu Bilig\tBaht\t\tKut geldi.\tElif, 6-B\n';
 assert.deepEqual(rowsToEntries(parseCsv(tab))[0],{word:'kut',work:'Kutadgu Bilig',oldMeaning:'Baht',meaning:'',example:'Kut geldi.',addedBy:'Elif, 6-B'});
 const back=parseCsv(toCsv([['a;b','c"d','e\nf']]));assert.deepEqual(back,[['a;b','c"d','e\nf']]);
});
test('Eser adında geçen kelime bilmece sayılmaz',()=>{
 assert.ok(inTitle('Kaşağı','Kaşağı'));assert.ok(inTitle('istiklâl','İstiklâl Marşı'));assert.ok(inTitle('Vatan','Vatan Yahut Silistre'));assert.ok(inTitle('bilig','Kutadgu Bilig'));
 assert.ok(!inTitle('Kopuz','Dede Korkut Hikâyeleri'));assert.ok(!inTitle('Şafak','İstiklâl Marşı'));assert.ok(!inTitle('öd','Kutadgu Bilig'));
});
