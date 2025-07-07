import { BaseService } from '../../shared/services/base-service.js';

export class AdminCategoryService extends BaseService {
    constructor() {
        // Al pasar '/categorias', el metodo getAll heredado de BaseService
        // sabrá que debe hacer la petición a `${VITE_API_BASE_URL}/categorias`
        super('/categorias');
    }

    // No es necesario definir getAll() aquí, ya que se hereda de BaseService.
}

export const adminCategoryService = new AdminCategoryService();
