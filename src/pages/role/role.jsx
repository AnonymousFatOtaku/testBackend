// 角色管理路由
import React, {Component} from "react";
import {Button, Card, Table, Modal, Form, Input, Tree} from 'antd';
import {reqRoles, reqAddRole, reqUpdateRole} from '../../api'
import memoryUtils from "../../utils/memoryUtils"
import {formateDate} from '../../utils/dateUtils'
import storageUtils from "../../utils/storageUtils";

export default class Role extends Component {

  state = {
    roles: [], // 所有角色的列表
    role: {}, // 选中的角色
    visible: false, // 是否显示弹窗
  };

  // 初始化table所有列
  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
  }

  // 获取所有角色
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  // 点击行时获取选中的角色
  onRow = (role) => {
    return {
      onClick: event => {
        this.setState({
          role
        })
      },
    }
  }

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

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {

    const {roles, role} = this.state

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
        <Button type='primary' onClick={() => this.setState({visible: true})}>创建角色</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({visible: true})}>设置角色权限</Button>
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
        <Table columns={this.columns} dataSource={roles} bordered rowKey='_id' pagination={{defaultPageSize: 8}}
               rowSelection={{
                 type: 'radio',
                 selectedRowKeys: [role._id],
                 onSelect: (role) => { // 选择某个radio时回调
                   this.setState({
                     role
                   })
                 }
               }}
               onRow={this.onRow} style={{height: 613}}/>
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