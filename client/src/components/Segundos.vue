<template>
  <div>
    <h1>Segundos</h1>
    <div v-for="segundo in segundos">
      {{ segundo.id }} -
      {{ segundo.nombre }} -
      {{ segundo.precio }} €-
      {{ segundo.tipo }}
    </div>
  </div>
</template>

<script>
  import CartaService from '@/services/CartaService'

  export default {
    data () {
      return {
        segundos: null
      }
    },
    methods: {
      async segundosPlatos () {
        const response = await CartaService.segundos()
        this.segundos = response.data
        console.log(response.data)
      }
    },
    beforeMount(){
      this.segundosPlatos()
    }
  }
</script>

