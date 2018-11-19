const express = require('express');
const swaggerUI = require('swagger-ui-express');
const expressVue = require('express-vue');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./WaitLess-swagger/api/swagger/swagger.yaml');
var bodyParser = require('body-parser')


const app = express();
const port = 3030;

const routerCarta = require('./server/routes/carta');
const routerPedido = require('./server/routes/pedido');
const routerBebida = require('./server/routes/bebida');
const routerPlato = require('./server/routes/plato');
const routerServicio = require('./server/routes/servicio');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/swagger-raw',express.static('WaitLess-swagger/api/swagger/swagger.yaml'));
app.use('/api/carta',routerCarta);
app.use('/api/pedido',routerPedido);
app.use('/api/bebida',routerBebida);
app.use('/api/plato',routerPlato);
app.use('/api/servicio',routerServicio);


//Lanzamos el servidor
app.listen(port, function () {
    console.log("Servidor escuchando en puerto "+port);
});