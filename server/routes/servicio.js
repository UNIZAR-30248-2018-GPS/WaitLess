const express = require('express');
const router = express.Router();
const servicio = require('../modules/servicio/avisos');

router.get('/listarAvisos',servicio.get_avisos);


module.exports=router;