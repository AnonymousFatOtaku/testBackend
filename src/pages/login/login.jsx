// 用户登录的路由组件
import React, {Component} from 'react'
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import logo from '../../assets/images/logo.gif'
import './login.less'

export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          {/* 登录表单 */}
          <Form name="normal_login" className="login-form" initialValues={{remember: false}}>
            {/* 用户名输入框 */}
            <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]}>
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
            </Form.Item>
            {/* 密码输入框 */}
            <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]}>
              <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" placeholder="密码"/>
            </Form.Item>
            {/* 记住密码和忘记密码 */}
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="login-form-remember">记住密码</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="/admin">
                忘记密码
              </a>
            </Form.Item>
            {/* 登录按钮 */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}