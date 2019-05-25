import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import BreadcrumbCom from '../BreadcrumbCom';

import 'react-quill/dist/quill.snow.css';
import './quill.less';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      editorState: BraftEditor.createEditorState(null)
    };
  }

  // braft-editor
  async componentDidMount() {
    await this.getData();
  }

  // quill
  handleChange(value) {
    this.setState({ text: value });
  }

  // braft-editor
  async getData() {
    // 假设此处从服务端获取html格式的编辑器内容
    const htmlContent = ''; // await fetchEditorContent();
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    });
  }

  async submitContent() {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = this.state.editorState.toHTML();
    // const result = await saveEditorContent(htmlContent);
  }

  handleEditorChange(editorState) {
    this.setState({ editorState });
  }

  render() {
    const BreadcrumbData = [
      {
        path: '/home',
        name: '首页'
      },
      {
        path: '',
        name: '富文本'
      }
    ];
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        [
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote'
        ],
        [
          { 'list': 'ordered' },
          { 'list': 'bullet' },
          { 'indent': '-1' },
          { 'indent': '+1' }
        ],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
      ]
    };

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'color'
    ];
    return (
      <div className="qrcode-demo">
        <BreadcrumbCom BreadcrumbData={BreadcrumbData} />
        <ReactQuill theme="snow" modules={modules} formats={formats} value={this.state.text} onChange={this.handleChange.bind(this)} />
        <BraftEditor
          value={this.state.editorState}
          onChange={this.handleEditorChange.bind(this)}
          onSave={this.submitContent.bind(this)}
        />
      </div>
    );
  }
}

export default RichText;
