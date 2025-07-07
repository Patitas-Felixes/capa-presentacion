<script>
import { adminBrandService } from "../../admin/services/admin-brand.service.js";
import { adminCategoryService } from "../../admin/services/admin-category.service.js";

import ProductCard from "./product-card.component.vue";

export default {
  name: "ProductsList",

  components: {
    ProductCard
  },

  data(){
    return {
      productsWithBrandAndCategoryNames: []
      // Now they have the extra data of brand and category names
    };
  },

  props: {
    products: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },

  watch: {
    products: {
      immediate: true,
      async handler(newProducts) {
        if (newProducts && newProducts.length > 0) {
          await this.processProducts(newProducts);
        } else {
          this.productsWithBrandAndCategoryNames = [];
        }
      }
    }
  },

  methods: {
    async processProducts(products) {
      const brandPromises = products.map(async (product) => {
        try {
          const brand = await adminBrandService.getById(product.id_marca);
          return {
            ...product,
            brandName: brand.nombre
          };
        } catch (err) {
          console.error(`Error loading brand name for product ${product.id}: ${err.message}`);
          return {
            ...product,
            brandName: 'Brand not available'
          };
        }
      });

      const categoryPromises = products.map(async (product) => {
        try {
          const category = await adminCategoryService.getById(product.id_categoria);
          return {
            ...product,
            categoryName: category.nombre
          };
        } catch (err) {
          console.error(`Error loading category name for product ${product.id}: ${err.message}`);
          return {
            ...product,
            categoryName: 'Category not available'
          };
        }
      });

      const brands = await Promise.all(brandPromises);
      const categories = await Promise.all(categoryPromises);

      this.productsWithBrandAndCategoryNames = products.map((product, index) => ({
        ...product,
        brandName: brands[index].brandName,
        categoryName: categories[index].categoryName
      }));
    }
  }
}
</script>

<template>
  <pb-Toast/>
  <pb-ProgressSpinner v-if="isLoading" />
  <pb-Message v-else-if="error" severity="error" :closable="false">
    {{ error }}
  </pb-Message>

  <template v-else-if="productsWithBrandAndCategoryNames.length>0">
    <section class="container-productos">
      <product-card
          v-for="product in productsWithBrandAndCategoryNames"
          :key="product._id"
          :product="product"
          :BrandName="product.brandName"
          :CategoryName="product.categoryName"
      />
    </section>
  </template>
  <template v-else>
    <pb-Message severity="info" :closable="false">
      <template #icon>
        <i class="pi pi-info-circle"></i>
      </template>
      No hay productos disponibles
    </pb-Message>
  </template>
</template>

<style scoped>
.container-productos {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /* Permite que los productos pasen a la siguiente fila */
  gap: 4rem;
  box-sizing: border-box;

  justify-content: center;
}

</style>