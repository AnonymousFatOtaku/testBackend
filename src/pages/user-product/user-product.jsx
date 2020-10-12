// 用户能看见的商品列表的路由
import React, {Component} from 'react'
import {Button, Card, Input, Select, Table, Modal, message} from "antd";
import {reqUserProduct, reqSearchUserProduct, reqAddOrder} from "../../api";
import memoryUtils from '../../utils/memoryUtils'
import ProductInfo from '../product/product-info'

export default class userProduct extends Component {

  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 根据哪个字段搜索
    visible: false,
  }

  // 显示购买弹窗提示
  showModal = (product) => {
    this.product = product // 保存product
    this.setState({
      visible: true,
    });
  };

  // 确定购买
  handleOk = async () => {
    this.setState({
      visible: false,
    });
    const productName = this.product.name
    const username = memoryUtils.user.username
    // console.log(productName, username)
    // 提交添加的请求
    const result = await reqAddOrder(productName, username)
    // 刷新列表显示
    if (result.status === 0) {
      message.success("购买成功")
    } else {
      message.error("购买失败");
    }
  };

  // 取消购买
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 初始化table所有列
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price  // 当前指定了对应的属性，传入的是对应的属性值
      },
      {
        width: 160,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <a onClick={() => this.props.history.push('/ProductInfo', {product})}>查看详情&nbsp;&nbsp;&nbsp;</a>
              <a onClick={() => this.showModal(product)}>购买商品</a>
            </span>
          )
        }
      },
    ];
  }

  // 获取指定页码的列表数据显示
  getProducts = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum
    this.setState({loading: true}) // 显示loading
    const {searchName, searchType} = this.state
    let result
    if (searchName) { // 如果搜索关键字有值说明要做搜索分页
      result = await reqSearchUserProduct({pageNum, pageSize: 5, searchName, searchType})
    } else { // 一般分页请求
      result = await reqUserProduct(pageNum, 5)
    }
    this.setState({loading: false}) // 隐藏loading
    if (result.status === 0) {
      // 取出分页数据，更新状态，显示分页列表
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }
  }

  // 为第一次render()准备数据
  componentWillMount() {
    // 初始化table所有列
    this.initColumns()
  }

  // 执行异步任务：发异步ajax请求
  componentDidMount() {
    // 获取显示商品列表第一页
    this.getProducts(1)
  }

  render() {

    // 取出状态数据
    const {products, total, loading, searchType, searchName} = this.state
    // 读取指定的商品
    const product = this.product || {} // 如果还没有则指定一个空对象
    const {Option} = Select;

    // console.log(product.name)

    // 顶部左侧搜索栏
    const title = (
      <span>
        <Select style={{width: 200, marginRight: 20}} value={searchType}
                onChange={value => this.setState({searchType: value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width: 200, marginRight: 20}} value={searchName}
               onChange={event => this.setState({searchName: event.target.value})}/>
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table bordered rowKey='_id' loading={loading} dataSource={products} columns={this.columns} pagination={{
          current: this.pageNum, total, defaultPageSize: 5, showQuickJumper: true, onChange: this.getProducts
        }} style={{height: 613}}/>
        <Modal title="购买商品" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>是否要购买{product.name}？</p>
        </Modal>
      </Card>
    )
  }
}