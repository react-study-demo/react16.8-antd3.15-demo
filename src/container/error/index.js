import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import './index.less';

class errorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 60
    };
  }
  handleClick(e) {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="login-container">
        <div className="container container-star">
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-1" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
          <div className="star-2" />
        </div>
        <div className="container container-bird">
          <div className="bird bird-anim">
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top" />
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top" />
              </div>
            </div>
          </div>
          <div className="bird bird-anim">
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top" />
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top" />
              </div>
            </div>
          </div>
          <div className="bird bird-anim">
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top" />
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top" />
              </div>
            </div>
          </div>
          <div className="bird bird-anim">
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top" />
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top" />
              </div>
            </div>
          </div>
          <div className="bird bird-anim">
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top" />
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top" />
              </div>
            </div>
          </div>
          <div className="bird bird-anim">
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top" />
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top" />
              </div>
            </div>
          </div>
          <div className="container-title">
            <div className="title">
              <div className="number">4</div>
              <div className="moon">
                <div className="face">
                  <div className="mouth" />
                  <div className="eyes">
                    <div className="eye-left" />
                    <div className="eye-right" />
                  </div>
                </div>
              </div>
              <div className="number">4</div>
            </div>
            <div className="subtitle">哎呀。看来你拐错弯了。</div>
            <button onClick={this.handleClick.bind(this)}>返回</button>
          </div>
        </div>
      </div>
    );
  }
}

export default errorPage;
