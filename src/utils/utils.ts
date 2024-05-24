export const getCookie = (name: string) => { // 获取cookie方法
    return document.cookie.match(`[;\s+]?${name}=([^;]*)`)?.pop()
}
export const setCookie = (name: string, value: string, time: number) => { // 设置cookie方法
    let d: Date = new Date();
    d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000)); // 设置cookie到期时间，设置为0时为删除
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}
export const judgeEnvironment = (): string => { // 判断当前环境
    let urlName: string = location.hostname
    if (urlName === 'localhost') {
        return 'local'
    }
    return 'pro'
}