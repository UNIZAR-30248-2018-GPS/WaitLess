<template>
  <div>
    <h1>Disponibilidad de la carta</h1>

    <el-row :gutter="20">
      <el-col :span="20" :offset="2">

        <el-table
          v-loading="loading"
          :data="platos.filter(data => !search || data.nombre.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="Plato o bebida"
            prop="nombre">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="Buscar en la carta"/>
            </template>
            <template slot-scope="scope">
              <el-checkbox-button  v-model="platos.find(plato => plato.id === scope.row.id).disponible" @change="cambiaDisponibilidad(scope.row.id)">Disponible</el-checkbox-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CocinaService from '../services/CocinaService'

  export default {
    data() {
      return {
        platos: [],
        search: '',
        loading: true
      }
    },
    methods: {
      async cargarPlatos(){
        const response = await CocinaService.carta()
        this.platos = response.data
        this.loading = false
        console.log(response.data)
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      cambiaDisponibilidad(value) {
        console.log(this.platos.find(plato => plato.id === value).nombre +" -> " +this.platos.find(plato => plato.id === value).disponible);
        CocinaService.disponibilidad(value,this.platos.find(plato => plato.id === value).disponible);
      }
    },
    beforeMount() {
      this.cargarPlatos()
    }
  }
</script>

<style>
  .el-table .warning-row .disponible td:last-child {
  background: red;
  }

  .el-table .success-row .disponible td:last-child {
    background: green;
  }
</style>
