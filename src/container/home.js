import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import ChildRoutes from '../router/index.js';
import AsideCom from '../components/AsideCom.js';
import './home.less';
import logo from '../assets/images/account_box.png';

const { Header, Content, Footer } = Layout;

class homePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  handleClick(e) {
    const { history } = this.props;
    history.push('/');
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div className="home-container">
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className={classnames('logo', { logoCollapsed: this.state.collapsed })}>
              <img src={logo} />
            </div>
            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle.bind(this)} />
            <Menu className="head-menu" theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
              <Menu.Item key="1">home</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <AsideCom collapsed={this.state.collapsed} />
            <Layout>
              <Content style={{ padding: '0 20px', marginTop: 64, marginLeft: this.state.collapsed ? 80 : 200 }}>
                <ChildRoutes />
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(homePage);
