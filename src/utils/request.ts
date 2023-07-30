import axios from "axios";
//创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
// 请求拦截器
request.interceptors.request.use((config) => {
  // 可以在此处添加一些请求拦截逻辑，比如添加请求头、修改请求数据等
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 可以在此处添加一些响应拦截逻辑，比如处理响应数据等
    console.log("返回结果:");
    console.log(response.data);
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  },
);

export default request;
