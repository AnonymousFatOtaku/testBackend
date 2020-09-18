// 包含多个接口请求函数的模块，每个函数返回promise
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 获取当前IP所在地天气
export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    const url = `https://v0.yiketianqi.com/api?version=v61&appid=47291758&appsecret=35G6DoPc`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      if (!err && data) { // 如果没有错误且有获取到数据
        // 取出需要的数据
        const wea = data.wea
        const city = data.city
        const tem = data.tem
        resolve({wea, city, tem})
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}