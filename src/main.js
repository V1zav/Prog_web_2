import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)
app.use(router)

axios.defaults.baseURL = 'http://localhost:3000';
app.config.globalProperties.$axios = axios

app.mount('#app')
