const bd = require('../../database/querys');
const Enum = require('enum');
const aviso = new Enum({'sinaviso':0, 'pendiente':1,'visto':2},{ignoreCase: true});
const estado_cuenta = new Enum({'pendiente':0, 'pedida':1,'pagado':2},{ignoreCase: true});

const get_all_avisos = function (req,res) {
    bd.get_avisos(res);
   // Deberia mandar solo status 201 si se ha completado con exito
};

const call_camarero_avisos = function (req,res) {
    let data = [
        aviso.get('pendiente').value,
        req.params.mesa
    ] 
    bd.call_camarero_avisos(data,res);
   // Deberia mandar solo status 201 si se ha completado con exito
};

const pedir_cuenta = function (req,res) {
    let data = [
        req.params.num_pedido
    ] 
    bd.pedir_cuenta(data,res);
   // Deberia mandar solo status 201 si se ha completado con exito
};

module.exports = {
    get_all_avisos: get_all_avisos,
    call_camarero_avisos: call_camarero_avisos,
    pedir_cuenta: pedir_cuenta
};
