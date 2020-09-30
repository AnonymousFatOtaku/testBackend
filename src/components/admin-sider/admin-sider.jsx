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

    // console.log(menus)

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
          <h3>管理后台</h3>
        </Link>
        <Menu selectedKeys={[path]} defaultOpenKeys={[this.openKey]} mode="inline" theme="dark">
          <Menu.Item key="/home" icon={<HomeOutlined/>} disabled={menus.indexOf("/home") === -1}>
            <Link to='/home'>
              首页
            </Link>
          </Menu.Item>
          <SubMenu key="/products" icon={<AppstoreOutlined/>} title="商品"
                   disabled={menus.indexOf("/products") === -1}>
            <Menu.Item key="/category" icon={<DatabaseOutlined/>}
                       disabled={menus.indexOf("/category") === -1}>
              <Link to='/category'>
                品类管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/product" icon={<ShoppingCartOutlined/>}
                       disabled={menus.indexOf("/product") === -1}>
              <Link to='/product'>
                商品管理
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/user" icon={<UserOutlined/>} disabled={menus.indexOf("/user") === -1}>
            <Link to='/user'>
              用户管理
            </Link>
          </Menu.Item>
          <Menu.Item key="/role" icon={<ContactsOutlined/>} disabled={menus.indexOf("/role") === -1}>
            <Link to='/role'>
              角色管理
            </Link>
          </Menu.Item>
          <SubMenu key="/charts" icon={<AreaChartOutlined/>} title="图形图表"
                   disabled={menus.indexOf("/charts") === -1}>
            <Menu.Item key="/bar" icon={<BarChartOutlined/>} disabled={menus.indexOf("/bar") === -1}>
              <Link to='/bar'>
                柱形图
              </Link>
            </Menu.Item>
            <Menu.Item key="/line" icon={<LineChartOutlined/>} disabled={menus.indexOf("/line") === -1}>
              <Link to='/line'>
                折线图
              </Link>
            </Menu.Item>
            <Menu.Item key="/pie" icon={<PieChartOutlined/>} disabled={menus.indexOf("/pie") === -1}>
              <Link to='/pie'>
                饼图
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/order" icon={<BarsOutlined/>} disabled={menus.indexOf("/order") === -1}>
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