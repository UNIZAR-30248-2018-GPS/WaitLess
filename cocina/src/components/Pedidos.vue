<template>
  <div>
    <h1>Pedidos</h1>
    <el-row v-loading="loading" v-for="i in Math.ceil(wsData.length / 3)" :gutter="20">
      <el-col  v-for="pedido in wsData.slice((i - 1) * 3, i * 3)" :key="pedido.num_pedido" :span="8"><div >
        <el-card jest="card" class="box-card">
          <el-button type="primary" class="botonCamarero" @click="callWsCamarero">Avisar camarero</el-button>
          <strong>Mesa {{pedido.mesa}}</strong>
          <el-table
            ref="multipleTable"
            :data="pedido.item"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="selection"
              width="50%">
            </el-table-column>
            <el-table-column
              prop="nombre"
              label="Producto">
            </el-table-column>
            <el-table-column
              prop="comentario"
              label="Comentario">
            </el-table-column>
          </el-table>
        </el-card>
      </div></el-col>
    </el-row>



  </div>

</template>

<script>
  import CocinaService from '../services/CocinaService'
  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          //return 'success-row';
          return '';
        }
        return '';
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      callWs(){
        CocinaService.pedidos_ws(this.newPedido);
      },
      newPedido(data){
        this.wsData.push(data);
        this.loading = false;
        console.log("DATOS->"+this.wsData)
      }
    },
    mounted: function(){
      this.$nextTick(function () {
        this.callWs();
      })
    },
    data () {
      return {
        loading: false,
        multipleSelection: [],
        wsData : []
      }
    }


  }
</script>

<style>
    .label {
      float: right;
    }

    .botonCamarero {
      float: left;
    }

    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }



</style>

