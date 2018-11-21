<template>
  <div>
    <h1>Añadir a carta</h1>
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="Nombre del plato">
        <el-input v-model="form.nombre"></el-input>
      </el-form-item>
      <el-form-item label="Descripción del plato">
        <el-input type="textarea" v-model="form.descripcion"></el-input>
      </el-form-item>
      <el-form-item label="Tipo de plato">
        <el-select v-model="form.region" placeholder="selecciona el tipo de plato">
          <el-option label="Primero" value="primero"></el-option>
          <el-option label="Segundo" value="segundo"></el-option>
          <el-option label="Postre" value="postre"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Precio">
        <el-input v-model="form.precio"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Añadir plato</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import CocinaService from '@/services/CocinaService'

  export default {
    data () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>

</style>
