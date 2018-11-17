import Vue from 'vue'
import Router from 'vue-router'
import Primeros from '@/components/Primeros'
import Segundos from '@/components/Segundos'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Primeros
    },
    {
      path: '/primeros',
      name: 'primeros',
      component: Primeros
    },
    {
      path: '/segundos',
      name: 'segundos',
      component: Segundos
    }
  ]
})
