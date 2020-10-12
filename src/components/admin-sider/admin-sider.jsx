// 后台管理主路由左侧导航组件
import React, {Component} from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
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
import memoryUtils from "../../utils/memoryUtils";
import {reqRoles,} from '../../api'
import logo from '../../assets/images/logo.gif';
import './admin-sider.less';


// 子菜单
const {SubMenu} = Menu;

class AdminSider extends Component {

  state = {
    menus: [], // 登录用户的权限数组
  }

  /*
  * 1.获取当前登录用户
  * 2.获取该用户所属角色
  * 3.获取该角色权限数组
  * 4.每个item添加disabled判定，该item的key不在权限数组中即disable该item
  * */
  // 获取登录用户的权限数组
  getMenus = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      for (let i = 0; i < roles.length; i++) {
        // console.log(roles[i]._id)
        if (memoryUtils.user.role_id === roles[i]._id) {
          this.setState({
            menus: roles[i].menus
          })
        }
      }
    }
  }

  componentDidMount() {
    this.getMenus()
  }

  render() {

    const {menus} = this.state

    // console.log(memoryUtils.user)

    // 获取当前请求的路由路径
    let path = this.props.location.pathname

    // 二级路由下保持选中一级路由
    if (path === "/product/info" || path === "/product/addupdate") {
      path = "/product"
    }

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
          <h3>{memoryUtils.user.role_id === "5f7463560e955025a8439b56" ? "维纳斯商城" : "管理后台"}</h3>
        </Link>
        <Menu selectedKeys={[path]} defaultOpenKeys={[this.openKey]} mode="inline" theme="dark">
          {menus.indexOf("/home") != -1 ?
            <Menu.Item key="/home" icon={<HomeOutlined/>}>
              <Link to='/home'>
                首页
              </Link>
            </Menu.Item> : null}
          {menus.indexOf("/products") != -1 ?
            <SubMenu key="/products" icon={<AppstoreOutlined/>} title="商品">
              {menus.indexOf("/category") != -1 ?
                <Menu.Item key="/category" icon={<DatabaseOutlined/>}>
                  <Link to='/category'>
                    品类管理
                  </Link>
                </Menu.Item> : null}
              {menus.indexOf("/product") != -1 ?
                <Menu.Item key="/product" icon={<ShoppingCartOutlined/>}>
                  <Link to='/product'>
                    商品管理
                  </Link>
                </Menu.Item> : null}
            </SubMenu> : null}
          {menus.indexOf("/user") != -1 ?
            <Menu.Item key="/user" icon={<UserOutlined/>}>
              <Link to='/user'>
                用户管理
              </Link>
            </Menu.Item> : null}
          {menus.indexOf("/role") != -1 ?
            <Menu.Item key="/role" icon={<ContactsOutlined/>}>
              <Link to='/role'>
                角色管理
              </Link>
            </Menu.Item> : null}
          {menus.indexOf("/charts") != -1 ?
            <SubMenu key="/charts" icon={<AreaChartOutlined/>} title="图形图表">
              {menus.indexOf("/bar") != -1 ?
                <Menu.Item key="/bar" icon={<BarChartOutlined/>}>
                  <Link to='/bar'>
                    柱形图
                  </Link>
                </Menu.Item> : null}
              {menus.indexOf("/line") != -1 ?
                <Menu.Item key="/line" icon={<LineChartOutlined/>}>
                  <Link to='/line'>
                    折线图
                  </Link>
                </Menu.Item> : null}
              {menus.indexOf("/pie") != -1 ?
                <Menu.Item key="/pie" icon={<PieChartOutlined/>}>
                  <Link to='/pie'>
                    饼图
                  </Link>
                </Menu.Item> : null}
            </SubMenu> : null}
          {menus.indexOf("/order") != -1 ?
            <Menu.Item key="/order" icon={<BarsOutlined/>}>
              <Link to='/order'>
                订单管理
              </Link>
            </Menu.Item> : null}
          {menus.indexOf("/userProduct") != -1 ?
            <Menu.Item key="/userProduct" icon={<ShoppingCartOutlined/>}>
              <Link to='/userProduct'>
                商品列表
              </Link>
            </Menu.Item> : null}
          {menus.indexOf("/userOrder") != -1 ?
            <Menu.Item key="/userOrder" icon={<BarsOutlined/>}>
              <Link to='/userOrder'>
                我的订单
              </Link>
            </Menu.Item> : null}
        </Menu>
      </div>
    )
  }
}

// withRouter是高阶组件，用来包装非路由组件返回一个新的组件，新的组件向非路由组件传递3个属性:history/location/match
export default withRouter(AdminSider)