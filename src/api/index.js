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
// 获取订单分页列表
export const reqOrders = (pageNum, pageSize) => ajax('/manage/order/list', {pageNum, pageSize})
// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')
// 根据商品名称/商品类型/用户名搜索订单分页列表
export const reqSearchOrders = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/order/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
// 获取展示给用户的商品列表
export const reqUserProduct = (pageNum, pageSize) => ajax('/manage/userProduct/list', {pageNum, pageSize})
// 根据商品名称/商品描述搜索商品分页列表，搜索的类型：productName/productDesc
export const reqSearchUserProduct = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/userProduct/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
// 创建订单
export const reqAddOrder = (productName, username) => ajax('/manage/order/add', {productName, username}, 'POST')
// 获取用户订单分页列表
export const reqUserOrders = (pageNum, pageSize, username) => ajax('/manage/userOrder/list', {
  pageNum,
  pageSize,
  username
})
// 根据商品名称/商品类型/用户名搜索用户订单分页列表
export const reqUserSearchOrders = ({pageNum, pageSize, searchName, searchType, username}) => ajax('/manage/userOrder/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
  username,
})

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