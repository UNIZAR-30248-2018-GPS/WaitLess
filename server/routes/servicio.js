const express = require('express');
const router = express.Router();
const servicio = require('../modules/servicio/avisos');
const pedido = require('../modules/pedido/pedido');

router.get('/listarAvisos',servicio.get_all_avisos);
router.post('/llamarCamarero/:mesa',servicio.call_camarero_avisos);
router.post('/pedirCuenta/:num_pedido',servicio.pedir_cuenta);
router.post('/finalizarCuenta/:num_pedido',servicio.finalizar_cuenta);
router.ws('/ws',pedido.pedido_camarero_get_ws);


module.exports=router;