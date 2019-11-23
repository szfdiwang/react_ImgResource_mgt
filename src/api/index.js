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
  }
};
