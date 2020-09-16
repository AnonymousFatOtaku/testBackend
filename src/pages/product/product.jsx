// 商品管理主界面路由
import React, {Component} from "react";
import {Button, Card, Table, Space, Select, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

export default class Product extends Component {
  render() {

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a>{text}</a>,
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: () => (
          <div>
            <Button type='primary'>上架</Button>
            <p>已下架</p>
          </div>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: () => (
          <Space size="middle">
            <a onClick={() => this.props.history.push('/product/info')}>详情</a>
            <a onClick={() => this.props.history.push('/product/change')}>修改</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        "status": 1,
        "imgs": [
          "image-1559402396338.jpg"
        ],
        "_id": "5ca9e05db49ef916541160cd",
        "name": "联想ThinkPad 翼4809",
        "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        "price": 65999,
        "pCategoryId": "5ca9d6c0b49ef916541160bb",
        "categoryId": "5ca9db9fb49ef916541160cc",
        "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
        "__v": 0
      },
      {
        "status": 1,
        "imgs": [
          "image-1559402448049.jpg",
          "image-1559402450480.jpg"
        ],
        "_id": "5ca9e414b49ef916541160ce",
        "name": "华硕(ASUS) 飞行堡垒",
        "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
        "price": 6799,
        "pCategoryId": "5ca9d6c0b49ef916541160bb",
        "categoryId": "5ca9db8ab49ef916541160cb",
        "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
        "__v": 0
      },
      {
        "status": 2,
        "imgs": [
          "image-1559402436395.jpg"
        ],
        "_id": "5ca9e4b7b49ef916541160cf",
        "name": "你不知道的JS（上卷）",
        "desc": "图灵程序设计丛书： [You Don't Know JS:Scope & Closures] JavaScript开发经典入门图书 打通JavaScript的任督二脉",
        "price": 35,
        "pCategoryId": "0",
        "categoryId": "5ca9d6c9b49ef916541160bc",
        "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">图灵程序设计丛书：你不知道的JavaScript（上卷）</span> <span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"><strong>[You Don't Know JS:Scope &amp; Closures]</strong></span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(227,57,60);background-color: rgb(255,255,255);font-size: 12px;\">JavaScript开发经典入门图书 打通JavaScript的任督二脉 领略语言内部的绝美风光</span>&nbsp;</p>\n",
        "__v": 0
      },
      {
        "status": 1,
        "imgs": [
          "image-1554638403550.jpg"
        ],
        "_id": "5ca9e653b49ef916541160d1",
        "name": "美的（Midea）KFR-35GW/WDAA3",
        "desc": "正1.5匹 变频 智弧 冷暖 智能壁挂式卧室空调挂机",
        "price": 2499,
        "pCategoryId": "5ca9d695b49ef916541160ba",
        "categoryId": "5ca9da1ab49ef916541160c6",
        "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">美的（Midea）正1.5匹 变频 智弧 冷暖 智能壁挂式卧室空调挂机 KFR-35GW/WDAA3@</span></p>\n<p style=\"text-align:start;\"></p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.8美的大牌秒杀日】提前加入购物车！2299元成交价！前50名下单送赠品加湿型电风扇，赠完即止！8日0点开抢！</span><a href=\"https://sale.jd.com/mall/LKHdqZUIYk.html\" target=\"_blank\"><span style=\"color: rgb(94,105,173);background-color: rgb(255,255,255);font-size: 12px;\">更有无风感柜挂组合套购立减500元！猛戳！！</span></a>&nbsp;</p>\n",
        "__v": 0
      },
      {
        "status": 1,
        "imgs": [
          "image-1559402396338.jpg"
        ],
        "_id": "5ca9e05db49ef916541160cd",
        "name": "联想ThinkPad 翼4809",
        "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        "price": 65999,
        "pCategoryId": "5ca9d6c0b49ef916541160bb",
        "categoryId": "5ca9db9fb49ef916541160cc",
        "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
        "__v": 0
      }
    ];

    const {Option} = Select;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    // 顶部左侧标题
    const title = (
      <div>
        <Select defaultValue="lucy" onChange={handleChange} style={{width: 200, marginRight: 20}}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Input placeholder="关键字" style={{width: 200, marginRight: 20}}/>
        <Button type='primary'>搜索</Button>
      </div>
    )

    // 顶部右侧按钮
    const extra = (
      <div>
        <Button type='primary' icon={<PlusOutlined/>}
                onClick={() => this.props.history.push('/product/change')}>添加商品</Button>
      </div>
    )

    return (
      <Card title={title} extra={extra}>
        <Table columns={columns} dataSource={data} bordered/>
      </Card>
    )
  }
}