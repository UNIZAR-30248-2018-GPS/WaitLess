const redis = require('redis');
const client = redis.createClient();
const bd = require('../../database/querys');
const Enum = require('enum');
const tipo = new Enum({'pendiente':0,'preparado':1,'servido':2},{ignoreCase: true});

const pedido_post = function (req,res) {
    var pedido = {
        mesa: req.params.mesa,
        ...req.body
    };
    client.publish("pedidos",pedido);
    bd.addPedido(pedido);
    res.sendStatus("201");

};

const pedido_preparado = function (req,res) {
    let data = [
        tipo.get('preparado').value,
        req.params.itemId,
        req.params.numPedido, 
        tipo.get('pendiente').value
    ]
    bd.actualizar_pedido(data, res);
};
const pedido_servido = function (req,res) {
    let data = [
        tipo.get('servido').value,
        req.params.itemId,
        req.params.numPedido,
        tipo.get('preparado').value
    ]
    bd.actualizar_pedido(data, res);
};

module.exports = {
    pedido_post : pedido_post,
    pedido_servido: pedido_servido,
    pedido_preparado: pedido_preparado
};