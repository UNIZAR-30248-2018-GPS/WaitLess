<template>
  <div>
    <h1>Modificar carta</h1>
    <el-row v-loading="loading" :gutter="20">
      <el-col v-for="plato in platos" :key="plato.id" :span="8"><div >
        <el-card jest="card" class="box-card">
          <div slot="header" class="clearfix">
            <el-tag v-if="plato.tipo==='plato'" class="etiquetaPlato">Plato</el-tag>
            <el-tag v-if="plato.tipo==='bebida'" type="success" class="etiquetaPlato">Bebida</el-tag>
            <span><strong>{{plato.nombre}}</strong></span>
            <el-button class="botonModificar" type="text">Modificar</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-tag type="info">{{plato.precio}}€</el-tag>
            </el-col>
            <el-col :span="20">
              <div>
                {{plato.descripcion}}
              </div>
            </el-col>

          </el-row>

        </el-card>
      </div></el-col>

    </el-row>


  </div>
</template>

<script>
  import CocinaService from '../services/CocinaService'

  export default {
    data () {
      return {
        platos: null,
        loading: true
      }
    },
    methods: {
      async cargarPlatos(){
        const response = await CocinaService.carta()
        this.platos = response.data
        this.loading = false
        console.log(response.data)
      }
    },
    beforeMount() {
      this.cargarPlatos()
    }

  }
</script>

<style>
  .etiquetaPlato {
    float: left;
  }

  .botonModificar {
    float: right;
    padding: 3px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>
