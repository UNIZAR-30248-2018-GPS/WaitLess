//TODO: Interaccion con la base de datos, por ahora las funciones sirven de mock
const getAllCarta = function (tipoItem) {
    if(!tipoItem) {
      return [{
        "nombre": 'Plato 1',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 0
      },
        {
          "nombre": 'Plato 2',
          "id": 'id2',
          "precio": 2,
          "tipo": 1
        },
        {
          "nombre": 'Plato 3',
          "id": 'id3',
          "precio": 0.1,
          "tipo": 2
        }];
    }else if(tipoItem===1){
        //Busqueda con parametros, por ahora devuelvo algo distinto
      return [{
        "nombre": 'Bravas',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 1
        }];
    }else if(tipoItem===2){
      //Busqueda con parametros, por ahora devuelvo algo distinto
      return [{
        "nombre": 'Vino',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 2
      }];
    }else if(tipoItem===3){
      //Busqueda con parametros, por ahora devuelvo algo distinto
      return [{
        "nombre": 'Ensalada',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 3
      }];
    }else if(tipoItem===4){
      //Busqueda con parametros, por ahora devuelvo algo distinto
      return [{
        "nombre": 'Guisado de ternera',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 4
      }];
    }else if(tipoItem===5){
      //Busqueda con parametros, por ahora devuelvo algo distinto
      return [{
        "nombre": 'Helado de fresa',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 5
      }];
    }
};

const addPedido = function(pedido){
    //De momento no hago nada
    return true;
};
module.exports = {
    getAllCarta: getAllCarta,
    addPedido: addPedido
};