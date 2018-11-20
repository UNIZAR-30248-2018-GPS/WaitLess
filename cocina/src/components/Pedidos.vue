<template>
  <div>
    <h1>Pedidos</h1>

    <el-card class="box-card">
        Mesa 1
        <el-table
                :data="tableData2"
                style="width: 100%"
                :row-class-name="tableRowClassName">
            <el-table-column
                    prop="producto"
                    label="Producto"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="cantidad"
                    label="Cantidad"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="comentario"
                    label="Comentario">
            </el-table-column>
        </el-table>
    </el-card>

  </div>

</template>

<script>
  import CocinaService from '@/services/CocinaService'

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
          if (rowIndex === 0) {
              return 'success-row';
          }
          return '';
      }
    },
    data () {
      return {
          tableData2:  [{
              producto: 'Macarrones con tomate',
              cantidad: '2',
              comentario: 'Con poco tomate'
          }, {
              producto: 'Ternera a la plancha',
              cantidad: '1',
              comentario: 'Muy hecha'
          }, {
              producto: '2016-05-04',
              cantidad: '1',
              comentario: 'No. 189, Grove St, Los Angeles'
          }]
      }
    }
  }
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
    }
    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }

</style>

