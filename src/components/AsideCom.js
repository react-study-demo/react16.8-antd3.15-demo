/**
 * 公共左侧菜单组件
 */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';
import routesConfig from '../router/router.config.js';

const { Sider } = Layout;

class AsideCom extends Component {
  static setMenuOpen(props) {
    const { pathname } = props.location;
    return {
      openKey: pathname.substr(0, pathname.lastIndexOf('/')),
      selectedKey: pathname,
      firstHide: false // 控制展开 SubMenu 菜单项
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed,
      openKey: '',
      selectedKey: '',
      firstHide: true // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
  }

  componentDidMount() {
    const state = AsideCom.setMenuOpen(this.props);
    this.setState({
      openKey: state.openKey,
      selectedKey: state.selectedKey,
      firstHide: state.firstHide
    });
  }

  menuClick(e) {
    this.setState({
      selectedKey: e.key
    });
    const { popoverHide } = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    popoverHide && popoverHide();
  }

  openMenu(v) {
    this.setState({
      openKey: v[v.length - 1],
      firstHide: false
    });
  }

  render() {
    const renderMenuItem = (
      item // item.route 菜单单独跳转的路由
    ) => (
      <Menu.Item key={item.key}>
        <Link to={(item.route || item.key) + (item.query || '')}>
          {item.icon && <Icon type={item.icon} />}
          <span className="nav-text">{item.title}</span>
        </Link>
      </Menu.Item>
    );

    const renderSubMenu = item => (
      <Menu.SubMenu
        key={item.key}
        title={
          <span>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
          </span>
        }
      >
        {item.subs.map(item => renderMenuItem(item))}
      </Menu.SubMenu>
    );
    return (
      <Sider trigger={null} breakpoint="lg" collapsed={this.props.collapsed} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: '64px' }}>
        {routesConfig.menus.map((item, index) => {
          return (
            <Menu theme="dark" key={index} onClick={this.menuClick.bind(this)} mode="inline" selectedKeys={[this.state.selectedKey]} openKeys={this.state.firstHide ? null : [this.state.openKey]} onOpenChange={this.openMenu.bind(this)}>
              {item.subs ? renderSubMenu(item) : renderMenuItem(item)}
            </Menu>
          );
        })}
      </Sider>
    );
  }
}

export default withRouter(AsideCom);
