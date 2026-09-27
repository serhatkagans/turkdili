import {authorized,database,illustrated} from '../../../../lib/server';
import {toCsv} from '../../../../lib/csv';
import {ownArt,type Word} from '../../../../lib/words';
export const dynamic='force-dynamic';
const statusName:Record<string,string>={approved:'onaylı',pending:'onay bekliyor',rejected:'reddedildi'};
// Bütün kelimeler Excel'de açılabilen CSV olarak (";" ayraçlı, BOM'lu UTF-8). Aynı sütunlar içe aktarmada da kullanılabilir.
export function GET(request:Request){if(!authorized(request))return Response.json({error:'Görevli anahtarı geçersiz.'},{status:401});const db=database(),ill=illustrated();
const rows=db.prepare('SELECT w.*,k.title workTitle,k.month FROM words w LEFT JOIN works k ON k.id = w.work ORDER BY k.rowid,w.createdAt,w.rowid').all() as (Word&{workTitle:string|null;month:string|null;active:number;status:string})[];
const csv=toCsv([['Kelime','Eser','Ay','Eserdeki anlamı','Günümüzdeki anlamı','Örnek cümle','Ekleyen','Durum','Görünür','Görsel','Kimlik'],...rows.map(w=>[w.word,w.workTitle??w.work,w.month,w.oldMeaning,w.meaning,w.example,w.addedBy,statusName[w.status]??w.status,w.active?'evet':'hayır',ownArt(w,ill)?'var':'yok',w.id])]);
return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':`attachment; filename="sozluk-${new Date().toLocaleDateString('sv')}.csv"`,'Cache-Control':'no-store'}});}
