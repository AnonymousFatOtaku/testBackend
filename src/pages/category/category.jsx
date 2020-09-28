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

  formRef = React.createRef();

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
            <a onClick={() => this.showUpdateCategory(category)}>修改分类&nbsp;&nbsp;&nbsp;&nbsp;</a>
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
    // 根据执行结果返回的状态判定是否成功
    if (result.status === 0) {
      // 取出分类数组(可能是一级也可能二级的)
      const categorys = result.data
      if (parentId === '0') {// 如果parentId为0则更新一级分类状态
        this.setState({
          categorys
        })
      } else {// 否则更新二级分类状态
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
    })
  };

  // 添加分类
  addCategory = async () => {

    // 隐藏确认框
    this.setState({
      visible: 0
    })

    // 获取到选中的父类ID和输入的新分类名
    const parentId = this.parentId
    const {categoryName} = this.formRef.current.getFieldsValue({categoryName: String})
    // console.log(parentId, categoryName)

    let {categorys} = this.state
    // 判定目前新增的是一级分类还是二级分类，undefined或"0"即为一级分类
    if (parentId === undefined || parentId === "0") {
      // console.log("一级分类")
      for (let i = 0; i < categorys.length; i++) { // 判定新增的用户是否已存在
        // console.log(categorys[i].name)
        if (categoryName === categorys[i].name) {
          message.error('该分类已存在');
          return
        }
      }
    } else { // 新增的是二级分类，先获取该分类下所有二级分类
      // console.log("二级分类")
      const result = await reqCategorys(parentId)
      const subCategorys = result.data
      // console.log(result,subCategorys)
      for (let i = 0; i < subCategorys.length; i++) { // 判定新增的用户是否已存在
        // console.log(subCategorys[i].name)
        if (categoryName === subCategorys[i].name) {
          message.error('该分类已存在');
          return
        }
      }
    }

    // 判定输入内容是否为空或包含空格
    if (categoryName === null || categoryName === undefined || categoryName.indexOf(' ') === 0 || categoryName === "") {
      message.error('分类名称不能为空或以空格开头');
    } else {
      // 提交添加分类的请求
      const result = await reqAddCategory(categoryName, parentId)
      // console.log(result.status, parentId)
      // 如果添加成功刷新显示并弹出提示成功的消息
      if (result.status === 0) {
        // 如果是在当前分类下添加的新分类则刷新显示当前分类
        if (parentId === this.state.parentId || parentId === undefined) {
          this.getCategorys()
        } else if (parentId === '0') { // 如果是在二级分类列表下添加一级分类则重新获取一级分类列表，但不需要显示一级列表
          this.getCategorys('0')
        }
        message.success('已成功添加新分类：' + categoryName);
      } else { // 添加失败也要弹出消息提示
        message.error('分类添加失败请检查后重试');
      }
    }
  };

  // 显示修改的确认框
  showUpdateCategory = (category) => {
    // 保存分类对象
    this.category = category
    this.setState({
      visible: 2,
    });
  };

  // 更新分类
  updateCategory = async () => {

    // 隐藏确定框
    this.setState({
      visible: 0
    })

    // 准备数据
    const categoryId = this.category._id
    const {categoryName} = this.formRef.current.getFieldsValue({categoryName: String})
    // console.log(categoryId, categoryName, typeof categoryName)

    let {categorys} = this.state
    let parentId = this.category.parentId
    // 判定目前新增的是一级分类还是二级分类，undefined或"0"即为一级分类
    if (parentId === undefined || parentId === "0") {
      // console.log("一级分类")
      for (let i = 0; i < categorys.length; i++) { // 判定新增的用户是否已存在
        // console.log(categorys[i].name)
        if (categoryName === categorys[i].name) {
          message.error('该分类已存在');
          return
        }
      }
    } else { // 新增的是二级分类，先获取该分类下所有二级分类
      // console.log("二级分类")
      const result = await reqCategorys(parentId)
      const subCategorys = result.data
      // console.log(result,subCategorys)
      for (let i = 0; i < subCategorys.length; i++) { // 判定新增的用户是否已存在
        // console.log(subCategorys[i].name)
        if (categoryName === subCategorys[i].name) {
          message.error('该分类已存在');
          return
        }
      }
    }

    // 判定输入内容是否为空或包含空格
    if (categoryName === null || categoryName === undefined || categoryName.indexOf(' ') === 0 || categoryName === "") {
      message.error('分类名称未作修改或为空/以空格开头');
    } else {
      // 提交修改分类的请求
      const result = await reqUpdateCategory({categoryId, categoryName})
      // 如果修改成功刷新显示并弹出提示成功的消息
      if (result.status === 0) {
        // 重新显示列表
        this.getCategorys()
        message.success('分类"' + this.category.name + '"已修改为"' + categoryName + '"');
      } else { // 修改失败也要弹出消息提示
        message.error('分类修改失败请检查后重试');
      }
    }
  }

  // modal的cancel按钮
  handleCancel = e => {
    // console.log(e);
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

    return (
      <Card title={title} extra={extra}>
        {/* 顶部左侧标题在一/二级分类下显示不同内容，通过loading设置页面加载状态，通过pagination设置分页 */}
        <Table columns={this.columns} dataSource={parentId === '0' ? categorys : subCategorys} bordered rowKey='_id'
               loading={loading} pagination={{defaultPageSize: 8, showQuickJumper: true}} style={{height: 613}}/>
        {/* 通过destroyOnClose在Modal关闭后清空内容 */}
        <Modal title="添加分类" visible={visible === 1} onOk={this.addCategory} onCancel={this.handleCancel} destroyOnClose>
          {/* <Modal/>和Form一起配合使用时，设置destroyOnClose也不会在Modal关闭时销毁表单字段数据，需要设置<Form preserve={false}/> */}
          <Form preserve={false} ref={this.formRef}>
            <Form.Item label="所属分类：">
              <Select defaultValue="0" style={{marginBottom: 20}} placeholder="请选择所属分类" onSelect={(value) => {
                this.parentId = value
                // console.log(this.parentId)
              }}>
                <Option value='0'>一级分类</Option>
                {/* 遍历所有一级分类 */}
                {
                  categorys.map(category => <Option value={category._id} key={category._id}>{category.name}</Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item name="categoryName" label="分类名称：" rules={[
              {whitespace: true, message: '分类名称不能为空或以空格开头'}
            ]}>
              <Input placeholder="请输入分类名称"/>
            </Form.Item>
          </Form>
        </Modal>
        <Modal title="更新分类" visible={visible === 2} onOk={this.updateCategory} onCancel={this.handleCancel}
               destroyOnClose>
          <Form preserve={false} ref={this.formRef}>
            {/* 设置whitespace为true禁止纯空格 */}
            <Form.Item name="categoryName" rules={[
              {whitespace: true, message: '分类名称不能为空或以空格开头'}
            ]}>
              <Input placeholder="请输入分类名称" defaultValue={category.name}/>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}