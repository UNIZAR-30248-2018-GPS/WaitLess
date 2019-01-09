<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12"><div >
        <el-card class="box-card">
          <el-button type="primary" class="botonCamarero" @click="callWs">Avisar camarero</el-button>
          <strong>Mesa 1</strong>
          <el-tag type="info" class="label">14:17</el-tag>
          <el-table
            ref="multipleTable"
            :data="tableData2"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="selection"
              width="50%">
            </el-table-column>
            <el-table-column
              prop="producto"
              label="Producto">
            </el-table-column>
            <el-table-column
              prop="cantidad"
              label="Can"
              width="50%">
            </el-table-column>
            <el-table-column
              prop="comentario"
              label="Comentario">
            </el-table-column>
          </el-table>
      </el-card>
      </div></el-col>
      <el-col :span="12"><div >
        <el-card class="box-card">
          <el-button type="primary" class="botonCamarero">Avisar camarero</el-button>
          Mesa 1
          <el-tag type="info" class="label">14:17</el-tag>
          <el-table
            ref="multipleTable"
            :data="tableData2"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="selection"
              width="50%">
            </el-table-column>
            <el-table-column
              prop="producto"
              label="Producto">
            </el-table-column>
            <el-table-column
              prop="cantidad"
              label="Can"
              width="50%">
            </el-table-column>
            <el-table-column
              prop="comentario"
              label="Comentario">
            </el-table-column>
          </el-table>
        </el-card>
      </div></el-col>

    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><div >
        <el-card class="box-card">
          <el-button type="primary" class="botonCamarero">Avisar camarero</el-button>
          Mesa 1
          <el-tag type="info" class="label">14:17</el-tag>
          <el-table
            ref="multipleTable"
            :data="tableData2"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="selection"
              width="50%">
            </el-table-column>
            <el-table-column
              prop="producto"
              label="Producto">
            </el-table-column>
            <el-table-column
              prop="cantidad"
              label="Can"
              width="50%">
            </el-table-column>
            <el-table-column
              prop="comentario"
              label="Comentario">
            </el-table-column>
          </el-table>
        </el-card>
      </div></el-col>
      <el-col :span="12"><div >
        <el-card class="box-card">
          <el-button type="primary" class="botonCamarero">Avisar camarero</el-button>
          {{wsData}}
          <el-tag type="info" class="label">14:17</el-tag>
        </el-card>
      </div></el-col>
    </el-row>


  </div>

</template>

<script>
  import CocinaService from '@/services/CocinaService'
  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'success-row';
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
      }
    },
    mounted: function(){
      this.$nextTick(function () {
        this.callWs();
      })
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
          producto: 'Crema catalana',
          cantidad: '1',
          comentario: ''
        }],
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

