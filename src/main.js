import './main.less'
import './assets/base.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(Vant).mount('#app')
