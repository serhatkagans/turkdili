'use client';
import {useState} from 'react';
import {byMonth,kindOf,months,themes,usesWord,type Work} from '../lib/words';
const empty={word:'',oldMeaning:'',meaning:'',example:''};
// Eser listesi eylem planı aylarına göre gruplanır: "Şubat · Kutadgu Bilig ve Dîvânü Lügâti't-Türk Okumaları".
export function WorkOptions({works}:{works:Work[]}){const groups=[...months,''].map(m=>[m,byMonth(works).filter(k=>m?k.month===m:!months.includes(k.month))] as const).filter(([,ks])=>ks.length);
return <>{groups.map(([m,ks])=><optgroup key={m||'diger'} label={m?`${m} · ${themes[m]}`:'Diğer'}>{ks.map(k=><option key={k.id} value={k.id}>{k.title}{k.author&&k.author!=='(derleme)'?` · ${k.author}`:''}</option>)}</optgroup>)}</>;}
// Öğrenci kelime ekleme formu. Gönderilen kelime öğretmen onayına düşer; onaylanana kadar sözlükte görünmez.
// Alan adları seçilen temaya göre değişir (eser sözlüğü · atasözü ve deyim · yabancı sözcük).
export default function SuggestForm({works,initialWork}:{works:Work[];initialWork:string}){
const [f,setF]=useState({...empty,work:initialWork||works[0]?.id||'',addedBy:''}),[busy,setBusy]=useState(false),[error,setError]=useState(''),[sent,setSent]=useState<string[]>([]);
const set=(k:keyof typeof f)=>(e:{target:{value:string}})=>{setF({...f,[k]:e.target.value});setError('');};
const work=works.find(k=>k.id===f.work),l=kindOf(work);
const exampleOk=!f.word.trim()||!f.example.trim()||usesWord(f.example,f.word.trim());
async function submit(){setBusy(true);setError('');try{const r=await fetch('/api/words',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)});const d=await r.json();if(!r.ok)throw Error(d.error);setSent(s=>[f.word.trim(),...s]);setF({...f,...empty});}catch(e){setError(e instanceof Error?e.message:'Önerin gönderilemedi.');}finally{setBusy(false);}}
return <section className="standalone suggest"><div className="eyebrow">YAZAR YA DA ESER SÖZLÜK OLUŞTURMA ETKİNLİĞİ</div><h1>Sözlüğe <em>kelime ekle.</em></h1><p>Okuduğun eserde bilmediğin ya da bugün kullanmadığımız bir kelime, bir atasözü ya da dilimize yerleşmiş yabancı bir sözcük mü buldun? Önce ayın temasını ve eseri seç, sonra anlamını ve bir örnek cümle yaz. Öğretmenin onaylayınca sözlük kitabına, eser kartlarına ve oyunlara eklenir.</p>
{!!sent.length&&<div className="notice suggest-sent" role="status">✓ <b>{sent[0]}</b> öğretmen onayına gönderildi. {sent.length>1&&<small>Bu oturumda {sent.length} öneri gönderdin: {sent.join(', ')}.</small>}</div>}
<form className="suggest-form" onSubmit={e=>{e.preventDefault();void submit();}}>
<label>Tema ve eser *<select required value={f.work} onChange={set('work')}><WorkOptions works={works}/></select>{work?.month&&<small>{work.month} · {themes[work.month]}</small>}</label>
<label>{l.word} *<input required maxLength={80} placeholder={l.wordHint} value={f.word} onChange={set('word')}/></label>
<label>{l.old} *<textarea required rows={2} maxLength={300} placeholder={l.oldHint} value={f.oldMeaning} onChange={set('oldMeaning')}/></label>
<label>{l.now} <small>(isteğe bağlı)</small><textarea rows={2} maxLength={300} placeholder={l.nowHint} value={f.meaning} onChange={set('meaning')}/></label>
<label>Örnek cümle *<textarea required rows={3} minLength={10} maxLength={240} placeholder={`${l.word} içeren kendi cümleni yaz…`} value={f.example} onChange={set('example')}/><small className={exampleOk?'':'field-error'}>{exampleOk?`${f.example.length}/240 · Cümlende “${l.word.toLocaleLowerCase('tr')}” geçmeli.`:'Cümlende “'+f.word.trim()+'” geçmiyor.'}</small></label>
<label>Adın ve sınıfın <small>(isteğe bağlı)</small><input maxLength={40} placeholder="Örn. Elif, 10-B" value={f.addedBy} onChange={set('addedBy')}/><small>Soyadını, okulunu veya iletişim bilgini yazma.</small></label>
{error&&<p className="error" role="alert">{error}</p>}
<button className="primary wide" disabled={busy||!exampleOk}>{busy?'Gönderiliyor…':'Öğretmen onayına gönder ↗'}</button></form></section>;}
