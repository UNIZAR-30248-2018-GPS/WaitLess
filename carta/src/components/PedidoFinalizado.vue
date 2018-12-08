<template>
  <div style="margin-top:10%; margin-left:5%; margin-right:10% ">
  <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Confirmación del Pedido
      </v-card-title>

      <v-card-text style="font-size: 18px">
        <v-icon style="size: 70px;">{{icon="check_circle"}}</v-icon>
        Tu pedido ha sido realizado correctamente.
        En unos minutos te serviremos tu pedido.
      </v-card-text>

      <v-card-actions style="">
        <v-card-text style="font-size: 14px">
          <v-icon>{{icon="info"}}</v-icon>
          Para pedir consultar mas informacion o pedir la cuenta haz click en llamar al camarero
        </v-card-text>
        <v-btn
          color="info"
          flat
        >
          Llamar al camarero
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
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
div{
    border-color: lightskyblue;
    border-radius: 5px;
}
</style>

<script>
  export default {
    name: 'Pedido',
    data(){
      return{

      }
    },
  }
</script>

