import Api from '@/services/Api'

export default {
  pedidos_ws(callback){
    const conn = new WebSocket('ws://localhost:3030/api/pedido/ws');
    conn.onclose = function (event) {
      console.log('Ws closed');
    };
    conn.onmessage=function (event) {
      console.log(event.data);
      callback(event.data);
    };
    conn.onopen=function () {
      conn.send('ping');
    };

  },
  pedidos() {
    //return Api().get('carta?tipo=menu1')
  },
  carta() {
    return Api().get('carta')
  },
  nuevoPlato(nombre, descripcion, precio, tipo) {
    return Api().post('plato/nuevoPlato/'+nombre+'/'+descripcion+'/'+precio+'/'+tipo)
  }

}


