<script>
import { commentService} from "../../services/comment.service.js";

export default {
  name: 'DeleteCommentButton',

  emits: ['deleted'],

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      currentUser: null
    };
  },

  computed: {
    canDelete() {
      return this.currentUser && this.currentUser._id === this.comment.usuario_id;
    }
  },

  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.currentUser = user;
    }
  },

  methods: {
    confirmDelete() {
      this.$confirm.require({
        message: '¿Estás seguro de que quieres eliminar este comentario?',
        header: 'Confirmación de eliminación',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Sí, eliminar',
        rejectLabel: 'Cancelar',
        accept: async () => {
          try {
            await commentService.deleteComment(this.comment._id);
            this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Comentario eliminado', life: 3000 });
            this.$emit('deleted', this.comment._id);
          } catch (error) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el comentario', life: 3000 });
          }
        }
      });
    }
  }
}
</script>

<template>
  <div v-if="canDelete">
    <pb-Button
        icon="pi pi-trash"
        class="p-button-rounded p-button-danger p-button-text"
        size="large"
        @click="confirmDelete"
    />
  </div>
</template>

<style scoped>

</style>