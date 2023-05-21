import createApplication from './createApplication';
import deleteApplication from './deleteApplication';
import getAllApplications from './getAllApplications';
import getApplication from './getApplication';
import updateApplication from './updateApplication';

export = {
  '/applications': {
    ...createApplication,
    ...getAllApplications,
  },
  '/applications/{appId}': {
    ...getApplication,
    ...updateApplication,
    ...deleteApplication,
  },
};
