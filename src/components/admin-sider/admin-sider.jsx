// 后台管理主路由头部组件
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Menu, Button} from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/logo.gif';
import './admin-sider.less';

// 子菜单
const {SubMenu} = Menu;

export default class AdminSider extends Component {

  render() {
    return (
      <div className="adminSider">
        <Link to='/' className="adminSider-header">
          <img src={logo} alt="logo"/>
          <h3>管理后台</h3>
        </Link>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<PieChartOutlined/>}>
            首页
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined/>} title="商品">
            <Menu.Item key="2">品类管理</Menu.Item>
            <Menu.Item key="3">商品管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<PieChartOutlined/>}>
            用户管理
          </Menu.Item>
          <Menu.Item key="5" icon={<PieChartOutlined/>}>
            角色管理
          </Menu.Item>
          <SubMenu key="sub2" icon={<MailOutlined/>} title="图形图表">
            <Menu.Item key="6">柱形图</Menu.Item>
            <Menu.Item key="7">折线图</Menu.Item>
            <Menu.Item key="8">饼图</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<PieChartOutlined/>}>
            订单管理
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}