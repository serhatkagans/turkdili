'use client';
import {useState} from 'react';
import {byMonth,cover,kindOf,months,themes,type Word,type Work} from '../lib/words';
import {inTitle,mask} from '../lib/game';
import {Guess,hint,Meanings,ModeToggle,Pic,useSessionSet,type GuessMode} from './dict-ui';
function Cover({k,covers,small=false}:{k:Work;covers:Record<string,number>;small?:boolean}){return covers[k.id]?<img className="work-cover" src={cover(k.id,covers[k.id])} alt={`${k.title} kapağı`}/>:<div className={`work-cover work-cover-empty${small?' small':''}`} role="img" aria-label={`${k.title} kapağı bekleniyor`}><b>{k.title}</b><span>{k.author}</span><small>Kapak bekleniyor</small></div>;}
// Eser kartları: kapak + künye + kelime sayısı. Esere girilince kelimeler maskeli gelir, doğru tahminle açılır (oturum boyunca açık kalır).
// Adı eserin başlığında geçen kelimeler bilmece olamayacağı için baştan açık gelir.
export default function WorksView({words,works,ill,covers,onAdd}:{words:Word[];works:Work[];ill:Record<string,number>;covers:Record<string,number>;onAdd:(work:string)=>void}){
const [open,setOpen]=useState(''),[active,setActive]=useState(''),[mode,setMode]=useState<GuessMode>('choice'),[opened,markOpened]=useSessionSet('kh-eser-acilan');
const title=(id:string)=>works.find(x=>x.id===id)?.title??'',isOpen=(w:Word)=>opened.has(w.id)||inTitle(w.word,title(w.work));
const of=(id:string)=>words.filter(w=>w.work===id),solved=(id:string)=>of(id).filter(isOpen).length,riddles=(id:string)=>of(id).some(w=>!inTitle(w.word,title(id)));
const k=works.find(x=>x.id===open);
if(!k)return <section className="standalone"><div className="eyebrow">KLASİK ESERLERİN KELİME HAZİNESİ</div><h1>Eserler<em>.</em></h1><p>Eylem planındaki her ayın eserleri ve temaları. Birini seç; kelimeleri gizli gelir. Anlamından yola çıkarak her kelimeyi tahmin et ve bütün kartları aç.</p>
{[...months,''].map(m=>{const group=byMonth(works).filter(x=>m?x.month===m:!months.includes(x.month));if(!group.length)return null;return <section className="month-group" key={m||'diger'}><h2 className="month-title">{m?<><span>{m}</span>{themes[m]}</>:'Diğer eserler'}</h2>
<div className="works-grid">{group.map(x=>{const n=of(x.id).length,s=solved(x.id),complete=riddles(x.id)&&s===n;return <button key={x.id} className={`work-card${complete?' complete':''}`} onClick={()=>{setOpen(x.id);setActive('');scrollTo({top:0,behavior:'smooth'});}}>
<Cover k={x} covers={covers} small/>{complete&&<span className="done-badge">✓ Tamamlandı</span>}<div><h2>{x.title}</h2><p>{x.author}{x.period&&` · ${x.period}`}</p><div className="work-meta">{x.month&&<span className="month">{x.month}</span>}<span>{n} kelime</span>{n>0&&<span>{s}/{n} açıldı</span>}</div>{n>0&&<progress max={n} value={s} aria-label={`${s} / ${n} kelime açıldı`}/>}</div></button>;})}</div></section>;})}</section>;
const list=of(k.id),count=solved(k.id),complete=riddles(k.id)&&count===list.length;
return <section className="standalone work-detail"><button className="text-button" onClick={()=>setOpen('')}>← Bütün eserler</button>
<header className={`work-hero${complete?' complete':''}`}><Cover k={k} covers={covers}/><div><div className="eyebrow">{k.month?`${k.month.toLocaleUpperCase('tr')} · ${themes[k.month].toLocaleUpperCase('tr')}`:'ESER'}</div><h1>{k.title}</h1><p>{k.author}{k.period&&` · ${k.period}`}</p><div className="work-meta"><span>{list.length} kelime</span><span>{count}/{list.length} açıldı</span></div>{list.length>0&&<progress max={list.length} value={count}/>}{complete&&<p className="complete-banner" role="status"><span>✦</span> Tamamlandı! Bu eserin bütün kelimelerini açtın.</p>}</div></header>
{!list.length?<div className="empty"><h2>Bu eserin sözlüğü henüz boş.</h2><p>Eserden bir kelime bul, anlamını ve örnek cümlesini yaz. Öğretmen onaylayınca burada görünür.</p><button className="primary" onClick={()=>onAdd(k.id)}>+ İlk kelimeyi sen ekle</button></div>:<>
<div className="work-tools"><ModeToggle mode={mode} setMode={setMode}/><button className="text-button" onClick={()=>onAdd(k.id)}>+ Bu esere kelime ekle</button></div>
<div className="mask-grid">{list.map(w=>{const shown=isOpen(w);return <article key={w.id} className={`mask-card${shown?' opened':''}${active===w.id?' active':''}`}>
{shown?<><Pic w={w} ill={ill}/><div><h3>{w.word}</h3><Meanings w={w} k={k}/><p className="entry-example">“{w.example}”</p></div></>
:<><button className="mask-face" aria-expanded={active===w.id} onClick={()=>setActive(active===w.id?'':w.id)}><span className="masked" aria-label={`${[...w.word].length} harfli gizli kelime`}>{mask(w.word,.5,w.id)}</span><span className="mask-hint"><small>{kindOf(k).oldShort.toLocaleUpperCase('tr')}</small>{hint(w)}</span>{active!==w.id&&<span className="mask-cta">Tahmin et ↗</span>}</button>
{active===w.id&&<Guess key={mode} w={w} pool={words} mode={mode} retry onDone={()=>{markOpened(w.id);setActive('');}}/>}</>}</article>;})}</div></>}</section>;}
