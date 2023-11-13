import { NextFunction, Request, Response } from 'express';
import { Application } from '../models/application.model';
import { Logger } from '../loggers/logger';
import { NonAuthoritativeError } from '../errors/NonAuthoritativeError';
import { Created, Success } from '../responses/httpResponse';
import { ApplicationControllerOrigin } from '../enums/applicationControllerOrigin.enum';
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import {
  deleteApplicationCredentialFromRedis,
  generateApplicationCredentialData,
  setApplicationCredentialToRedis,
} from '../helpers/applicationCredential.helper';

export const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await Application.find();
    const count = await Application.count();
    Logger.debug('getAllApplications-result: %s', result);
    Logger.info('getAllApplications-count: %s', count);
    /**
     * * if there is no application in the applications collection send 203 NonAuthoritativeError
     * @function NonAuthoritativeError(origin,message)
     */
    if (count === 0) {
      throw new NonAuthoritativeError(
        'getAllApplications-count-zero',
        'Applications collection is Empty',
      );
    }
    return Success(res, {
      message: 'Successfully found all applications documents',
      result,
    });
  } catch (error: any) {
    error.origin = error.origin
      ? error.origin
      : ApplicationControllerOrigin.getAllApplications;
    next(error);
  }
};

export const getOneApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    Logger.debug('getOneApplication: %s', req.params);
    /**
     * * if there is no appId in request param send 404 NotFoundError
     * @function NotFoundError(origin,message)
     */
    const { appId } = req.params;
    if (!appId) {
      throw new NotFoundError(
        'getOneApplication-no-appId-param',
        'Invalid path not found',
      );
    }
    /**
     * * if there is no data for provided appId in request param send 404 NotFoundError
     * @function NotFoundError(origin,message)
     */
    const result = await Application.findOne({ appId });
    Logger.debug('application-get-result: %s', result);
    if (!result) {
      throw new NotFoundError(
        'getOneApplication-no-application-with-provided-id',
        'No document found by this request',
      );
    }
    return Success(res, {
      message: 'Successfully found application document',
      result,
    });
  } catch (error: any) {
    error.origin = error.origin
      ? error.origin
      : ApplicationControllerOrigin.getOneApplication;
    next(error);
  }
};

export const createOneApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { appName } = req.body;
    Logger.debug('appName: %s', appName);
    const existingApplication = await Application.appNameExists(appName);
    if (existingApplication) {
      throw new BadRequestError(
        'createOneApplication-application-exists:',
        'An application with this name already exists',
      );
    }
    const generatedApplicationData = generateApplicationCredentialData();
    const applicationObject = { ...generatedApplicationData, ...req.body };
    await setApplicationCredentialToRedis(applicationObject);
    const application = new Application(applicationObject);
    Logger.debug('application: %s', application);
    const result = await application.save();
    return Created(res, {
      message: 'Application created',
      result,
    });
  } catch (error: any) {
    error.origin = error.origin
      ? error.origin
      : ApplicationControllerOrigin.createOneApplication;
    next(error);
  }
};

export const updateOneApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**
     * * if there is no appId in request param send 404 NotFoundError
     * @function NotFoundError(origin,message)
     */
    const { appId } = req.params;
    if (!appId) {
      throw new NotFoundError(
        'updateOneApplication-no-appId-param',
        'Invalid path not found',
      );
    }

    const { appName } = req.body;
    if (appName) {
      const existingApplication = await Application.appNameExists(appName);
      Logger.debug('existingApplication: %s', existingApplication);
      /**
       * * if the updating appName matches to an existing appName send 400 BadRequestError
       * @function BadRequestError(origin,message)
       */
      if (existingApplication && existingApplication?.appId != appId) {
        throw new BadRequestError(
          'update-appName-is-of-an-existing-appName',
          'There is already an application present with provided application name for update. Try another name',
        );
      }
    }

    const updatingApplicationDocument = await Application.findOne({ appId });
    Logger.debug(
      'updatingApplicationDocument: %s',
      updatingApplicationDocument,
    );
    if (!updatingApplicationDocument) {
      throw new NotFoundError(
        'updateOneApplication-no-application-with-provided-id',
        'No document found by this request',
      );
    }
    let changes = { ...req.body };
    Logger.debug('changes: %s', changes);
    const updatedApplication = Object.assign(
      updatingApplicationDocument,
      changes,
    );
    Logger.debug('updatedApplication: %s', updatedApplication);
    await setApplicationCredentialToRedis(updatingApplicationDocument);
    const result = await updatedApplication.save();
    Logger.debug('result: %s', result);
    return Success(res, {
      message: 'Successfully updated application',
      result: result,
    });
  } catch (error: any) {
    error.origin = error.origin
      ? error.origin
      : ApplicationControllerOrigin.updateOneApplication;
    next(error);
  }
};

export const deleteOneApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**
     * * if there is no appId in request param send 404 NotFoundError
     * @function NotFoundError(origin,message)
     */
    const { appId } = req.params;
    if (!appId) {
      throw new NotFoundError(
        'deleteOneApplication-no-appId-param',
        'Invalid path not found',
      );
    }
    /**
     * * if there is no data for provided appId in request param send 404 NotFoundError
     * @function NotFoundError(origin,message)
     */
    const application = await Application.findOne({ appId });
    if (!application) {
      throw new NotFoundError(
        'deleteOneApplication-no-application-with-provided-id',
        'No document found by this request',
      );
    }
    await deleteApplicationCredentialFromRedis(appId);
    const result = await Application.findOneAndDelete({ appId });
    return Success(res, {
      message: 'Successfully deleted application',
      result: result,
    });
  } catch (error: any) {
    error.origin = error.origin
      ? error.origin
      : ApplicationControllerOrigin.deleteOneApplication;
    next(error);
  }
};
