const express = require('express');
const router = express.Router();
const pedido = require('../modules/pedido/pedido');

router.post('/:mesaId',pedido.pedido_post);

router.post('/pedidopreparado/:numPedido/:itemId',pedido.pedido_preparado);
router.post('/pedidoservido/:numPedido/:itemId',pedido.pedido_servido);
router.get('/',pedido.pedido_get);

module.exports=router;