import React, { Component } from "react";
import { Button, Select, DatePicker, Row, Col, Form, Input } from "antd";
import imgApi from "../../api/index";
const { Option } = Select;
class searchBar extends Component {
  state = {
    expand: false,
    webSiteNameList: [],
    pageNameList: []
  };
  handleOptionChange(value) {
    //清空联动
    this.setState({
      pageNameList: []
    });
    let data = {
      websiteName: value
    };
    imgApi.queryOptions(data).then(res => {
      this.setState({
        pageNameList: [...res.data.data]
      });
    });
  }
  switchModel(key) {
    if (key === "网站名") {
      return (
        <Select
          allowClear
          showSearch
          onChange={this.handleOptionChange.bind(this)}
          placeholder="请选择网站名"
          className="search_input"
        >
          {this.props.websiteNameOptions.map(item => (
            <Option key={item.id} value={item.websiteName}>
              {item.websiteName}
            </Option>
          ))}
        </Select>
      );
    } else if (key === "页面") {
      return (
        <Select
          allowClear
          className="search_input"
          placeholder="请选择页面名"
          showSearch
        >
          {this.state.pageNameList.map(item => (
            <Option key={item.id} value={item.pageName}>
              {item.pageName}
            </Option>
          ))}
        </Select>
      );
    } else if (key === "创建日期" || key === "更新日期") {
      return (
        <DatePicker
          className="search_input date_select"
          onChange={this.onChange.bind(this)}
          placeholder="请选择日期"
        />
      );
    } else {
      return <Input className="search_input" placeholder={"请输入"} />;
    }
  }

  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 5; i++) {
      console.log(this.props.searchList[i]);
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          <Form.Item label={this.props.searchList[i].name}>
            {getFieldDecorator(this.props.searchList[i].key, {
              //实际是在注册input name
              //userName实际上就是你获取整个表单数据对象之后，此输入框的名字
              initialValue: undefined, // moment(this.props.searchList[i].value), //这是用来初始化表单数据的
              rules: [
                //这是用来校验表单数据的，具体用法请看文档
              ]
            })(
              // this.props.searchList[i].name.includes("日期") ? (
              //   <DatePicker
              //     className="search_input date_select"
              //     onChange={this.onChange.bind(this)}
              //     placeholder="请选择日期"
              //   />
              // ) : (
              //   <Input
              //     className="search_input"
              //     placeholder={this.props.searchList[i].placeholder}
              //   />
              // )
              this.switchModel(this.props.searchList[i].name)
            )}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }
  getFormDataFn(id, option) {
    const curSearchObj = this.props.form.getFieldsValue(); //返回object
    //向父级传递
    this.props.handleSearch(curSearchObj);
  }
  handleReset() {
    this.props.form.resetFields();
    this.getFormDataFn();
    //TODO 下拉选项也要清空
    this.setState({
      pageNameList: []
    });
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
