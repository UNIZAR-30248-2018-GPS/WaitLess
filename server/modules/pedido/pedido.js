const redis = require('redis');
const client = redis.createClient();
const bd = require('../../database/querys');

const pedido_post = function (req,res) {
    var pedido = {
        mesa: req.params.mesa,
        ...req.body
    };
    client.publish("pedidos",pedido);
    bd.addPedido(pedido);
    res.sendStatus("201");

};

module.exports = {
    pedido_post : pedido_post
};