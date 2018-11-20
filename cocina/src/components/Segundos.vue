<template>
  <div>
    <h1>Segundos</h1>
    <el-row  :gutter="20">
      <el-col :span="8" v-for="segundo in segundos" :key="segundo.id">
        <div  class="grid-content">
          <el-card  class="box-card">
            <div class="izq">
              <strong>{{ segundo.nombre }}</strong>
            </div>
            <el-col :span="8">
              <p class="izq">{{ segundo.precio }} €</p>
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

<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .izq {
    text-align: left;
  }

</style>
