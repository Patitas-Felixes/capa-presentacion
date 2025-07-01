<script>
export default {
  name: 'App',

  /*EN TEST*/
  //
  //data() {
  //  return {
  //    isAuthenticated: false
  //  }
  //},
  //created() {
  //  // Verificar si hay un token almacenado para determinar si el usuario está autenticado
  //  this.checkAuthentication();
  //
  //  // Forzar redirección a login si estamos en la ruta raíz
  //  /* if (this.$route.path === '/') {
  //     this.$router.push('/login');
  //   }*/
  //},
  //methods: {
  //  checkAuthentication() {
  //    // Verificar si hay un token en localStorage
  //    const token = localStorage.getItem('auth_token');
  //    this.isAuthenticated = !!token;
  //  },
  //  handleLoginSuccess() {
  //    this.isAuthenticated = true;
  //    this.$router.push('/');
  //  },
  //  handleRegisterSuccess() {
  //    this.isAuthenticated = true;
  //    this.$router.push('/');
  //  }
  //}
}
</script>

<template>
  <!-- Componente para las rutas -->
  <router-view></router-view>
</template>

<style scoped>

</style>
