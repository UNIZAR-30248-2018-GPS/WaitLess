var path = require('path');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');
const swaggerDoc = YAML.load('../WaitLess-swagger/api/swagger/swagger.yaml');
const app = express();
const port = 3030;

// CORS
app.use(function (req, res, next) {
    // Website allowed to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/swagger-raw',express.static('WaitLess-swagger/api/swagger/swagger.yaml'));
app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const routerCarta = require('./routes/carta');
app.use('/api/carta',routerCarta);

const routerPedido = require('./routes/pedido');
app.use('/api/pedido',routerPedido);

//Lanzamos el servidor
app.listen(port, function () {
    console.log("Servidor escuchando en puerto "+port);
});



