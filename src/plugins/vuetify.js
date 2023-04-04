import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '~vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
    theme: {
        // add your theme settings here
    },
    ssr: true,
})

export default vuetify
