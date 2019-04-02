/**
 * 首页
 */

import React, { Component } from 'react';

class HomeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'default',
      loading: false,
      iconLoading: false
    };
  }

  render() {
    return (
      <div>
        <div className="content">homeindex</div>
      </div>
    );
  }
}

export default HomeIndex;
