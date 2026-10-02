import 'dotenv/config';
import { z } from 'zod';
const schema=z.object({NODE_ENV:z.enum(['development','test','production']).default('development'),PORT:z.coerce.number().default(5000),DATABASE_URL:z.string().min(1),JWT_SECRET:z.string().min(32),CLIENT_URL:z.string().default('http://localhost:8080')});
export const env=schema.parse(process.env);
