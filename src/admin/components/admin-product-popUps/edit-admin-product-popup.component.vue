<script>
import { ref } from "vue"; //principalmente lo usamos para el atributo visible del button
import { adminProductService } from '../../services/admin-product.service.js';
import { adminCategoryService} from "../../services/admin-category.service.js";
import { adminBrandService} from "../../services/admin-brand.service.js";

export default {
  name: "popUpEditAdminProduct",

  setup() {
    const visiblePop = ref(false); //variable visible que controlara la aparicion del popUp

    return { visiblePop };
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  emits: ['update:value', 'updated'],

  data() {
    return {
      initialProduct: null,
      productToEdit: {
        _id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        id_categoria: '',
        id_marca: ''
      },
      categories: [],
      brands: [],
      selectedCategory: null,
      selectedBrand: null,
      submitted: false
    };
  },

  computed: {
    isFormValid() {
      return this.productToEdit.nombre &&
             this.productToEdit.descripcion &&
             this.productToEdit.precio &&
             this.productToEdit.stock &&
             this.productToEdit.id_categoria &&
             this.productToEdit.id_marca;
    },
    hasChanges() {
      if (!this.initialProduct) return false;
      return JSON.stringify(this.product) !== JSON.stringify(this.initialProduct);
    }
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

    async updateProduct() {
      this.submitted = true;
      if (this.isFormValid && this.hasChanges) {
        try {
          const updatedProduct = await adminProductService.updateAdminProduct(this.productToEdit._id, this.productToEdit);
          this.$emit('updated', updatedProduct);
          this.$emit('update:value', false);
          this.$toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto actualizado correctamente',
            life: 3000
          });
          this.visiblePop = false;
          this.initializeForm();
          this.submitted = false;

        } catch (err) {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al actualizar producto: ${err.message}`,
            life: 3000
          });
        }
      }
    },

    initializeForm(){
      this.productToEdit = {
        _id: this.product._id,
        nombre: this.product.nombre,
        descripcion: this.product.descripcion,
        precio: this.product.precio,
        stock: this.product.stock,
        id_categoria: this.product.id_categoria,
        id_marca: this.product.id_marca
      };
      this.initialProduct = {... this.productToEdit}
    },
  },

  watch: {
    product: {
      immediate: true,
      handler() {
        if( this.product) {
          this.initializeForm();
          this.loadDropdowns();
        }
      }
    }
  }
}
</script>

<template>
  <pb-Button class="edit-producto-button" icon="pi pi-plus" label="Editar Producto" @click="visiblePop = true"/>

  <pb-Dialog v-model:visible="visiblePop" modal :style="{ width: '50rem' }">
    <template #header>
      <h1 class="title">Editar Producto</h1>
    </template>

    <pb-Form @submit="updateProduct">

      <div class="form-container">
        <pb-IftaLabel class="labelSelectField">
          <label for="nombre">Nombre</label>
          <pb-InputText id="nombre" v-model="productToEdit.nombre" class="input-field" />
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="descripcion">Descripcion</label>
          <pb-InputText id="descripcion" v-model="productToEdit.descripcion" class="input-field"/>
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="precio">precio</label>
          <pb-InputText id="precio" v-model="productToEdit.precio" placeholder="Ej: '23'" class="input-field"/>
        </pb-IftaLabel>

        <pb-IftaLabel class="labelSelectField">
          <label for="stock">stock</label>
          <pb-InputText id="stock" v-model="productToEdit.stock" placeholder="Ej: '1', '2', '3'" class="input-field"/>
        </pb-IftaLabel>

        <div class="p-field">
          <label for="marca">Marca</label>
          <pb-Select id="marca" v-model="productToEdit.id_marca" :options="brands" option-label="nombre" option-value="_id" />
        </div>

        <div class="p-field">
          <label for="categoria">Categoria</label>
          <pb-Select id="categoria" v-model="productToEdit.id_categoria" :options="categories" option-label="nombre" option-value="_id" />
        </div>

        <div class="button-container">
          <pb-Button label="Cancelar" icon="pi pi-times" class="cancel-button" @click="visiblePop = false" />
          <pb-Button label="Confirmar Edición" icon="pi pi-check" class="create-button" type="submit" :disabled="!isFormValid && !submitted" />
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

.edit-producto-button{
  /*Flex para centrar*/
  display: flex;
  align-items: center;

  /*Button en si*/
  background-color: #7A78FFFF;

  border: none;
  border-radius: 8px;

  padding: 8px 16px;

  height: 43px;

  max-width: 200px;
  width: 100%;

  /*Text Format*/
  font-size: 16px;
  font-family: Poppins, sans-serif;
  color: whitesmoke;
}

.edit-producto-button.p-button:hover{
  cursor: pointer;
  background-color: #CCCCFF;
  color: whitesmoke;
  border: none;
}

</style>