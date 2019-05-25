import React, { Component } from 'react';
import BreadcrumbCom from '../BreadcrumbCom';
import QRCode from 'qrcode.react';

import './qrcode.less';

class Qrcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'default',
    };
  }
  render() {
    const BreadcrumbData = [
      {
        path: '/home',
        name: '首页'
      },
      {
        path: '',
        name: '二维码'
      }
    ];
    return (
      <div className="qrcode-demo">
        <BreadcrumbCom BreadcrumbData={BreadcrumbData} />
        <QRCode value="https://fairyly.github.io/" />,
      </div>
    );
  }
}

export default Qrcode;
