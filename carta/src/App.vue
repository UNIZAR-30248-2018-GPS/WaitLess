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

                <router-link :to="{ name: item.title }" >
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
              :key="index"
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
            v-on:keyup.enter="addComentario(p[0],p[1],p[2],p[4],index)"
          ></v-textarea>
        </v-flex>

      </v-list>


        <v-list-tile class="text--darken-1">
          <v-list-tile-content style="margin-left: 120px;">Pago Total:  {{total}}€ </v-list-tile-content>
        </v-list-tile>



        <div class="text-xs-center">

            <v-dialog v-model="dialog" width="500px"  v-if="pedido.length > 0 && dialog_finalizar==true">
              <v-btn slot="activator" color="blue lighten-2" dark >Finalizar Pedido</v-btn>

              <v-card>
                <v-card-title>
                  <span class="headline">Finalizar Pedido</span>
                </v-card-title>
                <v-card-text>
                  ¿Esta seguro que quiere finalizar su pedido?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat="flat" @click="dialog = false">No</v-btn>
                  <v-btn color="blue darken-1" flat="flat" @click="enviarPedido">Si</v-btn>

                </v-card-actions>
              </v-card>
            </v-dialog>


        </div>

    </v-navigation-drawer>

    <v-content>
      <div class="text-xs-center">

        <v-dialog v-model="dialog_failed" width="500px">

          <v-card>
            <v-card-title>
              <span class="headline">Finalizar Pedido</span>
            </v-card-title>

            <v-card-text>
              Tu pedido no ha podido ser realizado.<br>
              Vuelva a intentarlo, disculpe las molestias.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat="flat" @click="dialog_failed = false">Aceptar</v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>


      </div>
      <router-view>

      </router-view>



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
      pedido_total:[],
      modelo:[],
      message:'',
      dialog_finalizar: false,
      dialog_failed: false,
      dialog: false,
      disable_menu:true

    }
  },
  mounted() {

    bus.$on('emittedEvent', data => {
      this.value = data;
      var existe = null;
      this.dialog_finalizar=true;
      if (this.value[5] === 1){ //incrementar cantidad
        this.pedido.push(this.value);
        this.modelo.push('');
        this.cuenta.push(this.value[2]);
        this.pedido_total.push({"nombre": this.value[1],"cantidad":this.value[4],"id": this.value[0],"comentario":''})
      }else{ //decrementar cantidad
        for (let index = 0; index < this.pedido.length; index++) {
          if (this.pedido[index][0] === this.value[0]) {
            existe = index;
          }
        }
        if (existe!=null) {
          Vue.delete(this.pedido, existe);
          Vue.delete(this.cuenta, existe);
          Vue.delete(this.pedido_total, existe);
        }
      }
      this.mostrarCuenta()
      console.log('pedido_total',this.pedido_total);
    });

  },
  methods: {
    mostrarCuenta(){
      this.total=0
      for (let index = 0; index < this.cuenta.length; index++) {
        this.total=this.total+this.cuenta[index];
      }
    },
    addComentario(id,nombre,precio,cantidad,index){
      Vue.set(this.pedido_total,index,{"nombre": this.value[1],"cantidad":this.value[4],"id": this.value[0],"comentario":this.modelo[index]})
      console.log('comentario',this.pedido_total);
    },
    enviarPedido(){
      this.dialog = false;
      this.axios({
        method: 'post',
        url: 'http://localhost:3030/api/pedido/5',
        data:
            {
              "comensales" : 3,
              "items" : this.pedido_total
            }
        }
      ).then(response =>{
         console.log('respuesta',response);
         this.$router.push({name: 'Pedido'});
         this.dialog_finalizar = false;
         this.disable_menu = false;
        },(error) => { console.log(error); this.dialog_failed=true;}
        );
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
