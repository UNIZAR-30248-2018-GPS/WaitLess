import Api from '@/services/Api'

export default {
  pedidos_ws(callback){
    const conn = new WebSocket('ws://localhost:3030/api/pedido/ws');
    conn.onclose = function (event) {
      console.log('Ws closed');
    };
    conn.onmessage=function (event) {
      console.log(JSON.parse(event.data));
      /*var datos = {"mesa":"4",
        "comensales":33,
        "items":[{
          "nombre":"Test",
          "cantidad":1,
          "id":101,
          "comentario":""
        }
        ]
      };
      */
      callback(JSON.parse(event.data));
      //callback(datos);
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


