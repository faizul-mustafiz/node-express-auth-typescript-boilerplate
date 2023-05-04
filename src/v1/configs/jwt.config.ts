import { environment } from '../environments/index';

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY_TIME,
  VERIFY_TOKEN_SECRET,
  VERIFY_TOKEN_EXPIRY_TIME,
  RESET_PASSWORD_TOKEN_SECRET,
  RESET_PASSWORD_TOKEN_EXPIRY_TIME,
  CHANGE_PASSWORD_TOKEN_SECRET,
  CHANGE_PASSWORD_TOKEN_EXPIRY_TIME,
  PUBLIC_KEY,
  PRIVATE_KEY,
} = environment;

const accessTokenConfig = {
  secret: ACCESS_TOKEN_SECRET,
  expiryTime: ACCESS_TOKEN_EXPIRY_TIME,
};

const refreshTokenConfig = {
  secret: REFRESH_TOKEN_SECRET,
  expiryTime: REFRESH_TOKEN_EXPIRY_TIME,
};

const verifyTokenConfig = {
  secret: VERIFY_TOKEN_SECRET,
  expiryTime: VERIFY_TOKEN_EXPIRY_TIME,
};

const resetPasswordTokenConfig = {
  secret: RESET_PASSWORD_TOKEN_SECRET,
  expiryTime: RESET_PASSWORD_TOKEN_EXPIRY_TIME,
};

const changePasswordTokenConfig = {
  secret: CHANGE_PASSWORD_TOKEN_SECRET,
  expiryTime: CHANGE_PASSWORD_TOKEN_EXPIRY_TIME,
};

export const JWTConfig = {
  accessTokenConfig,
  refreshTokenConfig,
  verifyTokenConfig,
  resetPasswordTokenConfig,
  changePasswordTokenConfig,
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
};
