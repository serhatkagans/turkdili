'use client';
import {useState} from 'react';
import {usesWord,type Word} from '../lib/words';
// Mart etkinliği (eylem planı 8.2): İstiklâl Marşı'ndan en az üç kelimenin geçtiği anlamlı bir cümle ve afiş.
// Kullanılan kelimeler cümlede kendiliğinden tanınır; afiş ekranda önizlenir, PNG olarak indirilir ya da yazdırılır.
const need=3,anthem='istiklal-marsi';
const looks={bayrak:{name:'Al bayrak',bg:'#c8102e',ink:'#ffffff',mark:'#ffe08a',soft:'#ffffffcc',emblem:'#ffffff'},safak:{name:'Şafak',bg:'#f3b37a',ink:'#2a1510',mark:'#9e1020',soft:'#2a1510bb',emblem:'#9e1020'},kagit:{name:'Kâğıt',bg:'#f7efd9',ink:'#2d2616',mark:'#c8102e',soft:'#2d2616aa',emblem:'#c8102e'}};
type Look=keyof typeof looks;
const tokens=(s:string)=>s.split(/(\s+)/).filter(Boolean);
function Emblem({color}:{color:string}){return <svg viewBox="0 0 120 80" className="poster-emblem" aria-hidden="true"><mask id="hilal"><rect width="120" height="80" fill="#fff"/><circle cx="52" cy="40" r="24" fill="#000"/></mask><circle cx="42" cy="40" r="30" fill={color} mask="url(#hilal)"/><polygon fill={color} points={star(88,40,16)}/></svg>;}
// Beş köşeli yıldız; bayraktaki gibi bir ucu hilale (sola) bakar.
function star(cx:number,cy:number,r:number){return Array.from({length:10},(_,i)=>{const a=Math.PI+i*Math.PI/5,rr=i%2?r*.38:r;return `${(cx+rr*Math.cos(a)).toFixed(1)},${(cy+rr*Math.sin(a)).toFixed(1)}`;}).join(' ');}
export default function Poster({words}:{words:Word[]}){
const list=words.filter(w=>w.work===anthem);
const [sentence,setSentence]=useState(''),[name,setName]=useState(''),[look,setLook]=useState<Look>('bayrak'),[error,setError]=useState('');
const used=list.filter(w=>usesWord(sentence,w.word)),ready=used.length>=need&&sentence.trim().length>=15,L=looks[look];
const marked=(t:string)=>/\S/.test(t)&&used.some(w=>usesWord(t,w.word));
const add=(w:Word)=>setSentence(s=>(s.trim()?s.trimEnd()+' ':'')+w.word.toLocaleLowerCase('tr'));
async function download(){setError('');try{const W=1240,H=1754,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d')!;g.fillStyle=L.bg;g.fillRect(0,0,W,H);
// amblem: hilal ve yıldız
g.fillStyle=L.emblem;g.beginPath();g.arc(560,250,120,0,Math.PI*2);g.fill();g.fillStyle=L.bg;g.beginPath();g.arc(600,250,96,0,Math.PI*2);g.fill();g.fillStyle=L.emblem;g.beginPath();star(740,250,64).split(' ').forEach((p,i)=>{const [x,y]=p.split(',').map(Number);if(i)g.lineTo(x,y);else g.moveTo(x,y);});g.closePath();g.fill();
g.fillStyle=L.soft;g.font='bold 30px Arial';g.textAlign='center';g.fillText('İSTİKLÂL MARŞI’NDAN KELİMELERLE',W/2,470);g.textAlign='left';
// cümle: kullanılan kelimeler vurgulu, satırlara sarılır
let size=76;const maxW=W-200;const lines=(sz:number)=>{g.font=`bold ${sz}px Georgia`;const out:string[][]=[[]];let w=0;for(const t of tokens(sentence.trim())){const tw=g.measureText(t).width;if(w+tw>maxW&&/\S/.test(t)&&out.at(-1)!.length){out.push([]);w=0;}if(!out.at(-1)!.length&&!/\S/.test(t))continue;out.at(-1)!.push(t);w+=tw;}return out;};
let ls=lines(size);while(ls.length*size*1.35>760&&size>40){size-=4;ls=lines(size);}
let y=600+size;for(const line of ls){g.font=`bold ${size}px Georgia`;let x=(W-line.reduce((a,t)=>a+g.measureText(t).width,0))/2;for(const t of line){g.fillStyle=marked(t)?L.mark:L.ink;g.fillText(t,x,y);x+=g.measureText(t).width;}y+=size*1.35;}
// kelimeler ve anlamları
y=Math.max(y+40,1300);g.fillStyle=L.soft;g.font='bold 24px Arial';g.fillText('KULLANILAN KELİMELER',100,y);y+=46;for(const w of used.slice(0,6)){g.fillStyle=L.mark;g.font='bold 32px Georgia';g.fillText(w.word,100,y);const ww=g.measureText(w.word+'  ').width;g.fillStyle=L.ink;g.font='28px Arial';g.fillText(`— ${w.oldMeaning||w.meaning}`,100+ww,y);y+=46;}
g.fillStyle=L.soft;g.font='26px Arial';if(name.trim())g.fillText(name.trim(),100,H-120);g.textAlign='right';g.fillText('Dilimizin Zenginlikleri · Mart · Mehmet Âkif ve Safahat Okumaları',W-100,H-70);
const a=document.createElement('a');a.download='istiklal-marsi-afisim.png';a.href=c.toDataURL('image/png');a.click();}catch{setError('Afiş indirilemedi. “Yazdır” ile PDF olarak kaydedebilirsin.');}}
function print(){document.body.classList.add('poster-print');const done=()=>{document.body.classList.remove('poster-print');removeEventListener('afterprint',done);};addEventListener('afterprint',done);window.print();}
return <section className="standalone poster-view"><div className="eyebrow">MART · MEHMET ÂKİF VE SAFAHAT OKUMALARI · ETKİNLİK 8.2</div><h1>İstiklâl Marşı <em>afişim.</em></h1><p>İstiklâl Marşı’ndan en az <b>üç kelimenin</b> yer aldığı anlamlı bir cümle kur ve afişini hazırla. Kullandığın kelimeler kendiliğinden işaretlenir. Sınıfın en iyi cümlesi/afişi seçilirken bu afişi yazdırabilir ya da dosya olarak öğretmenine iletebilirsin.</p>
{list.length<need?<div className="empty"><h2>İstiklâl Marşı kelimeleri henüz sözlükte yok.</h2><p>Öğretmenin “İstiklâl Marşı” eserine en az üç kelime ekleyince bu etkinlik açılır.</p></div>:<div className="poster-layout"><div>
<h2 className="poster-step">1. Kelimelerini seç</h2><div className="anthem-words">{list.map(w=><button key={w.id} className={used.includes(w)?'used':''} title={w.quote?`“${w.quote}”`:undefined} onClick={()=>add(w)}><b>{w.word}</b><small>{w.oldMeaning||w.meaning}</small></button>)}</div>
<h2 className="poster-step">2. Cümleni yaz</h2><label className="sr-only" htmlFor="poster-sentence">Cümlen</label><textarea id="poster-sentence" rows={4} maxLength={240} placeholder="Örn. Şafak vakti dalgalanan al sancak, milletimizin istiklâl sevdasını anlatır." value={sentence} onChange={e=>setSentence(e.target.value)}/>
<p className={`anthem-count${used.length>=need?' ok':''}`} role="status">{used.length>=need?'✓ ':''}{used.length} / {need} kelime kullanıldı{used.length?`: ${used.map(w=>w.word).join(', ')}`:''}</p>
<h2 className="poster-step">3. Afişini düzenle</h2><div className="chips" role="radiogroup" aria-label="Afiş rengi">{(Object.keys(looks) as Look[]).map(k=><button key={k} role="radio" aria-checked={look===k} className={look===k?'chosen':''} onClick={()=>setLook(k)}>{looks[k].name}</button>)}</div>
<label className="poster-name">Adın ve sınıfın <small>(isteğe bağlı)</small><input maxLength={40} placeholder="Örn. Elif, 10-B" value={name} onChange={e=>setName(e.target.value)}/></label>
<div className="button-row start"><button className="primary" disabled={!ready} onClick={download}>↓ Afişi indir (PNG)</button><button className="secondary" disabled={!ready} onClick={print}>Yazdır / PDF</button></div>{!ready&&<p className="source-note">Afişi indirmek için cümlende en az {need} kelime kullan.</p>}{error&&<p className="error" role="alert">{error}</p>}</div>
<figure id="poster" className="poster" style={{background:L.bg,color:L.ink}} aria-label="Afiş önizlemesi"><Emblem color={L.emblem}/><figcaption style={{color:L.soft}}>İSTİKLÂL MARŞI’NDAN KELİMELERLE</figcaption>
<blockquote>{sentence.trim()?tokens(sentence.trim()).map((t,i)=>marked(t)?<mark key={i} style={{color:L.mark}}>{t}</mark>:<span key={i}>{t}</span>):<span style={{opacity:.5}}>Cümlen burada görünecek…</span>}</blockquote>
{!!used.length&&<dl>{used.slice(0,6).map(w=><div key={w.id}><dt style={{color:L.mark}}>{w.word}</dt><dd>{w.oldMeaning||w.meaning}</dd></div>)}</dl>}
<footer style={{color:L.soft}}><span>{name}</span><span>Dilimizin Zenginlikleri · Mart</span></footer></figure></div>}</section>;}
