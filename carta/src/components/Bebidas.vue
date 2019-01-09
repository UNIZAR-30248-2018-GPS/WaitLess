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
          <Carta v-bind:name=[item.id,item.nombre,item.precio,item.descripcion,item.nombres_ingredientes,index,item.nombres_alergenos,item.disponible]></Carta>

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
    name:"Bebidas",
    data(){
      return{
        items: this.$session.get('bebidas')
      }
    },

    created: function()
    {
      this.fetchItems();

    },
    methods: {
      fetchItems() {
        let uri = 'http://localhost:3030/api/carta?tipo=bebida';

        this.axios.get(uri).then((response) => {
          this.$session.set('bebidas',response.data);
          this.items = this.$session.get('bebidas');

          for (let index = 0; index < this.items.length; index++) {
            if (!this.$session.has(this.items[index].id)){
              this.$session.set(this.items[index].id,'0');
            }
          }
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

