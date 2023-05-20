import { scryptSync, timingSafeEqual } from 'crypto';
import { AppConfig } from '../configs/app.config';
import { ApplicationStatus } from '../enums/applicationStatus.enum';
import {
  generateApiKey,
  generateApiSecret,
  generateAppId,
} from '../generators/apiCredential.generator';
import {
  generateApplicationIdentity,
  generateApplicationPayloadForRedis,
} from '../utility/application.utility';
import { deleteAppIdIdentity, setAppIdIdentity } from './redis.helper';

export const generateApplicationCredentialData = () => {
  const appId = generateAppId();
  const apiKey = generateApiKey();
  const apiSecret = generateApiSecret(apiKey);
  return {
    appId,
    apiKey,
    apiSecret,
    appMinVersion: AppConfig.version,
    status: ApplicationStatus.Active,
  };
};
export const setApplicationCredentialToRedis = async (payload: any) => {
  const identity = generateApplicationIdentity(payload);
  const redisPayload = generateApplicationPayloadForRedis(payload);
  await setAppIdIdentity(identity, redisPayload);
};
export const deleteApplicationCredentialFromRedis = async (
  identity: string,
) => {
  await deleteAppIdIdentity(identity);
};
export const compareStoredKeyWithApiKey = (
  storedApiKey: string,
  apiKey: string,
) => {
  return storedApiKey === apiKey;
};
export const compareStoredSecretWithApiKey = (
  storedApiSecret: string,
  apiKey: string,
) => {
  const salt = storedApiSecret.substr(0, 64);
  const key = storedApiSecret.substr(64);
  const buffer = scryptSync(apiKey, salt, 64);
  return timingSafeEqual(Buffer.from(key, 'hex'), buffer);
};
export const compareStoredAppMinVersionWithAppVersion = (
  storedAppMinVersion: string,
  appVersion: string,
) => {
  return storedAppMinVersion === appVersion;
};
