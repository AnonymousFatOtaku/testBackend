// 品类管理主界面路由
import React, {Component} from "react";
import {Card, Button, Table, Modal, Input, Select, message, Form,} from 'antd';
import {
  PlusOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import {reqCategorys, reqUpdateCategory, reqAddCategory} from '../../api'

export default class Category extends Component {

  state = {
    visible: 0, // 对话框标识，0不可见，1添加分类可见，2更新分类可见
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: '0', // 当前需要显示的分类列表的父分类ID
    parentName: '', // 当前需要显示的分类列表的父分类名称
  };

  // 初始化table所有列
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name', // 显示数据对应的属性名
        width: 1300,
      },
      {
        title: '操作',
        render: (category) => ( // 返回需要显示的界面标签
          <span>
            <a onClick={this.showUpdateCategory}>修改分类&nbsp;&nbsp;&nbsp;&nbsp;</a>
            {this.state.parentId === '0' ? <a onClick={() => this.showSubCategorys(category)}>查看子分类</a> : null}
          </span>
        )
      }
    ]
  }

  // 异步获取一级/二级分类列表显示
  getCategorys = async (parentId) => {
    // 在发请求前显示loading
    this.setState({loading: true})
    // 如果没有指定parentId则根据状态中的parentId请求，如果指定了parentId则根据指定的请求
    parentId = parentId || this.state.parentId
    // 发异步ajax请求获取数据
    const result = await reqCategorys(parentId)
    // 在请求完成后隐藏loading
    this.setState({loading: false})

    if (result.status === 0) {
      // 取出分类数组(可能是一级也可能二级的)
      const categorys = result.data
      if (parentId === '0') {
        // 更新一级分类状态
        this.setState({
          categorys
        })
      } else {
        // 更新二级分类状态
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取分类列表失败')
    }
  }

  // 显示指定一级分类对象的二级列表
  showSubCategorys = (category) => {
    // 更新状态
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // 在状态更新且重新render()后执行
      // 获取二级分类列表显示
      this.getCategorys()
    })
  }

  // 显示指定一级分类列表
  showCategorys = () => {
    // 更新为显示一列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  // 显示添加的确认框
  showAddCategory = () => {
    this.setState({
      visible: 1,
    });
  };

  // 添加分类
  addCategory = () => {
    console.log(this.form);
    // reqAddCategory("categoryName")
  };

  // 显示修改的确认框
  showUpdateCategory = () => {
    this.setState({
      visible: 2,
    });
  };

  // 更新分类
  updateCategory = () => {
    const categoryId = "5f68839e6e2d112c182fdfe7"
    const categoryName = "newCategoryName111"
    // reqUpdateCategory({categoryId, categoryName})
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: 0,
    });
  };

  // 为第一次render()准备数据
  componentWillMount() {
    // 初始化table所有列
    this.initColumns()
  }

  // 执行异步任务：发异步ajax请求
  componentDidMount() {
    // 获取一级分类列表显示
    this.getCategorys()
  }

  render() {
    // 读取状态数据
    const {visible, categorys, subCategorys, parentId, parentName, loading} = this.state
    // 读取指定的分类
    const category = this.category || {} // 如果还没有则指定一个空对象

    // 顶部左侧标题
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <a onClick={this.showCategorys}>一级分类列表</a>
        <ArrowRightOutlined style={{marginLeft: 10, marginRight: 10}}/>
        <span>{parentName}</span>
      </span>
    )

    // 顶部右侧按钮
    const extra = (
      <Button type='primary' icon={<PlusOutlined/>} onClick={this.showAddCategory}>添加</Button>
    )

    const {Option} = Select;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <Card title={title} extra={extra}>
        <Table columns={this.columns} dataSource={parentId === '0' ? categorys : subCategorys} bordered rowKey='_id'
               loading={loading} pagination={{defaultPageSize: 8, showQuickJumper: true}} style={{height: 613}}/>
        <Modal title="添加分类" visible={visible === 1} onOk={this.addCategory} onCancel={this.handleCancel} destroyOnClose>
          <Form preserve={false}>
            <Form.Item>
              <Select defaultValue="lucy" style={{width: 472, marginBottom: 20}} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入分类名称"/>
            </Form.Item>
          </Form>
        </Modal>
        <Modal title="更新分类" visible={visible === 2} onOk={this.updateCategory} onCancel={this.handleCancel} destroyOnClose>
          <Form preserve={false}>
            <Form.Item>
              <Input placeholder="一级分类名"/>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}