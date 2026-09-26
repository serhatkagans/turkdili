import {runtime} from '../../../lib/server';
export function GET(){return Response.json({ai:!!(runtime.IMAGE_SERVICE_URL&&runtime.IMAGE_SERVICE_TOKEN),admin:!!runtime.ADMIN_TOKEN});}
