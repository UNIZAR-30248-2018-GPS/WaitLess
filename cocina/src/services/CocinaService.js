import Api from '@/services/Api'

export default {
  pedidos_ws(callback){
    const conn = new WebSocket('ws://localhost:3030/api/pedido/ws');
    conn.onclose = function (event) {
      console.log('Ws closed');
    };
    conn.onmessage=function (event) {
      console.log(JSON.parse(event.data));
      callback(JSON.parse(event.data));
    };
    conn.onopen=function () {
      conn.send('ping');
    };

  },

  carta() {
    return Api().get('carta')
  },
  nuevoPlato(nombre, descripcion, precio, tipo, alergenos, ingredientes) {

    return Api().post('plato/nuevoPlato', {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      tipo: tipo,
      alergenos: alergenos,
      ingredientes: ingredientes
    })
  },

  disponibilidad(idPlato, disponibilidad) {
    if(disponibilidad) {
      return Api().post('plato/darDisponibilidad/'+idPlato)
    } else {
      return Api().post('plato/borrarDisponibilidad/'+idPlato)
    }
  },

  alergenos() {
    return Api().get('/plato/getAllAlergenos')
  },

  ingredientes() {
    return Api().get('plato/getAllIngredientes')
  },

  nuevoIngrediente(nombreIngrediente) {
    return Api().post('/plato/anadir_despensa/'+nombreIngrediente)
  }

}


