import axios from 'axios'
import qs from 'qs'

export function post(url, params, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params), data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function get(url, params, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, params, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function userpost(url, params, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(params), data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

