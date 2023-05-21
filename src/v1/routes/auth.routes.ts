import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
/**
 * * application info header check and validation relate imports
 */
import { HasAppInfoHeader } from '../middlewares/hasAppInfoHeader.middleware';
import { ValidateAppInfoHeader } from '../middlewares/validateAppInfoHeader.middleware';
/**
 * * device info header check and validation relate imports
 */
import { HasDeviceInfoHeader } from '../middlewares/hasDeviceInfoHeader.middleware';
import { validateDeviceInfoHeader } from '../middlewares/validateDeviceInfoHeader.middleware';
/**
 * * JWT header check, token validator, and request body validation middleware imports
 */
import { HasAuthorization } from '../middlewares/hasAuthorization.middleware';
import { ValidateVerification } from '../middlewares/validateVerification.middleware';
import { ValidateAccess } from '../middlewares/validateAccess.middleware';
import { ValidateRefresh } from '../middlewares/validateRefresh.middleware';
import { ValidateChangePassword } from '../middlewares/validateChangePassword.middleware';
import { ValidateVerifyRequestBody } from '../middlewares/validateVerifyRequestBody.middleware';
import { ValidateAuthRequestBody } from '../middlewares/validateAuthRequestBody.middleware';
import { ValidateForgotPasswordRequestBody } from '../middlewares/validateForgotPasswordRequestBody.middleware';
import { ValidateChangePasswordRequestBody } from '../middlewares/validateChangePasswordRequestBody.middleware';

const authRouter = Router();
authRouter.post(
  '/sign-up',
  [
    HasAppInfoHeader,
    HasDeviceInfoHeader,
    ValidateAppInfoHeader,
    validateDeviceInfoHeader,
    ValidateAuthRequestBody,
  ],
  AuthController.signUp,
);
authRouter.post(
  '/sign-in',
  [
    HasAppInfoHeader,
    HasDeviceInfoHeader,
    ValidateAppInfoHeader,
    validateDeviceInfoHeader,
    ValidateAuthRequestBody,
  ],
  AuthController.signIn,
);
authRouter.post(
  '/sign-out',
  [HasAppInfoHeader, ValidateAppInfoHeader, HasAuthorization, ValidateRefresh],
  AuthController.signOut,
);
authRouter.post(
  '/verify',
  [
    HasAppInfoHeader,
    ValidateAppInfoHeader,
    HasAuthorization,
    ValidateVerifyRequestBody,
    ValidateVerification,
  ],
  AuthController.verifyAuth,
);
authRouter.post(
  '/forgot-password',
  [
    HasAppInfoHeader,
    HasDeviceInfoHeader,
    ValidateAppInfoHeader,
    validateDeviceInfoHeader,
    ValidateForgotPasswordRequestBody,
  ],
  AuthController.forgotPassword,
);
authRouter.post(
  '/change-password',
  [
    HasAppInfoHeader,
    ValidateAppInfoHeader,
    HasAuthorization,
    ValidateChangePasswordRequestBody,
    ValidateChangePassword,
  ],
  AuthController.changePassword,
);
authRouter.post(
  '/refresh',
  [HasAppInfoHeader, ValidateAppInfoHeader, HasAuthorization, ValidateRefresh],
  AuthController.refresh,
);
authRouter.post(
  '/revoke-at',
  [HasAppInfoHeader, ValidateAppInfoHeader, HasAuthorization, ValidateAccess],
  AuthController.revokeAccessToken,
);
authRouter.post(
  '/revoke-rt',
  [HasAppInfoHeader, ValidateAppInfoHeader, HasAuthorization, ValidateRefresh],
  AuthController.revokeRefreshToken,
);

export const AuthRouter = authRouter;
