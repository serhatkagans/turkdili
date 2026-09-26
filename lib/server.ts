import Database from 'better-sqlite3';
import {mkdirSync,readdirSync,statSync,unlinkSync} from 'node:fs';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {art,seedWords,seedWorks,wordArt,type Word,type Work} from './words';
// Veriler DATA_DIR altında tutulur: kelimeden-hayale.db (kartlar, kelimeler, eserler), art/ (kart resimleri) ve art/kelimeler/ (kelime resimleri).
const dataDir=path.resolve(/*turbopackIgnore: true*/ process.env.DATA_DIR||'data');
export const artDir=path.join(dataDir,'art');
export const wordArtDir=path.join(artDir,'kelimeler');
export const runtime={get IMAGE_SERVICE_URL(){return process.env.IMAGE_SERVICE_URL;},get IMAGE_SERVICE_TOKEN(){return process.env.IMAGE_SERVICE_TOKEN;},get ADMIN_TOKEN(){return process.env.ADMIN_TOKEN;}};
let db:Database.Database|undefined;
export function database(){if(!db){mkdirSync(wordArtDir,{recursive:true});db=new Database(path.join(dataDir,'kelimeden-hayale.db'));db.pragma('journal_mode = WAL');db.exec(`CREATE TABLE IF NOT EXISTS cards (id TEXT PRIMARY KEY, wordId TEXT NOT NULL, sentence TEXT NOT NULL, nickname TEXT NOT NULL, scene TEXT NOT NULL, style TEXT NOT NULL, image TEXT NOT NULL, mode TEXT NOT NULL, createdAt INTEGER NOT NULL, approved INTEGER NOT NULL DEFAULT 0); CREATE INDEX IF NOT EXISTS cards_gallery ON cards(approved,createdAt);
CREATE TABLE IF NOT EXISTS works (id TEXT PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, period TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS words (id TEXT PRIMARY KEY, word TEXT NOT NULL, syllables TEXT NOT NULL DEFAULT '', meaning TEXT NOT NULL, category TEXT NOT NULL, color TEXT NOT NULL, emoji TEXT NOT NULL, example TEXT NOT NULL, scene TEXT NOT NULL DEFAULT '', image TEXT NOT NULL, work TEXT NOT NULL, quote TEXT, note TEXT, active INTEGER NOT NULL DEFAULT 1, createdAt INTEGER NOT NULL DEFAULT 0);`);seed(db);}return db;}
// Tablolar boşsa başlangıç kelime havuzunu bir kez yükler.
function seed(d:Database.Database){const count=(t:string)=>(d.prepare(`SELECT COUNT(*) n FROM ${t}`).get() as {n:number}).n;d.transaction(()=>{if(!count('works'))for(const w of seedWorks)d.prepare('INSERT INTO works (id,title,author,period) VALUES (?,?,?,?)').run(w.id,w.title,w.author,w.period);if(!count('words'))seedWords.forEach((w,i)=>insertWord(w,i,d));})();}
export function insertWord(w:Word,order=Date.now(),d=database()){d.prepare('INSERT INTO words (id,word,syllables,meaning,category,color,emoji,example,scene,image,work,quote,note,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(w.id,w.word,w.syllables,w.meaning,w.category,w.color,w.emoji,w.example,w.scene,w.image,w.work,w.quote??null,w.note??null,order);}
export function catalog(){const d=database();const works=d.prepare('SELECT id,title,author,period FROM works ORDER BY rowid').all() as Work[];const words=d.prepare('SELECT id,word,syllables,meaning,category,color,emoji,example,scene,image,work,quote,note FROM words WHERE active = 1 ORDER BY createdAt,rowid').all() as Word[];return {works,words};}
export function findWord(id:unknown){if(typeof id!=='string')return undefined;const d=database();const word=d.prepare('SELECT * FROM words WHERE id = ? AND active = 1').get(id) as Word|undefined;if(!word)return undefined;const work=(d.prepare('SELECT * FROM works WHERE id = ?').get(word.work) as Work|undefined)??{id:word.work,title:'',author:'',period:''};return {word,work};}
// Kelime resimleri: <id>.<png|jpg|webp>. Sürüm (değişme zamanı) önbellek kırmak için adrese eklenir.
const exts:Record<string,string>={png:'image/png',jpg:'image/jpeg',webp:'image/webp'};
export function illustrated(){database();const out:Record<string,number>={};for(const f of readdirSync(wordArtDir)){const [id,ext]=f.split('.');if(ext in exts)out[id]=Math.round(statSync(path.join(wordArtDir,f)).mtimeMs);}return out;}
export function wordImage(w:Word){const v=illustrated()[w.id];return v?wordArt(w.id,v):art(w.image);}
export function wordArtFile(id:string){if(!/^[a-z0-9-]{1,40}$/.test(id))return undefined;database();const f=readdirSync(wordArtDir).find(f=>f.split('.')[0]===id&&f.split('.')[1] in exts);return f?{file:path.join(wordArtDir,f),type:exts[f.split('.')[1]]}:undefined;}
export async function saveWordArt(id:string,bytes:Buffer){const ext=imageType(bytes);if(!ext)throw Error('Desteklenmeyen resim biçimi. PNG, JPG veya WEBP yükleyin.');database();for(const f of readdirSync(wordArtDir))if(f.split('.')[0]===id)unlinkSync(path.join(wordArtDir,f));await writeFile(path.join(wordArtDir,`${id}.${ext}`),bytes);}
export function imageType(b:Buffer){if(b[0]===0x89&&b[1]===0x50&&b[2]===0x4e&&b[3]===0x47)return 'png';if(b[0]===0xff&&b[1]===0xd8&&b[2]===0xff)return 'jpg';if(b.subarray(0,4).toString()==='RIFF'&&b.subarray(8,12).toString()==='WEBP')return 'webp';return undefined;}
export function contentType(ext:string){return exts[ext];}
export function authorized(request:Request){return !!runtime.ADMIN_TOKEN&&request.headers.get('authorization')===`Bearer ${runtime.ADMIN_TOKEN}`;}
// nginx arkasında request.url iç adresi gösterebilir; bu yüzden Origin, istemcinin gördüğü host ile karşılaştırılır.
export function sameOrigin(request:Request){const origin=request.headers.get('origin');if(!origin)return true;const host=request.headers.get('x-forwarded-host')||request.headers.get('host');try{return new URL(origin).host===host;}catch{return false;}}
// Basit bellek içi sınırlayıcı. Etkinlikte öğrenciler aynı ağdan (aynı IP) geldiği için sınırlar geniş tutulur.
const hits=new Map<string,number[]>();
export function limited(request:Request,name:string,max:number,windowMs:number){const ip=(request.headers.get('x-forwarded-for')||'').split(',')[0].trim()||'yerel';const key=`${name}:${ip}`,now=Date.now();const list=(hits.get(key)||[]).filter(t=>now-t<windowMs);list.push(now);hits.set(key,list);return list.length>max;}
