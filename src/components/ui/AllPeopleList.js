import React, { Component } from 'react';
import { Table, Divider, Pagination, Popconfirm, message } from 'antd';
import BreadcrumbCom from '../BreadcrumbCom';
import { getPeople, delPeople } from '../../api/allPeople.js';

import './people.less';

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'default',
      loading: false,
      iconLoading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0
    };
  }

  componentDidMount() {
    this.getPeopleData();
  }

  async getPeopleData() {
    let that = this;
    let data = {
      currentPage: that.state.currentPage,
      pageSize: that.state.pageSize
    };
    let res = await getPeople(data);
    if (res.code) {
      /* eslint-disable */
      console.log(res)
      that.setState({ tableData: res.data, totalNum: res.totalNum });
    }
  }


  /* 页码变化 */
  sizeChange(current, pageSize) {
    let that = this;
    that.setState({ pageSize, currentPage: 1 });
    that.getPeopleData();
  }
  /* 当前页变化 */
  async pageChange(pageNumber) {
    let that = this;
    console.log(pageNumber);
    await that.setState({ currentPage: pageNumber });
    await that.getPeopleData();
  }

  // 编辑
  toEdit(id, e) {
    let that = this;
    const { history } = that.props;
    history.push(`/home/EditPeople?userId=${id}`);
  }

  // 删除
  confirm(id, e) {
    let that = this;
    that.deleteData({
      userId: id
    });
  }

  cancel(e) {
    console.log(e);
  }

  async deleteData(item) {
    let that = this;
    let data = {
      userId: item.userId
    };
    let res = await delPeople(data);
    if (res.code) {
      message.success('删除成功！');
      await that.getPeopleData();
    }
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
        dataIndex: 'userName',
        key: 'userName',
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: '头像',
        dataIndex: 'userPhoto',
        key: 'userPhoto',
        render: text => <img src={text} className="user-photo" />
      },
      {
        title: '性别',
        dataIndex: 'userSex',
        key: 'userSex',
        render: text => <span>{text === 0 ? '男' : '女'}</span>
      },
      {
        title: '手机号',
        dataIndex: 'userPhone',
        key: 'userPhone'
      },
      {
        title: '年龄',
        dataIndex: 'userAge',
        key: 'userAge'
      },
      {
        title: '地址',
        dataIndex: 'userAddress',
        key: 'userAddress'
      },
      {
        title: '角色',
        dataIndex: 'userRole',
        key: 'userRole',
        render: text => <span>{text === 1? '管理员' : text === 2? '人事' : '员工'}</span>
      },
      {
        title: '入职时间',
        dataIndex: 'hiredate',
        key: 'hiredate'
      },
      {
        title: '职位',
        dataIndex: 'job',
        key: 'job'
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate'
      },
      {
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate'
      },
      /* {
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
      }, */
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.toEdit.bind(this, text.userId)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除?" onConfirm={this.confirm.bind(this, text.userId)} onCancel={this.cancel.bind(this)} okText="确定" cancelText="取消">
              <a href="javascript:;" >删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    return (
      <div className="gutter-example button-demo">
        <BreadcrumbCom BreadcrumbData={BreadcrumbData} />
        <Table columns={columns} dataSource={this.state.tableData} pagination={false} />
        <Pagination showSizeChanger onShowSizeChange={this.sizeChange.bind(this)} onChange={this.pageChange.bind(this)} defaultCurrent={this.state.currentPage} total={this.state.totalNum} />
      </div>
    );
  }
}

export default People;
