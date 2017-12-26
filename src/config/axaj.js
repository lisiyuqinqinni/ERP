import Axios from 'axios';
import qs from 'qs';

Axios.defaults.baseURL = 'http://erp.ourkyj.com/cougaerp/'

let formPost = Axios.create({
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = qs.stringify(data)
      return data
    }]
})
let imgPost = Axios.create({
    baseURL: 'http://erp.ourkyj.com/cougafile/file/',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = qs.stringify(data)
      return data
    }]
})
let jsonPost = Axios.create({
    headers:{
      'Content-Type':'application/json; charset=UTF-8',
    },
    responseType: 'json',
    withCredentials: true,
    crossDomain:true,
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = JSON.stringify(qs.parse(data))
      return data
    }]
})
let arrPost = Axios.create({
    headers:{
      'Content-Type':'application/json; charset=UTF-8',
    },
    responseType: 'json',
    withCredentials: true,
    crossDomain:true,
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data=qs.parse(data)
      let arr = []
      let i = 0
      while (data[i]){
        arr[i] = data[i]
        i++
      }
      data = JSON.stringify(arr)
      return data
    }]
})

export {formPost, imgPost, jsonPost, arrPost}
