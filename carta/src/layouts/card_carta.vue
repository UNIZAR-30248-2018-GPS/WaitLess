<template>
  <v-card class="elevation-{10}; mx-5;">
    <v-card-title class="grey" >
      <div>
          <v-list-tile-title> {{name[1]}} </v-list-tile-title>
      </div>
    </v-card-title>

      <v-list class="elevation-{20};" >

        <v-list-tile>
          <v-list-tile-content>Precio: {{name[2]}} €
            <v-list-tile-sub-title>Descripcion: {{name[3]}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


    <v-card-actions v-if="name[7]==false">
      <br>
      <br>
      <span style="color: red; margin-left: 2%;">No hay stock</span>


    </v-card-actions>
    <v-card-actions v-else>
      <v-btn fab  small color="grey lighten-1" id="decrement" @click="decrement">
        <v-icon dark>remove</v-icon>
      </v-btn>
      <span class="px-3" id="cantidad">{{ quantity }}</span>
      <v-btn fab small color="grey lighten-1" id="increment" @click="increment" >
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        Ingredientes:

          <v-card-text>
            <p  v-for="(item) in name[4]">-{{item}}</p>

          </v-card-text>
        Alergenos:
        <v-card-text>
          <p  v-for="(item) in name[6]">-{{item}}</p>
        </v-card-text>
        </v-card-text>


    </v-slide-y-transition>
  </v-card>

</template>

<script>
  import bus from '../EventBus'
  import swal from 'sweetalert';
  export default {
    name:"Carta",
    data(){
      return{
        show: false,
        quantity: this.$session.get(this.name[0]),
      }
    },
    props: [
      'name'
    ],
    methods: {
      increment () {
        this.quantity++;
        this.$session.set(this.name[0],this.quantity);
        this.clickMe(1);
      },
      decrement () {
        if(this.quantity === 0) {
          swal ( "Error" ,  "No se permite elegir un producto con cantidad negativa" ,  "error" )
        } else {
          this.quantity--;
          this.$session.set(this.name[0],this.quantity);
          this.clickMe(0);
        }

      },
      clickMe(num) {
        bus.$emit('emittedEvent', [this.name[0],this.name[1],this.name[2],this.name[3],1,num]);
      }

    }
  }
</script>
