import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import BreadcrumbCom from '../BreadcrumbCom';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'default',
      loading: false,
      iconLoading: false
    };
  }

  handleSizeChange(e) {
    this.setState({ size: e.target.value });
  }
  handleMenuClick(e) {
    console.log('click', e);
  }
  enterLoading() {
    this.setState({ loading: true });
  }
  enterIconLoading() {
    this.setState({ iconLoading: true });
  }
  render() {
    const BreadcrumbData = [
      {
        path: '/home',
        name: '首页'
      },
      {
        path: '/login',
        name: '登录'
      }
    ];
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Invite {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        )
      }
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ];
    return (
      <div className="gutter-example button-demo">
        <BreadcrumbCom BreadcrumbData={BreadcrumbData} />
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Buttons;
