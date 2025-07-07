import { BaseService } from '../../shared/services/base-service.js';

export class AuthService extends BaseService {
    constructor() {
        super('/auth');
    }

    async register(credentials) {
        try {

            // Validación básica antes de enviar
            //if (!credentials.username || !credentials.email || !credentials.password) {
            //    throw new Error('Datos de registro incompletos');
            //}
            const response = await this.http.post(`${this.resourcePath()}/register`, {
                nombre: credentials.nombre,
                apellido: credentials.apellido,
                email: credentials.email,
                password: credentials.password,
                direccion: credentials.direccion
            });

            console.log('credentials dentro del metodo del servicio:', credentials);

            return response.data;
        } catch (error) {
            console.log('Error en register:', error);
            throw this._enhanceError(error);
        }
    }

    async login(credentials) {
        try {
            // Validación básica antes de enviar
            //if (!credentials.email || !credentials.password) {
            //    throw new Error('Datos de inicio de sesión incompletos');
            //}
            const response = await this.http.post(`${this.resourcePath()}/login`, {
                email: credentials.email,
                password: credentials.password
            },
                { withCredentials: true }


            );

            console.log('resourcepath:', this.resourcePath());


            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }
}