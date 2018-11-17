import Api from '@/services/Api'

export default {
  primeros() {
    return Api().get('carta')
  },
  segundos() {
    return Api().get('carta')
  }

}


