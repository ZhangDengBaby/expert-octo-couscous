//请求方法封装
import axios from './request'

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export const get = (url: string, params = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}


/**
* 封装post请求
* @param url
* @param data
* @returns {Promise}
*/
export const post = (url: string, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}
