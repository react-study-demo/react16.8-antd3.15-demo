// 防抖
export function debounce(fn, delay) {
  let delay = delay || 200;
  let timer;
  // console.log(fn)
  return function() {
    let that = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(that, args);
    }, delay);
  };
}
// 节流
export function throttle(fn, interval) {
  let last;
  let timer;
  let interval = interval || 200;
  return function() {
    let that = this;
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(that, args);
      }, interval);
    } else {
      last = now;
      fn.apply(that, args);
    }
  };
}

/**
 * 手机号格式化
 * @param {String} phone
 */
export function formatPhone(phone) {
  phone = phone.toString();
  return phone.substr(0, 3) + '****' + phone.substr(7, 11);
}

function formatDig(num) {
  return num > 9 ? '' + num : '0' + num;
}
export function formatDate(time) {
  let now = new Date(time);
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let data = year + '-' + formatDig(month) + '-' + formatDig(date) + ' ' + formatDig(hour) + ':' + formatDig(minute) + ':' + formatDig(second);
  return data;
}

/**
 * 一个汉字算两个字符,一个英文字母或数字算一个字符
 */
export function getByteLen(val) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    let a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/gi) != null) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

/**
 * 一个汉字算一个字,一个英文字母或数字算半个字
 */
export function getZhLen(val) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    let a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/gi) != null) {
      len += 1;
    } else {
      len += 0.5;
    }
  }
  return Math.ceil(len);
}

/**
 * 限制字数用, 一个汉字算一个字,两个英文/字母算一个字
 */
export function getByteVal(val, max) {
  let returnValue = '';
  let byteValLen = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) byteValLen += 1;
    else byteValLen += 0.5;
    if (byteValLen > max) break;
    returnValue += val[i];
  }
  return returnValue;
}

/**
 * 限制字符数用, 一个汉字算两个字符,一个英文/字母算一个字符
 */
export function getCharVal(val, max) {
  let returnValue = '';
  let byteValLen = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) byteValLen += 2;
    else byteValLen += 1;
    if (byteValLen > max) break;
    returnValue += val[i];
  }
  return returnValue;
}

/**
 * 正则校验,校验非负数字
 */
export function regPo(val) {
  let regTest = /^\d+(\.\d+)?$/;
  return regTest.test(val);
}


