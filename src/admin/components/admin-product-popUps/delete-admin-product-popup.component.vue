<script>
import { useConfirm } from 'primevue/useconfirm';
import { adminProductService } from '../../services/admin-product.service.js';
import { useToast } from 'primevue/usetoast';

export default{
  name:'popUpDeleteAdminProduct',

  props: {
    productId: {
      type: String,
      required: true
    }
  },

  emits: ['update:value', 'deleted'],

  setup(props, {emit}) {
    const confirm = useConfirm();
    const toast = useToast();

    const confirmDelete = () => {
      confirm.require({
        message: '¿Estás seguro de que quieres eliminar este producto?',
        header: 'Confirmar Eliminación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: async () => {
          try {
            await adminProductService.deleteAdminProduct(props.productId);
            emit('deleted');
            toast.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto eliminado',
              life: 3000
            });
          } catch (error) {
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error al eliminar producto: ${error.message}`,
              life: 3000
            });
          }
        },
        reject: () => {
          // No hacer nada
        }
      });
    };
    return { confirmDelete };
  }

}


</script>

<template>
  <pb-Button icon="pi pi-trash"  class="delete-button" @click="confirmDelete" />
</template>

<style scoped>
.delete-button{
  background-color: #FF2C2C;
  border-color: transparent;
  height: 2.5rem;
  width: 3rem;
}

.delete-button.p-button:hover {
  background-color: lightcoral;
  border-color: transparent;
}
</style>