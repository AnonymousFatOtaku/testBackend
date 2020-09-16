// 品类管理路由
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Category from './category'
import Subcategory from './subcategory'

export default class Index extends Component {
  render() {
    return (
      <Switch>
        <Route path='/category' component={Category} exact/>
        <Route path='/category/subcategory' component={Subcategory}/>
        <Redirect to='/category'/>
      </Switch>
    )
  }
}