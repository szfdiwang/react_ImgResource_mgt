import React from "react";
import { Row, message, Col } from "antd";
import "./index.scss";
import logo from "../../assets/img/logo.svg";
import { withRouter } from "react-router-dom";
import imgApi from "../../api/index";
class Header extends React.Component {
  state = {
    user: {
      name: "P bank"
    }
  };
  logoutFn() {
    imgApi.logout().then(res => {
      if (res.data.respCode === 0) {
        message.success("您已成功登出");
        localStorage.userName = "";
        localStorage.userId = "";
        this.props.history.push("/login");
      } else {
        message.error("登出失败");
      }
    });
  }
  render() {
    const userName = localStorage.userName;
    return (
      <Row type="flex" align="middle" justify="start" className="header">
        <Col span={6} className="logo">
          {/* <img src={require("/assets/logo.png")}/> */}
          {/* 静态文件夹下使用绝对路径 */}
          <img src={logo} alt={""} />
        </Col>
        <Col span={6} className="oprator">
          <span onClick={this.logoutFn.bind(this)} className="quit">
            退出
          </span>
          <span className="user">{userName}</span>
        </Col>
      </Row>
    );
  }
}
export default withRouter(Header);
