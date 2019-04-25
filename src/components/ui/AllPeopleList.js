import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import BreadcrumbCom from '../BreadcrumbCom';

class People extends Component {
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
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: '头像',
        dataIndex: 'photo',
        key: 'photo',
        render: text => <img src={text} />
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex'
      },
      {
        title: '手机号',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '入职时间',
        dataIndex: 'hiredate',
        key: 'hiredate'
      },
      {
        title: '标签',
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
        title: '操作',
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
        photo: 'https://avatars0.githubusercontent.com/u/17672815?s=40&v=4',
        sex: 1,
        phoneNumber: '13003343567',
        age: 32,
        address: 'New York No. 1 Lake Park',
        hiredate: '2019-04-23',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        photo: 'https://avatars0.githubusercontent.com/u/17672815?s=40&v=4',
        sex: 1,
        phoneNumber: '13003343567',
        age: 42,
        address: 'London No. 1 Lake Park',
        hiredate: '2019-04-23',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        photo: 'https://avatars0.githubusercontent.com/u/17672815?s=40&v=4',
        sex: 1,
        phoneNumber: '13003343567',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        hiredate: '2019-04-23',
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

export default People;
