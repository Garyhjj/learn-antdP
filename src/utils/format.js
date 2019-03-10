
import * as moment from 'moment';
import cache from './cache';
import {replaceQuery} from './';
import {getColleague} from '@/services/api';
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

const name = 'format',
  key = 'empno',
  cachedData = {},
  colleagueRequest = {};

function updateCache(c) {
  cache.update(name, key, c);
}

export function empno(target, format){
  const cache =
    cachedData;
  const tranform = (val, _format) => {
    if (typeof val !== 'object' || !val) {
      return val;
    }
    const middle = replaceQuery(_format, val);
    const last = middle
      .replace(/NO/g, val.EMPNO)
      .replace(/CH/g, val.NICK_NAME)
      .replace(/EN/g, val.USER_NAME);
    return last;
  };
  if (cache && cache[target]) {
    const val = cache[target];
    return typeof format === 'string' ? tranform(val, format) : val;
  } else {
    if (!colleagueRequest[target]) {
      colleagueRequest[target] = getColleague(target)
        .then(
         (data) => {
            if (data.length > 0) {
              const tar = data.find(
                d =>
                  d.EMPNO === target ||
                  d.NICK_NAME === target ||
                  d.USER_NAME === target,
              );
              if (!tar) {
                return target;
              }
              cache[target] = tar;
              updateCache(cache);
              return tar;
            } else {
              return target;
            }
          }
          
        ).catch((err) => target);
    }
    return colleagueRequest[target].then(val => {
      return typeof format === 'string' ? tranform(val, format) : val;
    });
  }
}

export default {
    dateFormat,
    replace,
    fetchAsync,
    empno
}