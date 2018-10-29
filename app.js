const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./WaitLess-swagger/api/swagger/swagger.yaml');
const app = express();

app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/swagger-raw',express.static('WaitLess-swagger/api/swagger/swagger.yaml'));
app.listen(3030);