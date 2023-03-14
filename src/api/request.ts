import axios from 'axios'
import { message } from 'ant-design-vue'

// 根据环境不同引入不同api地址（可以编写不同的文件进行环境区分）
import { baseUrl} from '@/api/config'
import { getCookie, setCookie, JudgeEnvironment } from '@/utils/utils'
let name:string = JudgeEnvironment()
// create an axios instance
const service = axios.create({
    baseURL: baseUrl[name] || '', // url = base api url + request url 这是调用数据接口,公共接口url+调用接口名
    timeout: 6000 // 设置接口响应时间
})

// 设置 post、get默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.get['Content-Type'] = 'application/json'

let hide: Function | null = null
// request拦截器 request interceptor
service.interceptors.request.use(
    config => {
        hide = message.loading('A加载中...', 6)
        const token = getCookie('token')
        if (token) {
            config.headers['X-Token'] = ''
        }
        return config
    },
    error => {
        console.log(error) // for debug
        message.error('请求错误，请重试');
        return Promise.reject(error)
    }
)
// respone拦截器
service.interceptors.response.use(
    res => {
        if (hide) hide()
        if (res.status && res.status !== 200) {
            // 登录超时,重新登录
            if (res.status === 401) {
                setCookie('token', '', 0)
                location.reload()
            }
            return Promise.reject(res.data || 'error')

        } else {
            if (res.data.status !== 200) {
                message.error(res.data.message);
            };
            return Promise.resolve(res.data)
        }
    },
    error => {
        if (hide) hide()
        message.error('网络错误');
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service

