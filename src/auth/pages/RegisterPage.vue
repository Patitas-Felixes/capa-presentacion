<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { AuthService } from "../services/auth.service.js";

const router = useRouter();
const isLoading = ref(false);

// Función para manejar el envío del formulario de registro
const handleRegister = async (fields) => {
  //evitar que el usuario envíe el formulario varias veces
  //básicamente se establece que está cargando el formulario y dentro
  //de los formkit de los inputs se establece el disabled a isLoading que se convierte en true
  isLoading.value = true;

  try {
    // Llamada al servicio de autenticación

    console.log('Registrando con:', fields);

    const authService = new AuthService();
    const response = await authService.register(fields);

    console.log('Registrando con:', response);

    await router.push('/login'); // Redirige a la página de inicio
  }
  catch (error) {
    console.error('Error durante el registro:', error);
    isLoading.value = false; // Restablece el estado en caso de error
    return;
  }

  // Simulación de una espera de red. FormKit mostrará el spinner en el botón.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulación de redirección exitosa
  //alert('Inicio de sesión exitoso');
  isLoading.value = false; // Restablece el estado
};



</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Registro</h2>
      <FormKit
          type="form"
          @submit="handleRegister"
          submit-label="Registrarse"
      >
        <FormKit
            type="text"
            name="nombre"
            label="Nombre"
            placeholder="Tu nombre"
            validation="required"
            :disabled="isLoading"
        />
        <FormKit
            type="text"
            name="apellido"
            label="Apellido"
            placeholder="Tu apellido"
            validation="required"
            :disabled="isLoading"
        />
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
        <FormKit
            type="text"
            name="direccion"
            label="Dirección"
            placeholder="Tu dirección"
            validation="required"
            :disabled="isLoading"
        />
      </FormKit>
      <div class="login-link">
        <router-link to="/login">¿Ya tienes cuenta? Inicia sesión</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('../../assets/background-images/login-bg.jpg');
  background-size: cover;
  background-position: center;
}

.register-card {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  background-color: white; /* Para que el formulario sea legible sobre el fondo */
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: var(--p-primary-color);
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>