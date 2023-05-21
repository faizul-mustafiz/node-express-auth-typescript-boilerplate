import { ApplicationStatus } from '../enums/applicationStatus.enum';

export const testUserSignUpRequestBody = {
  email: 'test@gmail.com',
  password: '123456',
};
export const testNewPassword = '12345678';
export const testUserUpdateRequestBody = {
  email: 'johndoe@gmail.com',
  password: '12345678',
  name: 'John Doe',
  avatar: 'https://pixabay.com/images/id-973460/',
  mobile: '+8801700000000',
  dob: '1990-09-09',
  organization: 'Evil Corp',
};

export const testApplicationCreateRequestBody = {
  appName: 'test_app',
  origin: 'http://test_app.com',
};
export const testApplicationUpdateRequestBody = {
  appName: 'test_app_updated',
  origin: 'http://test_app_updated.com',
  appUser: 'john_doe',
  status: ApplicationStatus.Inactive,
};
export const testDeviceInfo = {
  deviceId: '67256558250eda49',
};
