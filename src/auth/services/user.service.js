import { BaseService } from '../../shared/services/base-service.js';

export class UserService extends BaseService {
    constructor() {
        // Al pasar '/usuarios', el metodo getAll heredado de BaseService
        // sabrá que debe hacer la petición a `${VITE_API_BASE_URL}/usuarios`
        super('/usuarios');
    }
}

export const userService = new UserService();
