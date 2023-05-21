import deleteUser from './deleteUser';
import getAllUsers from './getAllUsers';
import getUser from './getUser';
import updateUser from './updateUser';

export = {
  '/users': {
    ...getAllUsers,
  },
  '/users/{id}': {
    ...getUser,
    ...updateUser,
    ...deleteUser,
  },
};
