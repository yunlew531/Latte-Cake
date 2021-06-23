import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import mitt from 'mitt';
import 'mosha-vue-toastify/dist/style.css';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'material-icons/iconfont/material-icons.css';

const emitter = mitt();

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .provide('axios', axios)
  .provide('$emitter', emitter)
  .mount('#app');
