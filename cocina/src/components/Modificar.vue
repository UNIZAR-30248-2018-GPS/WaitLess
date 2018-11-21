<template>
  <div>
    <h1>Modificar carta</h1>

    <el-row :gutter="20">
      <el-col :span="8"><div >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-tag class="etiquetaPlato">Primero</el-tag><span><strong>Macarrones con tomate</strong></span>
            <el-button class="botonModificar" type="text">Modificar</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="20">
              <div>
                Descripción bla bla bla
              </div>
              <div>
                Ingredientes bla bla bla
              </div>
            </el-col>
            <el-col :span="4">
              <el-tag type="info">7€</el-tag>
            </el-col>
          </el-row>

        </el-card>
      </div></el-col>
      <el-col :span="8"><div >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-tag type="success" class="etiquetaPlato">Segundo</el-tag><span><strong>Ternera a la plancha</strong></span>
            <el-button class="botonModificar" type="text">Modificar</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="20">
              <div>
                Descripción bla bla bla
              </div>
              <div>
                Ingredientes bla bla bla
              </div>
            </el-col>
            <el-col :span="4">
              <el-tag type="info">7€</el-tag>
            </el-col>
          </el-row>

        </el-card>
      </div></el-col>
      <el-col :span="8"><div >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-tag type="warning" class="etiquetaPlato">Postre</el-tag><span><strong>Crema catalana</strong></span>
            <el-button class="botonModificar" type="text">Modificar</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="20">
              <div>
                Descripción bla bla bla
              </div>
              <div>
                Ingredientes bla bla bla
              </div>
            </el-col>
            <el-col :span="4">
              <el-tag type="info">7€</el-tag>
            </el-col>
          </el-row>

        </el-card>
      </div></el-col>
    </el-row>


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
