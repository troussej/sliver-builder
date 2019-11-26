import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { logger } from './logger';

const envFile = path.join(__dirname, '../.env');

if (fs.existsSync(envFile)) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: envFile });
} else {
    // logger.w    ("Missing .env file at " + envFile);

}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

// export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;

// if (!SESSION_SECRET) {
//     logger.error("No client secret. Set SESSION_SECRET environment variable.");
//     process.exit(1);
// }

if (!MONGODB_URI) {
  if (prod) {
      logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
    } else {
      logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
    }
  process.exit(1);
}
