// 订单管理路由
import React, {Component} from "react";
import {Button, Card, Space, Table, Modal, Select, Input, Form} from 'antd';

export default class Order extends Component {
  render() {

    const columns = [
      {
        title: '订单号',
        dataIndex: 'orderNumber',
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
      },
      {
        title: '商品名',
        dataIndex: 'product',
      },
      {
        title: '商品分类',
        dataIndex: 'category',
      },
      {
        title: '商品数量',
        dataIndex: 'account',
      },
      {
        title: '订单价格',
        dataIndex: 'price',
      },
    ];

    const data = [
      {
        key: '1',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
      {
        key: '3',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
      {
        key: '4',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
      {
        key: '5',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
      {
        key: '6',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
      {
        key: '7',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
      {
        key: '8',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
      {
        key: '9',
        orderNumber: 'John Brown',
        orderTime: '￥300,000.00',
        product: 'New York No. 1 Lake Park',
        category: 'John Brown',
        account: '￥300,000.00',
        price: 'New York No. 1 Lake Park',
      },
    ];

    return (
      <Card title="订单管理">
        <Table
          columns={columns}
          dataSource={data}
          bordered
        />,
      </Card>
    )
  }
}