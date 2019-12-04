import axios from "axios";
import { HashRouter } from "react-router-dom";
import { message } from "antd";
let count = 0;
axios.defaults.timeout = 50000; //暂时关闭请求超时
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["content-Type"] = "application/json;charset=UTF-8";

axios.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV === "development") {
      console.log("我们在开发环境中");
      axios.defaults.baseURL = "";
    } else if (process.env.NODE_ENV === "production") {
      console.log("我们在生产环境中");
      axios.defaults.baseURL = "";
    } else if (process.env.NODE_ENV === "sit") {
      console.log("我们在SIT中");
      axios.defaults.baseURL = "http://192.168.16.173:8016";
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
const router = new HashRouter();

axios.interceptors.response.use(
  response => {
    if (response.data.respCode !== 0) {
      if (count === 0) {
        switch (response.data.respCode) {
          case 5001:
            message.error("您还没有登录,已为您跳转登录页");
            router.history.push("/");
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
