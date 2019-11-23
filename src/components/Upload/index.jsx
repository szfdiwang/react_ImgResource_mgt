import React, { Component } from "react";
import { Modal, Icon, Button, Upload } from "antd";
export default class UploadWin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: "更换文件图片",
      confirmLoading: false,
      uploadProps: {
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        listType: "picture",
        defaultFileList: []
      }
    };
  }
  handleCancel(value) {
    this.props.onClose(value);
  }
  handleOk(value) {
    //异步上传图片 将页面cooldown
    this.props.onClose(value);
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
          <Upload {...this.state.uploadProps}>
            <Button size={"small"}>
              <Icon type="upload" />
              选择图片
            </Button>
          </Upload>
        </Modal>
      </div>
    );
  }
}
