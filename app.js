const express = require('express');
const swaggerUI = require('swagger-ui-express');
const expressVue = require('express-vue');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./WaitLess-swagger/api/swagger/swagger.yaml');
const app = express();
const port = 3030;

const routerCarta = require('./server/routes/carta');
const routerPedido = require('./server/routes/pedido');
app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/swagger-raw',express.static('WaitLess-swagger/api/swagger/swagger.yaml'));
app.use('/api/carta',routerCarta);
app.use('/api/pedido}',routerPedido);

//Lanzamos el servidor
app.listen(port, function () {
    console.log("Servidor escuchando en puerto "+port);
});