import { BaseService } from '../../shared/services/base-service.js';

export class AdminBrandService extends BaseService {
    constructor() {
        // Al pasar '/marcas', el metodo getAll heredado de BaseService
        // sabrá que debe hacer la petición a `${VITE_API_BASE_URL}/marcas`
        super('/marcas');
    }

    // No es necesario definir getAll() aquí, ya que se hereda de BaseService.
}
export const adminBrandService = new AdminBrandService();