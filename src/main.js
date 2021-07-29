import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import mitt from 'mitt';
import 'mosha-vue-toastify/dist/style.css';
import 'bootstrap';
import 'material-icons/iconfont/material-icons.css';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import App from './App.vue';
import router from './router';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
setLocale('zh_TW');

Chart.register(ChartDataLabels);

const emitter = mitt();

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);

app.provide('axios', axios);
app.provide('$emitter', emitter);

app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
