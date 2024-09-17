import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export default registerAs('config', () => ({
  environment: process.env.NODE_ENV || 'dev',
  apiKey: process.env.API_KEY,
  jwt_secret: process.env.JWT_SECRET,
}));
