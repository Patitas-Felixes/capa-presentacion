<script>
import NewAdminProductPopupComponent from "./admin-product-popUps/new-admin-product-popup.component.vue";

export default {
  name: 'adminProductsHeader',

  components: {
    popUpNewAdminProduct: NewAdminProductPopupComponent
  },

  emits: ['created'],
}

</script>

<template>
  <div class="container">
    <h1>
      <span class="icon"><i class="pi pi-box"></i></span>
      <span class="title-text">Productos</span>
    </h1>
    <pop-up-new-admin-product
        @created="$emit('created', $event)"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e3e8ee;
  margin-bottom: 1.5rem;
}

h1 {
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1976d2;
  letter-spacing: 1px;
  margin: 0;
  gap: 0.7rem;
}

.icon {
  font-size: 2.2rem;
  color: #42a5f5;
  display: flex;
  align-items: center;
}

.title-text {
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  font-weight: 700;
  color: #1976d2;
  text-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.5rem;
    gap: 0.4rem;
  }
  .icon {
    font-size: 1.3rem;
  }
}
</style>