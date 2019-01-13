const redis = process.env.NODE_ENV==='test' ? require('redis-mock') : require('redis');
const pub = redis.createClient();
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
    bd.addPedido(pedido,function (err,pedidoId,arrayIdItems) {
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
            pedido_parseado.item = pedido.items;
            var i = 0;
            pedido_parseado.item.forEach(function (item) {
                item.estado=0;
                item.id = arrayIdItems[i];
                i++;
            });
            pub.publish("pedidos", JSON.stringify(pedido_parseado), redis.print);
            res.statusCode=201;
            res.setHeader('Content-Type', 'application/json');
            response={pedidoId:pedidoId};
        }

        res.send(response);
        res.end();
    });

};

/**
 * ///SUSTITUIDA POR SU VERSION DE WEBSOCKETS
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
const pedido_cocina_get_ws = function (ws,req) {
    console.log("websockets connection");
    let sub = redis.createClient();
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
                let array_item_id = pedido.item_id.split(',');
                let i=0;
                pedido_parseado.item=[];
                while(i<array_item_nombre.length){
                    pedido_parseado.item.push({id:array_item_id[i],nombre:array_item_nombre[i],estado:array_item_estado[i],comentario:array_item_comentario[i]});
                    i++;
                }
                ws.send(JSON.stringify(pedido_parseado));
            });
        }
    });
};

/**
 * Funcion que controla la conexion ws con el camarero, enviandole los pedidos que estan en cocina, como los cambios de
 * estado en los pedidos actuales. TODO:Tambien los avisos
 *
 * Todos los mesajes JSON enviados o recibidos por este websocket tendran un campo "header" que indicara el asunto y un
 * campo "data" que contendra el mensaje acutal.
 * Los headers tratados son:
 *  -pedidos: Para iniciar el envio de pedidos que lleguen a cocina
 *
 * Los headers enviados son:
 *  -pedido: Pedido que llega a cocina
 *  -estado_item: Cambio en el estado del item de un pedido concreto
 *  -estado_pedido: Cambio en el estado de un pedido
 *
 * @param ws Conexion WebSockets abierta
 * @param req Http Request inicial
 */
const pedido_camarero_get_ws = function (ws,req) {
    const sub = redis.createClient();
    sub.on("message",function (channel,message) {
        switch (channel) {
            case 'pedidos':
                console.log(message);
                ws.send({header:'pedido',data:message});
                break;
            case 'estado_item':
                ws.send({header:'estado_item',data:message});
                break;
        }

    });
    ws.on('message',function (msg) {
        ws.ping('pong',false,true); //Envio señal siempre para comprobar que la conexion esta viva
        var peticion = JSON.parse(msg);
        switch (peticion.header){ //Compruebo que tipo de peticion me llega
            case('pedidos'): //El camarero pide los pedidos que hay en cocina (Deberia ser la peticion inicial)
                sub.subscribe("pedidos");
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
                            let array_item_id = pedido.item_id.split(',');
                            let i=0;
                            pedido_parseado.item=[];
                            while(i<array_item_nombre.length){
                                pedido_parseado.item.push({id:array_item_id[i],nombre:array_item_nombre[i],estado:array_item_estado[i],comentario:array_item_comentario[i]});
                                i++;
                            }
                            ws.send(JSON.stringify({header:'pedido',data:pedido_parseado}));
                        });
                    }
                });
                break;

        }

    })
};

/**
* Funcion que cambia el estado de un pedido, cuando sus items ya han sido servidos
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
    pedido_cocina_get_ws : pedido_cocina_get_ws,
    pedido_camarero_get_ws: pedido_camarero_get_ws,
    pedido_servido: pedido_servido,
};
