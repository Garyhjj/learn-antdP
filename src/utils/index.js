import * as moment from 'moment';

/**
 * 对能改变数组的方法添加钩子函数
 *
 * @param {any[]} array
 */
export function bindEventForArray(array, cb) {
  let fun = ['push', 'pop', 'sort', 'reverse', 'unshift', 'shift', 'splice'];
  fun.forEach(item => {
    let _prototype = Array.prototype[item];
    let that = this;
    array[item] = function () {
      let new_value = _prototype.apply(this, arguments);
      cb();
      return new_value;
    };
  });
}

/**
 *  节流，限制事件的触发频率
 *
 * @param {*} 方法
 * @param {Object} 上下文
 * @param {any[]} 需要传入的参数
 * @param {number} [during=100] 间隔的时间
 */
export const throttle = (
  method,
  context,
  args = [],
  during = 200,
) => {
  clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(context, ...args);
  }, during);
  return method.tId;
};

export const replaceQuery = (url, query, user) => {
  const prefix = '*';
  if (url && query) {
    // tslint:disable-next-line:forin
    for (let prop in query) {
      const queryVal = query[prop];
      url = url.replace(
        `{${prop}}`,
        queryVal || queryVal === 0 ? queryVal : '',
      );
    }
    if (user) {
      // tslint:disable-next-line:forin
      for (let prop in user) {
        const userVal = user[prop];
        url = url.replace(
          `{${prefix + prop}}`,
          userVal || userVal === 0 ? userVal : '',
        );
      }
    }
    url = url.replace(/\{\w+\}/g, '');
  }

  return url;
};
export const stringify = d => {
  if (typeof d === 'object') {
    return JSON.stringify(d);
  } else {
    return d;
  }
};
export const parse = d => {
  if (typeof d === 'string' && d) {
    return JSON.parse(d);
  } else {
    return d;
  }
};
export const deepClone = d => {
  if (typeof d === 'object') {
    return JSON.parse(JSON.stringify(d));
  } else {
    return d;
  }
};
export const isArray = ar => {
  return Object.prototype.toString.call(ar) === '[object Array]';
};
export const isDate = date => {
  return moment(date).isValid();
};
export const isNumber = num => {
  // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
  // and other non-number values as NaN, where Number just uses 0) but it considers the string
  // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
  return !isNaN(parseFloat(num)) && !isNaN(Number(num));
};
export const isFunction = fn => typeof fn === 'function';
export const isPlainObject = o => typeof o === 'object' && o;
export const isUndefined = (obj) =>
  typeof obj === 'undefined';
export const isNil = (obj) => isUndefined(obj) || obj === null;
export const sortUtils = {
  byCharCode: (a, b, isAscend = true) => {
    a = a + '';
    b = b + '';
    const res = a > b ? 1 : a === b ? 0 : -1;
    return isAscend ? res : -res;
  },
  byDate: (a, b, isAscend = true, format) => {
    const toDateA = moment(a, format);
    const toDateB = moment(b, format);
    const isValida = toDateA.isValid(),
      isValidb = toDateB.isValid();
    let res;
    if (!isValida && !isValidb) {
      return sortUtils.byCharCode(a, b, isAscend);
    } else if (isValida && !isValidb) {
      res = 1;
    } else if (!isValida && isValidb) {
      res = -1;
    } else {
      res = toDateA.toDate().getTime() - toDateB.toDate().getTime();
    }
    return isAscend ? res : -res;
  },
  byTime: (
    a,
    b,
    isAscend = true,
    format = 'HH:mm:ss',
  ) => {
    const toDateA = moment('2018-01-01T ' + a, 'YYYY-MM-DDT ' + format);
    const toDateB = moment('2018-01-01T ' + b, 'YYYY-MM-DDT ' + format);
    const isValida = toDateA.isValid(),
      isValidb = toDateB.isValid();
    let res;
    if (!isValida && !isValidb) {
      return sortUtils.byCharCode(a, b, isAscend);
    } else if (isValida && !isValidb) {
      res = 1;
    } else if (!isValida && isValidb) {
      res = -1;
    } else {
      res = toDateA.toDate().getTime() - toDateB.toDate().getTime();
    }
    return isAscend ? res : -res;
  },
  byNumber: (a, b, isAscend = true) => {
    const isValida = isNumber(a),
      isValidb = isNumber(b);
    let res;
    if (!isValida && !isValidb) {
      return sortUtils.byCharCode(a, b, isAscend);
    } else if (isValida && !isValidb) {
      res = 1;
    } else if (!isValida && isValidb) {
      res = -1;
    } else {
      res = Number(a) - Number(b);
    }
    return isAscend ? res : -res;
  },
};

export const copyToClipboard = (value) => {
  const promise = new Promise(
    (resolve, reject) => {
      let copyTextArea = null;
      try {
        copyTextArea = document.createElement('textarea');
        copyTextArea.style.height = '0px';
        copyTextArea.style.opacity = '0';
        copyTextArea.style.width = '0px';
        document.body.appendChild(copyTextArea);
        copyTextArea.value = value;
        copyTextArea.select();
        document.execCommand('copy');
        resolve(value);
      } finally {
        if (copyTextArea && copyTextArea.parentNode) {
          copyTextArea.parentNode.removeChild(copyTextArea);
        }
      }
    },
  );
  return promise;
};

export function arrayClassifyByOne(target, prop) {
  // tslint:disable-next-line:curly
  if (!Array.isArray(target)) return null;
  let out = {};
  target.forEach(t => {
    const val = t[prop] || 'null';
    out[val] = out[val] || [];
    out[val].push(t);
  });
  return out;
}
