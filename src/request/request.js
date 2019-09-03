import axios from 'axios'
import HttpErrorParser from './error'
// import { stringify } from 'querystring'
// import TransForms from './transforms'

const defaultRequestConfig = {
    method: "GET",
    data: {},
    dataType: "json",
    url: "",
    headers: {
        
    },
    responseType: "json"
}

function createRequest() {
    return axios.create({
        timeout: 10000,
        headers: {
            // "Authentication":localStorage.getItem("Authentication")
            
        }
    })
}

function request(url, config) {
    let {
        data,
        param,
        method,
        headers,
        responseType
    } = config || defaultRequestConfig;

    if (!method) {
        method = "get"
    }
    method = method.toLowerCase()
    const instance = createRequest()
    if (method === 'get') {
        return instance[method](url,{
            params: param || {},
            headers: {
                'lock-opener': '4854727301801135',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: responseType ? responseType : 'json',
            // paramsSerializer:(params)=>{
            //     return stringify(params)
            // },
            // transformResponse:(data)=>{
            //     return TransForms[dataType](data)
            // }
        }).then(response => {
            const {
                data,
                status
            } = response;
            if (status !== 200) {
                HttpErrorParser(status)
                return null
            } else {
                return data
            }
        })
    } else {
        return instance[method](url, data, {
            params: param || {},
            headers: {
                'lock-opener': '4854727301801135',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: responseType ? responseType : 'json',
            // paramsSerializer:(params)=>{
            //     return stringify(params)
            // },
            // transformResponse:(data)=>{
            //     return TransForms[dataType](data)
            // }
        }).then(response => {
            const {
                data,
                status
            } = response;
            if (status !== 200) {
                HttpErrorParser(status)
                return null
            } else {
                return data
            }
        })
    }

}


export default request