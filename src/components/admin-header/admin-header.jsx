// 后台管理主路由头部组件
import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './admin-header.less';

class AdminHeader extends Component {

  // 退出登录
  logout = () => {
    // 显示确认框
    Modal.confirm({
      content: '是否确认退出?',
      onOk: () => {
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 跳转到login
        this.props.history.replace('/login')
      }
    })
  }

  render() {

    const username = memoryUtils.user.username

    return (
      <div className="adminHeader">
        <div className="adminHeader-userInfo">
          <span>欢迎，{username}</span>
          <a onClick={this.logout}>退出</a>
        </div>
        <div className="adminHeader-pageInfo">
          <div className="adminHeader-pageInfo-title">首页</div>
          <div className="adminHeader-pageInfo-time">
            <span>时间</span>
            <img src="https://cdn.aixifan.com/acfun-pc/2.8.41/img/404.png" alt=""/>
            <span>天气</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AdminHeader)