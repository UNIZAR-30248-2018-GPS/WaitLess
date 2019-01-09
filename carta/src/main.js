
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import VueSession from 'vue-session';
Vue.use(VueSession);

import App from './App.vue';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VCard,
  VTextarea,
  VDialog,
  VAlert,
  VParallax,
  VDataTable,
  VDivider,
  VSelect,
  VTextField,
  VToolbar,
  VGrid,
  transitions,
} from 'vuetify'
import{
  VLayout,
  VCardText,
  VSlideYTransition,

} from 'vuetify/lib'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VCard,
    VTextarea,
    VDialog,
    VAlert,
    VParallax,
    VDataTable,
    VDivider,
    VSelect,
    VLayout,
    VCardText,
    VSlideYTransition,
    VTextField,
    VGrid,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});

Vue.config.productionTip = false;


import Home from './components/Home'
import Bebidas from './components/Bebidas'
import Primeros from './components/Primeros'
import Segundos from './components/Segundos'
import Postres from './components/Postres'
import Pedido from './components/PedidoFinalizado'

const routes = [
  {
    name: 'Home',
    path: '/home',
    component: Home
  },
  {
    name: 'Bebidas',
    path: '/bebidas',
    component: Bebidas
  },
  {
    name: 'Primer Plato',
    path: '/primeros',
    component: Primeros
  },
  {
    name: 'Segundo Plato',
    path: '/segundos',
    component: Segundos
  },
  {
    name: 'Postres y otros',
    path: '/postres',
    component: Postres
  },
  {
    name: 'Pedido',
    path: '/pedido',
    component: Pedido
  }

];

const router = new VueRouter
({
  mode: 'history',
  routes
});


window.app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

