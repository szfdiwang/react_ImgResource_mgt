import axios from "../utils/request";

export default {
  addImg(data) {
    return axios.post("/cms-server/img/add", data);
  },
  deleteImg(data) {
    return axios.post("/cms-server/img/delete", data);
  },
  editImg(data) {
    return axios.post("/cms-server/img/edit", data);
  },
  queryImgList(data) {
    return axios.post("/cms-server/img/list", data);
  },
  uploadImg(data) {
    return axios.post("/cms-server/img/upload", data);
  },
  queryOptions(data) {
    return axios.post("/cms-server/img/websiteDict", data);
  },
  /**=========================以下为文案接口============================ */
  queryTxtList(data) {
    return axios.post("/cms-server/txt/list", data);
  },
  addText(data) {
    return axios.post("/cms-server/txt/add", data);
  },
  deleteText(data) {
    return axios({
      method: "get",
      url: `/cms-server/txt/delete/${data}`
    });
  },
  editText(data) {
    return axios.post("/cms-server/txt/edit", data);
  },
  /**=========================以下为用户接口============================ */
  // http://10.10.8.61:8088/cms-server/user/login
  login(data) {
    return axios.post("/cms-server/user/login", data);
  },
  logout(data) {
    return axios.get("/cms-server/user/logout", data);
  },
  /**===========================以下为字典项接口========================= */
  queryDict(data) {
    return axios.post("/cms-server/dict/list", data);
  },
  addDict(data) {
    return axios.post("/cms-server/dict/add", data);
  },
  editDict(data) {
    return axios.post("/cms-server/dict/edit", data);
  },
  deleteDict(data) {
    return axios.get(`/cms-server/dict/delete/${data}`);
  }
};
