import React from "react";
import { Row, Col } from "antd";
import "./index.scss";
import logo from "../../assets/img/logo.svg";
class Header extends React.Component {
  state = {
    user: {
      name: "P bank"
    }
  };
  render() {
    const { user } = this.state;
    return (
      <Row type="flex" align="middle" justify="start" className="header">
        <Col span={6} className="logo">
          {/* <img src={require("/assets/logo.png")}/> */}
          {/* 静态文件夹下使用绝对路径 */}
          <img src={logo} alt={""} />
        </Col>
        <Col span={6} className="oprator">
          <span className="quit">退出</span>
          <span className="user">{user.name}</span>
        </Col>
      </Row>
    );
  }
}
export default Header;
