import type { Metadata } from 'next';
import './globals.css';
import {headers} from 'next/headers';
export async function generateMetadata():Promise<Metadata>{const h=await headers();const host=h.get('x-forwarded-host')||h.get('host')||'localhost:3000';const origin=`${h.get('x-forwarded-proto')||(host.startsWith('127.0.0.1')||host.startsWith('localhost')?'http':'https')}://${host}`;return {title:'Kelimeden Hayale | Benim TEKNOFEST Sözlüğüm',description:'Bir kelime keşfet, kendi cümleni kur ve görselli sözlük kartını TEKNOFEST hatırasına dönüştür.',openGraph:{title:'Kelimeden Hayale',description:'Bir kelime seç. Bir dünya oluştur.',images:[`${origin}/og.png`]},twitter:{card:'summary_large_image',images:[`${origin}/og.png`]}};}
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="tr"><body>{children}</body></html>;}
