// 角色管理路由
import React, {Component} from "react";
import {Button, Card, Table, Modal, Form, Input, Tree} from 'antd';

export default class Role extends Component {

  state = {
    visible: false,
    isDisable: true, // 设置角色权限按钮状态，true为不可点击，false为可点击
  };

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

  closeDisable = () => {
    this.setState({
      isDisable: false,
    });
  };

  render() {

    const {isDisable} = this.state

    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ];

    const data = [
      {
        "menus": [
          "/role",
          "/charts/bar",
          "/home",
          "/category"
        ],
        "_id": "5ca9eaa1b49ef916541160d3",
        "name": "测试",
        "create_time": 1554639521749,
        "__v": 0,
        "auth_time": 1558679920395,
        "auth_name": "test007"
      },
      {
        "menus": [
          "/role",
          "/charts/bar",
          "/home",
          "/charts/line",
          "/category",
          "/product",
          "/products"
        ],
        "_id": "5ca9eab0b49ef916541160d4",
        "name": "经理",
        "create_time": 1554639536419,
        "__v": 0,
        "auth_time": 1558506990798,
        "auth_name": "test008"
      },
      {
        "menus": [
          "/home",
          "/products",
          "/category",
          "/product",
          "/role"
        ],
        "_id": "5ca9eac0b49ef91541160d5",
        "name": "角色1",
        "create_time": 1554639552758,
        "__v": 0,
        "auth_time": 1557630307021,
        "auth_name": "admin"
      },
      {
        "menus": [
          "/role",
          "/charts/bar",
          "/home",
          "/category"
        ],
        "_id": "5ca9eaa1b49ef916541163",
        "name": "测试",
        "create_time": 1554639521749,
        "__v": 0,
        "auth_time": 1558679920395,
        "auth_name": "test007"
      },
      {
        "menus": [
          "/role",
          "/charts/bar",
          "/home",
          "/charts/line",
          "/category",
          "/product",
          "/products"
        ],
        "_id": "5ca9eab0b49ef91654116",
        "name": "经理",
        "create_time": 1554639536419,
        "__v": 0,
        "auth_time": 1558506990798,
        "auth_name": "test008"
      },
      {
        "menus": [
          "/home",
          "/products",
          "/category",
          "/product",
          "/role"
        ],
        "_id": "5ca9eac0b49ef9165411",
        "name": "角色1",
        "create_time": 1554639552758,
        "__v": 0,
        "auth_time": 1557630307021,
        "auth_name": "admin"
      },
      {
        "menus": [
          "/role",
          "/charts/bar",
          "/home",
          "/category"
        ],
        "_id": "5ca9eaa1b49ef9165410",
        "name": "测试",
        "create_time": 1554639521749,
        "__v": 0,
        "auth_time": 1558679920395,
        "auth_name": "test007"
      },
      {
        "menus": [
          "/role",
          "/charts/bar",
          "/home",
          "/charts/line",
          "/category",
          "/product",
          "/products"
        ],
        "_id": "5ca9eab0b49ef916544",
        "name": "经理",
        "create_time": 1554639536419,
        "__v": 0,
        "auth_time": 1558506990798,
        "auth_name": "test008"
      },
      {
        "menus": [
          "/home",
          "/products",
          "/category",
          "/product",
          "/role"
        ],
        "_id": "5ca9eac0b49ef91654",
        "name": "角色1",
        "create_time": 1554639552758,
        "__v": 0,
        "auth_time": 1557630307021,
        "auth_name": "admin"
      }
    ];

    const treeData = [
      {
        title: '平台权限',
        key: '0-0',
        children: [
          {
            title: '首页',
            key: '0-0-0',
          },
          {
            title: '商品',
            key: '0-0-1',
            children: [
              {
                title: '品类管理',
                key: '0-0-1-0',
              },
              {
                title: '商品管理',
                key: '0-0-1-1',
              },
            ],
          },
          {
            title: '用户管理',
            key: '0-0-2',
          },
          {
            title: '角色管理',
            key: '0-0-3',
          },
          {
            title: '图形界面',
            key: '0-0-4',
            children: [
              {
                title: '柱形图',
                key: '0-0-4-0',
              },
              {
                title: '折线图',
                key: '0-0-4-1',
              },
              {
                title: '饼图',
                key: '0-0-4-2',
              },
            ],
          },
          {
            title: '订单管理',
            key: '0-0-5',
          },
        ],
      },
    ];

    // 顶部左侧按钮
    const title = (
      <div>
        <Button type='primary' onClick={this.showModal}>创建角色</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type='primary' disabled={isDisable} onClick={this.showModal}>设置角色权限</Button>
      </div>
    )

    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
      console.log('onCheck', checkedKeys, info);
    };

    return (
      <Card title={title}>
        <Table columns={columns} dataSource={data} bordered rowSelection={{type: 'radio', onSelect: this.closeDisable}}
               rowKey='_id'/>
        <Modal
          title="创建角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="角色名称：" name="username">
              <Input/>
            </Form.Item>
            <Tree
              checkable
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeData}
              defaultExpandAll
            />
          </Form>
        </Modal>
      </Card>
    )
  }
}