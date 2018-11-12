const express = require('express');
const router = express.Router();
const pedido = require('../modules/pedido/pedido');

router.get('/{:mesaId}',pedido.pedido_post);

module.exports=router;