import applications from './applications';
import auth from './auth';
import users from './users';

export = {
  paths: {
    ...auth,
    ...users,
    ...applications,
  },
};
