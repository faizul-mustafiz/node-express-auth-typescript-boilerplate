import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { Logger } from '../loggers/logger';
import {
  applicationCreateRequestBody,
  applicationUpdateRequestBody,
} from '../validators/applicationRequestBody.validator';

export const ValidateApplicationCreateRequestBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**
     * * check if {appName, origin, appUser} is present in request body and validate using joi
     * * if any of these not provided send 400 BadRequestError
     * @function BadRequestError(origin,message)
     */
    const result = await applicationCreateRequestBody.validateAsync(req.body);
    Logger.debug(
      'application-create-request-body-validation-result: %s',
      result,
    );
    next();
  } catch (error: any) {
    const errorMessage = `Any of these fields {appName, origin, appUser} not provided or incorrect. ${error.details[0].message}`;
    error = new BadRequestError(
      'validateApplicationRequestBody-error',
      errorMessage,
    );
    next(error);
  }
};

export const ValidateApplicationUpdateRequestBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**
     * * check if {appName, origin, appUser} is present in request body and validate using joi
     * * if any of these not provided send 400 BadRequestError
     * @function BadRequestError(origin,message)
     */
    const result = await applicationUpdateRequestBody.validateAsync(req.body);
    Logger.debug(
      'application-update-request-body-validation-result: %s',
      result,
    );
    next();
  } catch (error: any) {
    const errorMessage = `Any of these fields {appName, origin, appUser} not provided or incorrect. ${error.details[0].message}`;
    error = new BadRequestError(
      'validateApplicationRequestBody-error',
      errorMessage,
    );
    next(error);
  }
};
