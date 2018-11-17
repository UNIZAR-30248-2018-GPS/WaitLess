import Vue from 'vue'
import Router from 'vue-router'
import Primeros from '@/components/Primeros'
import Segundos from '@/components/Segundos'
import Postres from '@/components/Postres'
import Bebidas from '@/components/Bebidas'


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
    },
    {
      path: '/postres',
      name: 'postres',
      component: Postres
    },
    {
      path: '/bebidas',
      name: 'bebidas',
      component: Bebidas
    }
  ]
})
