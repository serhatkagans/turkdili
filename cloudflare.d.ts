import type {D1Database as Database, R2Bucket as Bucket} from '@cloudflare/workers-types';
declare global {type D1Database=Database;type R2Bucket=Bucket;type Fetcher={fetch(request:Request):Promise<Response>};}
