<script>
import CommentCard from './comment-card.component.vue';

//new button for comments
import NewCommentButton from './new-comment-button.component.vue';

import { userService } from '../../../auth/services/user.service.js';

export default {
  name: "CommentsList",

  components: {
    CommentCard,
    NewCommentButton
  },

  emits: ['created', 'deleted'],

  //props que recibe del componente padre
  props: {
    commentsArray: {
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
    },
    producto_id: {
      type: String,
      required: true
    }
  },

  data(){
    return {
      commentsWithUserNames: []
      // Ahora tienen el dato extra del nombre de usuario
    };
  },

  watch: {
    commentsArray: {
      immediate: true,
      async handler(newComments) {
        if (newComments && newComments.length > 0) {
          await this.processComments(newComments);
        } else {
          this.commentsWithUserNames = [];
        }
      }
    }
  },

  methods: {
    async processComments(comments) {
      const userPromises = comments.map(async (comment) => {
        try {
          const user = await userService.getById(comment.usuario_id);
          return {
            ...comment,
            userName: `${user.nombre} ${user.apellido}`
          };
        } catch (err) {
          console.error(`Error loading user name for comment ${comment._id}: ${err.message}`);
          return {
            ...comment,
            userName: 'Nombre no disponible'
          };
        }
      });

      this.commentsWithUserNames = await Promise.all(userPromises);
    },

    emitCreated() {
      this.$emit('created');
    },


    emitDeleted() {
      this.$emit('deleted');
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

  <div class="comments-block" v-else>
    <div>
      <template v-if="commentsWithUserNames.length>0">
        <section class="container-comments">
          <comment-card
              v-for="comment in commentsWithUserNames"
              :key="comment._id"
              :comment="comment"
              :userName="comment.userName"
              @deleted="emitDeleted"
          />
        </section>
      </template>
      <template v-else>
        <div class="no-comments-placeholder">
          <i class="pi pi-comments" style="font-size: 2.5rem; color: #90a4ae;"></i>
          <p class="no-comments-text">No hay comentarios todavía.</p>
          <p class="no-comments-subtext">¡Sé el primero en compartir tu opinión!</p>
        </div>
      </template>
    </div>

    <new-comment-button :productId="producto_id"
        @created="emitCreated"/>
  </div>
</template>

<style scoped>
.container-comments {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comments-block {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
}

.no-comments-placeholder {
  text-align: center;
  padding: 2rem 1rem;
  border: 2px dashed #cfd8dc;
  border-radius: 8px;
  background-color: #f7f9fa;
}

.no-comments-text {
  font-size: 1.2rem;
  font-weight: 500;
  color: #546e7a;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.no-comments-subtext {
  font-size: 1rem;
  color: #78909c;
  margin: 0;
}
</style>