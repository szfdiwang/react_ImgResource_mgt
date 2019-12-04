import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import "./index.scss";
import MenuConfig from "./../../config/menuConfig";

const { SubMenu } = Menu;

class Nav extends Component {
  state = {
    currentKey: "/imgMgt",
    oldKey: "/imgMgt"
  };
  handleClick = ({ item, key }) => {
    if (key === this.state.currentKey) return;
    // this.state.currentKey = key; 这样做是不对的 要通过setState 赋值
    this.setState({
      currentKey: key
    });
  };
  //钩子触发菜单的渲染
  componentDidMount() {
    const menuTreeNode = this.renderMenu(MenuConfig); //返回渲染好的dom
    this.setState({
      // 在这里set
      menuTreeNode
    });
  }
  //渲染方法
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        //判断是否有子菜单
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
            {/* 递归组件方法展示 */}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>
            <Icon type={item.icon} />
            {item.title}
          </NavLink>
        </Menu.Item>
      );
    });
  };
  render() {
    const path = this.props.location.pathname;
    return (
      <Menu
        className="nav-box"
        onClick={this.handleClick}
        defaultSelectedKeys={["/imgMgt"]}
        selectedKeys={[path]}
      >
        {this.state.menuTreeNode}
        {/* menu的渲染在这里调用 */}
      </Menu>
    );
  }
}

export default withRouter(Nav);
