const bd = require('../../database/querys');
const Enum = require('enum');
const redis = process.env.NODE_ENV==='test' ? require('redis-mock') : require('redis');
const pub = redis.createClient();
const aviso = new Enum({'sinaviso':0, 'pendiente':1,'visto':2},{ignoreCase: true});


/**
* Función que llama a la base de datos y obtiene todos los avisos activos de
* llamada al camarero de cada pedido.
* @param req
* @param res
**/
const get_all_avisos = function (req,res) {
    bd.get_avisos(res);
   // Deberia mandar solo status 201 si se ha completado con exito
};

/**
* Función que crea la estructura necesaria para activar un aviso de camarero
* llamando a la base de datos.
* @param req
* @param res
**/
const call_camarero_avisos = function (req,res) {
    let data = [
        aviso.get('pendiente').value,
        req.params.mesa
    ];
    bd.call_camarero_avisos(data,function (status) {
        pub.publish('avisos',data[1]);
        res.sendStatus(status);
    });
   // Deberia mandar solo status 201 si se ha completado con exito
};

/**
* Función que crea la estructura necesaria para activar un aviso de solicitud
* de cuenta llamando a la base de datos.
* @param req
* @param res
**/
const pedir_cuenta = function (req,res) {
    let data = [
        req.params.num_pedido
    ];
    bd.pedir_cuenta(data,function (status) {
        if(status!==400){
            pub.publish('cuenta',data[0]);
        }
        res.sendStatus(status);
    });
   // Deberia mandar solo status 201 si se ha completado con exito
};

/**
 * Función que permite indicar la cuenta como pagada
 * llamando a la base de datos.
 * @param req
 * @param res
 **/
const finalizar_cuenta = function (req,res) {
    let data = [
        req.params.num_pedido
    ]
    bd.finalizar_cuenta(data,res);
    // Deberia mandar solo status 201 si se ha completado con exito
};

module.exports = {
    get_all_avisos: get_all_avisos,
    call_camarero_avisos: call_camarero_avisos,
    pedir_cuenta: pedir_cuenta,
    finalizar_cuenta: finalizar_cuenta
};
