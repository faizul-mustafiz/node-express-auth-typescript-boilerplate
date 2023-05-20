import { Request } from 'express';
export const getAuthorizationHeader = (req: Request) => {
  return req.headers['authorization'] || req.headers['Authorization'];
};
export const getXApiKeyHeader = (req: Request) => {
  return req.headers['x-api-key'] || req.headers['X-API-KEY'];
};
export const getXAppIdHeader = (req: Request) => {
  return req.headers['x-app-id'] || req.headers['X-APP-ID'];
};
export const getXAppVersionHeader = (req: Request) => {
  return req.headers['x-app-version'] || req.headers['X-APP-VERSION'];
};
export const getXDeviceInfoHeader = (req: Request) => {
  return req.headers['x-device-info'] || req.headers['X-DEVICE-INFO'];
};
export const splitAuthorizationHeader = (authorization: any) => {
  const bearer =
    authorization && authorization.startsWith('Bearer ') ? authorization : null;
  const token = bearer ? bearer.split('Bearer ')[1] : null;
  return {
    bearer,
    token,
  };
};
