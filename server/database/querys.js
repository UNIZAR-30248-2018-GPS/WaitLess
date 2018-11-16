//TODO: Interaccion con la base de datos, por ahora las funciones sirven de mock
const getAllCarta = function () {
    return [{
        "nombre":'Plato 1',
        "precio":0.1,
        "tipo":0
    },
    {
        "nombre":'Plato 2',
        "precio":2,
        "tipo":1
    },
    {
        "nombre":'Plato 3',
        "precio":0.1,
        "tipo":2
    },
    {
      "nombre":'Plato 4',
      "precio":2,
      "tipo":1
    },
    {
      "nombre":'Plato 5',
      "precio":2,
      "tipo":1
    }];
};

module.exports = {
    getAllCarta: getAllCarta
};
