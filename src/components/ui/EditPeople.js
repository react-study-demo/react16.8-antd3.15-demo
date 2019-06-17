import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import logo from '../../logo.svg';
import moment from 'moment';
import { Form, Icon, Input, Button, Radio, InputNumber, DatePicker, Upload, message } from 'antd';
import './people.less';
import BreadcrumbCom from '../BreadcrumbCom';
import { addPeople } from '../../api/addPeople.js';
import { getOnePeople, updatePeople } from '../../api/allPeople.js';

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
      loading: false,
      userPhoto: '',
      formDatas: {
        userName: '',
        hiredate: new Date()
      }
    };
    this.getFieldProps = props.form.getFieldProps;
    this.getFieldError = props.form.getFieldError;
    this.isFieldValidating = props.form.isFieldValidating;
    this.validateFields = props.form.validateFields;
    this.getFieldValue = props.form.getFieldValue;
  }

  componentDidMount() {
    if (this.props.query.userId) {
      let userData = getOnePeople({ userId: this.props.query.userId });
      userData.then(res => {
        if (res.code) {
          this.setState({
            formDatas: res.data,
            userPhoto: res.data.userPhoto
          });
        }
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    this.validateFields((err, values) => {
      if (!err) {
        values.userPhoto = this.state.userPhoto;
        this.addPeopleData(values);
      }
      // 页面重定向
      // return <Redirect to="/index" />;
    });
  }

  async formatDate(date) {
    let dates = new Date(date);
    let year = dates.getFullYear();
    let month = dates.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = dates.getDay();
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  }

  /**
   * 提交
   */
  async addPeopleData(data) {
    let that = this;
    data.hiredate = await that.formatDate(data.hiredate);
    const { history } = that.props;
    if (that.state.formDatas.userId) {
      data.userId = that.state.formDatas.userId;
      let resUpdate = await updatePeople(data);
      if (resUpdate.code) {
        message.success('修改成功！');
        history.push('/home/AllPeopleList');
      }
      return false;
    }
    let res = await addPeople(data);
    if (res.code) {
      message.success('添加成功！');
      history.push('/home/AllPeopleList');
    }
  }

  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, userPhoto =>
        this.setState({
          // userPhoto,
          loading: false
        })
      );
    }
  }

  onSuccess(ret) {
    console.log('onSuccess', ret);
    this.setState({
      userPhoto: ret.url
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
    const userPhoto = this.state.userPhoto;
    return (
      <div className="body-container edit-form">
        <BreadcrumbCom BreadcrumbData={BreadcrumbData} />
        <Form onSubmit={this.handleSubmit.bind(this)} className="people-form">
          <Form.Item label="用户名">
            {getFieldDecorator('userName', {
              initialValue: this.state.formDatas.userName,
              rules: [{ required: true, message: '请输入用户名' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('userPass', {
              initialValue: this.state.formDatas.userPass,
              rules: [{ required: true, message: '请输入密码' }]
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('userEmail', {
              initialValue: this.state.formDatas.userEmail,
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
            {getFieldDecorator('userPhoto', {
              initialValue: this.state.formDatas.userPhoto,
              rules: [{ required: true, message: '请上传头像' }]
            })(
              <div>
                <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} action="//127.0.0.1:7001/upload" beforeUpload={beforeUpload} onSuccess={this.onSuccess.bind(this)} onChange={this.handleChange.bind(this)}>
                  {userPhoto ? <img src={userPhoto} alt="avatar" className="avatar-img" /> : uploadButton}
                </Upload>
              </div>
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phoneNumber', {
              initialValue: this.state.formDatas.phoneNumber,
              rules: [{ required: true, message: '请输入手机号' }]
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号" />)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('userSex', {
              initialValue: this.state.formDatas.userSex,
              rules: [{ required: true, message: '请选择性别' }]
            })(
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('userAddress', {
              initialValue: this.state.formDatas.userAddress,
              rules: [{ required: true, message: '请输入地址' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入地址" />)}
          </Form.Item>
          <Form.Item label="职位">
            {getFieldDecorator('job', {
              initialValue: this.state.formDatas.job,
              rules: [{ required: false, message: '请输入职位' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入职位" />)}
          </Form.Item>
          <Form.Item label="入职时间">{getFieldDecorator('hiredate', { initialValue: moment(this.state.formDatas.hiredate, 'YYYY-MM-DD') }, config)(<DatePicker />)}</Form.Item>
          <Form.Item label="年龄">{getFieldDecorator('userAge', { initialValue: this.state.formDatas.userAge })(<InputNumber min={18} max={100} />)}</Form.Item>
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
