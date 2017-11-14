import { Loading,Message  } from 'element-ui';
import route from "../router/index.js"

var root = 'https://www.easy-mock.com/mock/59ae062ce0dc6633419c7e16/bms';
var loadinginstace;

var axios = require('axios')
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure) {
  loadinginstace = Loading.service({ target: "#contentRigh"})
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
  .then(function (res) {
    if (res.data.code === 1) {
      loadinginstace.close()
      if (success) {
        success(res.data)
      }
    } else {
      loadinginstace.close()
      if (failure) {
        failure(res.data)
      } else {
        // window.alert('error: ' + JSON.stringify(res.data))
        if(res.data.Message=="请先登录"){
          route.push("/");
          $(".modal-backdrop").fadeOut("fast")
        }
        Message.error({
          showClose:true,
          message:res.data.Message,
          duration:2000,
          type: 'error'
        })
      }
    }
  })
  .catch(function (err) {
    let res = err;
    if (res) {
      // window.alert('api error, HTTP CODE: ' + res.status);
      if(res.data==undefined){
          loadinginstace.close();
          Message.error({
            showClose:true,
            message:"网络异常，请刷新浏览器重试！",
            duration:1500,
            type: 'error'
          })
        }else{
          loadinginstace.close();
          let err=JSON.stringify(res.message);
          Message.error({
            showClose:true,
            message:err,
            duration:1500,
            type: 'error'
          })
        }
      return
    }
  })
}

export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}