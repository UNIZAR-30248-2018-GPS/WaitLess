const Enum = require('enum');
const bd = require('../../database/querys');
const tipo = new Enum({'plato':0,'bebida':1,'menu1':2,'menu2':3,'postre':4},{ignoreCase: true});

const carta_get = function (req,res) {
    var tipoItem = req.query.tipo && tipo.isDefined(req.query.tipo) ? tipo.get(req.query.tipo).value : undefined;
    console.log(tipoItem);
    var todaLaCarta = bd.getAllCarta(tipoItem);
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