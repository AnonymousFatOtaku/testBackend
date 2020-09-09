// 后台管理主路由左侧导航组件
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Menu, Button} from 'antd';
import {
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  BarsOutlined,
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  ShoppingCartOutlined,
  DatabaseOutlined,
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
          <Menu.Item key="1" icon={<HomeOutlined/>}>
            <Link to='/home'>
              首页
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<AppstoreOutlined/>} title="商品">
            <Menu.Item key="2" icon={<DatabaseOutlined/>}>
              <Link to='/category'>
                品类管理
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShoppingCartOutlined/>}>
              <Link to='/product'>
                商品管理
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<UserOutlined/>}>
            <Link to='/user'>
              用户管理
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ContactsOutlined/>}>
            <Link to='/role'>
              角色管理
            </Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<AreaChartOutlined/>} title="图形图表">
            <Menu.Item key="6" icon={<BarChartOutlined/>}>
              <Link to='/charts/bar'>
                柱形图
              </Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<LineChartOutlined/>}>
              <Link to='/charts/line'>
                折线图
              </Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<PieChartOutlined/>}>
              <Link to='/charts/pie'>
                饼图
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<BarsOutlined/>}>
            <Link to='/order'>
              订单管理
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}