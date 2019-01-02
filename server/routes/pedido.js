const express = require('express');
const router = express.Router();
const pedido = require('../modules/pedido/pedido');

router.post('/',pedido.pedido_post);

router.post('/pedidoservido/:numPedido/:itemId',pedido.pedido_servido);
router.get('/',pedido.pedido_get);
router.ws('/ws',pedido.pedido_get_ws);
//WIP router.post('/servido',pedido.pedido_servido);

module.exports=router;