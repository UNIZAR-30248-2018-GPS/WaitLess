<template>
  <v-app>

    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      style="max-width: 250px"
      enable-resize-watcher
      fixed
      app
    >
      <v-toolbar avatar dark>
              <v-list>
                <v-list-tile>

                  <v-list-tile-content>
                    <v-list-tile-title>CARTA WAITLESS</v-list-tile-title>

                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

       </v-toolbar>
      <v-list>

              <v-list-tile
                v-for="item in items"
                :key="item.title"
                @click=""

              >

                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <router-link :to="{ name: item.title }">
                  <v-list-tile-content class="grey--text">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </router-link>
              </v-list-tile>

            </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      persistent
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-toolbar avatar dark>
        <v-list>
          <v-list-tile>

            <v-list-tile-content>
              <v-list-tile-title>TU PEDIDO</v-list-tile-title>

            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-toolbar>

      <v-list class="elevation-{20};"  v-for="(p,index) in pedido"
              :key="p[0]"
      >

        <v-list-tile>
          <v-list-tile-avatar>{{p[4]}} </v-list-tile-avatar>
          <v-list-tile-content>{{p[1]}}</v-list-tile-content>
          <v-list-tile-avatar>{{p[2]*p[4]}}€</v-list-tile-avatar>

        </v-list-tile>
        <v-flex xs15 style="margin-left: 20px;margin-right: 20px">
          <v-textarea
            auto-grow
            box
            color="deep-purple"
            label="Añade tu comentario"
            rows="1"
            v-model="modelo[index]"
            v-on:keyup.enter="addComentario(p[0],p[1],p[2],p[4],modelo[index])"
          ></v-textarea>
        </v-flex>

      </v-list>


        <v-list-tile class="text--darken-1">
          <v-list-tile-content style="margin-left: 120px;">Pago Total:  {{total}}€ </v-list-tile-content>
        </v-list-tile>


      <v-flex xs12 sm50 text-xs-center>
        <div>
          <v-btn depressed small>Finalizar Pedido</v-btn>
        </div>
      </v-flex>


    </v-navigation-drawer>

    <v-content>

      <router-view></router-view>

    </v-content>

  </v-app>
</template>

<script>
import Home from './components/Home'
import Bebidas from './components/Bebidas'
import Primeros from './components/Primeros'
import Segundos from './components/Segundos'
import Postres from './components/Postres'
import Carta from './layouts/card_carta'
import bus from './EventBus'
import Vue from 'vue';
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {title: 'Bebidas', icon: 'local_drink'},
        {title: 'Primer Plato', icon: 'restaurant'},
        {title: 'Segundo Plato', icon: 'restaurant'},
        {title: 'Postres y otros', icon: 'cake'}

      ],
      miniVariant: false,
      right: true,
      rightDrawer: true,
      title: 'WaitLess',
      value:[],
      pedido:[],
      show: false,
      cuenta:[],
      total:0,
      comentario:'',
      pedido_total:[],
      modelo:[],
    }
  },
  mounted() {

    bus.$on('emittedEvent', data => {
      this.value = data;
      var existe=null;
      for (let index = 0; index < this.pedido.length; index++) {
        if (this.pedido[index][0] === this.value[0]) {
          existe = index;
        }
      }
      if (existe==null){
        this.value[5]=this.value[2]*this.value[4];
        this.pedido.push(this.value);
        this.modelo.push('');
        console.log('modelo',this.modelo[0],this.modelo[1])
        this.cuenta.push(this.value[5]);
      }else {
        if (this.value[4]===0){
          Vue.delete(this.pedido,existe);
          Vue.delete(this.cuenta,existe);
        }else{
          this.value[5]=this.value[2]*this.value[4];
          Vue.set(this.pedido, existe, this.value)
          Vue.set(this.cuenta,existe,this.value[5])
        }
      }
      this.mostrarCuenta()
    });

  },
  methods: {
    mostrarCuenta(){
      this.total=0
      for (let index = 0; index < this.cuenta.length; index++) {
        this.total=this.total+this.cuenta[index];
      }
    },
    addComentario(id,nombre,precio,cantidad,message){
      this.pedido_total.push({id: id, nombre: nombre, precio:precio, cantidad:cantidad,comentario:message})
      console.log('comentario',this.pedido_total);
    }
  },

  name: 'App',
  components: {
    Home,
    Bebidas,
    Primeros,
    Segundos,
    Postres,
    Carta
  }
}
</script>
