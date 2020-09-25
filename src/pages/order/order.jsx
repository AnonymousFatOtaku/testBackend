// 订单管理路由
import React, {Component} from "react";
import {Button, Card, Space, Table, Modal, Select, Input, Form} from 'antd';
import {formateDate} from "../../utils/dateUtils"
import {reqOrders} from "../../api/index";

export default class Order extends Component {

  state = {
    orders: [], // 所有订单列表
  };

  initColumns = () => {
    this.columns = [
      {
        title: '订单号',
        dataIndex: 'orderId',
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
      {
        title: '商品分类',
        dataIndex: 'role_id',
      },
      {
        title: '商品数量',
        dataIndex: 'productCount',
      },
      {
        title: '订单价格',
        dataIndex: 'orderPrice',
      },
    ];
  }

  // 获取所有订单
  getOrders = async () => {
    const result = await reqOrders()
    if (result.status === 0) {
      const orders = result.data
      this.setState({
        orders
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getOrders()
  }

  render() {

    const {orders} = this.state

    return (
      <Card title="订单管理">
        <Table columns={this.columns} dataSource={orders} bordered style={{height: 620}}/>
      </Card>
    )
  }
}