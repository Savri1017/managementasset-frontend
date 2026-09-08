import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // sesuaikan dengan file router yang sudah ada di proyekmu
import './style.css'

createApp(App)
  .use(router)
  .mount('#app')
