import React, { Component } from "react";
import { Modal, message, Form, Input } from "antd";
import imgApi from "../../api/index";
import "./index.scss";
const { TextArea } = Input;
class newDictForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleOk(obj, value) {
    //TODO 新增记录
    let data = {
      websiteName: obj.websiteName,
      pageName: obj.pageName
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.isEdit) {
          data.websiteDictId = this.props.editObj.websiteDictId;
          imgApi.editDict(data).then(res => {
            console.log(res);
            if (res.data.respCode === 0) {
              message.success("修改数据成功");
              this.props.form.resetFields();
              //刷新父页面 子页面数据清空 子页面表单关闭
              this.props.onClose(value, true);
            }
          });
        } else {
          imgApi.addDict(data).then(res => {
            console.log(res);
            if (res.data.respCode === 0) {
              message.success("新增数据成功");
              this.props.form.resetFields();
              //刷新父页面 子页面数据清空 子页面表单关闭
              this.props.onClose(value, true);
            }
          });
        }
      }
    });
  }
  handleCancel(value) {
    this.props.onClose(value);
  }
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        // xs: { span: 24 },
        span: 8
      },
      wrapperCol: {
        // xs: { span: 24 },
        span: 16
      }
    };
    return (
      <div>
        <Modal
          size={"small"}
          visible={this.props.showNewWebSite}
          title={this.props.isEdit ? "编辑记录" : "新增记录"}
          onCancel={this.handleCancel.bind(this, false)}
          onOk={this.handleOk.bind(this, getFieldsValue(), false)}
          okText={this.props.isEdit ? "提交" : "新增"}
          cancelText="取消"
          width={500}
        >
          <Form {...formItemLayout} layout="horizontal">
            <Form.Item label="网站名称">
              {getFieldDecorator("websiteName", {
                initialValue: "",
                rules: [{ required: true, message: "请输入网站名称" }]
              })(<Input style={{ marginRight: 8 }} />)}
            </Form.Item>
            <Form.Item label="页面名称">
              {getFieldDecorator("pageName", {
                initialValue: ""
                // rules: [{ required: true, message: "请输入页面名称" }]
              })(<TextArea />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const NewDictForm = Form.create({
  name: "newDictForm",
  mapPropsToFields(props) {
    return props.editObj
      ? {
          pageName: Form.createFormField({
            value: props.editObj.pageName
          }),
          websiteName: Form.createFormField({
            value: props.editObj.websiteName
          })
        }
      : {};
  }
})(newDictForm);
export default NewDictForm;
