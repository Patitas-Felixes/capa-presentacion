<script>
import { commentService } from "../../services/comment.service.js";

export default {
  name: 'NewCommentButton',

  emits: ['created'],

  props: ['productId'],

  data() {
    return {
      commentText: '',
      isSubmitting: false
    };
  },

  methods: {
    async createComment() {
      if (!this.commentText.trim()) return;

      //verificar si hay usuario en el localStorage con un console.log
      console.log("Usuario en localStorage:", localStorage.getItem('user'));

      this.isSubmitting = true;
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
          throw new Error("Usuario no autenticado.");
        }

        const newComment = {
          producto_id: this.productId,
          usuario_id: user._id,
          comentario: this.commentText
        };

        await commentService.createComment(newComment);

        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Comentario creado exitosamente',
          life: 3000
        });

        this.commentText = ''; // Reiniciar campo
        this.$emit('created'); // Notificar al padre que se creó un comentario
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al crear el comentario: ${error.message}`,
          life: 3000
        });
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="createComment" class="new-comment-form">
    <div class="p-field">
      <pb-Textarea
          v-model="commentText"
          rows="4"
          cols="50"
          placeholder="Escribe tu comentario aquí..."
          autoResize
          class="w-full"
      />
    </div>
    <pb-Button
        type="submit"
        class="new-comment-button mt-2"
        label="Enviar Comentario"
        icon="pi pi-send"
        severity="info"
        :disabled="!commentText.trim() || isSubmitting"
    />
  </form>
</template>

<style scoped>
.new-comment-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>