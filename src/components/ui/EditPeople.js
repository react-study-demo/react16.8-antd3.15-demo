import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import logo from '../../logo.svg';
import { Form, Icon, Input, Button, Radio, InputNumber, DatePicker, Upload, message } from 'antd';
import './people.less';
import BreadcrumbCom from '../BreadcrumbCom';
import { addPeople } from '../../api/addPeople.js';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class editPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 60,
      loading: false
    };
    this.getFieldProps = props.form.getFieldProps;
    this.getFieldError = props.form.getFieldError;
    this.isFieldValidating = props.form.isFieldValidating;
    this.validateFields = props.form.validateFields;
    this.getFieldValue = props.form.getFieldValue;
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props);

    this.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.addPeopleData(values);
      }
      // 页面重定向
      // return <Redirect to="/index" />;
    });
  }

  async addPeopleData(data) {
    let that = this;
    const { history } = that.props;
    let res = await addPeople(data);
    if (res.code) {
      history.push('/home');
    }
  }

  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, userPhote =>
        this.setState({
          // userPhote,
          loading: false
        })
      );
    }
  }

  onSuccess(ret) {
    console.log('onSuccess', ret);
    this.setState({
      userPhote: ret.url
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const BreadcrumbData = [
      {
        path: '/home',
        name: '首页'
      },
      {
        path: '',
        name: '添加员工'
      }
    ];
    const config = {
      rules: [{ type: 'object', required: true, message: '请选择入职时间' }]
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const userPhote = this.state.userPhote;
    return (
      <div className="body-container">
        <BreadcrumbCom BreadcrumbData={BreadcrumbData} />
        <Form onSubmit={this.handleSubmit.bind(this)} className="people-form">
          <Form.Item label="用户名">
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('userPass', {
              rules: [{ required: true, message: '请输入密码' }]
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('userEmail', {
              rules: [
                {
                  type: 'email',
                  message: '请输入邮箱'
                },
                {
                  required: true,
                  message: '请输入邮箱'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="头像">
            {getFieldDecorator('userPhote', {
              rules: [{ required: true, message: '请上传头像' }]
            })(
              <div>
                <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} action="//127.0.0.1:7001/upload" beforeUpload={beforeUpload} onSuccess={this.onSuccess.bind(this)} onChange={this.handleChange.bind(this)}>
                  {userPhote ? <img src={userPhote} alt="avatar" className="avatar-img" /> : uploadButton}
                </Upload>
              </div>
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phoneNumber', {
              rules: [{ required: true, message: '请输入手机号' }]
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号" />)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('userSex', {
              rules: [{ required: true, message: '请选择性别' }]
            })(
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="入职时间">{getFieldDecorator('hiredate', config)(<DatePicker />)}</Form.Item>
          <Form.Item label="年龄">{getFieldDecorator('userAge', { initialValue: 18 })(<InputNumber min={18} max={100} />)}</Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'editPeople' })(editPeople);
