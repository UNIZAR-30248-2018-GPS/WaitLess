<template>
  <v-container fluid style="margin-left: 60px">
  <v-slide-y-transition >
    <v-layout row wrap>
      <v-flex
        v-for="(item,index) in items"
        :key="item.id"
        xs3
        mr-5
        my-3
      >
        <Carta v-bind:name=[item.id,item.nombre,item.precio,item.descripcion,ingredientes,index]></Carta>

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
  export default {
    name:"Primeros",
    data(){
      return{
        items: [],
        count: 0,
        ingredientes:[],
      }
    },

    created: function()
    {
      this.fetchItems();

    },
    methods: {
      fetchItems() {
        let uri = 'http://localhost:3030/api/carta?tipo=plato';

        this.axios.get(uri).then((response) => {
          this.items = response.data;
          let item;
          for(item in this.items){
            console.log(this.items[item]);
            this.fetchIngredientes(this.items[item].id);
          }
        }).catch(function (error) {
          console.log('Error: ' + error);
        });

      },
      fetchIngredientes(id) {
        this.axios.get('http://localhost:3030/api/plato/ingredientes/'+id).then((response) => {
          this.ingredientes[this.count] = response.data;
          this.count++;
          console.log(this.ingredientes,'data', response.data);
        }).catch(function (error) {
          console.log('Error: ' + error);
        });
      }
    },
    components: {
      Carta
    }
  }
</script>
