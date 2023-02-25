import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios';

const TIME_OUT = 2000;
const BASE_URL = {
  localhost: 'http://127.0.0.1:3000',
  cms: 'http://152.136.185.210:4000'
};

interface RequestInterceptors<T = AxiosResponse> {
  requestSuccess: (config: any) => InternalAxiosRequestConfig;
  requestFailure: (err: any) => any;
  responseSuccess: (res: T) => T;
  responseFailure: (err: any) => any;
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}

class Request {
  instance: AxiosInstance;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    // 每个instance添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        // 请求成功的拦截
        return config;
      },
      (err) => {
        // 全局请求失败的拦截
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 全局响应成功的拦截
        return res.data;
      },
      (err) => {
        // 全局响应成功的拦截
        return err;
      }
    );

    // 针对特定的request实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestFailure
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseFailure
    );
  }

  // 封装网络请求方法
  request<T = any>(config: RequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config);
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }

  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' });
  }

  patch<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

const request = new Request({
  baseURL: BASE_URL.cms,
  timeout: TIME_OUT
});

export default request;
