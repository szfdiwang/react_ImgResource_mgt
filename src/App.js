import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "./components/Header/index.jsx";
import Nav from "./components/Nav/index.jsx";
class App extends Component {
  render(props) {
    window._ROUTER = this.props.history;
    return (
      <Row className="base_warp">
        <Header />
        <Col span={3} className="nav_warp">
          {/* 侧面栏 */}
          <Nav></Nav>
        </Col>
        <Col span={21} className="main_warp">
          {this.props.children}
        </Col>
        {/* Footer */}
      </Row>
    );
  }
}

export default App;
