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
 * Funcion que envia un pedido/s extraido de la bd a traves de ws
 * @param pedidos Array de pedidos extraidos
 * @param ws WebSocket abierto
 * @param camarero Booleano que indica si se envia el pedido para camarero o cocina
 * @param header Header que se incluye en el caso de camarero
 */
function send_pedido(pedidos, ws, camarero=false,header) {
    pedidos.forEach(function (pedido) {
        let pedido_parseado = {};
        pedido_parseado.num_pedido = pedido.num_pedido ? pedido.num_pedido : '';
        pedido_parseado.mesa = pedido.mesa;
        let array_item_nombre = pedido.item_nombre.split(',');
        let array_item_estado = pedido.item_estado.split(',');
        let array_item_comentario = pedido.item_comentario.split(',');
        let array_item_id = pedido.item_id.split(',');
        let i = 0;
        pedido_parseado.item = [];
        while (i < array_item_nombre.length) {
            pedido_parseado.item.push({
                id: array_item_id[i],
                nombre: array_item_nombre[i],
                estado: array_item_estado[i],
                comentario: array_item_comentario[i]
            });
            i++;
        }if(camarero){
            ws.send(JSON.stringify({header:header,data:pedido_parseado}));
        }else{
            ws.send(JSON.stringify(pedido_parseado));
        }

    });
}

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
            send_pedido(pedidos, ws);
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
 *  -aviso: Aviso al camarero desde la carta
 *  -aviso_cuenta: Aviso de que un cliente desea la cuenta
 *
 * @param ws Conexion WebSockets abierta
 * @param req Http Request inicial
 */
const pedido_camarero_get_ws = function (ws,req) {
    const sub = redis.createClient();
    let mesa=null;
    sub.on("message",function (channel,message) {
        switch (channel) {
            case 'pedidos':
                console.log(message);
                ws.send(JSON.stringify({header:'pedido',data:message}));
                break;
            case 'estado_item':
                ws.send(JSON.stringify({header:'estado_item',data:message}));
                break;
            case 'avisos':
                if(mesa!=null) {
                    if(mesa===message) {
                        ws.send(JSON.stringify({header: 'aviso'}));
                    }
                }else {
                    ws.send(JSON.stringify({header: 'aviso',data:message}));
                }
                break;
            case 'cuenta':
                bd.getPedido(function (pedido) {
                    send_pedido(pedido,ws,true,'aviso_cuenta');
                });

        }
    });
    ws.on('message',function (msg) {
        ws.ping('pong',false,true); //Envio señal siempre para comprobar que la conexion esta viva
        var peticion = JSON.parse(msg);
        switch (peticion.header){ //Compruebo que tipo de peticion me llega
            case('pedidos'): //El camarero pide los pedidos que hay en cocina (Deberia ser la peticion inicial)
                sub.subscribe("pedidos");
                sub.subscribe("estado_item");
                sub.subscribe("cuenta");
                bd.getPedidoSinTerminar(function (err,pedidos){
                    if(err){
                        console.log(err);
                    }else{
                        send_pedido(pedidos,ws,true,'pedido');
                    }
                });
                break;
            case('avisos')://El camarero pide avisos
                sub.subscribe("avisos");
                if (peticion.data) {
                    mesa = peticion.data.mesa ? peticion.data.mesa : null;
                } else {
                    mesa = null;
                }
                ws.send(JSON.stringify({header:'ok'}));
        }

    })
};

/**
* Funcion que cambia el estado de los items de un pedido, cuando estan listos en cocina.
* @param req
* @param res
**/
const item_listo = function (req,res) {
    let data = [
        req.body.estado_item,
        req.body.id_item,
        req.body.numPedido
    ];
    data[0] = estado_item.isDefined(data[2]) ? data[2] : estado_item.servido.value;
    bd.actualizar_pedido(data, function (status) {
        let item_estado={
          estado: data[0],
          id_item:data[1],
          numPedido:data[2]
        };
        pub.publish("estado_item", JSON.stringify(item_estado), redis.print);
        res.sendStatus(status);
    });
};


module.exports = {
    pedido_post : pedido_post,
    pedido_get : pedido_get,
    pedido_cocina_get_ws : pedido_cocina_get_ws,
    pedido_camarero_get_ws: pedido_camarero_get_ws,
    pedido_servido: item_listo,
};
