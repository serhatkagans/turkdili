'use client';
import {useMemo,useState} from 'react';
import {byMonth,months,themes,workOf,type Word,type Work} from '../lib/words';
import {pages,seeded,shuffle} from '../lib/game';
import {hint,Meanings,Pic,useSessionSet} from './dict-ui';
type Page={key:string;group:string;month:string;title:string;sub:string;words:Word[];mixed:boolean;part:number;parts:number};
const perPage=5,minOwn=3;
// Onaylı kelimeler eylem planı ayı sırasıyla dizilir ve 4–6 maddelik sayfalara bölünür. En az üç kelimesi olan eser kendi sayfalarını alır;
// daha az kelimeli eserler (ör. Ekim'in serbest temel eserleri) o ayın teması altında birlikte sayfalanır.
export function bookPages(words:Word[],works:Work[]):Page[]{const groups:Omit<Page,'key'|'part'|'parts'>[]=[];
for(const m of [...months,'']){const small:Word[]=[];for(const k of byMonth(works).filter(k=>m?k.month===m:!months.includes(k.month))){const list=words.filter(w=>w.work===k.id);if(!list.length)continue;
if(list.length>=minOwn||!m)groups.push({group:k.id,month:m,title:k.title,sub:[k.author!=='(derleme)'&&k.author,m&&`${m} · ${themes[m]}`].filter(Boolean).join(' · '),words:list,mixed:false});else small.push(...list);}
if(small.length)groups.push({group:`ay-${m}`,month:m,title:themes[m],sub:`${m} ayı · temel eserlerden`,words:small,mixed:true});}
return groups.flatMap(g=>{const list=pages(g.words,perPage);return list.map((ws,i)=>({...g,key:`${g.group}:${i}`,words:ws,part:i+1,parts:list.length}));});}
// Sayfa sonu eşleştirme: soldaki kelimeye, sonra sağdaki anlamına tıklanır.
function Matching({page,done,complete}:{page:Page;done:boolean;complete:()=>void}){
const left=useMemo(()=>shuffle(page.words,seeded(page.key+'k')),[page]),right=useMemo(()=>shuffle(page.words,seeded(page.key+'a')),[page]);
const [pick,setPick]=useState(''),[matched,setMatched]=useState<string[]>(()=>done?page.words.map(w=>w.id):[]),[miss,setMiss]=useState(''),[msg,setMsg]=useState('');
function choose(id:string){if(matched.includes(id))return;if(!pick){setMsg('Önce soldan bir kelime seç.');return;}
if(id===pick){const next=[...matched,id];setMatched(next);setPick('');setMsg('Doğru eşleşme!');if(next.length===page.words.length)complete();}
else{setMiss(id);setMsg('Bu anlam o kelimeye ait değil. Tekrar dene.');setTimeout(()=>setMiss(''),600);}}
const all=matched.length===page.words.length;
return <section className={`matching${all?' matching-done':''}`} aria-label="Sayfa sonu eşleştirme"><header><h3>Eşleştir</h3><small>Kelimeye, sonra anlamına dokun.</small>{all&&<span className="done-badge">✓ Tamamlandı</span>}</header>
<div className="match-cols"><div>{left.map(w=><button key={w.id} className={matched.includes(w.id)?'matched':pick===w.id?'picked':''} disabled={matched.includes(w.id)} aria-pressed={pick===w.id} onClick={()=>{setPick(w.id);setMsg('');}}>{w.word}</button>)}</div>
<div>{right.map(w=><button key={w.id} className={matched.includes(w.id)?'matched':miss===w.id?'missed':''} disabled={matched.includes(w.id)} onClick={()=>choose(w.id)}>{hint(w)}</button>)}</div></div>
<p className="match-msg" role="status">{all?'Harika! Bu sayfanın bütün kelimelerini eşleştirdin.':msg}</p></section>;}
export default function Book({words,works,ill,onAdd}:{words:Word[];works:Work[];ill:Record<string,number>;onAdd:()=>void}){
const list=useMemo(()=>bookPages(words,works),[words,works]);
const [at,setAt]=useState(0),[dir,setDir]=useState<'next'|'prev'>('next'),[done,markDone]=useSessionSet('kh-kitap-tamam');
const go=(i:number)=>{if(i<0||i>=list.length)return;setDir(i>at?'next':'prev');setAt(i);};
if(!list.length)return <section className="standalone"><h1>Sözlük <em>kitabı.</em></h1><div className="empty"><h2>Kitap henüz boş.</h2><p>Öğretmen onayından geçen kelimeler burada sayfa sayfa dizilir.</p><button className="primary" onClick={onAdd}>+ İlk kelimeyi ekle</button></div></section>;
const page=list[Math.min(at,list.length-1)];
return <section className="standalone book-view"><div className="eyebrow">AY AY, ESER ESER, SAYFA SAYFA</div><h1>Sözlük <em>kitabı.</em></h1><p>Öğrencilerin eylem planındaki eser ve temalardan derlediği, öğretmen onayından geçen kelimeler. Her sayfanın sonunda kelimeleri anlamlarıyla eşleştir.</p>
<nav className="chips book-toc" aria-label="İçindekiler">{list.map((p,i)=>p.part===1&&<button key={p.key} className={page.group===p.group?'chosen':''} onClick={()=>go(i)}>{p.mixed?'Temel eserler':p.title}{p.month&&<small> · {p.month}</small>}{list.filter(x=>x.group===p.group).every(x=>done.has(x.key))&&' ✓'}</button>)}</nav>
<div className="book-stage"><article key={page.key} className={`book-page turn-${dir}`}>
<header className="book-head"><span>{page.title}{page.parts>1&&` · ${page.part}/${page.parts}`}</span><span>{page.sub}</span><b>{at+1}</b></header>
<ol className="entries">{page.words.map(w=>{const k=workOf(works,w);return <li key={w.id}><div><h2>{w.word}{w.syllables&&w.syllables!==w.word&&<small>{w.syllables}</small>}</h2>{page.mixed&&<small className="entry-work">{k.title}{k.author&&` · ${k.author}`}</small>}<Meanings w={w} k={k}/>{w.quote&&<p className="entry-quote">“{w.quote}”</p>}<p className="entry-example">“{w.example}”</p>{w.addedBy&&<small className="entry-by">Ekleyen: {w.addedBy}</small>}</div><Pic w={w} ill={ill}/></li>;})}</ol>
<Matching key={page.key} page={page} done={done.has(page.key)} complete={()=>markDone(page.key)}/>
<div className="book-foot">— {at+1} —</div></article></div>
<div className="book-nav"><button className="secondary" disabled={at===0} onClick={()=>go(at-1)}>← Önceki sayfa</button><span>Sayfa {at+1} / {list.length}{done.has(page.key)&&' · ✓'}</span><button className="primary" disabled={at===list.length-1} onClick={()=>go(at+1)}>Sonraki sayfa →</button></div>
<p className="source-note">Kitapta olmayan bir kelime mi buldun? <button className="text-button" onClick={onAdd}>+ Sözlüğe kelime ekle</button></p></section>;}
