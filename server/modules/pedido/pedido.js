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
 * @param req
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
            let pedido_parseado={};
            pedido_parseado.num_pedido = pedidoId;
            pedido_parseado.mesa = pedido.mesa;
            pedido_parseado.items = pedido.items;
            pedido_parseado.items.forEach(function (item) {
                item.estado=0;
            });
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
 * Función que obtiene los pedidos a través de Redis. En caso de error devuelve
 * un código de error 500
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
/**
 * Funcion API web que recibe la conexion Websockets y envía a traves de este los pedidos cacheados
 * en Redis , o los pedidos pendientes almacenados en BD en caso de que no haya ninguno cacheado.
 *
 * @param ws Objeto conexion websocket entrante, recibida a través de Middleware
 * @param req Objeto request que contiene los headers y datos Http iniciales.'
 */
const pedido_get_ws = function (ws,req) {
    console.log("websockets connection");
    ws.on('message',function (msg) {
        ws.ping(msg,false,true);
    });
    sub.subscribe("pedidos");
    sub.on("message",function (channel,message) {
        console.log(message);
        ws.send(message);
    });
    //TODO: Añadir ping para quitar conexiones

    bd.getPedidoSinTerminar(function (err,pedidos){
        if(err){
            console.log(err);
        }else{
            pedidos.forEach(function (pedido) {
                let pedido_parseado={};
                pedido_parseado.num_pedido = pedido.num_pedido ? pedido.num_pedido:'';
                pedido_parseado.mesa = pedido.mesa;
                let array_item_nombre = pedido.item_nombre.split(',');
                let array_item_estado = pedido.item_estado.split(',');
                let array_item_comentario = pedido.item_comentario.split(',');
                let i=0;
                pedido_parseado.item=[];
                while(i<array_item_nombre.length){
                    pedido_parseado.item.push({nombre:array_item_nombre[i],estado:array_item_estado[i],comentario:array_item_comentario[i]});
                    i++;
                }
                ws.send(JSON.stringify(pedido_parseado));
            });
        }
    });
};

/**
*
* @param req
* @param res
**/
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
