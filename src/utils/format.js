
import * as moment from 'moment';
export function replace(target, o) {
  if (target !== null && target !== void 0) {
    target = target + '';
    if (typeof o === 'object') {
      // tslint:disable-next-line:forin
      for (let prop in o) {
        target = target.replace(prop, o[prop]);
      }
    } else if (typeof o === 'string') {
      target = o.replace(/\{self\}/g, target);
    }
  }
  return target;
}

export function fetchAsync(target) {
    return new Promise(r => {
        setTimeout(() =>  {
            r(target+ 'fdgrgfg')
        },2000)
    })
}


export function dateFormat(date, toFormat, fromFormat) {
  const m = moment(date, fromFormat);
  if (m.isValid()) {
    return m.format(toFormat);
  } else {
    return date;
  }
}

export default {
    dateFormat,
    replace,
    fetchAsync
}