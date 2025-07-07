<script>

import DeleteCommentButton from './delete-comment-button.component.vue'

export default{
  name: "CommentCard",

  components: {
    DeleteCommentButton,
  },

  emits: ['deleted'],

  props: ['comment', 'userName'],
}
</script>

<template>
  <pb-Card class="comment-card">
    <template #title>
      <div class="comment-header">
        <span class="user-name">{{userName}}</span>
        <DeleteCommentButton :comment="comment" @deleted="$emit('deleted', $event)"/>
      </div>
    </template>

    <template #content>
      <p class="comment-text">{{comment.comentario}}</p>
    </template>
  </pb-Card>
</template>

<style scoped>
.comment-card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #e9ecef; /* Borde sutil para mejor definición */
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.user-name {
  font-size: 1.4rem; /* Tamaño reducido para el nombre */
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5px; /* Añade espacio entre las letras */
}

.comment-text {
  font-size: 1.2rem; /* Tamaño aumentado para el comentario */
  color: #555;
  line-height: 1.5;
}

/* Ajustes finos a los estilos internos del componente de PrimeVue */
:deep(.p-card-title) {
  padding-bottom: 0.5rem;
}

:deep(.p-card-content) {
  padding-top: 0;
}
</style>