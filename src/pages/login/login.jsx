// 用户登录的路由组件
import React, {Component} from 'react'
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import logo from '../../assets/images/logo.gif'
import './login.less'

export default class Login extends Component {

  render() {

    // onFinish为提交表单且数据验证成功后的回调事件，values即表单数据，分别在输入过程中和点击登录按钮时进行验证
    const onFinish = values => {
      console.log('获取到的表单数据：', values);
      console.log("用户名：" + values.username + "，密码：" + values.password + "，记住密码：" + values.remember);
    };

    // onFinishFailed为提交表单且数据验证失败后的回调事件
    const onFinishFailed = (values, errorFields, outOfDate) => {
      console.log('表单错误信息：', values);
    };

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          {/* 登录表单 */}
          <Form name="normal_login" className="login-form" initialValues={{remember: false}} onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
            {/* 用户名输入框，配置对象:属性名是特定的一些名称 */}
            <Form.Item name="username" rules={[
              // 声明式验证:直接使用定义好的验证规则进行验证
              {required: true, message: '请输入用户名'},
              {min: 3, max: 12, message: '用户名长度应为3-12个字符'},
              {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能由英文、数字或下划线组成'},
            ]}>
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
            </Form.Item>
            {/* 密码输入框，Input没有可见切换按钮，Input.Password有 */}
            <Form.Item name="password" rules={[
              {required: true, message: '请输入密码'},
              {min: 3, max: 12, message: '密码长度应为3-12个字符'},
              {pattern: /^[a-zA-Z0-9_]+$/, message: '密码只能由英文、数字或下划线组成'},
            ]}>
              <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                              placeholder="密码"/>
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