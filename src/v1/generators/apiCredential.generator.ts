import { v4 } from 'uuid';
import { scryptSync, randomBytes } from 'crypto';

export const generateAppId = () => {
  return v4();
};
export const generateApiKey = () => {
  const buffer = randomBytes(32);
  return buffer.toString('base64');
};
export const generateApiSecret = (key: string) => {
  const salt = randomBytes(32).toString('hex');
  const buffer = scryptSync(key, salt, 64);
  return `${salt}${buffer.toString('hex')}`;
};
