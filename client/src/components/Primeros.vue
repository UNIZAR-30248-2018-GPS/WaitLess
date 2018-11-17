<template>
  <div>
    <h1>Primeros</h1>
    <div v-for="primero in primeros">
      {{ primero.id }} -
      {{ primero.nombre }} -
      {{ primero.precio }} €-
      {{ primero.tipo }}
    </div>
  </div>
</template>

<script>
  import CartaService from '@/services/CartaService'

  export default {
    data () {
      return {
        primeros: null
      }
    },
    methods: {
      async primerosPlatos () {
        const response = await CartaService.primeros()
        this.primeros = response.data
        console.log(response.data)
      }
    },
    beforeMount(){
      this.primerosPlatos()
    }
  }
</script>

