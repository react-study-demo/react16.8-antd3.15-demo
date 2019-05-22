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
      collapsed: false,
      nowYear: new Date().getFullYear()
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
              <Content style={{ padding: '0 20px', background: '#fff', marginTop: 64, marginLeft: this.state.collapsed ? 80 : 200 }}>
                <ChildRoutes />
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design © {this.state.nowYear} Created by
                <a href="https://github.com/fairyly">
                  <svg className="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg> fairyly
                </a>
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(homePage);
