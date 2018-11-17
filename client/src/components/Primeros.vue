<template>
  <div>
    <h1>Primeros</h1>

    <el-row  :gutter="20">
      <el-col :span="8" v-for="primero in primeros" :key="primero.id">
        <div  class="grid-content">
          <el-card  class="box-card">
            <div class="izq">
              <strong>{{ primero.nombre }}</strong>
            </div>
            <el-col :span="8">
              <p class="izq">{{ primero.precio }} €</p>
            </el-col>
            <el-col :span="16">
              <el-button type="primary">Añadir al pedido</el-button>
            </el-col>
          </el-card>
        </div>
      </el-col>
    </el-row>
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

<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .izq {
    text-align: left;
  }

</style>

