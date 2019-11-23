import React from "react";
import {
  Table,
  Button,
  Row,
  Divider,
  Pagination,
  Popconfirm,
  message,
  Tooltip
} from "antd";
import SearchBar from "../../components/opratorBar/index";
import UploadWin from "../../components/Upload/index";
import NewForm from "../../components/NewForm/index";
import PreImg from "../../components/preImg/index";
import imgApi from "../../api/index";

export default class Base extends React.Component {
  constructor(props) {
    super(props); //调用父类的构造函数，固定写法

    this.state = {
      loading: false,
      searchList: [
        { id: 0, name: "网站名", value: "", placeholder: "请输入网站名" },
        { id: 1, name: "模块ID", value: "", placeholder: "请输入模块ID" },
        { id: 2, name: "操作人", value: "", placeholder: "请输入操作人" },
        { id: 3, name: "创建时间", value: "", placeholder: "请输入创建时间" },
        { id: 4, name: "更新时间", value: "", placeholder: "请输入更新时间" }
      ],
      pagination: false,
      isEdit: false,
      //    {
      //     total: 50,
      //     defaultCurrent: 1
      //   },
      showAddList: false,
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
          dataIndex: "imgId",
          key: "imgId"
        },
        {
          title: "网站名称",
          dataIndex: "websiteName",
          key: "websiteName",
          render: text => <span>{text}</span>
        },
        {
          title: "页面",
          dataIndex: "pageName",
          key: "pageName"
        },
        {
          title: "模块ID",
          dataIndex: "moduleId",
          key: "moduleId"
        },
        {
          title: "环境",
          dataIndex: "environment",
          key: "environment",
          render: (text, row, index) => (
            // const con = row.environment === 0 ? "生产" : "测试";
            <span>{row.environment === 0 ? "生产" : "测试"}</span>
          )
        },
        {
          title: "图片大小",
          dataIndex: "imgSize",
          key: "imgSize"
        },
        {
          title: "图片尺寸",
          dataIndex: "pixel",
          key: "pixel",
          render: (text, row, index) => (
            // console.log(row)
            <span>
              {row.imgWidth}x{row.imgLength}
            </span>
          )
        },
        {
          title: "图片描述",
          dataIndex: "imgDesc",
          key: "imgDesc"
        },
        {
          title: "图片地址",
          dataIndex: "imgUrl",
          key: "imgUrl",
          onCell: () => {
            return {
              style: {
                maxWidth: 250,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer"
              }
            };
          },
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              <span>{text}</span>
            </Tooltip>
          )
        },
        {
          title: "操作人",
          dataIndex: "operator",
          key: "operator"
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime"
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
          key: "updateTime"
        },
        {
          title: "操作",
          key: "action",
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

              <span
                className={"ml10 btn pointer"}
                onClick={this.urlAction.bind(this, text, record)}
              >
                上传
              </span>
              <span
                className={"ml10 btn pointer"}
                onClick={this.showPreImg.bind(this, text, record)}
              >
                预览
              </span>
            </div>
          )
        }
      ],
      tableData: [
        {
          imgId: "1",
          websiteName: "PlatOn",
          pageName: "home",
          moduleId: "0102",
          imgSize: "403kb",
          imgWidth: "1920",
          imgLength: "1200",
          imgUrl:
            "https://pics0.baidu.com/feed/a8773912b31bb05153ac8522a20c12b14bede0a8.jpeg?token=d3d290dca57f8740a40aa2e1cc819d0f&s=B50AAFF1CCD2E1F771A980820300E0D3",
          imgDesc: "当无数据时,默认测试数据",
          environment: "st",
          createTime: "2019-11-09 12:00:00",
          updateTime: "2019-11-09 12:00:00",
          operator: "李四",
          key: "1"
        },
        {
          imgId: "2",
          websiteName: "PlatOn",
          pageName: "home",
          moduleId: "0102",
          imgSize: "403kb",
          imgWidth: "1920",
          imgLength: "1200",
          imgUrl:
            "https://pics0.baidu.com/feed/a8773912b31bb05153ac8522a20c12b14bede0a8.jpeg?token=d3d290dca57f8740a40aa2e1cc819d0f&s=B50AAFF1CCD2E1F771A980820300E0D3",
          imgDesc: "当无数据时,默认测试数据",
          environment: "st",
          createTime: "2019-11-09 12:00:00",
          updateTime: "2019-11-09 12:00:00",
          operator: "李四",
          key: "2"
        },
        {
          imgId: "3",
          websiteName: "PlatOn",
          pageName: "home",
          moduleId: "0102",
          imgSize: "403kb",
          imgWidth: "1920",
          imgLength: "1200",
          imgUrl:
            "https://pics0.baidu.com/feed/a8773912b31bb05153ac8522a20c12b14bede0a8.jpeg?token=d3d290dca57f8740a40aa2e1cc819d0f&s=B50AAFF1CCD2E1F771A980820300E0D3",
          imgDesc: "当无数据时,默认测试数据",
          environment: "st",
          createTime: "2019-11-09 12:00:00",
          updateTime: "2019-11-09 12:00:00",
          operator: "李四",
          key: "3"
        }
      ]
    };
  }
  componentDidMount() {
    this.initTable();
  }
  initTable() {
    let data = {
      websiteName: ""
    };
    this.setState({
      loading: true
    });
    imgApi.queryImgList(data).then(res => {
      console.log(res);
      if (res.data.respCode === 0) {
        this.setState({
          tableData: [...res.data.data],
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    });
  }
  render(h) {
    // const { loading } = this.state;
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
          {/* <Skeleton loading={loading} active={true}> */}
          <SearchBar searchList={this.state.searchList}></SearchBar>
          {/* </Skeleton> */}
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
          {/* <Skeleton loading={loading} title={true} active={true}> */}
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
            rowKey={(r, i) => i}
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
          {/* </Skeleton> */}
        </Row>
        <NewForm
          onClose={this.getFormStatus.bind(this)}
          editObj={this.state.editObj}
          showAddList={this.state.showAddList}
          isEdit={this.state.isEdit}
        ></NewForm>
        <UploadWin
          onClose={this.getChildStatus.bind(this)}
          showUpload={this.state.showUpload}
          isEdit={this.state.isEdit}
        ></UploadWin>
        <PreImg
          showPreImg={this.state.showPreImg}
          preImgObject={this.state.preImgObject}
          onClose={this.getPreImgStatus.bind(this)}
        ></PreImg>
      </Row>
    );
  }
  getPreImgStatus(value) {
    this.setState({
      showPreImg: value
    });
  }
  showPreImg(text, record) {
    console.log(record);
    this.setState({
      showPreImg: true,
      preImgObject: record
    });
  }
  comfirmDelFn(v) {
    let data = {
      imgId: v.imgId
    };
    let that = this;
    imgApi.deleteImg(data).then(res => {
      if (res.data.respCode === 0) {
        message.success("删除成功");
        that.initTable();
      }
    });

    //TODO 删除接口
  }
  cancleFirmFn(e) {
    console.log(e);
    message.warning("您已取消删除");
  }
  deleteFn() {}
  editFn(text, record) {
    this.setState({
      showAddList: true,
      isEdit: true,
      editObj: record
    });
  }
  addFn() {
    //调用弹出窗口
    this.setState({
      showAddList: true,
      isEdit: false
    });
  }
  getFormStatus(value, bol) {
    this.setState({
      showAddList: value
    });
    if (bol) {
      this.initTable();
    }
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
