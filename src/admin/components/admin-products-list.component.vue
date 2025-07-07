<script>
import AdminProductCard from './admin-product-card.component.vue'
import { adminCategoryService} from "../services/admin-category.service.js";
import { adminBrandService} from "../services/admin-brand.service.js";

export default {
  name: "admin-products-list",

  components: {
    AdminProductCard,
  },

  data(){
    return {
      productsWithBrandAndCategoryNames: []
      //basicamente ahora tienen el dato extra del nombre de la marca y la categoría
    }
  },

  emits: ['updated', 'deleted'],

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
      const categoryPromises = products.map(async (product) => {
        try {
          const category = await adminCategoryService.getById(product.id_categoria);
          return {
            ...product,
            categoryName: category.nombre
          };
        } catch (err) {
          console.error(`Error al cargar la categoría para el producto ${product.id}: ${err.message}`);
          return {
            ...product,
            categoryName: 'Categoría no disponible'
          };
        }
      });

      const brandPromises = products.map(async (product) => {
        try {
          const brand = await adminBrandService.getById(product.id_marca);
          return {
            ...product,
            brandName: brand.nombre
          };
        } catch (err) {
          console.error(`Error al cargar la marca para el producto ${product.id}: ${err.message}`);
          return {
            ...product,
            brandName: 'Marca no disponible'
          };
        }
      });

      const categories = await Promise.all(categoryPromises);
      const brands = await Promise.all(brandPromises);

      this.productsWithBrandAndCategoryNames = categories.map((category, index) => ({
        ...category,
        brandName: brands[index].brandName
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
      <admin-product-card
          v-for="product in productsWithBrandAndCategoryNames"
          :key="product._id"
          :product="product"
          :BrandName="product.brandName"
          :CategoryName="product.categoryName"
          @updated="$emit('updated', $event)"
          @deleted="$emit('deleted', $event)"
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