import { Router } from 'express';
import {
  createOneApplication,
  deleteOneApplication,
  getAllApplications,
  getOneApplication,
  updateOneApplication,
} from '../controllers/application.controller';
import {
  ValidateApplicationCreateRequestBody,
  ValidateApplicationUpdateRequestBody,
} from '../middlewares/validateApplicationRequestBody.middleware';

const applicationRouter = Router();

applicationRouter.get('/', getAllApplications);
applicationRouter.get('/:appId', getOneApplication);
applicationRouter.post(
  '/',
  [ValidateApplicationCreateRequestBody],
  createOneApplication,
);
applicationRouter.post(
  '/:appId',
  [ValidateApplicationUpdateRequestBody],
  updateOneApplication,
);
applicationRouter.delete('/:appId', deleteOneApplication);

export const ApplicationRouter = applicationRouter;
