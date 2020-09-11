// 用户管理路由
import React, {Component} from "react";
import {Button, Card, Space, Table, Modal, Select, Input, Form} from 'antd';
import {FormInstance} from 'antd/lib/form';
import './user.less'

export default class User extends Component {

  state = {visible: false};

  showModal = () => {
    this.setState({
      visible: true,
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
      visible: false,
    });
  };

  onFinish = values => {
    console.log(values);
  };

  render() {

    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
      },
      {
        title: '操作',
        key: 'action',
        render: () => (
          <Space size="middle">
            <a>修改</a>
            <a>删除</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      },
      {
        "_id": "5cb05b69b6ed8c44f42c9af3",
        "username": "ss22",
        "password": "123",
        "phone": "23343",
        "email": "df",
        "role_id": "5caf5444c61376319cef80a8",
        "create_time": 1555061609666,
        "__v": 0
      },
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      },
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      },
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      },
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      },
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      },
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      },
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      },
    ];

    // 顶部左侧按钮
    const title = (
      <div>
        <Button type='primary' onClick={this.showModal}>创建用户</Button>
      </div>
    )

    const {Option} = Select;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <Card title={title}>
        <Table columns={columns} dataSource={data} bordered/>
        <Modal title="添加用户" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
            <Form.Item name="note" label="用户名：" rules={[{}]}>
              <Input placeholder="请输入用户名" style={{width: 400, float: "right"}}/>
            </Form.Item>
            <Form.Item name="note" label="密码：" rules={[{}]}>
              <Input placeholder="请输入密码" style={{width: 400, float: "right"}}/>
            </Form.Item>
            <Form.Item name="note" label="手机号：" rules={[{}]}>
              <Input placeholder="请输入手机号" style={{width: 400, float: "right"}}/>
            </Form.Item>
            <Form.Item name="note" label="邮箱：" rules={[{}]}>
              <Input placeholder="请输入邮箱" style={{width: 400, float: "right"}}/>
            </Form.Item>
            <Form.Item name="gender" label="角色：" rules={[{}]}>
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.onGenderChange}
                allowClear
                style={{width: 400, float: "right"}}
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}