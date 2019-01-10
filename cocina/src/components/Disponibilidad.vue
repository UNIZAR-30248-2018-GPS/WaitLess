<template>
  <div>
    <h1>Disponibilidad de la carta</h1>
    <el-table
      v-loading="loading"
      :row-class-name="tableRowClassName"
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
          <el-checkbox-button v-model="platos[scope.$index].disponible" @change="cambiaDisponibilidad(scope.$index)">Disponible</el-checkbox-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import CocinaService from '@/services/CocinaService'

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
      tableRowClassName({ row }) {

        if (row.disponibilidad === true) {
          return 'success-row'
        } else if (row.disponibilidad === false) {
          return 'warning-row'
        }
        return ''
      },
      cambiaDisponibilidad(value) {
        console.log(this.platos[value].nombre +" -> " + this.platos[value].disponible);
        CocinaService.disponibilidad(this.platos[value].id,this.platos[value].disponible);
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
