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

                <router-link :to="{ name: item.title }" v-if ="disable_menu==true">
                  <v-list-tile-content class="grey--text">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </router-link>
                <v-list-tile-content class="grey--text" v-else>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
             <v-list-tile

             >
             <v-list-tile-action>
               <v-icon @click="dialog_settings=true">settings</v-icon>
             </v-list-tile-action>
             <v-list-tile-content class="grey--text" @click="dialog_settings=true">
               <v-list-tile-title>Ajustes</v-list-tile-title>
             </v-list-tile-content>
            </v-list-tile>

       </v-list>

      <v-btn color="blue lighten-2" dark  @click="llamarCamarero" style="margin-top: 170%; margin-left: 8%">
        <v-icon>{{'call'}}</v-icon>
        Llamar al camarero
      </v-btn>

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
          <v-list-tile-content id="index">- {{p[1]}}</v-list-tile-content>
          <v-list-tile-avatar>{{p[2]}}€</v-list-tile-avatar>

        </v-list-tile>
        <v-flex xs15 style="margin-left: 20px;margin-right: 20px">
          <v-textarea
            auto-grow
            box
            color="deep-purple"
            label="Añade tu comentario"
            rows="1"
            v-model="modelo[index]"
            :disabled="disable_coment==true"
            @blur="addComentario(p[0],p[1],p[4],index)"
          ></v-textarea>
        </v-flex>

      </v-list>


        <v-list-tile class="text--darken-1">
          <v-list-tile-content style="margin-left:40%;">Pago Total: {{total}}€ </v-list-tile-content>
        </v-list-tile>


        <div class="text-xs-center">

          <v-dialog v-model="dialog" width="500px"  v-if="pedido && $session.get('dialog_finalizar')===true">
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

      <v-dialog v-model="$session.get('card_comensales')" width="500px">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Configuración Mesa y Comensales
          </v-card-title>

          <v-card-text style="font-size: 18px">
            Selecciona número de mesa y comensales:
            <br>
            <v-flex xs16 sm26 d-flex>
              <v-select
                :items="comensales"
                label="Mesa"
                v-model="mesa"
                solo
              ></v-select>

            </v-flex>
            <v-flex xs16 sm26 d-flex>
              <v-select
                :items="comensales"
                label="Comensales"
                v-model="selected"
                solo
              ></v-select>
            </v-flex>
          </v-card-text>

          <v-card-actions style="">
            <v-card-text>
            </v-card-text>
            <v-btn
              color="info"
              flat="flat"
              @click="guardarDatos"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_settings" width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Resetear Sesión del Cliente</span>
          </v-card-title>
          <v-card-text>
            <v-flex xs16 sm16 d-flex>
              <v-text-field
                name="input-10-2"
                label="Introduce aqui la contraseña"
                :type="show1 ? 'text' : 'password'"
                v-model="password"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>

          </v-card-text>

          <v-card-actions>
            <v-card-text v-show="show2">
              La contraseña no es correcta
            </v-card-text>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat="flat" @click="dialog_settings = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat="flat" @click="comprobarPwd">Aceptar</v-btn>

          </v-card-actions>

        </v-card>
      </v-dialog>


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
import Pedido from './components/PedidoFinalizado'
import Carta from './layouts/card_carta'
import bus from './EventBus'
import Vue from 'vue';
import swal from 'sweetalert';
import VueSession from 'vue-session';
Vue.use(VueSession);

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
      comensales:['1','2','3','4','5'],
      mesas: ['1','2','3','4','5','6','7','8'],
      miniVariant: false,
      right: true,
      rightDrawer: true,
      title: 'WaitLess',
      value:[],
      show: false,
      cuenta:[],
      total:0,
      pedido_total:[],
      modelo:[],
      message:'',
      dialog_failed: false,
      dialog: false,
      disable_menu:true,
      mesa: 0,
      selected:0,
      pedido: [],
      dialog_settings: false,
      show2:false,
      show1: false,
      password: '',
      pwd: 'WaitLess',
      disable_coment: false,

    }
  },
  created: function(){
    if (!this.$session.exists()){
      this.$session.start();
      this.$session.set('card_comensales',true);
      this.$session.set('dialog_menu',true);
      this.$session.set('pedido',this.pedido);
      this.$session.set('pedido_total',this.pedido_total);
      this.$session.set('cuenta',this.cuenta);
    }else{
      this.pedido = this.$session.get('pedido');
      this.pedido_total = this.$session.get('pedido_total');
      this.cuenta = this.$session.get('cuenta');
      this.total = this.$session.get('precio_total');
      this.disable_menu = this.$session.get('dialog_menu');

      if(this.pedido_total) {
        for (let index = 0; index < this.pedido_total.length; index++) {
          this.modelo[index] = this.pedido_total[index].comentario
        }
      }
    }

  },
  mounted: function () {
    bus.$on('emittedEvent', data => {
      this.value = data;
      var existe = null;
      this.$session.set('dialog_finalizar',true);
      if (this.value[5] === 1) { //incrementar cantidad
        this.pedido.push(this.value);
        this.$session.set('pedido',this.pedido);
        this.modelo.push('');
        this.$session.set('coment'+(this.pedido.length-1),'');
        this.cuenta.push(this.value[2]);
        this.$session.set('cuenta',this.cuenta);
        this.pedido_total.push({
          "nombre": this.value[1],
          "cantidad": this.value[4],
          "id": this.value[0],
          "comentario": ''
        });
        this.$session.set('pedido_total', this.pedido_total);
      }
      else { //decrementar cantidad
        for (let index = 0; index < this.pedido.length; index++) {
          if (this.pedido[index][0] === this.value[0]) {
            existe = index;
          }
        }
        if (existe != null) {
          Vue.delete(this.pedido, existe);
          this.$session.set('pedido',this.pedido);
          Vue.delete(this.cuenta, existe);
          this.$session.set('cuenta');
          Vue.delete(this.pedido_total, existe);
          this.$session.set('pedido_total', this.pedido_total);
        }
      }
      this.mostrarCuenta();
      console.log('pedido_total', this.pedido_total);
    });

  },
  methods: {
    mostrarCuenta(){
      this.total=0;
      var total_cuenta=0.00;
      for (let index = 0; index < this.cuenta.length; index++) {
        total_cuenta = parseFloat(this.total) + parseFloat(this.cuenta[index]);
        this.total=total_cuenta.toFixed(2);
        this.$session.set('precio_total',this.total);
      }
    },
    addComentario: function (id, nombre, cantidad, index) {
      Vue.set(this.pedido_total, index, {
        "nombre": nombre,
        "cantidad": cantidad,
        "id": id,
        "comentario": this.modelo[index]
      });
      this.$session.set('coment'+index,this.modelo[index]);
      this.$session.set('pedido_total', this.pedido_total);
      console.log("comentario", this.pedido_total);
    },
    enviarPedido(){
      this.dialog = false;
      this.axios({
        method: 'post',
        url: 'http://localhost:3030/api/pedido?mesaId='+this.mesa,
        data:
            {
              "comensales" : this.selected,
              "items" : this.pedido_total
            }
        }
      ).then(response =>{
         console.log('respuesta',response);
         var idPedido = response.data.pedidoId;
         this.$session.set('idPedido',idPedido);
         this.$router.push({name: 'Pedido'});
         this.$session.set('dialog_finalizar',false);
         this.disable_menu = false;
         this.$session.set('dialog_menu',false);
         this.disable_coment=true;
        },(error) => { console.log(error); swal ( "Pedido" ,  "Tu pedido no ha podido ser realizado.\n" +
        "              Vuelva a intentarlo, disculpe las molestias." ,  "error" );}
        );
    },
    llamarCamarero(){
      this.axios({
          method: 'post',
          url: 'http://localhost:3030/api/servicio/llamarCamarero/'+this.mesa,
        }
      ).then(response =>{
          console.log('respuesta',response);
          swal ( "Llamar al Camarero" ,  "Se ha avisado al camarero. \n" +
            "En unos minutos le atenderan." ,  "success" );

        },(error) => { console.log(error); swal ( "Llamar al Camarero" ,  "No se ha podido realizar la llamada " +
        "al camarero.\n" + "Vuelva a intentarlo, disculpe las molestias." ,  "error" );}
      );
    },
    guardarDatos(){
      this.disable_menu=this.$session.get('dialog_menu');
      this.$session.set('mesa',this.mesa);
      this.$session.set('comensales',this.selected);
      this.$session.set('mesa',this.mesa);
      this.$session.set('card_comensales',false);
      this.$session.set('dialog_finalizar',false);
      this.$router.push({name: 'Bebidas'});
    },
    comprobarPwd(){

      if (this.password=this.pwd){
        this.$session.clear();
        this.selected=0;
        this.mesa=0;
        this.total=0;
        this.pedido=[];
        this.pedido_total=[];
        this.cuenta=[];
        this.modelo=[];
        this.disable_coment=false;
        this.$session.set('comensales',this.selected);
        this.$session.set('card_comensales',true);
        this.$session.set('dialog_menu',true);
        this.$router.push({name: 'Home'});
        this.dialog_settings=false;
      }
      else{
        this.show2=true;
      }
    }
  },

  name: 'App',
  components: {
    Home,
    Bebidas,
    Primeros,
    Segundos,
    Postres,
    Pedido,
    Carta
  }
}
</script>
