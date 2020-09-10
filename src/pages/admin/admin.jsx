// 后台管理主路由组件
import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import {Layout} from 'antd';
import AdminSider from "../../components/admin-sider/admin-sider";
import AdminHeader from "../../components/admin-header/admin-header";
import Home from "../home/home";
import Category from "../category/category";
import Bar from "../bar/bar";
import Line from "../line/line";
import Pie from "../pie/pie";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Order from "../order/order";
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
          <Content className="adminContent">
            <Switch>
              <Redirect from='/' exact to='/home'/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/bar" component={Bar}/>
              <Route path="/pie" component={Pie}/>
              <Route path="/line" component={Line}/>
              <Route path="/order" component={Order}/>
            </Switch>
          </Content>
          <Footer className="adminFooter">欢迎使用后台管理系统</Footer>
        </Layout>
      </Layout>
    )
  }
}