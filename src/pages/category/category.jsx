// 品类管理路由
import React, {Component} from "react";
import {Card, Button, Table, Modal, Input, Select} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import './category.less';

export default class Category extends Component {

  state = {
    visible: 0, // 对话框标识，0不可见，1添加分类可见，2更新分类可见
  };

  addCategory = () => {
    this.setState({
      visible: 1,
    });
  };

  changeCategory = () => {
    this.setState({
      visible: 2,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: 0,
    });
  };

  render() {
    // 顶部左侧标题
    const title = '一级分类列表'
    // 顶部右侧按钮
    const extra = (
      <Button type='primary' icon={<PlusOutlined/>} onClick={this.addCategory}>添加</Button>
    )
    const {Option} = Select;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    const columns = [
      {
        title: '分类的名称',
        className: 'column-name',
        dataIndex: 'name',
        width: 1200,
      },
      {
        title: '操作',
        dataIndex: '',
        render: text => (
          <span>
            <a onClick={this.changeCategory}>修改分类&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a>查看子分类</a>
          </span>
        ),
      },
    ];

    const data = [
      {
        "parentId": "0",
        "_id": "5c2ed631f352726338607046",
        "name": "分类001",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed647f352726338607047",
        "name": "分类2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed64cf352726338607048",
        "name": "1分类3",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed631f35272633860704",
        "name": "分类001",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed647f3527263386070",
        "name": "分类2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed631f352726338607",
        "name": "分类001",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed647f35272633860",
        "name": "分类2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed64cf3527263386",
        "name": "1分类3",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed631f352726338",
        "name": "分类001",
        "__v": 0
      },
    ];

    return (
      <Card title={title} extra={extra}>
        <Table columns={columns} dataSource={data} bordered rowKey='_id'/>
        <Modal title="添加分类" visible={this.state.visible === 1} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Select defaultValue="lucy" style={{width: 472, marginBottom: 20}} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Input placeholder="请输入分类名称"/>
        </Modal>
        <Modal title="更新分类" visible={this.state.visible === 2} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Input placeholder="一级分类名"/>
        </Modal>
      </Card>
    )
  }
}