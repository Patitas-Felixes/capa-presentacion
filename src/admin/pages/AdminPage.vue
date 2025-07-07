<script>
import AdminProductsHeader from "../components/admin-products-header.component.vue";
import AdminProductsList from "../components/admin-products-list.component.vue";

//import services if needed
import { adminProductService } from "../services/admin-product.service.js";

//import { adminCategoryService} from "../services/admin-category.service.js";
//import { adminBrandService} from "../services/admin-brand.service.js";

export default {
  components: {
    AdminProductsHeader,
    AdminProductsList
  },

  data() {
    return {
      products: [],
      //categories: [],
      //brands: [], //lo mismo que marcas solo que en ingles
      isLoading: false,
      error: null
    };
  },

  methods: {
    async loadProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        this.products = await adminProductService.getAll();

      } catch (err) {
        this.error = `Error al cargar productos: ${err.message}`;
        // Mostrar toast
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    },

    //async loadCategories() {
    //  try {
    //    this.categories = await adminCategoryService.getAll();
    //  } catch (err) {
    //    console.error(`Error al cargar categorías: ${err.message}`);
    //  }
    //},

    //async loadBrands() {
    //  try {
    //    this.brands = await adminBrandService.getAll();
    //  } catch (err) {
    //    console.error(`Error al cargar marcas: ${err.message}`);
    //  }
    //},

    async handleUpdated() {
      await this.loadProducts();
    },

    async handleDeleted() {
      await this.loadProducts();
    },

    async handleCreated() {
      await this.loadProducts();
    }
  },

  mounted() {
    this.loadProducts();
    //this.loadCategories();
    //this.loadBrands();
  }
}
</script>

<template>
  <section class="main-page-section">

  <admin-products-header @created="handleCreated"/>

  <admin-products-list :products="products"
                       :isLoading="isLoading" :error="error"
                       @updated="handleUpdated" @deleted="handleDeleted"
                       />
  </section>
</template>

<style scoped>

.main-page-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding-right: 8rem;
  padding-left: 8rem;

  padding-top: 3rem;
}

</style>