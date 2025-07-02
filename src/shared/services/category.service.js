import { BaseService } from './base-service';

export class CategoryService extends BaseService {
    constructor() {
        // Al pasar '/categorias', el metodo getAll heredado de BaseService
        // sabrá que debe hacer la petición a `${VITE_API_BASE_URL}/categorias`
        super('/categorias');
    }

    // No es necesario definir getAll() aquí, ya que se hereda de BaseService.
}

// Exportamos una única instancia (singleton) para ser usada en la aplicación.
export const categoryService = new CategoryService();
