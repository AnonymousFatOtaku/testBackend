// 后台管理主路由头部组件
import React, {Component} from "react";
import './admin-header.less';
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

export default class AdminHeader extends Component {

  render() {
    return (
      <div className="adminHeader">
        <div className="adminHeader-userInfo">
          <span>欢迎，admin</span>
          <a onClick={storageUtils.removeUser(memoryUtils.user)}>退出</a>
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