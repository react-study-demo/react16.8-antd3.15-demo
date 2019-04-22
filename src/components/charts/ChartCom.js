/**
 * echarts 封装
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入折线图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/radar';

// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';

// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';

// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';

// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';

// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

/* eslint-disables */
class ChartCom extends Component {

  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    let divs = document.getElementsByClassName('main-chart');
    let myChart = echarts.init(divs[this.props.index]);
    // 指定图表的配置项和数据
    // 绘制图表
    myChart.setOption(this.props.option);
  }

  render() {
    return (
      <div className="charts-cell p-t-10 main-chart m-b-15" id="main" style={{ width: this.props.width, height: this.props.height }}></div>
    );
  }
}

ChartCom.propTypes = {
  hideConponent: PropTypes.func,
  option: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

ChartCom.defaultProps = {
  width: 400,
  height: 400
};

export default ChartCom;
