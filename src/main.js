import { createApp } from 'vue'
import App from './App.vue'

//PRIME-VUE
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

//FORM KITS
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../src/formkit.config.js'

//TOAST
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

//PRIME-ICONS and PRIME-FLEX
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

//MAS COMPONENTES PRIMEVUE
import SelectButton from 'primevue/selectbutton';
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Image from "primevue/image";
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';
import SplitButton from 'primevue/splitbutton';
import ProgressSpinner from 'primevue/progressspinner';
import Select from 'primevue/select';
import IftaLabel from 'primevue/iftalabel';
import CascadeSelect from 'primevue/cascadeselect';

//confirm dialog
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

//FORMS
import { Form } from '@primevue/forms';

//ROUTER
import router from './router'

//esto es de mi proyecto capaz lo podemos usar después:v
// Forzar la eliminación del token de autenticación al iniciar la aplicación
// Esto asegura que siempre comience en la página de login
//removeItem('auth_token');

//APP COMO TAL
const app = createApp(App)

//PRIME-VUE
app.use(PrimeVue,{
    theme:{
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    },
});

//FORM-KITS
app.use(plugin, defaultConfig(config));

//router for page view
app.use(router)

//TOAST AND TOAST SERVICE
app.use(ToastService);
app.component('pb-Toast', Toast);

//confirm dialog
app.component('pb-ConfirmDialog', ConfirmDialog);
app.use(ConfirmationService);

//MAS COMPONENTES PRIMEVUE
app.component('pb-Toolbar', Toolbar);
app.component('pb-Button', Button);
app.component('pb-SelectButton', SelectButton);
app.component('pb-Card', Card);
app.component('pb-Dialog', Dialog);
app.component('pb-InputText', InputText);
app.component('pb-InputNumber', InputNumber);
app.component('pb-Message', Message);
app.component('pb-SplitButton', SplitButton);
app.component('pb-ProgressSpinner', ProgressSpinner);
app.component('pb-Select', Select);
app.component('pb-IftaLabel', IftaLabel);
app.component('pb-CascadeSelect', CascadeSelect);

//FOR DATATABLE COMPONENT
app.component('pb-DataTable', DataTable);
app.component('pb-Column', Column);
app.component('pb-ColumnGroup', ColumnGroup);
app.component('pb-Row', Row);
//IMAGE
app.component('pb-Image', Image);

//FORMS
app.component('pb-Form', Form);


app.mount('#app')