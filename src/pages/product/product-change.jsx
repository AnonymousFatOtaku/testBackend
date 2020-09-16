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

import '../../assets/css/reset.css'
import './product-info.less'

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

export default class ProductChange extends Component {

  state = {
    loading: false,
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

  state = {
    showRichText: false,
    editorContent: '',
    editorState: ''
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

  render() {

    const {loading, imageUrl} = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined/> : <PlusOutlined/>}
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );

    const title = (
      <span>
          <ArrowLeftOutlined style={{color: "green", marginRight: 20}} onClick={() => this.props.history.goBack()}/>
        <span>添加商品</span>
      </span>
    )

    function onChange(value) {
      console.log(value);
    }

    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];

    const {editorState, editorContent} = this.state;

    return (
      <Card title={title} style={{height: 727}}>
        <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
          <Form.Item name="note" label="商品名称：" rules={[{}]}>
            <Input placeholder="请输入用户名" style={{width: 400}}/>
          </Form.Item>
          <Form.Item name="note" label="商品描述：" rules={[{}]}>
            <Input placeholder="请输入密码" style={{width: 400}}/>
          </Form.Item>
          <Form.Item name="note" label="商品价格：" rules={[{}]}>
            <Input placeholder="请输入手机号" style={{width: 400}} addonAfter="元"/>
          </Form.Item>
          <Form.Item name="gender" label="商品分类：" rules={[{}]}>
            <Cascader options={options} onChange={onChange} placeholder="Please select" style={{width: 400}}/>
          </Form.Item>
          <Form.Item name="note" label="商品图片：" rules={[{}]}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name="note" label="商品详情：" rules={[{}]}>
            <div style={{width: 1000}}>
              <Editor
                editorState={editorState}
                editorStyle={{border: '1px solid', height: 200}}
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onEditorChange}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}