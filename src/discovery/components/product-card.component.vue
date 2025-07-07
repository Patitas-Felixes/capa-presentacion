<script>
//importar el button de comments que controlara la aparicion del popUp
import popUpComments from './comments/comments-popup.component.vue';

import { inject } from 'vue'; // Añadir esta importación

export default {
  name: "product-card",

  components: {
    popUpComments
  },

  //objeto que se fetcheara desde discovery page
  props: ['product', 'BrandName', 'CategoryName'],

  setup(props) {
    const cloudinary = inject('cloudinary');

    // Generar URL de la imagen desde el public_id almacenado en product.imagen_url
    const getImageUrl = () => {
      // Si no hay imagen_url, usar una imagen de placeholder
      if (props.product.imagen_url === 'default-image.png') {
        return 'https://picsum.photos/380/280';
      }

      console.log('Imagen URL:', props.product.imagen_url);
      // Si la URL ya está completa, úsala directamente
      if (props.product.imagen_url.startsWith('http')) {
        return props.product.imagen_url;
      }

      // Usar la URL directa de Cloudinary con transformación automática
      const nombreBase = props.product.imagen_url.split('.')[0]; // Quita la extensión (.jpg)
      return `https://res.cloudinary.com/daibtpozv/image/upload/v1751851110/${nombreBase}.jpg`;
    }

    return {
      getImageUrl
    };
  }
}
</script>

<template>
  <pb-Card class="product-card">
    <template #header>
      <img :src="getImageUrl()" alt="Imagen del producto" class="product-image" />
    </template>
    <template #title>
      <div class="product-title">{{ product.nombre }}</div>
    </template>
    <template #content>
      <p class="product-description">{{ product.descripcion }}</p>
      <div class="product-info">
        <span>Precio: S/ {{ product.precio }}</span>
        <span>Stock: {{ product.stock }}</span>
      </div>
      <div class="product-meta">
        <p><strong>Categoría:</strong> {{ CategoryName }}</p>
        <p><strong>Marca:</strong> {{ BrandName }}</p>
      </div>
    </template>

    <template #footer>
      <div class="product-footer">
        <pop-up-comments :product="product"/>
      </div>
    </template>
  </pb-Card>

</template>

<style scoped>
.product-card {
  width: 380px;
  height: 560px; /* Aumentamos la altura de la card */
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden; /* Para que la imagen respete el borde redondeado */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Sombra sutil */
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 280px; /* Aumentamos la altura de la imagen */
  object-fit: cover; /* 'cover' para llenar el espacio sin distorsionar */
}

.product-title {
  font-size: 1.35rem; /* Aumentamos tamaño del título */
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-description {
  font-size: 1rem; /* Aumentamos tamaño de la descripción */
  color: #666;
  margin-bottom: 1rem;
  height: 48px; /* Ajustamos altura para el nuevo tamaño de fuente */
  overflow: hidden;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1rem; /* Aumentamos tamaño de fuente */
}

.product-meta p {
  margin: 0.25rem 0;
  font-size: 0.95rem; /* Aumentamos tamaño de fuente */
  color: #444;
}

.product-footer {
  display: flex;
  justify-content: center;
}
</style>