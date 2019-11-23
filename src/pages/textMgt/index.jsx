import React from "react";

import { Table, Button, Row, Divider, Pagination } from "antd";
import SearchBar from "../../components/opratorBar/index";
import UploadWin from "../../components/Upload/index";
export default class Base extends React.Component {
  constructor(props) {
    super(props); //调用父类的构造函数，固定写法

    this.state = {
      searchList: [
        { id: 0, name: "网站名", value: "", placeholder: "请输入网站名" },
        { id: 1, name: "模块ID", value: "", placeholder: "请输入模块ID" },
        { id: 2, name: "操作人", value: "", placeholder: "请输入操作人" },
        { id: 3, name: "创建时间", value: "", placeholder: "请输入创建时间" },
        { id: 4, name: "更新时间", value: "", placeholder: "请输入更新时间" }
      ],
      pagination: false,
      //    {
      //     total: 50,
      //     defaultCurrent: 1
      //   },
      showUpload: false,
      pageSize: 10,
      curPage: 1,
      totalNum: 50,
      inputValue: "", // input中的值
      list: ["banner", "footer", "header"], //服务列表
      selectOptions: [
        {
          id: "0",
          name: "lattice",
          value: "lattice"
        },
        {
          id: "1",
          name: "platon",
          value: "platon"
        }
      ],
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "ID"
        },
        {
          title: "网站名称",
          dataIndex: "project",
          key: "project",
          render: text => <span>{text}</span>
        },
        {
          title: "页面",
          dataIndex: "page",
          key: "page"
        },
        {
          title: "模块ID",
          dataIndex: "module",
          key: "module"
        },
        {
          title: "图片大小",
          dataIndex: "size",
          key: "size"
        },
        {
          title: "图片尺寸",
          dataIndex: "pixel",
          key: "pixel"
        },
        {
          title: "图片地址",
          dataIndex: "url",
          key: "url",
          render: text => <span>{text}</span>
        },
        {
          title: "操作人",
          dataIndex: "oprator",
          key: "oprator"
        },
        {
          title: "创建时间",
          dataIndex: "createAt",
          key: "createAt"
        },
        {
          title: "更新时间",
          dataIndex: "updateAt",
          key: "updateAt"
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => (
            <div>
              <span
                className={"btn pointer"}
                onClick={this.urlAction.bind(this, text, record)}
              >
                替换
              </span>
              <span className={"ml10 btn pointer"}>预览</span>
            </div>
          )
        }
      ],
      tableData: [
        {
          id: "1",
          project: "lattice",
          page: "home",
          module: "banner",
          size: "120kb",
          url: "www.sina.com",
          pixel: "120x20",
          createAt: "2019-11-09 12:00:00",
          updateAt: "2019-11-09 12:00:00",
          createby: ""
        },
        {
          id: "2",
          project: "platon",
          page: "home",
          module: "banner",
          size: "240kb",
          url: "www.aliyun.com",
          pixel: "268x128",
          createAt: "2019-11-09 12:00:00",
          updateAt: "2019-11-09 12:00:00",
          createby: ""
        }
      ]
    };
  }
  addFn() {}
  render(h) {
    return (
      <Row className="inside_box">
        <Row className="search_bar">
          {/* <Col className="inputWidth">
            <span>网站名</span>
            <Input
              className=""
              id={"search_bar"}
              placeholder={"请输入搜索项"}
              value={this.state.inputValue}
              onChange={this.inputChange.bind(this)}
            />
          </Col>
          <Col className="inputWidth ml10">
            <Input
              className=""
              id={"search_bar"}
              placeholder={"请输入搜索项"}
              value={this.state.inputValue}
              onChange={this.inputChange.bind(this)}
            />
          </Col> */}
          <SearchBar searchList={this.state.searchList}></SearchBar>
        </Row>
        {/* <Row className="search_btn">
          <Col>
            <Button onClick={this.addListFn.bind(this)} type="primary">
              筛选
            </Button>
          </Col>
        </Row> */}
        <Row className="divider_box">
          <Divider className="divider" />
        </Row>
        <Row className="table_warp">
          <Button
            type="primary"
            onClick={this.addFn.bind(this)}
            style={{
              fontSize: 13,
              width: 90,
              height: 30,
              marginBottom: 20,
              marginLeft: 20
            }}
          >
            添加
          </Button>
          {/* {this.state.list.map((item, index) => {
            return (
              <Col key={index + item} span={20}>
                {item}
              </Col>
            );
          })} */}
          <Table
            {...this.state}
            size={"small"}
            columns={this.state.columns}
            dataSource={this.state.tableData}
          />
          <Pagination
            pageSizeOption={["10", "20", "30", "40"]}
            className="page_warp"
            size={"small"}
            total={this.state.totalNum}
            // showSizeChanger
            showTotal={this.showTotal}
            defaultPageSize={this.state.pageSize}
            onShowSizeChange={this.onShowSizeChange}
            defaultCurrent={1}
          />
        </Row>
        <UploadWin
          onClose={this.getChildStatus.bind(this)}
          showUpload={this.state.showUpload}
        ></UploadWin>
      </Row>
    );
  }

  getChildStatus(value) {
    this.setState({
      showUpload: value
    });
  }
  urlAction(t, r) {
    this.setState({
      showUpload: true
    });
  }
  showTotal(total) {
    return `Total ${total} items`;
  }
  onShowSizeChange(e) {
    console.log(e);
  }
  handleChange(e) {
    console.log(e);
  }
  inputChange(e) {
    console.log(e.target.value);
    this.setState({
      inputValue: e.target.value
    });
  }
  addListFn() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ""
    });
  }
}
