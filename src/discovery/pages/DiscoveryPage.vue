<script>

import ProductsList from "../components/products-list.component.vue";
import ProductsFilterComponent from "../components/products-filter.component.vue";

import { adminProductService } from "../../admin/services/admin-product.service.js";

import { adminCategoryService } from "../../admin/services/admin-category.service.js";
import { adminBrandService } from "../../admin/services/admin-brand.service.js";
import ProductsFilter from "../components/products-filter.component.vue";


export default {
  name: "DiscoveryPage",

  components: {
    ProductsFilter,
    ProductsList,
    ProductsFilterComponent
  },

  data(){
    return {
      products: [],
      categories: [],
      brands: [],
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
        console.log("All products:", this.products);
      } catch (err) {
        this.error = `Error loading products: ${err.message}`;
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    },

    async loadCategories() {
      try {
        this.categories = await adminCategoryService.getAll();
      } catch (err) {
        this.error = `Error loading categories: ${err.message}`;
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      }
    },

    async loadBrands() {
      try {
        this.brands = await adminBrandService.getAll();
      } catch (err) {
        this.error = `Error loading brands: ${err.message}`;
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      }
    },

    async loadFilteredProducts(categoryId) {
      this.isLoading = true;
      this.error = null;
      try {
        this.products = await adminProductService.getProductsByCategory(categoryId);
        console.log("Filtered products by category and brand", this.products);
      } catch (err) {
        this.error = `Error loading filtered products: ${err.message}`;
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    },

    async handleBuscar(categoryId) {
      console.log("handleBuscar called with categoryId:", categoryId);
      if (categoryId) {
        await this.loadFilteredProducts(categoryId);
      } else {
        // If no districtId is provided, load all routes
        console.log("categoryId not found");
        await this.loadProducts();
      }
    },

    async handleBorrar() {
      console.log("handleBorrar called");
      // Clear the filter and reload all routes
      await this.loadProducts();
    }
  },

  async mounted() {
    await this.loadProducts();
    await this.loadCategories();
    await this.loadBrands();
  }
}

</script>

<template>
  <section class="products-dashboard">
    <products-filter :categories="categories" @buscar="handleBuscar" @borrar="handleBorrar"/>
    <products-list :products="products" :isLoading="isLoading" :error="error"/>
  </section>

</template>

<style scoped>
.products-dashboard {
  display: flex;
  flex-direction: column;
  gap: 6rem;

  padding-right: 8rem;
  padding-left: 8rem;

  padding-top: 3rem;

  justify-content: center;
  align-items: center;
}

</style>