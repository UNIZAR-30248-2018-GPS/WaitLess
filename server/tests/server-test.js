var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Platos', function() {
  it('Deberia listar todos los ingredientes /ingredientes/<id> GET');
});

it('Deberia listar todos los ingredientes /ingredientes/<id> GET', function(done) {
    chai.request(server)
      .get('/api/plato/ingredientes/91')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });