var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

//PLATOS

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

  describe('Platos', function() {
    it('Deberia listar todos los alergenos /alergenos/<id> GET');
  });
  
  it('Deberia listar todos los alergenos /alergenos/<id> GET', function(done) {
      chai.request(server)
        .get('/api/plato/alergenos/91')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });

    describe('Platos', function() {
      it('Deberia añadir un plato  /nuevoPlato/<nombre>/<descripcion>/<precio>/<tipo> POST');
    });
    
    it('Deberia añadir un plato  /nuevoPlato/<nombre>/<descripcion>/<precio>/<tipo> POST', function(done) {
        chai.request(server)
          .post('/api/plato/nuevoPlato/plato-test/Este plato esta siendo probado/5/1')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });

      describe('Platos', function() {
        it('Deberia modificar un plato  /modificarPlato/<nombre>/<descripcion>/<precio>/<tipo>/<id> POST');
      });
      
        
        it('Deberia borrar un plato  /borrarPlato/<nombre> POST', function(done) {
            chai.request(server)
              .post('/api/plato/borrarPlato/plato-test')
              .end(function(err, res){
                res.should.have.status(200);
                done();
              });
          });