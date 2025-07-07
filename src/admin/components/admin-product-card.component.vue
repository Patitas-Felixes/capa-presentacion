<script>
import DeleteAdminProductPopupComponent from './admin-product-popUps/delete-admin-product-popup.component.vue';
import EditAdminProductPopupComponent from './admin-product-popUps/edit-admin-product-popup.component.vue';

import { inject } from 'vue'; // Añadir esta importación


export default {
  name: "adminProductCard",

  components: { deleteAdminProductPopUp: DeleteAdminProductPopupComponent, editAdminProductPopUp: EditAdminProductPopupComponent },

  emits: ['updated', 'deleted'],

  //objeto producto con los datos del producto
  props: ['product', 'BrandName', "CategoryName"],

  setup(props) {
    const cloudinary = inject('cloudinary');

    // Generar URL de la imagen desde el public_id almacenado en product.imagen_url
    const getImageUrl = () => {
      // Si no hay imagen_url, usar una imagen de placeholder
      if (props.product.imagen_url === 'default-image.png') {
        return 'https://picsum.photos/id/237/380/280';
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
  <pb-Card class="admin-product-card">
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
      <div class="main-button-frame">
        <edit-admin-product-pop-up :product="product" @updated="$emit('updated', $event)"/>
        <delete-admin-product-pop-up :productId="product._id" @deleted="$emit('deleted', $event)"/>
      </div>
    </template>
  </pb-Card>
</template>

<style scoped>
.admin-product-card {
  width: 380px;
  height: 580px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.admin-product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.product-title {
  font-size: 1.35rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  height: 48px;
  overflow: hidden;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1rem;
}

.product-meta p {
  margin: 0.25rem 0;
  font-size: 0.95rem;
  color: #444;
}

.main-button-frame {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 0.7rem; /* Separación del contenido superior */
}
</style>