const redis = require('redis');
const client = redis.createClient();
const bd = require('../../database/querys');
const Enum = require('enum');
const tipo = new Enum({'pendiente':0,'preparado':1,'servido':2},{ignoreCase: true});

const pedido_post = function (req,res) {
    var pedido = {
        mesa: req.params.mesaId,
        ...req.body
    };
    bd.addPedido(pedido,function (err) {
        if(err){
            console.log(err);
            res.statusCode=500;
        }else {
            pub.publish("pedidos", JSON.stringify(pedido), redis.print);
            res.statusCode=201;
        }
        res.end();
    });

};

const pedido_get = function(req,res){
    sub.subscribe("pedidos");
    //TODO: Websockets mejor
    sub.on("message",function (channel,message) {
        console.log(message);
        request.on('error',function (err) {
            sub.unsubscribe();
            sub.quit();
            res.send('500',err);
        }).pipe(message);
    })
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
    pedido_get : pedido_get,
    pedido_servido: pedido_servido,
    pedido_preparado: pedido_preparado
};