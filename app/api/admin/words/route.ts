import {authorized,database,findWord,illustrated,insertWord,sameOrigin,saveWordArt} from '../../../../lib/server';
import {generateImage,imageBudget,imageEnabled,wordPrompt} from '../../../../lib/ai';
import {categories,colors,fallbackArt,slug,usesWord,type Word} from '../../../../lib/words';
export const dynamic='force-dynamic';
const fail=(error:string,status=400)=>Response.json({error},{status});
const text=(v:unknown,min:number,max:number)=>typeof v==='string'&&v.trim().length>=min&&v.trim().length<=max?v.trim():undefined;
function uniqueId(table:'words'|'works',base:string){const db=database();let id=base||'kelime',n=2;while(db.prepare(`SELECT 1 FROM ${table} WHERE id = ?`).get(id))id=`${base}-${n++}`;return id;}
// Görevli için bütün kelimeler (gizlenenler dahil), eserler ve resim durumu.
export async function GET(request:Request){if(!authorized(request))return fail('Görevli anahtarı geçersiz.',401);const db=database();return Response.json({words:db.prepare('SELECT * FROM words ORDER BY createdAt,rowid').all(),works:db.prepare('SELECT * FROM works ORDER BY rowid').all(),illustrated:illustrated(),ai:imageEnabled()});}
export async function POST(request:Request){if(!authorized(request)||!sameOrigin(request))return fail('Yetkisiz.',403);const db=database();try{const p=await request.json();
if(p.action==='toggle'){if(typeof p.id!=='string')return fail('Geçersiz kelime.');db.prepare('UPDATE words SET active = ? WHERE id = ?').run(p.active?1:0,p.id);return Response.json({ok:true});}
if(p.action==='generate'){const found=findWord(p.id);if(!found)return fail('Kelime bulunamadı ya da gizli.');if(!imageEnabled())return fail('Yapay zekâ bağlantısı tanımlı değil.',503);if(!imageBudget())return fail('Bugünkü görsel üretim sınırı doldu.',429);await saveWordArt(found.word.id,await generateImage(wordPrompt(found.word,found.work)));return Response.json({ok:true});}
if(p.action!=='create')return fail('Bilinmeyen işlem.');const w=p.word??{};
const word=text(w.word,1,40),meaning=text(w.meaning,3,300),example=text(w.example,10,240),category=categories.includes(w.category)?w.category:undefined;
if(!word||!meaning||!example||!category)return fail('Kelime, anlam, kategori ve örnek cümle zorunludur.');if(!usesWord(example,word))return fail('Örnek cümle kelimeyi içermeli.');
let work=typeof w.work==='string'&&db.prepare('SELECT 1 FROM works WHERE id = ?').get(w.work)?w.work as string:undefined;
if(!work){const title=text(p.newWork?.title,2,80),author=text(p.newWork?.author,2,80);if(!title||!author)return fail('Bir eser seçin ya da yeni eserin adını ve yazarını yazın.');work=uniqueId('works',slug(title));db.prepare('INSERT INTO works (id,title,author,period) VALUES (?,?,?,?)').run(work,title,author,text(p.newWork?.period,0,40)??'');}
const n=(db.prepare('SELECT COUNT(*) n FROM words').get() as {n:number}).n;
const entry:Word={id:uniqueId('words',slug(word)),word,syllables:text(w.syllables,0,60)??'',meaning,category,color:colors[n%colors.length],emoji:text(w.emoji,1,4)??'✦',example,scene:text(w.scene,0,400)??'',image:fallbackArt[n%fallbackArt.length],work,quote:text(w.quote,1,300)??null,note:text(w.note,1,400)??null};
insertWord(entry);return Response.json({word:entry},{status:201});
}catch(e){console.error('Kelime işlemi başarısız',e);return fail('İşlem tamamlanamadı. Yapay zekâ kullanıldıysa biraz sonra tekrar deneyin.',503);}}
// Kelime resmi yükleme: gövde doğrudan resim dosyasıdır (PNG, JPG veya WEBP; en fazla 8 MB).
export async function PUT(request:Request){if(!authorized(request)||!sameOrigin(request))return fail('Yetkisiz.',403);const id=new URL(request.url).searchParams.get('id');if(!id||!database().prepare('SELECT 1 FROM words WHERE id = ?').get(id))return fail('Kelime bulunamadı.');if(Number(request.headers.get('content-length')||0)>8_000_000)return fail('Resim 8 MB’tan büyük olamaz.',413);const bytes=Buffer.from(await request.arrayBuffer());if(bytes.length>8_000_000)return fail('Resim 8 MB’tan büyük olamaz.',413);try{await saveWordArt(id,bytes);return Response.json({ok:true});}catch(e){return fail(e instanceof Error?e.message:'Resim kaydedilemedi.');}}
