import { Server } from '../../../index';
import { User } from '../models/user.model';
import { Application } from '../models/application.model';
import JsonEncryptDecryptAes from '@faizul-mustafiz/json-ed-aes';
import { AppConfig } from '../configs/app.config';
const { baseRoute } = AppConfig;
import {
  testApplicationCreateRequestBody,
  testDeviceInfo,
  testUserSignUpRequestBody,
  testUserUpdateRequestBody,
} from './common';
/**
 * * import chai, chai-http dependencies
 * * also inject Server for mocha to run tests
 * * import should aggregator from chai
 * * import expect aggregator form chai
 * * use chai-http with chai to perform http request
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

/**
 * * global variables needed for the entire test file
 */
let xAppId = '';
let xApiKey = '';
let xApiSecret = '';
let xApiMinVersion = '';
let xDeviceInfo = '';

let testUserId = '';
let verifyToken = '';
let verifyCode = '';
let accessToken = '';
let refreshToken = '';
/**
 * * all global variable reset method
 */
const resetAllTestVariables = () => {
  xAppId = '';
  xApiKey = '';
  xApiSecret = '';
  xApiMinVersion = '';
  xDeviceInfo = '';
  testUserId = '';
  verifyToken = '';
  verifyCode = '';
  accessToken = '';
  refreshToken = '';
};

/**
 * * user controller endpoint test cases
 */
describe('User controller tests', () => {
  /**
   * @before will run at the start of the test cases
   * * here we delete all the old data from auth_test_db
   * * applications collection and users collection
   */
  before((done) => {
    Application.deleteMany({}).then((result: any) => {
      User.deleteMany({}).then((result: any) => {
        done();
      });
    });
  });
  /**
   * @after will run after the last test cases of the file
   * * here we reset all the global variables used for the entire test file
   * * also we do not need to perform any delete operation here as user delete
   * * test case does that for us
   */
  after((done) => {
    resetAllTestVariables();
    done();
  });
  /**
   * * perform application creation process as entire auth test file use the created
   * * application credential as app info header and without header the test will fail
   */
  describe('[POST] /applications | Application creation test', () => {
    it('it should create-one-application and encrypt', (done) => {
      chai
        .request(Server)
        .post(`${baseRoute}/applications`)
        .send(testApplicationCreateRequestBody)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have.property('_id');
          res.body.result.should.have.property('appId');
          res.body.result.should.have
            .property('appName')
            .eql(testApplicationCreateRequestBody.appName);
          res.body.result.should.have.property('apiKey');
          res.body.result.should.have.property('apiSecret');
          res.body.result.should.have.property('appMinVersion');
          res.body.result.should.have
            .property('origin')
            .eql(testApplicationCreateRequestBody.origin);
          res.body.result.should.have.property('status');
          res.body.result.should.have.property('created_at');
          res.body.result.should.have.property('updated_at');
          xAppId = res.body.result.appId;
          xApiKey = res.body.result.apiKey;
          xApiSecret = res.body.result.apiSecret;
          xApiMinVersion = res.body.result.appMinVersion;
          done();
        });
    });
  });
  /**
   * * perform device info encryption process as this will be need to perform sing-up
   * * process as sign-up method verify custom header validator checks if a perfectly encrypted
   * * device info is preset with all the application credential custom header
   */
  describe('Device info encryption test', () => {
    it('it should encrypt a device info object using json-ed-aes encrypt()', (done) => {
      let aes = new JsonEncryptDecryptAes(xApiSecret);
      let encryptedDeviceInfo = aes.encrypt(testDeviceInfo);
      expect(encryptedDeviceInfo).to.be.string;
      xDeviceInfo = encryptedDeviceInfo;
      done();
    });
  });
  /**
   * * perform sign-up process test. Here this test will first request the /sign-up
   * * route and the get the verify token and code and using this token and code will
   * * compete sign-up using /verify route. for this verify request the accessToken
   * * and refreshToken will be stored in the global variables and used for the entire
   * * test cases of user controller. we do not need to perform users creation test as
   * * sign-up process will create one user for us
   */
  describe('[POST] /auth/sign-up |Sign-Up Process Test', () => {
    it('it should initiate sign-up process using route: [POST] /auth/sign-up', (done) => {
      chai
        .request(Server)
        .post(`${baseRoute}/auth/sign-up`)
        .set('x-app-id', xAppId)
        .set('x-api-key', xApiKey)
        .set('x-app-version', xApiMinVersion)
        .set('x-device-info', xDeviceInfo)
        .send(testUserSignUpRequestBody)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have.property('token');
          res.body.result.should.have.property('code');
          verifyToken = res.body.result.token;
          verifyCode = res.body.result.code;
          done();
        });
    });

    it('it should compete sign-up process by verifying using route: [POST] /auth/verify', (done) => {
      chai
        .request(Server)
        .post(`${baseRoute}/auth/verify`)
        .set('Authorization', `Bearer ${verifyToken}`)
        .set('x-app-id', xAppId)
        .set('x-api-key', xApiKey)
        .set('x-app-version', xApiMinVersion)
        .send({ code: verifyCode })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have
            .property('email')
            .eql(testUserSignUpRequestBody.email);
          res.body.result.should.have.property('_id');
          res.body.result.should.have.property('accessToken');
          res.body.result.should.have.property('refreshToken');
          accessToken = res.body.result.accessToken;
          refreshToken = res.body.result.refreshToken;
          done();
        });
    });
  });
  /**
   * * get-all-user process test cases. Here only one user will be returned
   * * and we will assign the _id of the result[0]._id to our global variable
   * * which we will use in our letter test cases.
   */
  describe('[GET] /users |Get All Users Process Test', () => {
    it('it should get-all-users form users collection', (done) => {
      chai
        .request(Server)
        .get(`${baseRoute}/users`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('x-app-id', xAppId)
        .set('x-api-key', xApiKey)
        .set('x-app-version', xApiMinVersion)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('array');
          res.body.result[0].should.have.property('_id');
          res.body.result[0].should.have
            .property('email')
            .eql(testUserSignUpRequestBody.email);
          res.body.result[0].should.have.property('created_at');
          res.body.result[0].should.have.property('updated_at');
          testUserId = res.body.result[0]._id;
          done();
        });
    });
  });
  /**
   * * get-one-user process test cases
   */
  describe('[GET] /users/{id} |Get One User Process Test', () => {
    it('it should get-one-user form users collection', (done) => {
      chai
        .request(Server)
        .get(`${baseRoute}/users/${testUserId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('x-app-id', xAppId)
        .set('x-api-key', xApiKey)
        .set('x-app-version', xApiMinVersion)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have.property('_id').eql(testUserId);
          res.body.result.should.have
            .property('email')
            .eql(testUserSignUpRequestBody.email);
          res.body.result.should.have.property('created_at');
          res.body.result.should.have.property('updated_at');
          done();
        });
    });
  });
  /**
   * * update-one-user process test cases. here we will use the full user update object
   * * where we will also pass email password and other objects inside testUserUpdateObj
   * * this will also satisfy one condition on our code that a user can update his/her own
   * * email if that email is not already registered. if the email exists the test will fail
   */
  describe('[POST] /users/{id} |Update One User Process Test', () => {
    it('it should update-one-user form users collection', (done) => {
      chai
        .request(Server)
        .post(`${baseRoute}/users/${testUserId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('x-app-id', xAppId)
        .set('x-api-key', xApiKey)
        .set('x-app-version', xApiMinVersion)
        .send(testUserUpdateRequestBody)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have.property('_id').eql(testUserId);
          res.body.result.should.have
            .property('email')
            .eql(testUserUpdateRequestBody.email);
          res.body.result.should.have.property('created_at');
          res.body.result.should.have.property('updated_at');
          done();
        });
    });
  });
  /**
   * * delete-one-user process test cases
   */
  describe('[DELETE] /users/{id} |Delete One User Process Test', () => {
    it('it should delete-one-user form users collection', (done) => {
      chai
        .request(Server)
        .delete(`${baseRoute}/users/${testUserId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('x-app-id', xAppId)
        .set('x-api-key', xApiKey)
        .set('x-app-version', xApiMinVersion)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have.property('_id').eql(testUserId);
          res.body.result.should.have
            .property('email')
            .eql(testUserUpdateRequestBody.email);
          res.body.result.should.have.property('created_at');
          res.body.result.should.have.property('updated_at');
          done();
        });
    });
  });
});
