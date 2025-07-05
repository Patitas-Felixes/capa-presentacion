<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { AuthService } from "../services/auth.service.js";

const router = useRouter();
const isLoading = ref(false);

// Función para manejar el envío del formulario
const handleLogin = async (fields) => {
  //evitar que el usuario envíe el formulario varias veces
  //básicamente se establece que está cargando el formulario y dentro
  //de los formkit de los inputs se establece el disabled a isLoading que se convierte en true
  isLoading.value = true;

  try {
    // Llamada al servicio de autenticación
    const authService = new AuthService();
    const response = await authService.login(fields);

    // Guardar los datos del usuario en localStorage
    localStorage.setItem('user', JSON.stringify(response.user));

    console.log('Iniciando sesión con:', response);

    if(response.es_admin === true) {
      await router.replace('/admin'); // Redirige al panel de administración si es un administrador
    }

    else await router.replace('/home'); // Redirige a la página de inicio
  }
  catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    isLoading.value = false; // Restablece el estado en caso de error
    return;
  }

  // Simulación de una espera de red. FormKit mostrará el spinner en el botón.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  isLoading.value = false; // Restablece el estado
};

</script>

<template>
  <div class="login-container">

    <div class="login-card">
      <h2>Login</h2>
      <FormKit
          type="form"
          @submit="handleLogin"
          submit-label="Log In"
      >
        <FormKit
            type="email"
            name="email"
            label="Correo electrónico"
            placeholder="tu@email.com"
            validation="required|email"
            :disabled="isLoading"
        />
        <FormKit
            type="password"
            name="password"
            label="Contraseña"
            placeholder="Tu contraseña"
            validation="required"
            :disabled="isLoading"
        />
      </FormKit>
      <div class="register-link">
        <router-link to="/register">Crear Cuenta</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ocupa toda la altura de la ventana */
  background-image: url('../../assets/background-images/login-bg.jpg');
  background-size: cover; /* La imagen cubret todoelespacio*/
  background-position: center; /* Centra la imagen de fondo */
}

.login-card {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  background-color: white;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: var(--p-primary-color);
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>