import Api from '@/services/Api'

export default {
  primeros() {
    return Api().get('carta?tipo=menu1')
  },
  segundos() {
    return Api().get('carta?tipo=menu2')
  },
  postres() {
    return Api().get('carta?tipo=bebida')
  },
  bebidas() {
    return Api().get('carta?tipo=postre')
  }

}


