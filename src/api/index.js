import axios from "../utils/request";

export default {
  addImg(data) {
    return axios.post("/server/img/add", data);
  },
  deleteImg(data) {
    return axios.post("/server/img/delete", data);
  },
  editImg(data) {
    return axios.post("/server/img/edit", data);
  },
  queryImgList(data) {
    return axios.post("/server/img/list", data);
  },
  uploadImg(data) {
    return axios.post("/server/img/upload", data);
  },
  queryOptions(data) {
    return axios.post("/server/img/websiteDict", data);
  },
  /**=========================以下为文案接口============================ */
  queryTxtList(data) {
    return axios.post("/server/txt/list", data);
  },
  addText(data) {
    return axios.post("/server/txt/add", data);
  },
  deleteText(data) {
    return axios({
      method: "get",
      url: `/server/txt/delete/${data}`
    });
  },
  editText(data) {
    return axios.post("/server/txt/edit", data);
  },
  /**=========================以下为用户接口============================ */
  // http://10.10.8.61:8088/server/user/login
  login(data) {
    return axios.post("/server/user/login", data);
  },
  logout(data) {
    return axios.get("/server/user/logout", data);
  }
};
