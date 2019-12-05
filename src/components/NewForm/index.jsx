import React, { Component } from "react";
import { Form, message, Select, Modal, Input } from "antd";
import imgApi from "../../api/index";
const { Option } = Select;
const { TextArea } = Input;
class newForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: []
    };
  }
  handleOk(obj, value) {
    //TODO 新增记录
    let data = {
      websiteName: obj.websiteName,
      pageName: obj.pageName,
      moduleId: obj.moduleId,
      environment: obj.environment,
      imgDesc: obj.imgDesc,
      operator: localStorage.userName //TODO 获取session中登录人信息
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.isEdit) {
          data.imgId = this.props.editObj.imgId;
          imgApi.editImg(data).then(res => {
            console.log(res);
            if (res.data.respCode === 0) {
              message.success("修改数据成功");
              this.props.form.resetFields();
              //刷新父页面 子页面数据清空 子页面表单关闭
              this.props.onClose(value, true);
            }
          });
        } else {
          imgApi.addImg(data).then(res => {
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
  handleWebSiteChange(value) {
    let data = {
      websiteName: value
    };
    imgApi.queryOptions(data).then(res => {
      this.setState({
        pageList: [...res.data.data]
      });
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
      <Modal
        size={"small"}
        visible={this.props.showAddList}
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
              rules: [{ required: true, message: "请选择网站名称" }]
            })(
              <Select allowClear onChange={this.handleWebSiteChange.bind(this)}>
                {this.props.websiteNameOptions.map(item => (
                  <Option key={item.id} value={item.websiteName}>
                    {item.websiteName}
                  </Option>
                ))}

                {/* <Option value="LatticeX">LatticeX</Option>
                <Option value="PlatON">PlatON</Option> */}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="页面名称">
            {getFieldDecorator("pageName", {
              initialValue: "",
              rules: [{ required: true, message: "请选择页面名称" }]
            })(
              <Select allowClear>
                {this.state.pageList.map(item => (
                  <Option key={item.id} value={item.pageName}>
                    {item.pageName}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="模块ID">
            {getFieldDecorator("moduleId", {
              initialValue: "",
              rules: [{ required: true, message: "请输入模块ID" }]
            })(<Input style={{ marginRight: 8 }} />)}
          </Form.Item>
          <Form.Item label="环境名称">
            {getFieldDecorator("environment", {
              initialValue: "",
              rules: [{ required: true, message: "请选择环境" }]
            })(
              <Select allowClear>
                <Option value={0}>生产环境</Option>
                <Option value={1}>测试环境</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="图片描述">
            {getFieldDecorator("imgDesc", { initialValue: "" })(
              <TextArea rows={3} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const NewForm = Form.create({
  name: "newForm",
  mapPropsToFields(props) {
    return props.editObj
      ? {
          imgId: Form.createFormField({
            value: props.editObj.imgId
          }),
          websiteName: Form.createFormField({
            value: props.editObj.websiteName
          }),
          pageName: Form.createFormField({
            value: props.editObj.pageName
          }),
          moduleId: Form.createFormField({
            value: props.editObj.moduleId
          }),
          environment: Form.createFormField({
            value: props.editObj.environment
          }),
          imgDesc: Form.createFormField({
            value: props.editObj.imgDesc
          })
        }
      : {};
  }
})(newForm);
export default NewForm;
