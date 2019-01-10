const Enum = require('enum');
const bd = require('../../database/querys');
const tipos = new Enum({'bebida':1,'menu1':2,'menu2':3,'postre':4},{ignoreCase: true});

/**
* Función que obtiene toda la carta realizando una conexión a la base de datos.
* @params req
* @params res 
*/
const carta_get = function (req,res) {
    var tipoItem = req.query.tipo && tipos.isDefined(req.query.tipo) ? tipos.get(req.query.tipo).value : undefined;
    console.log('Saca carta de '+tipoItem);
    bd.getAllCarta(tipoItem,function (err,todaLaCarta) {
        if(err){
            res.status(500).send();
        }
        todaLaCarta.forEach(function (item){
            if(tipos.isDefined(item.tipo)) {
                item.tipos = typeof item.tipo === 'string' ? item.tipo : tipos.get(item.tipo).key;
            }
        });
        res.send(todaLaCarta);
    });

};
module.exports = {
    carta_get: carta_get,
    tipos: tipos
};
