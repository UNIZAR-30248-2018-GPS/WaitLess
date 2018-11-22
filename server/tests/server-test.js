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

  //
  describe('Platos', function() {
    it('NO Deberia listar ningún ingrediente /ingredientes/<id> GET');
  });
  

  it('NO Deberia listar ningún ingrediente /ingredientes/<id> GET', function(done) {
      chai.request(server)
        .get('/api/plato/ingredientes/90')
        .end(function(err, res){
          res.should.have.status(204);
          done();
        });
    });

   // 
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

    //
    describe('Platos', function() {
      it('NO deberia listar todos los alergenos /alergenos/<id> GET');
    });
    
    it('No Deberia listar todos los alergenos /alergenos/<id> GET', function(done) {
        chai.request(server)
          .get('/api/plato/alergenos/89')
          .end(function(err, res){
            res.should.have.status(204);
            done();
          });
      });

      //
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

     //
     describe('Platos', function() {
      it('NO deberia añadir un plato  /nuevoPlato/<nombre>/<descripcion>/<precio>/<tipo> POST');
    });
    
    it('NO deberia añadir un plato  /nuevoPlato/<nombre>/<descripcion>/<precio>/<tipo> POST', function(done) {
        chai.request(server)
          .post('/api/plato/nuevoPlato//Gulas/Este plato no deberia//0')
          .end(function(err, res){
            res.should.have.status(404);
            done();
          });
      });

      //
      describe('Platos', function() {
        it('Deberia modificar un plato  /modificarPlato/<nuevonombre>/<descripcion>/<precio>/<tipo>/<id> POST');
      });
      
      it('Deberia modificar un plato  /modificarPlato/<nuevonombre>/<descripcion>/<precio>/<tipo>/<id> POST', function(done) {
          chai.request(server)
            .post('/api/plato/modificarPlato/Pimientos del piquillo/unos pican otros no/4/0/81')
            .end(function(err, res){
              res.should.have.status(200);
              done();
            });
        });


        //
        describe('Platos', function() {
          it('NO deberia modificar un plato  /modificarPlato/<nuevonombre>/<descripcion>/<precio>/<tipo>/<id> POST');
        });
        
        it('NO deberia modificar un plato  /modificarPlato/<nuevonombre>/<descripcion>/<precio>/<tipo>/<id> POST', function(done) {
            chai.request(server)
              .post('/api/plato/modificarPlato/No deberia modificar/ No se modifica/4/0/12')
              .end(function(err, res){
                res.should.have.status(201);
                done();
              });
          });
          
          
       // 
      describe('Platos', function() {
        it('Deberia boorar un plato  /borrarPlato/<nombre> POST');
      });
      
        
        it('Deberia borrar un plato  /borrarPlato/<nombre> POST', function(done) {
            chai.request(server)
              .post('/api/plato/borrarPlato/plato-test')
              .end(function(err, res){
                res.should.have.status(200);
                done();
              });
          });

       // 
       describe('Platos', function() {
        it('NO deberia boorar un plato  /borrarPlato/<nombre> POST');
      });
      
        
        it('NO deberia borrar un plato  /borrarPlato/<nombre> POST', function(done) {
            chai.request(server)
              .post('/api/plato/borrarPlato/plato-no-existe')
              .end(function(err, res){
                res.should.have.status(201);
                done();
              });
          });