<script>
import { ref } from 'vue';
import { adminProductService } from '../../services/admin-product.service.js';
import { adminCategoryService} from "../../services/admin-category.service.js";
import { adminBrandService} from "../../services/admin-brand.service.js";

export default {
  name: "popUpNewAdminProduct",

  setup() {
    const visiblePop = ref(false); // Variable visible que controlará la aparición del popUp

    return { visiblePop };
  },

  emits: ['update:value', 'created'],

  data() {
    return {
      product: {
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        id_categoria: '',
        id_marca: ''
      },
      categories: [],
      brands: [],
      submitted: false
    };
  },

  computed: {
    isFormValid() {
      return this.product.nombre &&
             this.product.descripcion &&
             this.product.precio &&
             this.product.stock &&
             this.product.id_categoria &&
             this.product.id_marca;
    },
  },

  methods: {
    async loadDropdowns() {
      try {
        const [categories, brands] = await Promise.all([
          adminCategoryService.getAll(),
          adminBrandService.getAll()
        ]);
        this.categories = categories;
        this.brands = brands;
      } catch (err) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al cargar opciones: ${err.message}`,
          life: 3000
        });
      }
    },

    async createProduct() {
      this.submitted = true;
      if (!this.isFormValid) {
        this.$toast.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'Por favor, completa todos los campos requeridos.',
          life: 3000
        });
        return;
      }

      try {
        const newProduct = await adminProductService.createAdminProduct(this.product);
        this.$emit('created', newProduct);
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto creado exitosamente.',
          life: 3000
        });

        this.visiblePop = false; // Cerrar el pop-up

        this.product = {
          nombre: '',
          descripcion: '',
          precio: '',
          stock: '',
          id_categoria: '',
          id_marca: ''
        }; // Resetear el formulario

      } catch (err) {
        console.error(`Error al crear el producto: ${err.message}`);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al crear el producto: ${err.message}`,
          life: 3000
        });
      }
    }
  },

  mounted() {
    this.loadDropdowns();
  }
};


</script>

<template>
  <pb-Button class="nuevo-producto-button" icon="pi pi-plus" label="Nuevo Producto" @click="visiblePop = true"/>

  <pb-Dialog v-model:visible="visiblePop" modal :style="{ width: '50rem' }">
    <template #header>
      <h1 class="title">Nuevo Producto</h1>
    </template>

    <pb-Form @submit="createProduct">

      <div class="form-container">
        <pb-IftaLabel class="labelSelectField">
          <label for="nombre">Nombre</label>
          <pb-InputText id="nombre" v-model="product.nombre" class="input-field" />
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="descripcion">Descripcion</label>
          <pb-InputText id="descripcion" v-model="product.descripcion" class="input-field"/>
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="precio">precio</label>
          <pb-InputText id="precio" v-model="product.precio" placeholder="Ej: '23'" class="input-field"/>
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="stock">stock</label>
          <pb-InputText id="stock" v-model="product.stock" placeholder="Ej: '1', '2', '3'" class="input-field"/>
        </pb-IftaLabel>

        <div class="p-field">
          <label for="marca">Marca </label>
          <pb-Select id="marca" v-model="product.id_marca" :options="brands" option-label="nombre" option-value="_id" />
        </div>

        <div class="p-field">
          <label for="categoria">Categoria </label>
          <pb-Select id="categoria" v-model="product.id_categoria" :options="categories" option-label="nombre" option-value="_id" />
        </div>

        <div class="button-container">
          <pb-Button label="Cancelar" icon="pi pi-times" class="cancel-button" @click="visiblePop = false" />
          <pb-Button label="Crear" icon="pi pi-check" class="create-button" type="submit" :disabled="!isFormValid && !submitted" />
        </div>
      </div>
    </pb-Form>
  </pb-Dialog>
</template>

<style scoped>

.cascade-field {
  border-color: #CCCCFF;
  --p-cascadeselect-focus-border-color: #7A78FFFF;
  max-height: 200px; /* Ajusta según lo necesario */
  overflow-y: auto;
}

.labelSelectField{
  --p-iftalabel-color: gray;
  --p-iftalabel-focus-color: #7A78FFFF;
}

.input-field {
  border-color: #CCCCFF;
  --p-inputtext-focus-border-color: #7A78FFFF;
  width: 100%;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.button-container button{
  width: 100%;
}

.cancel-button{
  background-color: #FFCDBA;
  border: none;
}

.cancel-button.p-button:hover{
  background-color: #f3a88c;
  border: none;
}

.create-button{
  background-color: #66e1a3;
  border: none;
}

.create-button.p-button:disabled
{
  background-color: #66e1a3;
  border: none;
}

.create-button.p-button:hover
{
  background-color: #00A652;
  border: none;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.title{
  color: #7A78FFFF;
  border-bottom: #7A78FFFF solid 1px;
  padding: 10px;
}

.nuevo-producto-button{
  /*Flex para centrar*/
  display: flex;
  align-items: center;

  /*Button en si*/
  background-color: #7A78FFFF;

  border: none;
  border-radius: 8px;

  padding: 8px 16px;

  height: 50px;

  max-width: 220px;
  width: 100%;

  /*Text Format*/
  font-size: 16px;
  font-family: Poppins, sans-serif;
  color: whitesmoke;
}

.nuevo-producto-button.p-button:hover{
  cursor: pointer;
  background-color: #CCCCFF;
  color: whitesmoke;
  border: none;
}

</style>