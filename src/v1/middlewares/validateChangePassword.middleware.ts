import { NextFunction, Request, Response } from 'express';
import { JWTConfig } from '../configs/jwt.config';
import { verify } from 'jsonwebtoken';
import { Logger } from '../loggers/logger';
import {
  getChangePasswordTokenIdentity,
  isChangePasswordTokenIdentityExists,
} from '../helpers/redis.helper';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const ValidateChangePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**
     * * get the passed token value form the res.locals
     */
    const token = res.locals.token;
    /**
     * * decode change password token and check if the token is a valid token
     * * jwt token related error send 401 UnauthorizedError
     * @function UnauthorizedError(origin,message)
     * * if the decoded token identity is not present in redis send 401 UnauthorizedError
     * @function UnauthorizedError(origin,message)
     * * Token is a valid token then fetch the token data from redis.
     * * if there is no data against the token identity send 401 UnauthorizedError
     * @function UnauthorizedError(origin,message)
     * * pass redis data as res.locals.validateChangePasswordResponse
     * * res.locals are persistent throughout the request life cycle or simply to say until the request is resolved
     */
    try {
      const decoded: any = verify(
        token,
        JWTConfig.changePasswordTokenConfig.secret,
      );
      Logger.debug('decoded: %s', decoded);
      if (decoded && decoded.identity) {
        const identityExists = await isChangePasswordTokenIdentityExists(
          decoded.identity,
        );
        if (!identityExists) {
          throw new UnauthorizedError(
            'validateChangePassword-token-identity-does-not-exists-in-redis',
            'Invalid token',
          );
        }
        const changePasswordTokenRedisResponse =
          await getChangePasswordTokenIdentity(decoded.identity);
        Logger.debug(
          'changePasswordTokenRedisResponse: %s',
          changePasswordTokenRedisResponse,
        );
        if (!changePasswordTokenRedisResponse) {
          throw new UnauthorizedError(
            'validateChangePassword-token-identity-data-does-not-exists-in-redis',
            'Invalid token',
          );
        } else {
          res.locals.validateChangePasswordResponse =
            changePasswordTokenRedisResponse;
          next();
        }
      }
    } catch (error: any) {
      const origin = error.origin
        ? error.origin
        : 'validateChangePassword-token-decode-error';
      throw new UnauthorizedError(origin, 'Invalid token');
    }
  } catch (error: any) {
    error.origin = error.origin
      ? error.origin
      : 'validateChangePassword-base-error:';
    next(error);
  }
};
