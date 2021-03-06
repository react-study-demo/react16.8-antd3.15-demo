import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import logo from '../../logo.svg';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less';
import { login } from '../../api/login.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 60
    };
    this.getFieldProps = props.form.getFieldProps;
    this.getFieldError = props.form.getFieldError;
    this.isFieldValidating = props.form.isFieldValidating;
    this.validateFields = props.form.validateFields;
    this.getFieldValue = props.form.getFieldValue;
  }
  handleSubmit(e) {
    let that = this;
    e.preventDefault();
    console.log(this.props);

    this.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        that.toLogin(values);
      }
      // 页面重定向
      // return <Redirect to="/index" />;
    });
  }

  async toLogin(values) {
    let that = this;
    let res = await login(values);
    const { history } = that.props;
    if (res.code) {
      localStorage.setItem('token', res.token);
      history.push('/home');
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <img src={logo} className="App-logo" alt="logo" />
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'login' })(Login);
