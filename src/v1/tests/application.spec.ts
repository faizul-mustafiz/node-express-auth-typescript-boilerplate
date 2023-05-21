/**
 * * import baseRoute, Application model and test static data
 */
import { Server } from '../../../index';
import { AppConfig } from '../configs/app.config';
import { User } from '../models/user.model';
import { Application } from '../models/application.model';
import { deleteDataFromRedis } from '../helpers/redis.helper';
const { baseRoute } = AppConfig;
import {
  testApplicationCreateRequestBody,
  testApplicationUpdateRequestBody,
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
chai.use(chaiHttp);

/**
 * * global variables needed for the entire test file
 */
let xAppId = '';
let xApiKey = '';
let xApiSecret = '';
let xApiMinVersion = '';
/**
 * * all global variable reset method
 */
const resetAllTestVariables = () => {
  xAppId = '';
  xApiKey = '';
  xApiSecret = '';
  xApiMinVersion = '';
};
/**
 * * application controller endpoint test cases
 */
describe('Application controller test', () => {
  /**
   * @before will run at the start of the test cases
   * * here we delete all the old data from auth_test_db
   * * applications collection
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
   * * also we do not need to perform any delete operation here
   * * as application delete test case does that for us
   */
  after((done) => {
    resetAllTestVariables();
    deleteDataFromRedis();
    done();
  });
  /**
   * * perform application creation process as entire application test file use
   * * the created application to get edit and delete
   */
  describe('[POST] /applications | Application creation test', () => {
    it('it should create-one-application in applications collection', (done) => {
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
   * * get-all-application process test cases.
   */
  describe('[GET] /applications |Get All Applications Process Test', () => {
    it('it should get-all-applications form applications collection', (done) => {
      chai
        .request(Server)
        .get(`${baseRoute}/applications`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('array');
          res.body.result[0].should.have.property('_id');
          res.body.result[0].should.have.property('appId').eql(xAppId);
          res.body.result[0].should.have.property('apiKey').eql(xApiKey);
          res.body.result[0].should.have.property('apiSecret').eql(xApiSecret);
          res.body.result[0].should.have
            .property('appMinVersion')
            .eql(xApiMinVersion);
          res.body.result[0].should.have.property('appName');
          res.body.result[0].should.have.property('origin');
          res.body.result[0].should.have.property('status');
          res.body.result[0].should.have.property('created_at');
          res.body.result[0].should.have.property('created_at');
          done();
        });
    });
  });
  /**
   * * get-one-application process test cases
   */
  describe('[GET] /applications/{appId} |Get One Application Process Test', () => {
    it('it should get-one-application form applications collection', (done) => {
      chai
        .request(Server)
        .get(`${baseRoute}/applications/${xAppId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have.property('_id');
          res.body.result.should.have.property('appId').eql(xAppId);
          res.body.result.should.have.property('apiKey').eql(xApiKey);
          res.body.result.should.have.property('apiSecret').eql(xApiSecret);
          res.body.result.should.have
            .property('appMinVersion')
            .eql(xApiMinVersion);
          res.body.result.should.have.property('appName');
          res.body.result.should.have.property('origin');
          res.body.result.should.have.property('status');
          res.body.result.should.have.property('created_at');
          res.body.result.should.have.property('created_at');
          done();
        });
    });
  });
  /**
   * * update-one-application process test cases. here we will use updatable
   * * keys of application object (appName, origin, appUser and status).
   * * all the other keys are generated and can not be updated.
   */
  describe('[POST] /applications/{appId} |Update One Application Process Test', () => {
    it('it should update-one-application form applications collection', (done) => {
      chai
        .request(Server)
        .post(`${baseRoute}/applications/${xAppId}`)
        .send(testApplicationUpdateRequestBody)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have.property('_id');
          res.body.result.should.have.property('appId').eql(xAppId);
          res.body.result.should.have.property('apiKey').eql(xApiKey);
          res.body.result.should.have.property('apiSecret').eql(xApiSecret);
          res.body.result.should.have
            .property('appMinVersion')
            .eql(xApiMinVersion);
          res.body.result.should.have
            .property('appName')
            .eql(testApplicationUpdateRequestBody.appName);
          res.body.result.should.have
            .property('origin')
            .eql(testApplicationUpdateRequestBody.origin);
          res.body.result.should.have
            .property('status')
            .eql(testApplicationUpdateRequestBody.status);
          res.body.result.should.have
            .property('appUser')
            .eql(testApplicationUpdateRequestBody.appUser);
          res.body.result.should.have.property('created_at');
          res.body.result.should.have.property('created_at');
          done();
        });
    });
  });
  /**
   * * delete-one-application process test cases
   */
  describe('[DELETE] /applications/{appId} |Delete One Application Process Test', () => {
    it('it should delete-one-application form applications collection', (done) => {
      chai
        .request(Server)
        .delete(`${baseRoute}/applications/${xAppId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.a('object');
          res.body.result.should.have.property('_id');
          res.body.result.should.have.property('appId').eql(xAppId);
          res.body.result.should.have.property('apiKey').eql(xApiKey);
          res.body.result.should.have.property('apiSecret').eql(xApiSecret);
          res.body.result.should.have
            .property('appMinVersion')
            .eql(xApiMinVersion);
          res.body.result.should.have
            .property('appName')
            .eql(testApplicationUpdateRequestBody.appName);
          res.body.result.should.have
            .property('origin')
            .eql(testApplicationUpdateRequestBody.origin);
          res.body.result.should.have
            .property('status')
            .eql(testApplicationUpdateRequestBody.status);
          res.body.result.should.have
            .property('appUser')
            .eql(testApplicationUpdateRequestBody.appUser);
          res.body.result.should.have.property('created_at');
          res.body.result.should.have.property('created_at');
          done();
        });
    });
  });
});
