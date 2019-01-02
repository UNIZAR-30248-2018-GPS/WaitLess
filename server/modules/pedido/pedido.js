const redis = process.env.NODE_ENV==='test' ? require('redis-mock') : require('redis');
const sub = redis.createClient(), pub = redis.createClient();
const bd = require('../../database/querys');
const Enum = require('enum');

/** @var estado_pedido Variable que guarda los estados disponibles para un pedido
 * @type {Enum}
 */
const estado_item = new Enum({'pendiente':0,'servido':1},{ignoreCase: true});

/**
 * Funcion que trata los nuevos pedidos que entran en la aplicacion
 * @param req request http, contiene:
 *          -body
 * @param res
 */
const pedido_post = function (req,res) {
    var pedido = {
        mesa: req.query.mesaId,
        ...req.body
    };
    bd.addPedido(pedido,function (err,pedidoId) {
        var response='';
        if(err){
            console.log(err);
            res.statusCode=500;
            bd.borrar_pedido(pedidoId,function () {
                console.log('Pedido no añadido');
            });
        }else {
            console.log(pedido);
            pub.publish("pedidos", JSON.stringify(pedido), redis.print);
            res.statusCode=201;
            res.setHeader('Content-Type', 'application/json');
            response={pedidoId:pedidoId};
        }

        res.send(response);
        res.end();
    });

};

/**
 *
 * @param req
 * @param res
 */
const pedido_get = function(req,res){
    sub.subscribe("pedidos");
    //TODO: Websockets mejor
/*    sub.on("message",function (channel,message) {
        console.log(message);
        request.on('error',function (err) {
            sub.unsubscribe();
            sub.quit();
            res.send('500',err);
        }).pipe(message);
    })*/
    bd.getPedido(function (err,pedidos) {
        if(err){
            res.sendStatus('500');
        }else{
            res.send(pedidos);
        }
    })
};

const pedido_get_ws = function (ws,req) {
    console.log("websockets connection");
    ws.on('message',function (msg) {
        ws.send(msg);
    });
    sub.subscribe("pedidos");
    sub.on("message",function (channel,message) {
        console.log(message);
        ws.send(message);
    });
    //TODO:Comprobar pedidos pendientes en la base de datos y enviarlos a cocina
    //TODO: Añadir ping para quitar conexiones

    bd.getPedidoSinTerminar(function (err,pedidos){
        if(err){
            console.log(err);
        }else{
            pedidos.forEach(function (pedido) {
                pub.publish("pedidos", JSON.stringify(pedido), redis.print);
            });
        }
    });
};

const pedido_servido = function (req,res) {
    let data = [
        estado_item.get('servido').value,
        req.params.numPedido,
    ];
    bd.actualizar_pedido(data, res);
};

module.exports = {
    pedido_post : pedido_post,
    pedido_get : pedido_get,
    pedido_get_ws : pedido_get_ws,
    pedido_servido: pedido_servido,
};