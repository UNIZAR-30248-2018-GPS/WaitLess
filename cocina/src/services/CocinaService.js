import Api from '@/services/Api'

export default {
  pedidos() {
    return Api().get('carta?tipo=menu1')
  },
  segundos() {
    return Api().get('carta?tipo=menu2')
  },
  postres() {
    return Api().get('carta?tipo=postre')
  }

}


