<template>
  <div>
    <h1>Añadir a carta</h1>

    <el-row :gutter="20">
      <el-col :span="14" :offset="4">

        <el-form ref="form" :model="form" :rules="rules" label-width="120px">

          <el-form-item label="Nombre" prop="nombre" required>
            <el-input v-model="form.nombre" ></el-input>
          </el-form-item>

          <el-form-item label="Descripción" prop="descripcion" required>
            <el-input v-model="form.descripcion" ></el-input>
          </el-form-item>

          <el-form-item label="Tipo" prop="tipo" required>
            <el-select v-model="form.tipo" placeholder="Selecciona el tipo de plato o bebida" style="width: 100%;">
              <el-option label="Primero" value="2"></el-option>
              <el-option label="Segundo" value="3"></el-option>
              <el-option label="Postre" value="4"></el-option>
              <el-option label="Bebida" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Alérgenos" prop="alergenos">
            <el-select
              style="width: 100%;"
              v-model="form.alergenos"
              multiple
              filterable
              placeholder="Selecciona los alérgenos que contiene">
              <el-option
                v-for="item in alergenos"
                :key="item.id"
                :label="item.nombre"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Ingredientes" prop="ingredientes" required>
            <el-select
              style="width: 100%;"
              v-model="form.ingredientes"
              multiple
              filterable
              allow-create
              placeholder="Selecciona y/o añade sus ingredientes">
              <el-option
                v-for="item in ingredientes"
                :key="item.id"
                :label="item.nombre"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="Precio" prop="precio" required>
            <el-input-number controls-position="right" v-model.number="form.precio" type="number" style="width: 100%;"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="comprobarFormulario('form')">Añadir a la carta</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

  </div>
</template>

<script>
  import CocinaService from '@/services/CocinaService'

  export default {
    data () {
      return {
        form: {
          nombre: '',
          descripcion: '',
          tipo: '',
          precio: 0,
          alergenos: [],
          ingredientes: []
        },
        alergenos: [],
        ingredientes: [],
        rules: {
          nombre: [
            { required: true, message: 'Por favor introduce el nombre', trigger: 'blur' },
            { min: 3, message: 'El nombre debe ser superior a 3 letras', trigger: 'blur' }
          ],
          tipo: [
            { required: true, message: 'Por favor selecciona un tipo', trigger: 'change' }
          ],
          descripcion: [
            { required: true, message: 'Por favor introduce la descripción', trigger: 'blur' },
            { min: 3, message: 'La descripción debe ser superior a 3 letras', trigger: 'blur' }
          ],
          precio: [
            { type: 'number', required: true, message: 'Por favor introduce el precio', trigger: 'blur' },
            { type: 'number', min: 1, max: 999, message: 'El precio debe ser superior a 0€', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      comprobarFormulario(nombreFormulario) {
        this.$refs[nombreFormulario].validate((valid) => {
          if (valid) {
            this.onSubmit();
          } else {
            console.log('Error al comprobar los datos!!');
            this.error();
            return false;
          }
        });
      },
      async cargarAlergenos(){
        const response = await CocinaService.alergenos()
        this.alergenos = response.data
      },
      async cargarIngredientes(){
        const response = await CocinaService.ingredientes()
        this.ingredientes = response.data
      },
      async anyadirIngredientesNuevos(nuevosIngredientes) {
        for (var i = 0; i<nuevosIngredientes.length; i++) {
          await CocinaService.nuevoIngrediente(nuevosIngredientes[i])
        }
      },
      buscarIdIngredientes(nombreIngredientes) {
        var idIngredientes = []
        for(var i = 0; i<nombreIngredientes.length;i++) {
          //Busca el ingrediente con el nombre recibido y almacena su id
          idIngredientes.push(this.ingredientes.find(ingrediente => ingrediente.nombre === nombreIngredientes[i]).id)
        }
        return idIngredientes;
      },
      async onSubmit() {

        console.log(this.form);

        //Analiza los ingredientes y almacena el nombre de los que no existían previamente
        const nuevosIngredientes = this.form.ingredientes.filter(ingrediente => typeof ingrediente == "string");
        const ingredientesYaCreados = this.form.ingredientes.filter(ingrediente => typeof ingrediente == "number");

        //Crea un array con el ID de los ingredientes ya creados
        var idDeIngredientes = ingredientesYaCreados;

        //Se comprueba si el usuario ha añadido ingredientes que no existían
        if(nuevosIngredientes.length > 0) {

          //Añade los nuevos ingredientes al sistema y los vuelve a cargar localmente para conocer su ID
          const ingredientesPromise = this.anyadirIngredientesNuevos(nuevosIngredientes);
          await ingredientesPromise;
          await this.cargarIngredientes();

          //Añade el id de los nuevos ingredientes
          idDeIngredientes = idDeIngredientes.concat(this.buscarIdIngredientes(nuevosIngredientes));

        }
        //Añade el nuevo plato
        CocinaService.nuevoPlato(this.form.nombre,this.form.descripcion,this.form.precio,this.form.tipo,
          this.form.alergenos,idDeIngredientes)

        this.exito()


        console.log('Nuevo plato añadido -> '+this.form.nombre+' '+this.form.descripcion+' '+this.form.precio
          +' '+this.form.tipo+' '+ this.form.alergenos+' '+idDeIngredientes)


      },
      exito() {
        this.$message({
          showClose: true,
          message: 'El producto se ha añadido a la carta correctamente',
          type: 'success'
        });
      },
      error() {
        this.$message({
          showClose: true,
          message: 'Ups, comprueba los datos',
          type: 'error'
        });
      }
    },
    beforeMount() {
      this.cargarIngredientes()
      this.cargarAlergenos()
    }
  }
</script>

<style>

</style>
