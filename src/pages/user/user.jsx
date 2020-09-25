// 用户管理路由
import React, {Component} from "react";
import {Button, Card, Space, Table, Modal, Select, Input, Form, message} from 'antd';
import {formateDate} from "../../utils/dateUtils"
import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from "../../api/index";
import './user.less'

export default class User extends Component {

  state = {
    users: [], // 所有用户列表
    roles: [], // 所有角色列表
    visible: false,
  };

  formRef = React.createRef();

  // 初始化列
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <a onClick={() => this.showUpdate(user)}>修改&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a onClick={() => this.deleteUser(user)}>删除</a>
          </span>
        )
      },
    ]
  }

  // 根据角色数组生成包含所有角色名的对象(属性名用角色id值)
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    // 保存
    this.roleNames = roleNames
  }

  // 显示添加界面
  showAdd = () => {
    this.user = null // 去除前面保存的user
    this.setState({
      visible: true
    })
  }

  // 显示修改界面
  showUpdate = (user) => {
    this.user = user // 保存user
    this.setState({
      visible: true
    })
  }

  // 删除指定用户
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('删除用户成功')
          this.getUsers()
        }
      }
    })
  }

  // 添加/修改用户
  addOrUpdateUser = async () => {
    this.setState({
      visible: false
    })
    // 收集输入数据
    const user = this.formRef.current.getFieldsValue({user: Object})
    // console.log(user)
    this.formRef.current.resetFields()
    // 如果是更新需要给user指定_id属性
    if (this.user) {
      user._id = this.user._id
    }
    // 提交添加的请求
    const result = await reqAddOrUpdateUser(user)
    // 刷新列表显示
    if (result.status === 0) {
      message.success(`${this.user ? '修改' : '添加'}用户成功`)
      this.getUsers()
    }
  }

  // 获取所有用户
  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const {users, roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  handleCancel = () => {
    // 重置表单所有内容
    this.formRef.current.resetFields()
    this.setState({
      visible: false,
    });
  };

  render() {

    const {users, roles, visible} = this.state
    const user = this.user || {}

    // 顶部左侧按钮
    const title = (
      <div>
        <Button type='primary' onClick={this.showAdd}>创建用户</Button>
      </div>
    )

    const {Option} = Select;

    return (
      <Card title={title}>
        <Table columns={this.columns} dataSource={users} bordered style={{height: 613}}
               pagination={{defaultPageSize: 8}}/>
        <Modal title={user._id ? '修改用户' : '添加用户'} visible={visible} onOk={this.addOrUpdateUser}
               onCancel={this.handleCancel}>
          <Form ref={this.formRef}>
            <Form.Item name="username" label="用户名：">
              <Input placeholder="请输入用户名" style={{width: 400, float: "right"}}/>
            </Form.Item>
            <Form.Item name="password" label="密码：">
              <Input type='password' placeholder="请输入密码" style={{width: 400, float: "right"}}/>
            </Form.Item>
            <Form.Item name="phone" label="手机号：">
              <Input placeholder="请输入手机号" style={{width: 400, float: "right"}}/>
            </Form.Item>
            <Form.Item name="email" label="邮箱：">
              <Input placeholder="请输入邮箱" style={{width: 400, float: "right"}}/>
            </Form.Item>
            <Form.Item name="role_id" label="角色：">
              <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}