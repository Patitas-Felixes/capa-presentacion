import { createRouter, createWebHistory } from 'vue-router'

//Importar las views o pages
import LoginPage from "../auth/pages/LoginPage.vue";
import RegisterPage from "../auth/pages/RegisterPage.vue";


// Definimos las rutas
const routes = [

    //Cuando se accede a la raíz, redirigir a la página de login
    {
        path: '/',
        redirect: '/login',
    },

    // Ruta para la página de login
    {
        path: '/login',
        name: 'Login',
        component: LoginPage // Componente de la página de login
    },

    // Ruta para la página de registro
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage // Componente de la página de registro
    },

    // Ruta para la página de inicio (home), aquí mostraremos los productos
    {
        path: '/home',
        name: 'Home',
        //component: HomePage // Componente de la página de inicio
    },

    {
        path: '/admin',
        name: 'Admin',
        //component: AdminPage // Componente de la página de administración
    },

    // Manejar rutas no encontradas
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})



/*No esta en uso por ahora
// Guardia de navegación para proteger rutas que requieren autenticación
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = localStorage.getItem('auth_token') !== null

    // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a login
    if (requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})*/

export default router