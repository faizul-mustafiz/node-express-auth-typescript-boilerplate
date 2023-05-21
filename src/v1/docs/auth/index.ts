import signIn from './signIn';
import signUp from './signUp';
import signOut from './signOut';
import verify from './verify';
import forgotPassword from './forgotPassword';
import changePassword from './changePassword';
import refresh from './refresh';
import revokeAT from './revokeAT';
import revokeRT from './revokeRT';

export = {
  '/auth/sign-in': {
    ...signIn,
  },
  '/auth/sign-up': {
    ...signUp,
  },
  '/auth/verify': {
    ...verify,
  },
  '/auth/sign-out': {
    ...signOut,
  },
  '/auth/forgot-password': {
    ...forgotPassword,
  },
  '/auth/change-password': {
    ...changePassword,
  },
  '/auth/refresh': {
    ...refresh,
  },
  '/auth/revoke-at': {
    ...revokeAT,
  },
  '/auth/revoke-rt': {
    ...revokeRT,
  },
};
