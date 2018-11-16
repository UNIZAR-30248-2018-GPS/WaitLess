<template>
  <v-container fluid>
  <v-slide-y-transition >
    <v-layout rows align-center>
      <v-card v-for="item in items" class="elevation-{8}; ma-a-100">
        <v-card-title primary-title>
          <div>
            <v-list-tile-title>Plato {{item.nombre}}</v-list-tile-title>
            <div>Precio: {{item.precio}}</div>
            <div>Descripcion breve del plato y sus ingredientes</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="blue--text">Añadir</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>

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
  export default {
    name:"Primeros",
    data(){
      return{
        items: []
      }
    },

    created: function()
    {
      this.fetchItems();
    },

    methods: {
      fetchItems()
      {
        let uri = 'http://localhost:3030/carta';
        this.axios.get(uri).then((response) => {
          this.items = response.data;
        }).catch(function (error) {
          console.log('Error: ' + error);
        });
      }
    }
  }
</script>
