<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  router>
            <el-menu-item index="pedidos" >Pedidos</el-menu-item>
            <el-menu-item index="disponibilidad" >Disponibilidad de carta</el-menu-item>
            <el-menu-item index="modificar">Modificar carta</el-menu-item>
            <el-menu-item index="anadir">Añadir a carta</el-menu-item>
          </el-menu>


        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: 'pedidos'
    };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

  .el-aside {
    background: lightgrey;
    color: white;
  }
</style>
