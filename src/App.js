import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import './assets/css/base.less';
import './App.css';
// import AddTodo from './container/AddTodo';
// import VisibleTodoList from './container/VisibleTodoList';
import Login from './container/login/login';
import Home from './container/home';
import errorPage from './container/error/index';

// 进入路由的判断
const isLogin = (nextState, replaceState) => {
  if (nextState.location.query && nextState.location.query.ticket) {
    // 如果url自带ticket
    sessionStorage.setItem('token', 'ticket');
  }
  if (nextState.location.query && nextState.location.query.key) {
    // 如果url自带key
    sessionStorage.setItem('token', 'key');
  }
  const token = sessionStorage.getItem('token');
  if (!token) {
    // 没有token，那就返回首页
    replaceState('/login');
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Router>
            <Switch>
              <Route exact path="/" onEnter={isLogin} render={() => <Redirect to="/login" push />} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/404" component={errorPage} />
              <Route component={errorPage} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
