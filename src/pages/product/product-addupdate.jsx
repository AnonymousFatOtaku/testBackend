// 商品添加、修改路由
import React, {Component} from 'react'
import {Card, Input, Form, Cascader, Upload, message, Button, Modal} from 'antd';
import {
  ArrowLeftOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {reqCategorys, reqAddOrUpdateProduct} from '../../api'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class ProductAddUpdate extends Component {

  state = {
    loading: false,
    showRichText: false,
    editorContent: '',
    editorState: '',
    options: [],
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  handleClearContent = () => {  //清空文本
    this.setState({
      editorState: ''
    })
  }

  handleGetText = () => {    //获取文本内容
    this.setState({
      showRichText: true
    })
  }

  onEditorStateChange = (editorState) => {   //编辑器的状态
    this.setState({
      editorState
    })
  }

  onEditorChange = (editorContent) => {   //编辑器内容的状态
    this.setState({
      editorContent
    })
  }

  // 初始化商品分类菜单
  initOptions = async (categorys) => {
    // 根据分类生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, // 通过isLeaf判断是否有子集
    }))
    // 如果是一个二级分类商品的更新
    const {isUpdate, product} = this
    const {pCategoryId} = product
    if (isUpdate && pCategoryId !== '0') {
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 找到当前商品对应的一级option对象
      const targetOption = options.find(option => option.value === pCategoryId)
      // 关联对应的一级option上
      targetOption.children = childOptions
    }
    // 更新options状态
    this.setState({
      options
    })
  }

  // 异步获取一级/二级分类列表并显示，async函数的返回值是一个新的promise对象，promise的结果和值由async的结果来决定
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') { // 如果是一级分类列表
        this.initOptions(categorys)
      } else { // 二级列表
        return categorys  // 返回二级列表，当前async函数返回的promsie就会成功且value为categorys
      }
    }
  }

  // 加载下一级列表的回调函数
  loadData = async selectedOptions => {
    // 得到选择的option对象
    const targetOption = selectedOptions[0]
    // 显示loading
    targetOption.loading = true
    // 根据选中的分类，请求获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value)
    // 隐藏loading
    targetOption.loading = false
    // 二级分类数组有数据
    if (subCategorys && subCategorys.length > 0) {
      // 生成一个二级列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 关联到当前option上
      targetOption.children = childOptions
    } else { // 当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }
    // 更新options状态
    this.setState({
      options: [...this.state.options],
    })
  }

  // 执行异步任务：发异步ajax请求
  componentDidMount() {
    // 异步获取一级/二级分类列表并显示
    this.getCategorys('0')
  }

  // 为第一次render()准备数据
  componentWillMount() {
    // 取出携带的state
    const product = this.props.location.state  // 添加无值修改有值
    // 保存是否是更新的标识
    this.isUpdate = !!product
    // 保存商品(如果没有保存为{})
    this.product = product || {}
  }

  render() {
    const {isUpdate, product} = this
    const {pCategoryId, categoryId} = product
    const {loading, imageUrl, editorState, editorContent} = this.state;

    // 用来接收级联分类ID的数组
    const categoryIds = []

    if (isUpdate) { // 商品是一个一级分类的商品
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else { // 商品是一个二级分类的商品
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined/> : <PlusOutlined/>}
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );

    // 顶部左侧标题
    const title = (
      <span>
          <ArrowLeftOutlined style={{color: "green", marginRight: 20}} onClick={() => this.props.history.goBack()}/>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    // 提交
    const onFinish = async values => {
      // console.log('Success:', values);
      // 收集输入的数据
      const {name, desc, price, categoryIds} = values
      let pCategoryId, categoryId
      if (categoryIds.length === 1) {
        pCategoryId = '0'
        categoryId = categoryIds[0]
      } else {
        pCategoryId = categoryIds[0]
        categoryId = categoryIds[1]
      }
      // 获取富文本框内容
      let detail = ""
      for (let i = 0; i < this.state.editorContent.blocks.length; i++) {
        detail += this.state.editorContent.blocks[i].text
        console.log(i, detail);
      }
      // 将收集到的数据封装成product对象
      const product = {name, desc, price, pCategoryId, categoryId, detail}
      console.log(name, desc, price, pCategoryId, categoryId, detail);
      // 如果是更新则需要添加_id
      if (this.isUpdate) {
        product._id = this.product._id
      }
      // 调用接口请求函数去添加/更新
      const result = await reqAddOrUpdateProduct(product)
      // 根据结果提示
      if (result.status === 0) {
        message.success(`${this.isUpdate ? '更新' : '添加'}商品成功`)
        this.props.history.goBack()
      } else {
        message.error(`${this.isUpdate ? '更新' : '添加'}商品失败`)
      }
    };

    return (
      <Card title={title} style={{height: 800}}>
        <Form ref={this.formRef} onFinish={onFinish}>
          <Form.Item name="name" label="商品名称：">
            <Input placeholder="请输入商品名称" style={{width: 400}} defaultValue={product.name}/>
          </Form.Item>
          <Form.Item name="desc" label="商品描述：">
            <Input placeholder="请输入商品描述" style={{width: 400}} defaultValue={product.desc}/>
          </Form.Item>
          <Form.Item name="price" label="商品价格：">
            <Input placeholder="请输入商品价格" style={{width: 400}} addonAfter="元" defaultValue={product.price}/>
          </Form.Item>
          <Form.Item name="categoryIds" label="商品分类：">
            <Cascader options={this.state.options} loadData={this.loadData} placeholder="请选择商品分类" style={{width: 400}}/>
          </Form.Item>
          <Form.Item label="商品图片：">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/manage/img/upload"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="商品详情：">
            <div>
              <Editor
                editorState={editorState}
                editorStyle={{border: '1px solid', height: 180}}
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onEditorChange}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </Form.Item>
          <Form.Item style={{marginTop: 50, textAlign: "center"}}>
            <Button type='primary' htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}