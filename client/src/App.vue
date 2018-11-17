<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  router>
            <el-menu-item index="primeros" >Primeros</el-menu-item>
            <el-menu-item index="segundos" >Segundos</el-menu-item>
            <el-menu-item index="postres">Postres</el-menu-item>
            <el-menu-item index="bebidas" disabled>Bebidas</el-menu-item>
          </el-menu>


        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-aside width="250px">
        Barra lateral


      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: 'primeros'
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
    background: cornflowerblue;
    color: white;
  }
</style>
