// 商品信息路由
import React, {Component} from 'react'
import {
  Card,
  List,
} from 'antd'
import {
  ArrowLeftOutlined,
} from '@ant-design/icons';
import '../../assets/css/reset.css'
import './product-info.less'

export default class ProductInfo extends Component {
  render() {

    const title = (
      <span>
          <ArrowLeftOutlined style={{color: "green", marginRight: 20}} onClick={() => this.props.history.goBack()}/>
        <span>商品详情</span>
      </span>
    )

    const data = [
      '商品名称:',
      '商品描述:',
      '商品价格:元',
      '所属分类:',
      '商品图片:',
      '商品详情:',
    ];

    return (
      <Card title={title} style={{height: 727}}>
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Card>
    )
  }
}