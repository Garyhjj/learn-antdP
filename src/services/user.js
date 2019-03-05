import request, {myRequest } from '@/utils/request';
import {AesEncrypt} from '@/utils/encrypt';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

let tokenEffectTime =  1000 * 60 * 20;
const  tokenStoreName = 'tokenMes',
currentUser = 'currentUser';

export function login(data) {
  const {password,userName} = data;
  return myRequest('global/login', {
    method: 'POST',
  body: {
    password: AesEncrypt(password),
    userName: AesEncrypt(userName)
  }
  }).then((d) => {
              let user = {};
              Object.assign(user, d.User);
              user.modules = d.Modules;
              user.password = data.password;
              user.rememberPWD = data.remember;
              let expires = d.Expires;
              tokenEffectTime = expires - new Date().getTime();
              updateTokenMes(expires, d.Token);
              return {user, status: 'ok', type: 'account'};
          }
      ).catch(() => {
        return {user: {}, status: 'not ok', type: 'account'};
      });
}

function updateTokenMes(expires, token) {
  let tokenMes = {
      expires,
      token
  };
  localStorage.setItem(tokenStoreName, JSON.stringify(tokenMes));
}

export function storeUser(user) {
  localStorage.setItem(currentUser,JSON.stringify(user));
}

export function getUser() {
  const userStr = localStorage.getItem(currentUser);
  if(userStr) {
    return JSON.parse(userStr);
  }
}

function getTokenMes() {
  let tokenStr = localStorage.getItem(tokenStoreName);
  if (tokenStr) {
      let tokenMes = JSON.parse(tokenStr);
      if (typeof tokenMes === 'object') {
          return tokenMes;
      }
  }
  return null;
}

export function checkAuth() {
  let tokenMes = getTokenMes();
  return tokenMes && tokenMes.expires > new Date().getTime();
  // return true;
}




export function clearTokenMes() {
  localStorage.removeItem(this.tokenStoreName);
}