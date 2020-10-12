// 用户订单路由
import React, {Component} from 'react'
import {Button, Card, Input, Select, Table} from "antd";
import {formateDate} from "../../utils/dateUtils";
import {reqUserOrders, reqUserSearchOrders} from "../../api";
import memoryUtils from '../../utils/memoryUtils'

export default class userOrder extends Component {

  state = {
    total: 0, // 订单的总数量
    orders: [], // 所有订单列表
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 根据哪个字段搜索
  };

  initColumns = () => {
    this.columns = [
      {
        title: '订单号',
        dataIndex: '_id',
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
        render: (orderTime) => formateDate(orderTime)
      },
      {
        title: '商品名',
        dataIndex: 'productName',
      },
    ];
  }

  // 获取指定页码的订单列表数据显示
  getOrders = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum
    this.setState({loading: true}) // 显示loading
    const {searchName, searchType} = this.state
    let result
    let username = memoryUtils.user.username
    // console.log(username)
    if (searchName) { // 如果搜索关键字有值说明要做搜索分页
      result = await reqUserSearchOrders({pageNum, pageSize: 9, searchName, searchType, username})
    } else { // 一般分页请求
      result = await reqUserOrders(pageNum, 9, username)
    }
    this.setState({loading: false}) // 隐藏loading
    if (result.status === 0) {
      // 取出分页数据，更新状态，显示分页列表
      const {total, list} = result.data
      this.setState({
        total,
        orders: list
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getOrders(1)
  }

  render() {
    // 取出状态数据
    const {total, loading, orders, searchType, searchName} = this.state
    const {Option} = Select;

    // 顶部左侧搜索栏
    const title = (
      <span>
        <Select style={{width: 200, marginRight: 20}} value={searchType}
                onChange={value => this.setState({searchType: value})}>
          <Option value='productName'>按名称搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width: 200, marginRight: 20}} value={searchName}
               onChange={event => this.setState({searchName: event.target.value})}/>
        <Button type='primary' onClick={() => this.getOrders(1)}>搜索</Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table columns={this.columns} dataSource={orders} bordered rowKey='_id' loading={loading} style={{height: 620}}
               pagination={{
                 current: this.pageNum, total, defaultPageSize: 9, showQuickJumper: true, onChange: this.getOrders
               }}/>
      </Card>
    )
  }
}