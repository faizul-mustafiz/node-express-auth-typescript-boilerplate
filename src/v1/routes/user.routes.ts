import { Router } from 'express';
import { UserController } from '../controllers';
/**
 * * application info header check and validation relate imports
 */
import { HasAppInfoHeader } from '../middlewares/hasAppInfoHeader.middleware';
import { ValidateAppInfoHeader } from '../middlewares/validateAppInfoHeader.middleware';
/**
 * * JWT header check, token validator, and request body validation middleware imports
 */
import { HasAuthorization } from '../middlewares/hasAuthorization.middleware';
import { ValidateAccess } from '../middlewares/validateAccess.middleware';

const userRouter = Router();
userRouter.get(
  '/',
  [HasAppInfoHeader, ValidateAppInfoHeader, HasAuthorization, ValidateAccess],

  UserController.getAllUser,
);
userRouter.get(
  '/:userId',
  [HasAppInfoHeader, ValidateAppInfoHeader, HasAuthorization, ValidateAccess],
  UserController.getOneUser,
);
userRouter.post(
  '/:userId',
  [HasAppInfoHeader, ValidateAppInfoHeader, HasAuthorization, ValidateAccess],
  UserController.updateOneUser,
);
userRouter.delete(
  '/:userId',
  [HasAppInfoHeader, ValidateAppInfoHeader, HasAuthorization, ValidateAccess],
  UserController.deleteOneUser,
);

export const UserRouter = userRouter;
