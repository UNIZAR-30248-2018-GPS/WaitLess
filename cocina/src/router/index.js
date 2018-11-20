import Vue from 'vue'
import Router from 'vue-router'
import Pedidos from '@/components/Pedidos'
import Modificar from '@/components/Modificar'
import Disponibilidad from '@/components/Disponibilidad'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Pedidos
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: Pedidos
    },
    {
      path: '/disponibilidad',
      name: 'disponibilidad',
      component: Disponibilidad
    },
    {
      path: '/modificar',
      name: 'modificar',
      component: Modificar
    }
  ]
})
