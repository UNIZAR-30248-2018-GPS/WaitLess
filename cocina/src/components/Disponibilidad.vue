<template>
  <div>
    <h1>Disponibilidad de los platos y bebidas</h1>

  </div>
</template>

<script>
  import CocinaService from '@/services/CocinaService'

  export default {
    data () {
      return {
        pedidos: null
      }
    }
  }
</script>

<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .izq {
    text-align: left;
  }

</style>
