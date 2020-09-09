// 后台管理主路由左侧导航组件
import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Menu} from 'antd';
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

class AdminSider extends Component {

  render() {
    // 获取当前请求的路由路径
    const path = this.props.location.pathname

    // 在刷新后保持当前选中的子菜单项所在菜单列表为展开状态
    if (path === "/category" || path === "/product") {
      this.openKey = "/products"
    } else if (path === "/bar" || path === "/line" || path === "/pie") {
      this.openKey = "/charts"
    }

    return (
      <div className="adminSider">
        <Link to='/' className="adminSider-header">
          <img src={logo} alt="logo"/>
          <h3>管理后台</h3>
        </Link>
        <Menu selectedKeys={[path]} defaultOpenKeys={[this.openKey]} mode="inline" theme="dark">
          <Menu.Item key="/home" icon={<HomeOutlined/>}>
            <Link to='/home'>
              首页
            </Link>
          </Menu.Item>
          <SubMenu key="/products" icon={<AppstoreOutlined/>} title="商品">
            <Menu.Item key="/category" icon={<DatabaseOutlined/>}>
              <Link to='/category'>
                品类管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/product" icon={<ShoppingCartOutlined/>}>
              <Link to='/product'>
                商品管理
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/user" icon={<UserOutlined/>}>
            <Link to='/user'>
              用户管理
            </Link>
          </Menu.Item>
          <Menu.Item key="/role" icon={<ContactsOutlined/>}>
            <Link to='/role'>
              角色管理
            </Link>
          </Menu.Item>
          <SubMenu key="/charts" icon={<AreaChartOutlined/>} title="图形图表">
            <Menu.Item key="/bar" icon={<BarChartOutlined/>}>
              <Link to='/bar'>
                柱形图
              </Link>
            </Menu.Item>
            <Menu.Item key="/line" icon={<LineChartOutlined/>}>
              <Link to='/line'>
                折线图
              </Link>
            </Menu.Item>
            <Menu.Item key="/pie" icon={<PieChartOutlined/>}>
              <Link to='/pie'>
                饼图
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/order" icon={<BarsOutlined/>}>
            <Link to='/order'>
              订单管理
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

// withRouter是高阶组件，用来包装非路由组件返回一个新的组件，新的组件向非路由组件传递3个属性:history/location/match
export default withRouter(AdminSider)