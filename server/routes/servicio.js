const express = require('express');
const router = express.Router();
const servicio = require('../modules/servicio/avisos');

router.get('/listarAvisos',servicio.get_all_avisos);
router.post('/llamarCamarero/:mesa',servicio.call_camarero_avisos);
router.post('/pedirCuenta/:num_pedido',servicio.pedir_cuenta);


module.exports=router;