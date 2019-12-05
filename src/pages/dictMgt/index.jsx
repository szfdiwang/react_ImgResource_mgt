import React, { Component } from "react";
import {
  Table,
  Row,
  Button,
  Divider,
  Pagination,
  Popconfirm,
  message,
  Tooltip
} from "antd";
import imgApi from "../../api/index";
import NewDictForm from "../../components/NewDictForm/index";
class dictMgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      pageNum: 0,
      loading: false,
      isEdit: false,
      editObj: {},
      pageSize: 10,
      totalNum: 0,
      pagination: false,
      showNewWebSite: false,
      columns: [
        {
          title: "序号",
          width: 100,
          dataIndex: "index",
          render: (text, record, index) => `${index + 1}`
        },
        {
          title: "网站名",
          width: 300,
          dataIndex: "websiteName",
          key: "websiteName"
        },
        {
          title: "页面",
          dataIndex: "pageName",
          key: "pageName",
          render(text) {
            let dom = "";
            text.map(item => {
              console.log(item);
              dom += `${item},`;
            });
            return dom;
          }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 200,
          render: (text, record) => (
            <div>
              <span
                className={"btn pointer"}
                onClick={this.editFn.bind(this, text, record)}
              >
                编辑
              </span>

              <Popconfirm
                arrowPointAtCenter
                title="删除后将无法恢复,请确认"
                onConfirm={this.comfirmDelFn.bind(this, record)}
                onCancel={this.cancleFirmFn.bind(this)}
                okText="确认"
                cancelText="取消"
              >
                <span
                  className={"ml10 btn pointer"}
                  onClick={this.deleteFn.bind(this)}
                >
                  删除
                </span>
              </Popconfirm>
            </div>
          )
        }
      ]
    };
  }
  cancleFirmFn(e) {
    console.log(e);
    message.warning("您已取消删除");
  }
  comfirmDelFn(v) {
    let data = v.websiteDictId;
    let that = this;
    imgApi.deleteDict(data).then(res => {
      if (res.data.respCode === 0) {
        message.success("删除成功");
        that.initTable();
      }
    });
  }
  deleteFn() {}
  editFn(text, record) {
    this.setState({
      showNewWebSite: true,
      isEdit: true,
      editObj: record
    });
  }
  componentDidMount() {
    this.initTable();
  }
  initTable() {
    let data = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    };
    this.setState({
      loading: true
    });
    imgApi.queryDict(data).then(res => {
      if (res.data.respCode === 0) {
        this.setState({
          tableData: res.data.data,
          totalNum: res.data.totalCount,
          loading: false
        });
      }
    });
  }
  addFn() {
    this.setState({
      isEdit: false,
      editObj: {},
      showNewWebSite: true
    });
  }
  getDictStatus(v, b) {
    this.setState({
      showNewWebSite: v
    });
    if (b) {
      this.initTable();
    }
  }
  onPageChange() {}
  onShowSizeChange() {}
  showTotal(total) {
    return `Total ${total} items`;
  }
  render() {
    return (
      <div>
        <Row className="inside_box">
          <Row className="divider_box">
            <Divider className="divider" />
          </Row>
          <Row className="table_warp">
            {/* <Skeleton loading={loading} title={true} active={true}> */}
            <Button
              type="primary"
              onClick={this.addFn.bind(this)}
              style={{
                fontSize: 13,
                width: 90,
                height: 30,
                marginBottom: 20,
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
              rowKey={(r, i) => i}
            />
            <Pagination
              pageSizeOption={["10", "20", "30", "40"]}
              className="page_warp"
              size={"small"}
              current={this.state.curPage}
              total={this.state.totalNum}
              // showSizeChanger
              showTotal={this.showTotal}
              onChange={this.onPageChange.bind(this)}
              defaultPageSize={this.state.pageSize}
              onShowSizeChange={this.onShowSizeChange}
              defaultCurrent={1}
            />
            {/* </Skeleton> */}
          </Row>
        </Row>
        <NewDictForm
          editObj={this.state.editObj}
          isEdit={this.state.isEdit}
          onClose={this.getDictStatus.bind(this)}
          showNewWebSite={this.state.showNewWebSite}
        ></NewDictForm>
      </div>
    );
  }
}

export default dictMgt;
