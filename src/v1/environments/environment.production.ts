import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  //app environment variables
  API_PROTOCOL: process.env.API_PROTOCOL as string,
  API_HOST: process.env.API_HOST as string,
  API_PORT: process.env.API_PORT as string,
  BASE_API_ROUTE: process.env.BASE_API_ROUTE as string,
  // redis environments variables
  REDIS_URL: process.env.REDIS_URL as string,
  // mongo environment variables
  MONGO_URL: process.env.MONGO_URL as string,
  // JWT environment variables
  ACCESS_TOKEN_EXPIRY_TIME: process.env.ACCESS_TOKEN_EXPIRY_TIME as string,
  REFRESH_TOKEN_EXPIRY_TIME: process.env.REFRESH_TOKEN_EXPIRY_TIME as string,
  VERIFY_TOKEN_SECRET: process.env.VERIFY_TOKEN_SECRET as string,
  VERIFY_TOKEN_EXPIRY_TIME: process.env.VERIFY_TOKEN_EXPIRY_TIME as string,
  CHANGE_PASSWORD_TOKEN_SECRET: process.env
    .CHANGE_PASSWORD_TOKEN_SECRET as string,
  CHANGE_PASSWORD_TOKEN_EXPIRY_TIME: process.env
    .CHANGE_PASSWORD_TOKEN_EXPIRY_TIME as string,
  PUBLIC_KEY: process.env.PUBLIC_KEY as string,
  PRIVATE_KEY: process.env.PRIVATE_KEY as string,
};
