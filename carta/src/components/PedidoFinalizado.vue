<template>

  <div>

    <div style="margin-top:10%; margin-left:5%; margin-right:10% ">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
          id="confirmar"
        >
          Confirmación del Pedido {{idPedido}}
        </v-card-title>

        <v-card-text style="font-size: 18px">
          <v-icon style="size: 70px;">{{icon="check_circle"}}</v-icon>
          Tu pedido ha sido realizado correctamente.
          En unos minutos te serviremos tu pedido.
        </v-card-text>

        <v-card-actions style="">
          <v-card-text style="font-size: 14px">
            <v-icon>{{icon="info"}}</v-icon>
            Para consultar mas informacion haz click en llamar al camarero. Si simplemente quiere pedir la
            cuenta haz click en pedir la cuenta.
          </v-card-text>
          <v-btn
            color="info"
            flat
            id="pedirCuenta"
            @click="pedirCuenta"
          >
            Pedir La Cuenta
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

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
  const axios = require('axios');
  export default {
    name: 'Pedido',
    data(){
      return{
          idPedido: this.$session.get('idPedido')
      }
    },
    methods: {
      pedirCuenta(){
        axios({
            method: 'post',
            url: 'http://localhost:3030/api/servicio/pedirCuenta/'+ this.$session.get('idPedido'),
          }
        ).then(response =>{
            console.log('respuesta',response);
            swal ( "Pedir la cuenta" ,  "Se ha realizado la solicitud de la cuenta.\n" +
              "En unos segundos se la entregará el camarero." ,  "success" );
          },(error) => { console.log("erro pedircuenta",error); swal ( "Pedir la cuenta" ,  "No se ha podido realizar la llamada " +
          "a pedir cuenta.\n" + "Vuelva a intentarlo, disculpe las molestias." ,  "error" );}
        );
      },

    }
  }
</script>

