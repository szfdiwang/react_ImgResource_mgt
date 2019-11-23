import React, { Component } from "react";
import { Button, DatePicker, Row, Col, Form, Input } from "antd";
class searchBar extends Component {
  state = {
    expand: false
  };

  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 5; i++) {
      console.log(this.props.searchList[i]);
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          <Form.Item label={this.props.searchList[i].name}>
            {getFieldDecorator(this.props.searchList[i].name, {
              //实际是在注册input name
              //userName实际上就是你获取整个表单数据对象之后，此输入框的名字
              initialValue: this.props.searchList[i].value, //这是用来初始化表单数据的
              rules: [
                //这是用来校验表单数据的，具体用法请看文档
              ]
            })(
              this.props.searchList[i].name.includes("时间") ? (
                <DatePicker
                  className="search_input date_select"
                  onChange={this.onChange.bind(this)}
                />
              ) : (
                <Input
                  className="search_input"
                  placeholder={this.props.searchList[i].placeholder}
                />
              )
            )}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }
  getFormDataFn(id, option) {
    this.props.form.getFieldsValue(); //返回object
  }
  handleReset() {
    this.props.form.resetFields();
  }
  onChange(date, dateString) {}
  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={24} style={{ textAlign: "left" }}>
            <Button
              size={"small"}
              type="primary"
              style={{ fontSize: 13, width: 90, height: 30 }}
              htmlType="submit"
              onClick={this.getFormDataFn.bind(this)}
            >
              筛选
            </Button>
            <Button
              size={"small"}
              style={{ fontSize: 13, width: 90, height: 30, marginLeft: 8 }}
              onClick={this.handleReset.bind(this)}
            >
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
const SearchBar = Form.create({ name: "search_bar" })(searchBar);

export default SearchBar;
