import { BaseService } from '../../shared/services/base-service.js';

export class CommentService extends BaseService {
    constructor() {
        // Al pasar '/categorias', el metodo getAll heredado de BaseService
        // sabrá que debe hacer la petición a `${VITE_API_BASE_URL}/categorias`
        super('/comentarios');
    }

    //Post Create a new comment
    async createComment(resource) {
        console.log("Comentario enviado a crear:", resource);

        try {
            const response = await this.http.post(this.resourcePath(), {
                producto_id: resource.producto_id,
                usuario_id: resource.usuario_id,
                comentario: resource.comentario,
                likes: [],
                dislikes: []

            }, { withCredentials: true });

            console.log("Comentario creado:", response);
            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    //delete a comment
    async deleteComment(id) {
        console.log("Comentario enviado a eliminar:", id);

        try {
            const response = await this.http.delete(`${this.resourcePath()}/${id}`, { withCredentials: true });
            console.log("Comentario eliminado:", response);
            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    //get all comments by product id
    async getCommentsByProductId(productId) {
        console.log("Obteniendo comentarios para el producto:", productId);

        try {
            const response = await this.http.get(`${this.resourcePath()}/producto/${productId}`, { withCredentials: true });
            console.log("Comentarios obtenidos:", response);
            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }
}

export const commentService = new CommentService();
