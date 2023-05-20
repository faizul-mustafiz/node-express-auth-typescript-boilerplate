export const generateApplicationIdentity = (payload: any) => {
  return payload && payload.appId;
};
export const generateApplicationPayloadForRedis = (payload: any) => {
  return {
    appName: payload && payload.appName,
    apiKey: payload && payload.apiKey,
    apiSecret: payload && payload.apiSecret,
    appMinVersion: payload && payload.appMinVersion,
    status: payload && payload.status,
  };
};
