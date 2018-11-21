<template>
  <div>
    <h1>Disponibilidad de la carta</h1>
    <el-table
      :row-class-name="tableRowClassName"
      :data="tableData.filter(data => !search || data.plato.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="Disponibilidad"
        prop="disponibilidad">
      </el-table-column>
      <el-table-column
        label="Plato o bebida"
        prop="plato">
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
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          disponibilidad: true,
          plato: 'Tom',
        }, {
          disponibilidad: true,
          plato: 'John',
        }, {
          disponibilidad: false,
          plato: 'Morgan',
        }, {
          disponibilidad: true,
          plato: 'Jessy',
        }],
        search: ''
      }
    },
    methods: {
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
