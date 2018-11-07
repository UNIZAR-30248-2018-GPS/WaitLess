const express = require('express');
const swaggerUI = require('swagger-ui-express');
const expressVue = require('express-vue');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./WaitLess-swagger/api/swagger/swagger.yaml');
const app = express();
const port = 3030;

const routerCarta = require('./server/routes/carta');
app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/swagger-raw',express.static('WaitLess-swagger/api/swagger/swagger.yaml'));
app.use('/carta',routerCarta);

//Lanzamos el servidor
app.listen(port, function () {
    console.log("Servidor escuchando en puerto "+port);
});