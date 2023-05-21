import { environment } from '../environments/index';

const {
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_EXPIRY_TIME,
  VERIFY_TOKEN_SECRET,
  VERIFY_TOKEN_EXPIRY_TIME,
  CHANGE_PASSWORD_TOKEN_SECRET,
  CHANGE_PASSWORD_TOKEN_EXPIRY_TIME,
  PUBLIC_KEY,
  PRIVATE_KEY,
} = environment;

const accessTokenConfig = {
  expiryTime: ACCESS_TOKEN_EXPIRY_TIME,
};

const refreshTokenConfig = {
  expiryTime: REFRESH_TOKEN_EXPIRY_TIME,
};

const verifyTokenConfig = {
  secret: VERIFY_TOKEN_SECRET,
  expiryTime: VERIFY_TOKEN_EXPIRY_TIME,
};

const changePasswordTokenConfig = {
  secret: CHANGE_PASSWORD_TOKEN_SECRET,
  expiryTime: CHANGE_PASSWORD_TOKEN_EXPIRY_TIME,
};

export const JWTConfig = {
  accessTokenConfig,
  refreshTokenConfig,
  verifyTokenConfig,
  changePasswordTokenConfig,
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
};
