// config.js文件用来存放后端请求接口地址
export interface Base {
  [key: string]: string | null
}
export const baseUrl:Base = {
    local: 'http://localhost:9090/spark', // 本地，实际请求定制会在vite.config.ts的proxy中统一派发
    dev: '/spark', // 开发环境
    // dev: 'http://118.89.35.95:8080'
    pro: "http://43.136.101.134/spark" //生产环境
}