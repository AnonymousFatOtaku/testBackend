// 包含多个接口请求函数的模块，每个函数返回promise
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})
// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')
// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {
  categoryId,
  categoryName
}, 'POST')
// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})
// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')
// 根据商品名称/商品描述搜索商品分页列表，搜索的类型：productName/productDesc
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
// 获取一个分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})
// 获取所有角色的列表
export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')
// 更新角色
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')
// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', {userId}, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST')
// 获取所有订单的列表
export const reqOrders = () => ajax('/manage/order/list')

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