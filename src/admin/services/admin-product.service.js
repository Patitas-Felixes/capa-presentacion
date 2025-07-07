import { BaseService } from '../../shared/services/base-service.js';

export class AdminProductService extends BaseService {
    constructor() {
        // Al pasar '/categorias', el metodo getAll heredado de BaseService
        // sabrá que debe hacer la petición a `${VITE_API_BASE_URL}/categorias`
        super('/productos');
    }

    //Post
    async createAdminProduct(resource) {

        console.log("Producto enviado a crear:", resource);

        try {
            const response = await this.http.post(this.resourcePath(), {
                nombre: resource.nombre,
                descripcion: resource.descripcion,
                precio: Number(resource.precio),
                stock: Number(resource.stock),
                id_categoria: resource.id_categoria,
                id_marca: resource.id_marca
            },
                { withCredentials: true }
            );

            console.log("Producto creado:", response);

            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    async updateAdminProduct(id, resource) {
        console.log("Producto enviado a actualizar:", resource);

        try {
            const response = await this.http.put(`${this.resourcePath()}/${id}`, {
                nombre: resource.nombre,
                descripcion: resource.descripcion,
                precio: Number(resource.precio),
                stock: Number(resource.stock),
                id_categoria: resource.id_categoria,
                id_marca: resource.id_marca
            },
                { withCredentials: true }
            );

            console.log("Producto actualizado:", response);

            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    async deleteAdminProduct(id) {
        console.log("Producto enviado a eliminar:", id);

        try {
            const response = await this.http.delete(`${this.resourcePath()}/${id}`, { withCredentials: true });

            console.log("Producto eliminado:", response);

            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }

    //get products by category
    async getProductsByCategory(id_categoria) {
        console.log("Obteniendo productos de la categoría:", id_categoria);

        try {
            const response = await this.http.get(`${this.resourcePath()}/categoria/${id_categoria}`, { withCredentials: true });

            console.log("Productos obtenidos:", response.data);

            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }


}

export const adminProductService = new AdminProductService();
