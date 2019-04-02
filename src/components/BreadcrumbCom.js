/**
 * 面包屑封装
 */
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
/* eslint-disables */
class BreadcrumbCom extends Component {
  render() {
    return (
      <span>
        <Breadcrumb style={{ margin: '12px 0' }}>
          {
            this.props.BreadcrumbData.map((item, index) => {
              return (
                <Breadcrumb.Item key={index}>
                  <Link to={item.path}>{item.name}</Link>
                </Breadcrumb.Item>
              );
            })
          }
        </Breadcrumb>
      </span>
    );
  }
}

export default BreadcrumbCom;
