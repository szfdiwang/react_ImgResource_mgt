import axios from "axios";
let count = 0;
axios.defaults.timeout = 50000; //暂时关闭请求超时
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["content-Type"] = "application/json;charset=UTF-8";
axios.defaults.baseURL = process.env.VUE_APP_BASEURL; // process.env.NODE_ENV == "production" ? : '/apis';
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.data.respCode !== 0) {
      if (count === 0) {
        switch (response.data.respCode) {
          case 500:
            break;
          default:
            break;
        }
        count++;
      }
      setTimeout(() => {
        count = 0;
      }, 1000 * 1);
    }
    return response;
  },
  error => {
    let errorMsg = "内部错误，请联系管理员！";
    if (count === 0) {
      count++;
    }
    setTimeout(() => {
      count = 0;
    }, 1000 * 1);
    return Promise.reject(error);
  }
);
export default axios;
