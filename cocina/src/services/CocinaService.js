import Api from '@/services/Api'

export default {
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


