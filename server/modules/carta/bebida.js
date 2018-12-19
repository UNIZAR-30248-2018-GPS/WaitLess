const bd = require('../../database/querys');
const Enum = require('enum');
const tipo = new Enum({'plato':0,'bebida':1,'menu':2},{ignoreCase: true});

const bebida_insert = function (req,res) {
    //TODO: Sacar descripcion de body
    let data = [
        req.params.nombre,
        req.params.precio,
        tipo.get('bebida').value,
        '',
        true
    ];
    bd.bebida_insert(data, res);
};

const bebida_delete = function (req,res) {
    let data = [
        req.params.nombre,
    ];
    var valor= bd.bebida_delete(data, res);
    res.send(valor); // Deberia mandar solo status 201 si se ha completado

};

module.exports = {
    bebida_insert: bebida_insert,
    bebida_delete: bebida_delete
};
