// @ts-ignore
import axios from 'axios'
import {ElNotifcication, ElMessageBox, ElMessage, ElLoading} from 'element-plus'

import {getToken} from '@/utils/auth'

import errorCode from '@/utils/errorCode'

import {tansParams, blobValidate} from '@/utils/ruoyi'
import cache from '@/plugin/cache'

import {saveAs} from 'file-saver'

import useUserStore from '@/store/modules/user'


let downloadingInstance;


export let  isRelogin = {show: false}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  const withToken = (config.headers || {}).withToken

  const isRepeatSubmit = (config.headers || {}).repeatSubmit == false

  if(getToken() && withToken) {
    config.headers['Authorization'] = 'Bearer' + getToken()
  }

  if(config.method === 'get' && config.params ) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0,-1)
    config.params = {}
    config.url = url
  }

  if(!isRepeatSubmit && (config.method === 'post' || config.method === 'put') ){
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }

    const requestSize = Object.keys(JSON.stringify(requestObj)).length
    const limitSize = 5 * 1024 * 1024

    if(requestSize > limitSize) {
      console.warn(`${config.url}: 请求数据大小超出限制`)
      return config
    }
    const sessionObj  = cache.session.getJSON('sessionObj')
    if(!sessionObj) {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const { url , data, time} = sessionObj
      const interval = 1000
      if( data === requestObj.data && requestObj.time - time < interval && url === requestObj.url) {
        const message = '请勿重复提交'
        console.warn(`${url}: ${message}`)
        return Promise.reject(new Error(message))
      } else {
          cache.session.setJSON('sessionObj', requestObj)
      }
    }

  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})


service.interceptors.response.use(res => {
  const  code = res.data.code || 200
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  
  if(res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }

  if(code === 401) {
    if(!isRelogin.show) {
      isRelogin.show = true
      ElMessage.confirm('登录状态过期，请重新登录')
      isRelogin.show = false;
      useUserStore().logout().then(() => {
        location.href = '/'
      }).catch( () => {
        isRelogin.show =false;
      })

    }

  } else if ( code === 500) {
    ElMessage({message:msg, type: 'error'})
    return Promise.reject(new Error(msg))
  } else if (code === 601) {
    ElMessage({message: msg, type: 'warning'})
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    ElNotifcication.error({title: msg})
    return Promise.reject('error')
  } else {
    return Promise.resolve(res.data)
  }
}, error => {
  console.log('error' + error)
   let {message} = error
  if(message == 'Network Error') {
    message = '后端接口异常'
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时'
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message.substr(message.length -3) + "异常"
  }
  ElMessage({mesage: message, type: 'error', duration: 5 * 1000})
  return Promise.reject(error)
})


export function download(url,params, filename, config) {
  return service.post(url, params, {
    transformRequest: [(params) => { return tansParams(params)}],
    headers: {'Content-Type': 'application/x-www-from-urlencoded'},
    responseType: 'blob',
    ...config
  }).then(async (data) => {
    const isBlob = blobValidate(data)
    if(isBlob) {
      const blob = new Blob([data])
      saveAs(blob,filename)
    } else {
      const resText = await data.text()
      const resObj = JSON.parse(resText)
      const errorMsg = errorCode[resObj.code] || resObj.msg || errorCode['default']
      ElMessage.error(errorMsg)

    }

  })
}