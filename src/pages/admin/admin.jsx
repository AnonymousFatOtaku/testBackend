// 后台管理主路由组件
import React, {Component} from "react";
import {Layout} from 'antd';
import AdminSider from "../../components/admin-sider/admin-sider";
import AdminHeader from "../../components/admin-header/admin-header";
import './admin.less';

const {Header, Footer, Sider, Content} = Layout;

export default class Admin extends Component {
  render() {
    return (
      <Layout className="admin">
        <Sider>
          <AdminSider/>
        </Sider>
        <Layout>
          <Header>
            <AdminHeader/>
          </Header>
          <Content>Content</Content>
          <Footer className="adminFooter">欢迎使用后台管理系统</Footer>
        </Layout>
      </Layout>
    )
  }
}