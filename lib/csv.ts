// Excel uyumlu CSV: Türkçe Excel ";" ayraçlı ve BOM'lu UTF-8 bekler. İçe aktarmada ayraç (sekme, ";" ya da ",") ilk satırdan anlaşılır;
// Excel'den kopyalanıp yapıştırılan tablo sekmeyle ayrılmış gelir. Bağımlılığı yoktur (testler doğrudan içe aktarır).
export function parseCsv(text:string):string[][]{text=text.replace(/^﻿/,'');const first=text.split(/\r?\n/,1)[0]??'';
const sep=['\t',';',','].map(s=>[s,first.split(s).length] as const).sort((a,b)=>b[1]-a[1])[0][0];
const rows:string[][]=[];let row:string[]=[],cell='',quoted=false;
for(let i=0;i<text.length;i++){const c=text[i];
if(quoted){if(c==='"'){if(text[i+1]==='"'){cell+='"';i++;}else quoted=false;}else cell+=c;}
else if(c==='"'&&cell==='')quoted=true;else if(c===sep){row.push(cell);cell='';}
else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);rows.push(row);row=[];cell='';}else cell+=c;}
if(cell!==''||row.length){row.push(cell);rows.push(row);}
return rows.map(r=>r.map(c=>c.trim())).filter(r=>r.some(c=>c));}
export function toCsv(rows:(string|number|null|undefined)[][],sep=';'){const q=(v:string|number|null|undefined)=>{const s=String(v??'');return /[";\n\r,\t]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;};return '﻿'+rows.map(r=>r.map(q).join(sep)).join('\r\n');}
// Başlık adlarını alan adlarına eşler: "Eserdeki anlamı", "anlami_eski", "eski anlam" → oldMeaning.
const plain:Record<string,string>={ç:'c',ğ:'g',ı:'i',ö:'o',ş:'s',ü:'u',â:'a',î:'i',û:'u'};
const key=(s:string)=>s.toLocaleLowerCase('tr').replace(/[çğıöşüâîû]/g,c=>plain[c]).replace(/[^a-z]/g,'');
const aliases:Record<string,string[]>={word:['kelime','word','sozcuk'],work:['eser','work','eseradi','kaynak'],oldMeaning:['eserdekianlami','eserdekianlam','eskianlam','eskianlami','anlamieski','oldmeaning','anlam','anlami'],meaning:['gunumuzanlami','gunumuzdekianlami','gunumuzanlam','anlamigunumuz','bugunkuanlami','meaning'],example:['ornekcumle','ornek','anlamiornek','example','cumle'],addedBy:['ekleyen','ekleyenogrenci','ogrenci','sinif','addedby']};
export const importFields=Object.keys(aliases);
// İlk satır başlıksa sütunları adlarından eşler; değilse sıra: kelime, eser, eserdeki anlam, günümüz anlamı, örnek cümle, ekleyen.
export function rowsToEntries(rows:string[][]){if(!rows.length)return [];const head=rows[0].map(key);
const map=importFields.map(f=>head.findIndex(h=>aliases[f].includes(h)));const hasHeader=map.filter(i=>i>=0).length>=2;
const cols=hasHeader?map:importFields.map((_,i)=>i);return (hasHeader?rows.slice(1):rows).map(r=>Object.fromEntries(importFields.map((f,i)=>[f,cols[i]>=0?r[cols[i]]??'':'']))as Record<string,string>);}
