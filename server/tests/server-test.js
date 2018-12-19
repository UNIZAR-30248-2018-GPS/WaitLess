var chai = require('chai');
var chaiHttp = require('chai-http');
//Variable de entrono para mockear redis
process.env.NODE_ENV = 'test';
var server = require('../app');
var should = chai.should();
var bd = require('../database/querys');
var tipos_de_item_carta = require('../modules/carta/carta').tipos;

chai.use(chaiHttp);
//CARTA

describe('Carta', function () {

    it('Deberia listar toda la carta /carta GET',function (done) {
        chai.request(server)
            .get('/api/carta')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    it('Deberia listar la carta de cada tipo de item /carta?tipo=<param> GET', function (done) {
        tipos_de_item_carta.enums.forEach(function (tipo) {
            chai.request(server)
                .get('/api/carta?tipo='+tipo.key)
                .end(function (err, res) {
                    res.should.have.status(200);
                });
        });
        done();
    });
});
//PLATOS

describe('Platos', function() {

    it('Deberia listar todos los ingredientes /ingredientes/<id> GET', function(done) {
        chai.request(server)
            .get('/api/plato/ingredientes/91')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });


    it('NO Deberia listar ningún ingrediente /ingredientes/<id> GET', function(done) {
        chai.request(server)
            .get('/api/plato/ingredientes/90')
            .end(function(err, res){
                res.should.have.status(204);
                done();
            });
    });


    it('Deberia listar todos los alergenos /alergenos/<id> GET', function(done) {
        chai.request(server)
            .get('/api/plato/alergenos/91')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });


    it('No Deberia listar todos los alergenos /alergenos/<id> GET', function(done) {
        chai.request(server)
            .get('/api/plato/alergenos/89')
            .end(function(err, res){
                res.should.have.status(204);
                done();
            });
    });


    it('Deberia añadir un plato  /nuevoPlato/<nombre>/<descripcion>/<precio>/<tipo> POST', function(done) {
        chai.request(server)
            .post('/api/plato/nuevoPlato/plato-test/Este plato esta siendo probado/5/1')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });


    it('NO deberia añadir un plato  /nuevoPlato/<nombre>/<descripcion>/<precio>/<tipo> POST', function(done) {
        chai.request(server)
            .post('/api/plato/nuevoPlato//Gulas/Este plato no deberia//0')
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });


    it('Deberia modificar un plato  /modificarPlato/<nuevonombre>/<descripcion>/<precio>/<tipo>/<id> POST', function(done) {
        chai.request(server)
            .post('/api/plato/modificarPlato/Pimientos del piquillo/unos pican otros no/4/0/1/81')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });


    it('NO deberia modificar un plato  /modificarPlato/<nuevonombre>/<descripcion>/<precio>/<tipo>/<id> POST', function(done) {
        chai.request(server)
            .post('/api/plato/modificarPlato/No deberia modificar/ No se modifica/4/0/1/12')
            .end(function(err, res){
                res.should.have.status(201);
                done();
            });
    });


    it('Deberia borrar un plato  /borrarPlato/<nombre> POST', function(done) {
        chai.request(server)
            .post('/api/plato/borrarPlato/plato-test')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });


    it('NO deberia borrar un plato  /borrarPlato/<nombre> POST', function(done) {
        chai.request(server)
            .post('/api/plato/borrarPlato/plato-no-existe')
            .end(function(err, res){
                res.should.have.status(201);
                done();
            });
    });
});


//PEDIDOS
describe('Pedidos',function () {

    it('Deberia añadir un pedido /pedido/<idMesa> POST',function (done) {
        chai.request(server)
            .post('/api/pedido/5')
            .send({
                "comensales" : 1,
                "items" : [{
                    "nombre" : "Chuletón de buey",
                    "id": "91",
                    "comentario": "Con queso"
                },{
                    "nombre" : "Chuletón de buey",
                    "id": "91",
                    "comentario": ""
                },{
                    "nombre" : "Huevos fritos",
                    "id": "611",
                    "comentario": "Con puntillas"
                }]
            })
            .end(function (err,res) {
                res.should.have.status(201);
                var idPedido=res.body.pedidoId;
                bd.borrar_pedido(idPedido,function (err) {
                    done();
                });

            })
    });
});
