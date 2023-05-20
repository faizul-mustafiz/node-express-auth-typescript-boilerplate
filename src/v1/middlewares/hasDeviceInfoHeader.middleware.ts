import { NextFunction, Request, Response } from 'express';
import { getXDeviceInfoHeader } from '../utility/header.utility';
import { ForbiddenError } from '../errors/ForbiddenError';

export const HasDeviceInfoHeader = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**
     * * check if x-app-version header exists
     * * if there is no x-app-version header send 403 ForbiddenError
     * @function ForbiddenError(origin,message)
     */
    const xDeviceInfo = getXDeviceInfoHeader(req);
    if (!xDeviceInfo) {
      throw new ForbiddenError(
        'hasDeviceInfoHeader-no-x-device-info-header',
        'x-device-info header is not present',
      );
    }
    res.locals.deviceInfoHeaders = { xDeviceInfo };
    next();
  } catch (error: any) {
    error.origin = error.origin
      ? error.origin
      : 'hasDeviceInfoHeader-base-error:';
    next(error);
  }
};
