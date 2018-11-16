const Enum = require('enum');
const bd = require('../../database/querys');
const tipo = new Enum(['plato','bebida','menu'],{ignoreCase: true});

const carta_get = function (req,res) {
    var todaLaCarta = bd.getAllCarta();

    res.send(todaLaCarta);

};

module.exports = {
  carta_get: carta_get
};