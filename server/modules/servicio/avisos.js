const bd = require('../../database/querys');
const Enum = require('enum');
const aviso = new Enum({'pendiente':0,'visto':1},{ignoreCase: true});

const get_avisos = function (req,res) {
    let data = [
        aviso.get('pendiente').value
    ]
    bd.get_avisos(data,res);
   // Deberia mandar solo status 201 si se ha completado con exito

};

module.exports = {
    get_avisos: get_avisos
};
