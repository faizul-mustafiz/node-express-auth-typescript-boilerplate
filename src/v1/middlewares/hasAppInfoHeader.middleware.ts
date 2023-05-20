import { NextFunction, Request, Response } from 'express';
import {
  getXApiKeyHeader,
  getXAppIdHeader,
  getXAppVersionHeader,
} from '../utility/header.utility';
import { ForbiddenError } from '../errors/ForbiddenError';

export const HasAppInfoHeader = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**
     * * check if x-api-key header exists
     * * if there is no x-api-key header send 403 ForbiddenError
     * @function ForbiddenError(origin,message)
     */
    const xApiKey = getXApiKeyHeader(req);
    if (!xApiKey) {
      throw new ForbiddenError(
        'hasAppInfoHeader-no-x-api-key-header',
        'x-api-key header is not present',
      );
    }
    /**
     * * check if x-app-id header exists
     * * if there is no x-app-id header send 403 ForbiddenError
     * @function ForbiddenError(origin,message)
     */
    const xAppId = getXAppIdHeader(req);
    if (!xAppId) {
      throw new ForbiddenError(
        'hasAppInfoHeader-no-x-app-id-header',
        'x-app-id header is not present',
      );
    }
    /**
     * * check if x-app-version header exists
     * * if there is no x-app-version header send 403 ForbiddenError
     * @function ForbiddenError(origin,message)
     */
    const xAppVersion = getXAppVersionHeader(req);
    if (!xAppVersion) {
      throw new ForbiddenError(
        'hasAppInfoHeader-no-x-app-version-header',
        'x-app-version header is not present',
      );
    }
    res.locals.appInfoHeaders = { xApiKey, xAppId, xAppVersion };
    next();
  } catch (error: any) {
    error.origin = error.origin ? error.origin : 'hasAppInfoHeader-base-error:';
    next(error);
  }
};
