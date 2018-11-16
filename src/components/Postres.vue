<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <p>Postres y otros</p>
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
    name: 'Postres',
    data(){
      return{
        items: "Bienvenido a WaitLess"
      }
    }
  }
</script>
