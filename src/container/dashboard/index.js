/**
 * 首页
 */

import React, { Component } from 'react';
import BreadcrumbCom from '../../components/BreadcrumbCom';

import ChartCom from '../../components/charts/ChartCom';
import './index.less';

class HomeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'default',
      loading: false,
      iconLoading: false,
      // 柱状图
      barOption: {
        title: { text: '公司人员每日总数' },
        tooltip: {},
        xAxis: {
          data: ['4-01', '4-02', '4-03', '4-04', '4-05', '4-06']
        },
        yAxis: {},
        series: [
          {
            name: '总人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      // 折线图
      lineOption: {
        title: { text: '公司人员每月总数' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [20, 32, 41, 44, 90, 130, 120, 100, 120, 140, 150, 150],
            type: 'line'
          }
        ]
      },
      // 折线图
      lineOnOption: {
        title: { text: '公司每月入职人数' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [20, 32, 41, 44, 90, 130, 120, 100, 120, 140, 150, 150],
            type: 'line'
          }
        ]
      },
      // 折线图
      lineOffOption: {
        title: { text: '公司每月离职人数' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [20, 32, 41, 44, 90, 130, 120, 100, 120, 140, 150, 150],
            type: 'line'
          }
        ]
      },
      // 饼图
      pieOption: {
        title: {
          text: '人员流动情况',
          subtext: '基本比率',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['在职', '入职', '离职', '待入职', '待离职']
        },
        series: [
          {
            name: '人员流动',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{ value: 115, name: '在职' }, { value: 10, name: '入职' }, { value: 4, name: '离职' }, { value: 5, name: '待入职' }, { value: 8, name: '待离职' }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      // 雷达图
      radarOption: {
        title: {
          text: '目前入职、离职基本情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'center',
          data: ['目前入职、离职基本情况']
        },
        radar: [
          {
            indicator: [{ text: '在职', max: 100 }, { text: '离职', max: 100 }, { text: '待入职', max: 100 }, { text: '待离职', max: 100 }],
            center: ['50%', '50%'],
            radius: 80
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: { normal: { areaStyle: { type: 'default' }}},
            data: [
              {
                value: [60, 3, 5, 4],
                name: '目前入职、离职'
              }
            ]
          }
        ]
      }
    };
  }

  render() {
    const BreadcrumbData = [
      {
        path: '/home',
        name: '首页'
      }
    ];
    return (
      <div className="index-content">
        <div className="content">
          <div className="content-header border-box">
            <BreadcrumbCom BreadcrumbData={BreadcrumbData} />
          </div>
          <div className="content-body m-t-15">
            <div className="content-body-flex flex flex-wrap">
              <ChartCom option={this.state.barOption} index="0" />
              <ChartCom option={this.state.lineOption} index="1" width={640} height={400} />
              <ChartCom option={this.state.lineOnOption} index="2" width={640} height={400} />
              <ChartCom option={this.state.lineOffOption} index="3" width={640} height={400} />
              <ChartCom option={this.state.pieOption} index="4" />
              <ChartCom option={this.state.radarOption} index="5" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeIndex;
