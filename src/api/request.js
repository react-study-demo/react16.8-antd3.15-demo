import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

let local = 'http://127.0.0.1:7001' || window.location.origin;
if (local.indexOf('localhost') !== -1) {
  local = 'http://127.0.0.1:7001';
}

// 获取 token
let token;
if (localStorage.getItem('token')) {
  token = localStorage.getItem('token');
}

// 创建axios 实例
const service = axios.create({
  baseURL: local, // api 的base_url
  timeout: 20000 // 请求超时时间
  // withCredentials: true // 使用 withCredentials 发送跨域请求凭据，请求头携带cookies
});

// Access-Control-Allow-Origin 字段必须指定域名，不能为*
// Access-Control-Allow-Credentials为true

// request 拦截器
service.interceptors.request.use(
  config => {
    // 这里自定义一些 config 配置
    return config;
  },
  error => {
    //  这里处理一些请求出错的情况
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 这里处理一些 response 正常放回时的逻辑
    return res;
  },
  error => {
    // 这里处理一些 response 出错时的逻辑
    return Promise.reject(error);
  }
);

// export default service

/*
 *
 * 统一响应处理
 * @url:
 *
 */
function handleResponse(code, msg) {
  switch (code) {
    case 0:
      message.error(msg);
      break;

    default:
      break;
  }
}

/*
 *
 * 统一 get 请求方法
 * @url: 请求的 url
 * @params: 请求带的参数
 * @header: 带 token
 *
 */

export const getRequest = (url, params) => {
  params.requestProject = 'web';
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url: `${local}${url}`,
      data: {},
      params: params,
      headers: { 'content-type': 'application/x-www-form-urlencoded' } // "token": token
    })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/*
 *
 * 统一 post 请求方法
 * url: 请求的 url
 * @params: 请求带的参数
 * @header:
 *
 */

export const postRequest = (url, params) => {
  params.requestProject = 'web';
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: `${local}${url}`,
      data: qs.stringify(params),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const postJsonRequest = (url, params) => {
  params.requestProject = 'web';
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: `${local}${url}`,
      data: '{}',
      params: params,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    })
      .then(res => {
        if (res.data.errorCode !== 1) {
          resolve(res);
          handleResponse(res.errorCode, res.message);
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

/*
 * method: 'post'
 * 'Content-Type': 'application/json;charset=UTF-8'
 * @data: params
 * @requestProject: 'web'
 *
 */

export const postJson = (url, params) => {
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: `${local}${url}`,
      data: params,
      params: { requestProject: 'web' },
      headers: { 'Content-Type': 'application/json;charset=UTF-8', token: token }
    })
      .then(res => {
        if (res.code === 0) {
          handleResponse(res.code, res.message);
          reject(res);
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

/*
 * method: 'post'
 * @data: params
 *
 */
export const postForm = (url, params) => {
  params.requestProject = 'web';
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: `${local}${url}`,
      data: params,
      headers: {}
    })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
