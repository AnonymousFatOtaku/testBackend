// 商品管理主界面路由
import React, {Component} from "react";
import {Button, Card, Table, Select, Input, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {reqProducts, reqUpdateStatus} from '../../api'

export default class Product extends Component {

  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
  }

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
        width: 100,
        title: '状态',
        render: (product) => {
          const {status, _id} = product
          const newStatus = status === true ? false : true
          return (
            <div style={{textAlign: "center"}}>
              <Button type='primary' onClick={() => this.updateStatus(_id, newStatus)}>
                {status === true ? '下架' : '上架'}
              </Button>
              <span>{status === true ? '在售' : '已下架'}</span>
            </div>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: () => {
          return (
            <span>
              <a onClick={() => this.props.history.push('/product/info')}>详情&nbsp;&nbsp;</a>
              <a onClick={() => this.props.history.push('/product/change')}>修改</a>
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
    // 分页请求
    let result = await reqProducts(pageNum, 5)
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

  // 更新指定商品的状态
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if (result.status === 0) {
      message.success('更新商品状态成功')
      this.getProducts(this.pageNum)
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
    const {products, total, loading} = this.state

    const {Option} = Select;

    // 顶部左侧搜索栏
    const title = (
      <span>
        <Select style={{width: 200, marginRight: 20}}>
          <Option>按名称搜索</Option>
          <Option>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width: 200, marginRight: 20}}/>
        <Button type='primary'>搜索</Button>
      </span>
    )

    // 顶部右侧按钮
    const extra = (
      <Button type='primary' icon={<PlusOutlined/>} onClick={() => this.props.history.push('/product/change')}>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table bordered rowKey='_id' loading={loading} dataSource={products} columns={this.columns} pagination={{
          current: this.pageNum, total, defaultPageSize: 5, showQuickJumper: true, onChange: this.getProducts
        }} style={{height: 613}}/>
      </Card>
    )
  }
}