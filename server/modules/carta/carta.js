const Enum = require('enum');
const bd = require('../../database/querys');
const tipo = new Enum({'plato':0,'bebida':1,'menu':2},{ignoreCase: true});

const carta_get = function (req,res) {
    var todaLaCarta = bd.getAllCarta();
    todaLaCarta.forEach(function (item){
        if(tipo.isDefined(item.tipo)) {
            item.tipo = typeof item.tipo === 'string' ? item.tipo : tipo.get(item.tipo).key;
        }
    });
    res.send(todaLaCarta);

};

module.exports = {
  carta_get: carta_get
};