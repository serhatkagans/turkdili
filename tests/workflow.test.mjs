import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
test('A card is durable, retrievable and private until approved',async()=>{
 const response=await fetch(base+'/api/cards',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({wordId:'safak',sentence:'Şafağı izlerken yeni bir roket fikri buldum.',nickname:'Test Kâşifi',scene:'Yeşil bir şehir ve kuşlar',style:'Suluboya',mode:'demo'})});
 assert.equal(response.status,201);const {card}=await response.json();assert.equal(card.approved,0);
 const read=await fetch(base+'/api/cards?id='+card.id);assert.deepEqual((await read.json()).card,card);
 const gallery=await fetch(base+'/api/cards');assert.ok(!(await gallery.json()).cards.some(c=>c.id===card.id));
 const admin=await fetch(base+'/api/admin');assert.equal(admin.status,401);
});
test('Invalid input and cross-origin writes are refused',async()=>{
 const invalid=await fetch(base+'/api/cards',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({wordId:'unknown'})});assert.equal(invalid.status,400);
 const cross=await fetch(base+'/api/cards',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://untrusted.example'},body:'{}'});assert.equal(cross.status,403);
 const config=await fetch(base+'/api/config');const payload=await config.json();assert.deepEqual(Object.keys(payload).sort(),['admin','ai','teacher']);
});
