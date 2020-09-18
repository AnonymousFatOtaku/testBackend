// 后台管理主路由头部组件
import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import './admin-header.less';

class AdminHeader extends Component {

  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    wea: '', // 天气
    city: '', // 城市
    tem: '', // 温度
  }

  // 获取当前天气
  getWeather = async () => {
    // 调用接口请求异步获取数据
    const {wea, city, tem} = await reqWeather()
    // 更新状态
    this.setState({wea, city, tem})
  }

  // 获取当前时间
  getTime = () => {
    // 每隔1s获取当前时间并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }

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

  // 第一次render()之后执行一次，一般在此执行异步操作：发ajax请求/启动定时器
  componentDidMount() {
    // 获取当前时间
    this.getTime()
    // 获取当前天气
    this.getWeather()
  }

  // 当前组件卸载之前调用
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  render() {

    const {currentTime, wea, city, tem} = this.state
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
            <span>{currentTime}</span>
            <span style={{marginLeft: 10, marginRight: 10}}>{city}</span>
            <span>{wea}</span>
            <span style={{marginLeft: 10, marginRight: 10}}>{tem}°</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AdminHeader)