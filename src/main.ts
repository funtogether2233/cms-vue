import { createApp } from 'vue';
import 'normalize.css';
import '@/assets/css/index.less';
import router from './router';
import App from './App.vue';
import pinia from './store';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
app.use(router);
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');
