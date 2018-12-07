<template>
  <v-card class="elevation-{10}; mx-5;">
    <v-card-title class="grey" >
      <div>
          <v-list-tile-title>{{name[1]}}</v-list-tile-title>
      </div>
    </v-card-title>

      <v-list class="elevation-{20};" >

        <v-list-tile>
          <v-list-tile-content>Precio: {{name[2]}} €
            <v-list-tile-sub-title>Descripcion: {{name[3]}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


    <v-card-actions>
      <v-btn fab  small color="grey lighten-1" @click="decrement">
        <v-icon dark>remove</v-icon>
      </v-btn>
      <span class="px-3">{{ quantity }}</span>
      <v-btn fab small color="grey lighten-1" @click="increment" >
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
            <p  v-for="(item,index1) in name[4][name[5]]">-{{item.nombre}}</p>

          </v-card-text>
        Alergenos:
        <v-card-text>
          <p  v-for="(item,index1) in name[6][name[5]]">-{{item.nombre}}</p>
        </v-card-text>
        </v-card-text>


    </v-slide-y-transition>
  </v-card>

</template>

<script>
  import bus from '../EventBus'

  export default {
    name:"Carta",
    data(){
      return{
        show: false,
        quantity: 0
      }
    },
    props: [
      'name'
    ],
    methods: {
      increment () {
        this.quantity++
        this.clickMe(1);
      },
      decrement () {
        if(this.quantity === 0) {
          alert('Negative quantity not allowed')
        } else {
          this.quantity--
          this.clickMe(0);
        }

      },
      clickMe(num) {
        bus.$emit('emittedEvent', [this.name[0],this.name[1],this.name[2],this.name[3],1,num]);
      }

    }
  }
</script>
