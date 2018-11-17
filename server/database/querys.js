//TODO: Interaccion con la base de datos, por ahora las funciones sirven de mock
const getAllCarta = function (tipoItem) {
    if(!tipoItem) {
      return [{
        "nombre": 'Sopa de marisco',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 2
      },
      {
        "nombre": 'Macarrones a la boloñesa',
        "id": 'id2',
        "precio": 2,
        "tipo": 2
      },
      {
        "nombre": 'Salmón a la plancha',
        "id": 'id3',
        "precio": 0.1,
        "tipo": 3
      }];
    }else if(tipoItem===1){
        //Busqueda con parametros, por ahora devuelvo algo distinto
      return [{
        "nombre": 'CocaCola',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 1
        },
        {
        "nombre": 'Vino',
        "id": 'id2',
        "precio": 0.1,
        "tipo": 1
        }
      ];
    }else if(tipoItem===2){
      //Busqueda con parametros, por ahora devuelvo algo distinto
      return [{
        "nombre": 'Macarrones a la boloñesa',
        "id": 'id1',
        "precio": 0.1,
        "tipo": 2
      },
      {
      "nombre": 'Sopa de marisco',
      "id": 'id9',
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
      },
      {
      "nombre": 'Ternera guisada',
      "id": 'id3',
      "precio": 0.1,
      "tipo": 3
      }
      ];
    }else if(tipoItem===4){
      //Busqueda con parametros, por ahora devuelvo algo distinto
      return [{
        "nombre": 'Helado de chocolate',
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