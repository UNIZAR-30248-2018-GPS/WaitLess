<template>
  <v-container fluid style="margin-left: 60px">
  <v-slide-y-transition>
    <v-layout row wrap>
      <v-flex
        v-for="(item,index) in items"
        :key="index"
        xs3
        mr-5
        my-3
      >
        <Carta v-if ="item.disponible==true" v-bind:name=[item.id,item.nombre,item.precio,item.descripcion,item.nombres_ingredientes,index,item.nombres_alergenos]></Carta>

      </v-flex>
    </v-layout>
  </v-slide-y-transition>

  </v-container>

</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 10px 10px;
  }
  a {
    color: #42b983;
  }
</style>

<script>
  import Carta from '../layouts/card_carta'
  const axios = require('axios');
  export default {
    name:"Primeros",
    data(){
      return{
        items: [],
      }
    },

    created: function()
    {
      this.fetchItems();

    },
    methods: {
      fetchItems() {

        axios({
            method: 'get',
            url: 'http://localhost:3030/api/carta?tipo=plato'}
        ).then(response => {
          this.items = response.data;
          }
        ).catch(function (error) {
          console.log('Error: ' + error);
        });

      }

    },
    components: {
      Carta
    }
  }
</script>
