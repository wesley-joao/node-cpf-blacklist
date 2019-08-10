const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../application/config/constants');
const sequelize = require('../application/config/database');

const { expect } = chai;

chai.use(chaiHttp);

const { request } = chai;

sequelize.sync({ force: true });

const cpfTest = {
  free: { cpf: constants.CPF_TEST_FREE },
  freeWithoutFormat: { cpf: constants.CPF_TEST_FREE_WITHOUT_FORMAT },
  blocked: { cpf: constants.CPF_TEST_BLOCKED },
  blockedWithoutFormat: { cpf: constants.CPF_TEST_BLOCKED_WITHOUT_FORMAT },
};

/* Tenta Adicionar cpf */
describe('Route POST /api/v1/cpf', () => {
  it('Should add cpf to the blacklist', (done) => {
    request(constants.API_V1)
      .post('/cpf')
      .send(cpfTest.free)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.msg).to.eql(constants.MSG_CPF_ADDED_BLACKLIST);
        done();
      });
  });

  it('Should add cpf to the blacklist', (done) => {
    request(constants.API_V1)
      .post('/cpf')
      .send(cpfTest.freeWithoutFormat)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.msg).to.eql(constants.MSG_CPF_ADDED_BLACKLIST);
        done();
      });
  });
});

/* Tenta adicionar CPF já existente */
describe('Route POST /api/v1/cpf', () => {
  it('Should add cpf to the blacklist', (done) => {
    request(constants.API_V1)
      .post('/cpf')
      .send(cpfTest.free)
      .end((err, res) => {
        expect(res.status).to.eql(500);
        done();
      });
  });

  it('Should add cpf to the blacklist', (done) => {
    request(constants.API_V1)
      .post('/cpf')
      .send(cpfTest.freeWithoutFormat)
      .end((err, res) => {
        expect(res.status).to.eql(500);
        done();
      });
  });
});


/* Busca um CPF */
describe('Route GET /api/v1/cpf/:cpf', () => {
  it('Should return a cpf that is on the blacklist', (done) => {
    request(constants.API_V1)
      .get(`/cpf/${cpfTest.free.cpf}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.cpf).to.eql(constants.MSG_BLOCK);
        done();
      });
  });

  it('Should return a cpf that is on the blacklist', (done) => {
    request(constants.API_V1)
      .get(`/cpf/${cpfTest.freeWithoutFormat.cpf}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.cpf).to.eql(constants.MSG_BLOCK);
        done();
      });
  });
});

/* Busca um CPF que não está na blacklist */
describe('Route GET /api/v1/cpf/:cpf', () => {
  it('Should return a cpf that is not on the blacklist', (done) => {
    request(constants.API_V1)
      .get(`/cpf/${cpfTest.blocked.cpf}`)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.cpf).to.eql(constants.MSG_FREE);
        done();
      });
  });

  it('Should return a cpf that is not on the blacklist', (done) => {
    request(constants.API_V1)
      .get(`/cpf/${cpfTest.blockedWithoutFormat.cpf}`)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.cpf).to.eql(constants.MSG_FREE);
        done();
      });
  });
});

/* Lista todos os CPF */
describe('Route GET /api/v1/cpf', () => {
  it('Should return all cpf that is on the blacklist', (done) => {
    request(constants.API_V1)
      .get('/cpf')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });
});

/* Remove um CPF */
describe('Route DELETE /api/v1/cpf/:cpf', () => {
  it('Should delte a cpf that is on blacklist', (done) => {
    request(constants.API_V1)
      .delete(`/cpf/${cpfTest.free.cpf}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql(constants.MSG_CPF_REMOVED_BLACKLIST);
        done();
      });
  });

  it('Should delte a cpf tha is on the blacklist', (done) => {
    request(constants.API_V1)
      .delete(`/cpf/${cpfTest.freeWithoutFormat.cpf}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql(constants.MSG_CPF_REMOVED_BLACKLIST);
        done();
      });
  });
});

/* Tenta remover um CPF que não está blacklist */
describe('Route DELETE /api/v1/cpf/:cpf', () => {
  it('Should return an error', (done) => {
    request(constants.API_V1)
      .delete(`/cpf/${cpfTest.blocked.cpf}`)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.msg).to.eql(constants.MSG_CPF_NOT_FOUND_ON_BLACKLIST);
        done();
      });
  });

  it('Should return an error', (done) => {
    request(constants.API_V1)
      .delete(`/cpf/${cpfTest.blockedWithoutFormat.cpf}`)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.msg).to.eql(constants.MSG_CPF_NOT_FOUND_ON_BLACKLIST);
        done();
      });
  });
});

/* Busca status da aplicacao */
describe('Route GET /api/v1/status', () => {
  it('Should return application status', (done) => {
    request(constants.API_V1)
      .get('/status')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });
});
