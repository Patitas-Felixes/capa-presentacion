<script>
//import { categoryService } from './shared/services/category.service';

export default {
  name: 'App',
  //mounted() {
  //  categoryService.getAll()
  //      .then(response => {
  //        // 'response' aquí ya es el array de datos, porque BaseService.getAll() devuelve response.data
  //        console.log('Conexión exitosa con el backend:', response);
  //      })
  //      .catch(error => {
  //        console.error('Error al conectar con el backend:', error);
  //      });
  //}
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
  <pb-ConfirmDialog />
</template>

<style scoped>

</style>
