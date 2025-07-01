import { en, es } from '@formkit/i18n'
import '@formkit/themes/genesis'
import { genesisIcons } from '@formkit/icons'


const config = {
    locales: { en, es },
    locale: 'en',
    theme: 'genesis',
    icons: {
        ...genesisIcons
    }
}

export default config