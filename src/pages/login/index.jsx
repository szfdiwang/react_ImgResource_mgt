import React, { Component } from "react";
import titleImg from "../../assets/img/logoText.svg";
import { Form, message, Icon, Input, Button, Checkbox } from "antd";
import "./index.scss";
import imgApi from "../../api/index";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  submitFn(obj) {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          userName: obj.username,
          userPsw: obj.password
        };
        imgApi.login(data).then(res => {
          if (res.data.respCode === 0) {
            localStorage.userId = res.data.data.userId;
            localStorage.userName = res.data.data.userName;
            this.props.history.push("/imgMgt");
            // return <Redirect to="/imgMgt" />;
          } else {
            message.error("您输入的用户名或密码有误");
            this.props.form.setFieldsValue({
              password: ""
            });
          }
        });
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    return (
      <div className="bg_box">
        <div className="login_box">
          <div className="login_box_title">
            <img src={titleImg} alt="" />
          </div>
          <div className="login_box_input">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入用户名" }]
                })(
                  <Input
                    className="login_input"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入您的密码" }]
                })(
                  <Input
                    className="login_input second_input"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                {/* <a className="login-form-forgot" href="">
                </a> */}
                {/* <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button> */}
              </Form.Item>
            </Form>
          </div>
          <div className="login_box_btn">
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.submitFn.bind(this, getFieldsValue())}
            >
              登录
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Form.create()(Login);
