'use client';
import {useState} from 'react';
import {kindOf,months,themes,workOf,type Word,type Work} from '../lib/words';
import {inTitle,mask} from '../lib/game';
import {Guess,hint,Meanings,ModeToggle,Pic,readSession,writeSession,type GuessMode} from './dict-ui';
const levels={kolay:{label:'Kolay',ratio:.3},zor:{label:'Zor',ratio:.7}};
type Level=keyof typeof levels;type Ask='word'|'meaning';type Score={right:number;total:number;streak:number;best:number};
const scoreKey='kh-tahmin-skor',zero:Score={right:0,total:0,streak:0,best:0};
// Önce bu turda görülmemiş kelimeler; hepsi görüldüyse (az önce sorulan hariç) baştan.
function pick(list:Word[],history:string[],last:string){const fresh=list.filter(w=>!history.includes(w.id)&&w.id!==last),others=list.filter(w=>w.id!==last);const from=fresh.length?fresh:others.length?others:list;return from.length?from[Math.floor(Math.random()*from.length)]:null;}
// Genel tahmin oyunu: bütün sözlükten (isteğe göre aya göre süzülmüş) rastgele kelime; skor yalnızca bu oturumda tutulur.
// İki yön: "Kelimeyi Bul" (anlamdan maskeli kelimeye) ve eylem planındaki "Anlamını Bul" (kelimeden anlama, şıklı).
export default function GuessGame({words,works,ill}:{words:Word[];works:Work[];ill:Record<string,number>}){
const [ask,setAsk]=useState<Ask>('word'),[month,setMonth]=useState(''),[level,setLevel]=useState<Level>('kolay'),[mode,setMode]=useState<GuessMode>('choice');
const [current,setCurrent]=useState<Word|null>(()=>pick(words,[],'')),[result,setResult]=useState<boolean|null>(null),[seen,setSeen]=useState<string[]>(()=>current?[current.id]:[]),[score,setScore]=useState<Score>(()=>({...zero,...readSession<Partial<Score>>(scoreKey,{})})),[round,setRound]=useState(0);
const pool=words.filter(w=>!month||workOf(works,w).month===month),active=months.filter(m=>words.some(w=>workOf(works,w).month===m));
function next(list=pool,history=seen){const w=pick(list,history,current?.id??'');const fresh=!!w&&!history.includes(w.id);setSeen(w?fresh?[...history,w.id]:[w.id]:[]);setCurrent(w);setResult(null);setRound(r=>r+1);}
function save(s:Score){setScore(s);writeSession(scoreKey,s);}
function done(ok:boolean){setResult(ok);const streak=ok?score.streak+1:0;save({right:score.right+(ok?1:0),total:score.total+1,streak,best:Math.max(score.best,streak)});}
function filter(m:string){setMonth(m);next(words.filter(w=>!m||workOf(works,w).month===m),[]);}
const k=current&&workOf(works,current),l=kindOf(k);
return <section className="standalone game"><div className="eyebrow">TÜM SÖZLÜKTEN RASTGELE</div><h1>{ask==='word'?<>Kelimeyi <em>bul.</em></>:<>Anlamını <em>bul.</em></>}</h1>
<div className="chips game-type" role="radiogroup" aria-label="Oyun">{([['word','Kelimeyi Bul','Anlamı ver, kelimeyi bul'],['meaning','Anlamını Bul','Kelimeyi gör, anlamını seç']] as const).map(([a,t,d])=><button key={a} role="radio" aria-checked={ask===a} className={ask===a?'chosen':''} onClick={()=>{setAsk(a);next();}}><b>{t}</b><small>{d}</small></button>)}</div>
<p>{ask==='word'?'Harflerin bir kısmı gizli. Anlamı ve geldiği eseri ipucu olarak kullan, kelimeyi bul.':'Eylem planındaki “Anlamını Bul” etkinliği: kelimeyi oku, dört anlamdan doğrusunu seç. Yabancı sözcüklerde doğru Türkçe karşılığı bul.'}</p>
<div className="game-bar"><div className="scoreboard" aria-live="polite"><span><b>{score.right}</b>/{score.total} doğru</span><span>🔥 Seri <b>{score.streak}</b></span><span>En iyi <b>{score.best}</b></span>{score.total>0&&<button className="text-button" onClick={()=>save(zero)}>Sıfırla</button>}</div></div>
<div className="game-filters"><div className="chips" aria-label="Aya göre süz"><button className={!month?'chosen':''} onClick={()=>filter('')}>Bütün aylar</button>{active.map(m=><button key={m} title={themes[m]} className={month===m?'chosen':''} onClick={()=>filter(m)}>{m}</button>)}</div>
{ask==='word'&&<><div className="chips" role="radiogroup" aria-label="Zorluk">{(Object.keys(levels) as Level[]).map(l=><button key={l} role="radio" aria-checked={level===l} className={level===l?'chosen':''} onClick={()=>setLevel(l)}>{levels[l].label} <small>%{levels[l].ratio*100} gizli</small></button>)}</div><ModeToggle mode={mode} setMode={setMode}/></>}</div>{month&&<p className="month-theme"><b>{month}</b> · {themes[month]}</p>}
{!current||!k?<div className="empty"><h2>Bu ayda henüz kelime yok.</h2><button className="secondary" onClick={()=>filter('')}>Bütün aylardan oyna</button></div>:
<article className={`game-card${result===true?' right':result===false?' wrong':''}`} key={round}>
{ask==='word'?<div className="masked big" aria-label={`${[...current.word].length} harfli gizli kelime`}>{result===null?mask(current.word,levels[level].ratio,current.id+level):[...current.word.toLocaleUpperCase('tr')].join(' ')}</div>:<div className="shown-word">{current.word}</div>}
<div className="game-hints">{ask==='word'?<p><small>{l.oldShort.toLocaleUpperCase('tr')}</small>{hint(current)}</p>:<p><small>SORU</small>{l===kindOf({kind:'yabanci'})?'Bu sözcüğün Türkçe karşılığı hangisi?':l===kindOf({kind:'atasozu'})?'Bu söz ne anlama gelir?':'Bu kelime eserde ne anlama gelir?'}</p>}<p><small>{k.month?`${k.month.toLocaleUpperCase('tr')} · ESER`:'ESER'}</small>{ask==='word'&&result===null&&inTitle(current.word,k.title)?mask(k.title,1,k.id):k.title}{k.author&&k.author!=='(derleme)'&&` · ${k.author}`}</p></div>
{result===null?<Guess key={ask+mode+round} w={current} pool={words} mode={mode} ask={ask} retry={false} onDone={done}/>:<div className="game-result"><p className="verdict" role="status">{result?'✓ Doğru bildin!':`✗ Olmadı. Doğru cevap: ${ask==='word'?current.word:hint(current)}`}</p>
<div className="game-explain"><Pic w={current} ill={ill}/><div><h2>{current.word}</h2><Meanings w={current} k={k}/><p className="entry-example">“{current.example}”</p><small>{k.title}{k.month&&` · ${k.month}`}</small></div></div>
<button className="primary" autoFocus onClick={()=>next()}>Sonraki kelime →</button></div>}</article>}</section>;}
