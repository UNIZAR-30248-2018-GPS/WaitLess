var path = require('path');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');
const swaggerDoc = YAML.load('./WaitLess-swagger/api/swagger/swagger.yaml');
const app = express();
const port = 3030;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const routerCarta = require('./server/routes/carta');
const routerPedido = require('./server/routes/pedido');
app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/swagger-raw',express.static('WaitLess-swagger/api/swagger/swagger.yaml'));
app.use('/api/carta',routerCarta);
app.use('/api/pedido',routerPedido);

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {
    res.sendFile('./public/index.html',{root : __dirname });
});
//Lanzamos el servidor
app.listen(port, function () {
    console.log("Servidor escuchando en puerto "+port);
});



