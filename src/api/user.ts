// axios
import request from '@/api/request'
//user api

// 登录
export const login = (params: any) => {
    return request({
        url: '/login',
        method: 'post',
        data: params
    })
}

// 注册
export const register = (params: any) => {
    return request({
        url: '/register',
        method: 'post',
        data: params
    })
}
