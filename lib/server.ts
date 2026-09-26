import {env} from 'cloudflare:workers';
export const runtime=env as unknown as {DB:D1Database;ART:R2Bucket;IMAGE_SERVICE_URL?:string;IMAGE_SERVICE_TOKEN?:string;ADMIN_TOKEN?:string};
export async function database(){await runtime.DB.prepare('CREATE TABLE IF NOT EXISTS cards (id TEXT PRIMARY KEY, wordId TEXT NOT NULL, sentence TEXT NOT NULL, nickname TEXT NOT NULL, scene TEXT NOT NULL, style TEXT NOT NULL, image TEXT NOT NULL, mode TEXT NOT NULL, createdAt INTEGER NOT NULL, approved INTEGER NOT NULL DEFAULT 0)').run();await runtime.DB.prepare('CREATE INDEX IF NOT EXISTS cards_gallery ON cards(approved,createdAt)').run();return runtime.DB;}
export function authorized(request:Request){return !!runtime.ADMIN_TOKEN&&request.headers.get('authorization')===`Bearer ${runtime.ADMIN_TOKEN}`;}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');return !origin||origin===new URL(request.url).origin;}
