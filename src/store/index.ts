import type { App } from 'vue';
import { createPinia } from 'pinia';
import useLoginStore from './login';

const pinia = createPinia();

function registerStore(app: App<Element>) {
  app.use(pinia);

  // 默认刷新加载本地数据
  const loginStore = useLoginStore();
  loginStore.loadLocalCacheAction();
}

export default registerStore;
