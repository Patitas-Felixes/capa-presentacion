<script>
import {ref} from "vue";

//lista de comentarios por productoID
import { commentService } from "../../services/comment.service.js";

import CommentsList from "../comments/comments-list.component.vue";

export default {
  name: "pop-up-comments",

  components: {
    CommentsList,
  },

  //recibe el objeto producto de la clase padre
  props: ['product'],

  setup() {
    const visiblePop = ref(false); //variable visible que controlara la aparicion del popUp
    return { visiblePop };
  },

  data(){
    return {
      commentsArray: [],
      isLoading: false,
      error: null
    };
  },

  methods:{
    async loadComments() {
      this.isLoading = true;
      this.error = null;
      try {
        this.commentsArray = await commentService.getCommentsByProductId(this.product._id);
        console.log("Comments for product:", this.commentsArray);
      } catch (err) {
        this.error = `Error loading comments: ${err.message}`;
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error
        });
      } finally {
        this.isLoading = false;
      }
    },

    async handleCreated() {
      // Recargar los comentarios después de crear uno nuevo
      await this.loadComments();
    },

    async handleDeleted() {
      // Recargar los comentarios después de crear uno nuevo
      await this.loadComments();
    }

  },

  async mounted() {
    // Cargar los comentarios al montar el componente
    await this.loadComments();
  }
}



</script>

<template>
  <pb-Button class="show-comments-button" icon="pi pi-comments" label="Ver comentarios" severity="info" @click="visiblePop = true"/>

  <pb-Dialog v-model:visible="visiblePop" modal :style="{ width: '80rem' }">
    <template #header>
      <h1 class="title">{{ product.nombre}} - Hilo</h1>
    </template>

    <comments-list :commentsArray="commentsArray" :isLoading="isLoading" :error="error"
                   :producto_id="product._id"
                   @deleted="handleDeleted"
                   @created="handleCreated"/>

  </pb-Dialog>
</template>

<style scoped>

.title{
  font-size: 2rem;
  font-weight: bold;
  color: #1976d2; /* Azul material design para diferenciar el título */
  text-align: center;
}


</style>