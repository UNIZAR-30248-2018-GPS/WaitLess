var chai = require('chai');
var chaiHttp = require('chai-http');
var WebSocket = require('ws');
//Variable de entrono para mockear redis
process.env.NODE_ENV = 'test';
var server = require('../app');
var should = chai.should();
var bd = require('../database/querys');
var tipos_de_item_carta = require('../modules/carta/carta').tipos;

chai.use(chaiHttp);

/**
* Tests de carta
*/
describe('Carta', function () {

    /**
    * Test que hace una petición GET a /api/carta y comprueba que se devuelve un
    * estado 200
    */
    it('Deberia listar toda la carta /carta GET',function (done) {
        chai.request(server)
            .get('/api/carta')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    /**
    * Test que hace una petición GET a /api/carta indicando un tipo y comprueba
    * que se devuelve un estado 200
    */
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

/**
* Tests de platos
*/
describe('Platos', function() {

    /**
    * Test que hace una petición GET a /api/plato/ingredientes/91 y comprueba
    * que se devuelve un estado 200
    */
    it('Deberia listar todos los ingredientes /ingredientes/<id> GET', function(done) {
        chai.request(server)
            .get('/api/plato/ingredientes/91')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    /**
    * Test que hace una petición GET a /api/plato/ingredientes/90 y comprueba
    * que se devuelve un estado 204 puesto que el plato no existe
    */
    it('NO Deberia listar ningún ingrediente /ingredientes/<id> GET', function(done) {
        chai.request(server)
            .get('/api/plato/ingredientes/90')
            .end(function(err, res){
                res.should.have.status(204);
                done();
            });
    });

    /**
    * Test que hace una petición GET a /api/plato/alergenos/91 y comprueba
    * que se devuelve un estado 200
    */
    it('Deberia listar todos los alergenos /alergenos/<id> GET', function(done) {
        chai.request(server)
            .get('/api/plato/alergenos/91')
            .end(function(err, res){
                res.should.have.status(204);
                done();
            });
    });

    /**
    * Test que hace una petición GET a /api/plato/ingredientes/89 y comprueba
    * que se devuelve un estado 204 puesto que el plato no existe
    */
    it('No Deberia listar todos los alergenos /alergenos/<id> GET', function(done) {
        chai.request(server)
            .get('/api/plato/alergenos/89')
            .end(function(err, res){
                res.should.have.status(204);
                done();
            });
    });

    /**
    * Test que realiza una petición POST a /api/plato/nuevoPlato con los
    * atributos para crear un nuevo plato y comprueba que se recibe un estado
    * 200 indicando que se ha creado
    */
    it('Deberia añadir un plato  /nuevoPlato/<nombre>/<descripcion>/<precio>/<tipo> POST', function(done) {
        chai.request(server)
            .post('/api/plato/nuevoPlato/plato-test/Este plato esta siendo probado/5/1')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    /**
    * Test que realiza una petición POST a /api/plato/nuevoPlato con los
    * atributos mal creados y comprueba que se recibe un estado
    * 404 indicando que no se encuentra el plato y, por lo tanto, no se ha creado
    */
    it('NO deberia añadir un plato  /nuevoPlato/<nombre>/<descripcion>/<precio>/<tipo> POST', function(done) {
        chai.request(server)
            .post('/api/plato/nuevoPlato//Gulas/Este plato no deberia//0')
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
    });

    /**
    * Test que realiza una petición POST a /api/plato/modificarPlato con los
    * atributos para modificar un nuevo plato y comprueba que se recibe un estado
    * 200 indicando que se ha modificado
    */
    it('Deberia modificar un plato  /modificarPlato/<nuevonombre>/<descripcion>/<precio>/<tipo>/<id> POST', function(done) {
        chai.request(server)
            .post('/api/plato/modificarPlato/Pimientos del piquillo/unos pican otros no/4/0/1/81')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    /**
    * Test que realiza una petición POST a /api/plato/modificarPlato con los
    * atributos de un plato no válido y comprueba que se recibe un estado
    * 201 indicando que no se ha modificado
    */
    it('NO deberia modificar un plato  /modificarPlato/<nuevonombre>/<descripcion>/<precio>/<tipo>/<id> POST', function(done) {
        chai.request(server)
            .post('/api/plato/modificarPlato/No deberia modificar/ No se modifica/4/0/1/12')
            .end(function(err, res){
                res.should.have.status(201);
                done();
            });
    });

    /**
    * Test que realiza una petición POST a /api/plato/borrarPlato con el
    * atributo nombre para borrar un plato y comprueba que se recibe un estado
    * 200 indicando que se ha eliminado
    */
    it('Deberia borrar un plato  /borrarPlato/<nombre> POST', function(done) {
        chai.request(server)
            .post('/api/plato/borrarPlato/plato-test')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    /**
    * Test que realiza una petición POST a /api/plato/borrarPlato con el
    * atributo nombre inválido para borrar un plato y comprueba que se recibe un
    * estado 201 indicando que no se ha eliminado
    */
    it('NO deberia borrar un plato  /borrarPlato/<nombre> POST', function(done) {
        chai.request(server)
            .post('/api/plato/borrarPlato/plato-no-existe')
            .end(function(err, res){
                res.should.have.status(201);
                done();
            });
    });


    /**
    * Test que realiza una petición get a /api/plato/getAllIngrendientes 
    * y comprueba que se recibe un estado
    * 200 indicando que se han devuelto todos los ingredientes
    */
   it('Deberia devolver todos los ingredientes /getAllIngredientes/ GET', function(done) {
    chai.request(server)
        .get('/api/plato/getAllIngredientes/')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        }); 
    });

    /**
    * Test que realiza una petición get a /api/plato/getAlergenos 
    * y comprueba que se recibe un estado
    * 200 indicando que se han devuelto todos los alergenos
    */
   it('Deberia devolver todos los alergenos /getAllAlergenos/ GET', function(done) {
    chai.request(server)
        .get('/api/plato/getAllAlergenos/')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        }); 
    });

    /**
    * Test que realiza una petición post a /api/plato/borrarDisponibilidad/ 
    * y comprueba que se modifica quitando la disponibilidad meidante el
    * código 200 
    */
   it('Deberia borrar la Disponibilidad de un plato /borrarDisponibilidad/<id_plato> POST', function(done) {
    chai.request(server)
        .post('/api/plato/borrarDisponibilidad/81')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        }); 
    });

    /**
    * Test que realiza una petición post a /api/plato/borrarDisponibilidad/ 
    * y comprueba que no se modifica quitando la disponibilidad meidante el
    * código 201 
    */
   it('NO Deberia borrar la Disponibilidad de un plato /borrarDisponibilidad/<id_plato> POST', function(done) {
    chai.request(server)
        .post('/api/plato/borrarDisponibilidad/74')
        .end(function(err, res){
            res.should.have.status(201);
            done();
        }); 
    });

    /**
    * Test que realiza una petición post a /api/plato/darDisponibilidad/
    * y comprueba que se modifica dando la disponibilidad meidante el
    * código 200 
    */
   it('Deberia dar la Disponibilidad a un plato /darDisponibilidad/<id_plato> POST', function(done) {
    chai.request(server)
        .post('/api/plato/darDisponibilidad/81')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        }); 
    });

    /**
    * Test que realiza una petición post a /api/plato/darDisponibilidad/ 
    * y comprueba que no se modifica dando la disponibilidad meidante el
    * código 201 
    */
it('NO Deberia dar la Disponibilidad a un plato /darDisponibilidad/<id_plato> POST', function(done) {
    chai.request(server)
        .post('/api/plato/darDisponibilidad/74')
        .end(function(err, res){
            res.should.have.status(201);
            done();
        }); 
    });


    /**
    * Test que realiza una petición post a /api/plato/anadir_despensa/
    * y comprueba que se ha añadido un plato a la despensa meidante el
    * código 200 
    */
   it('Deberia anadir a la despensa  un plato /anadir_despensa/<id_plato> POST', function(done) {
    chai.request(server)
        .post('/api/plato/anadir_despensa/pimienta')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        }); 
    });

     /**
    * Test que realiza una petición post a /api/plato/anadir_despensa/
    * y comprueba que no se ha añadido un plato a la despensa meidante el
    * código 204 
    */
   it('NO Deberia anadir a la despensa  un plato /anadir_despensa/<id_plato> POST', function(done) {
    chai.request(server)
        .post('/api/plato/anadir_despensa/ ')
        .end(function(err, res){
            res.should.have.status(404);
            done();
        }); 
    });

   
});

   

  

/**
* Tests de Pedidos
*/
describe('Pedidos',function () {
    before(()=>{
        requester = chai.request(server).keepOpen();
    });
    after(()=>{
       requester.close();
    });
    /**
    * Test que realiza una petición POST a /api/pedido añadir un pedido y
    * comprueba que se ha añadido 
    */
    it('Deberia añadir un pedido /pedido?mesaId=<idMesa> POST',function (done) {
        chai.request(server)
            .post('/api/pedido?mesaId=5')
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

    it('Cocina Deberia recibir un pedido', function (done) {
        pedido_ws = new WebSocket('ws://localhost:3030/api/pedido/ws');
        pedido_ws.once('message',function (message) {

            let message_parsed = JSON.parse(message);
            message_parsed.should.have.property('num_pedido');
            message_parsed.num_pedido.should.not.be.empty;
            console.log(message_parsed);
            done();
        });
        pedido_ws.onopen=function () {
            pedido_ws.send('ping');
        };
    });

    it('Camarero Deberia recibir un pedido', function (done) {
        pedido_ws = new WebSocket('ws://localhost:3030/api/servicio/ws');
        pedido_ws.once('message',function (message) {

            let message_parsed = JSON.parse(message);
            message_parsed.should.have.property('header');
            message_parsed.header.should.equal('pedido');
            let message_data = message_parsed.data;
            message_data.should.have.property('num_pedido');
            message_data.num_pedido.should.not.be.empty;
            console.log(message_parsed);
            done();
        });
        pedido_ws.onopen=function () {
            pedido_ws.send(JSON.stringify({header:'pedidos'}));
        };
    })
});
