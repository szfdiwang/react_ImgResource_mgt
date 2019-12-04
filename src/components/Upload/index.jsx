import React, { Component } from "react";
import { Modal, Icon, Button, Upload, message } from "antd";
import "./index.scss";
import kbToMb from "../../utils/tools";
import imgApi from "../../api";
export default class UploadWin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      ModalText: "更换文件图片",
      confirmLoading: false,
      imgId: "", //this.props.imgId,
      imgSize: 0,
      imgWidth: 0,
      imgLength: 0,
      imgFile: File,
      imgType: "image/png,image/gif",
      previewUrl: "",
      uploadProps: {
        action: "/server/img/upload",
        listType: "picture",
        defaultFileList: []
      }
    };
  }
  //重置上传文件
  resetUploadFile() {
    this.setState({
      imgId: "", //this.props.imgId,
      imgSize: 0,
      imgWidth: 0,
      imgLength: 0,
      imgFile: File,
      previewUrl: ""
    });
  }
  handleCancel(value) {
    this.resetUploadFile();
    this.props.onClose(value);
  }
  handleOk(value) {
    if (this.state.imgSize === 0) {
      message.info("请先上传文件");
      return;
    }
    //异步上传图片 将页面cooldown
    this.setState({
      confirmLoading: true
    });
    let formdata = new FormData();
    formdata.append("imgSize", this.state.imgSize);
    formdata.append("imgLength", this.state.imgLength);
    formdata.append("imgWidth", this.state.imgWidth);
    formdata.append("imgId", this.props.imageId);
    formdata.append("imgFile", this.state.imgFile);
    imgApi.uploadImg(formdata).then(res => {
      this.setState({
        confirmLoading: false
      });
      if (res.data.respCode === 0) {
        message.success("上传图片成功");
        this.resetUploadFile();
        this.props.onClose(value, true);
      } else {
        message.success("上传图片失败");
        this.props.onClose(value, false);
      }
    });
  }
  beforeUpload(file, fileList) {
    this.setState({
      imgSize: kbToMb(file.size), //设置大小
      imgFile: file
    });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      let data = e.target.result;
      let image = new Image();
      image.onload = () => {
        let width = image.width;
        let height = image.height;
        this.setState({
          imgWidth: width,
          imgLength: height
        });
      };
      image.src = data;
      // file.thumbUrl = e.target.result;
      this.setState({
        previewUrl: e.target.result
      });
      // this.props.onChange(this.state.fileList);
    };
    return false;
  }
  render() {
    const { confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Modal
          size={"small"}
          title={ModalText}
          visible={this.props.showUpload}
          onOk={this.handleOk.bind(this, false)}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel.bind(this, false)}
          okText="上传"
          cancelText="取消"
        >
          <div key={Math.random()}>
            <Upload
              multiple={false}
              showPreviewIcon={true}
              accept={this.state.imgType}
              beforeUpload={this.beforeUpload.bind(this)}
            >
              <Button size={"small"}>
                <Icon type="upload" />
                选择图片
              </Button>
              {this.state.previewUrl && (
                <img
                  className="preViewImg"
                  src={this.state.previewUrl}
                  alt="预览图片"
                />
              )}
            </Upload>
          </div>
        </Modal>
      </div>
    );
  }
}
