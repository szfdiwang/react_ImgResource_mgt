import React, { Component } from "react";
import { Modal, message } from "antd";
import defaultImg from "../../assets/img/ddys.jpg";
import "./index.scss";

class imgModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oriWidth: 100,
      imgUrl: defaultImg
    };
  }
  closeModal(value) {
    this.props.onClose(value);
  }

  render() {
    console.log(this.state);
    let { preImgObject } = this.props;
    let cururl; //= preImgObject ? preImgObject.img_url : defaultImg;
    if (preImgObject) {
      if (!!preImgObject.imgUrl) {
        cururl = preImgObject.imgUrl;
      } else {
        message.info("您还没有上传图片，请先上传图片");
        return false;
      }
    }
    console.log(cururl);

    return (
      <Modal
        maskClosable
        width={
          this.props.preImgObject
            ? this.props.preImgObject.imgWidth * 0.5 + 40
            : this.state.oriWidth
        }
        footer={null}
        title="图片预览" //TODO 此处换成动态
        visible={this.props.showPreImg}
        onCancel={this.closeModal.bind(this, false)}
      >
        <img
          style={{
            width: this.props.preImgObject
              ? this.props.preImgObject.imgWidth * 0.5
              : this.state.oriWidth
          }}
          src={cururl}
          alt="网站图片"
        />
      </Modal>
    );
  }
}

export default imgModal;
