import COS from 'cos-js-sdk-v5'
import { judgeEnvironment } from '@/utils/utils'
import { baseUrl } from '@/api/config'

let name: string = judgeEnvironment()

// 初始化cos
export const cos = new COS({
    // getAuthorization 必选参数
    getAuthorization: function (options, callback) {
        // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
        // 异步获取临时密钥
        // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
        let url = baseUrl[name] + '/cos/getcoskey'; // url 替换成您自己的后端服务
        const xhr = new XMLHttpRequest();
        let data: any = null;
        let credentials: any = null;
        xhr.open('GET', url, true);
        xhr.onload = function (e: any) {
            try {
                let res = JSON.parse(e.target.responseText);
                data = res.data
                credentials = data.credentials;
            } catch (e) {
            }
            if (!data || !credentials) {
                return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
            };
            callback({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                SecurityToken: credentials.sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
            });
        };
        xhr.send();
    }
});

// 下载腾讯云文件
export const getDownloadUrl = (key: string) => {
    return new Promise((resolve, reject) => {
        cos.getObjectUrl({
            Bucket: 'sparksisland-1316644977', /* 填写自己的 bucket，必须字段 */
            Region: 'ap-nanjing',     /* 存储桶所在地域，必须字段 */
            Key: key,              /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        }, function (err, data) {
            if (err) return console.log(err);
            const downloadUrl = data.Url;
            /* 通过指定 response-content-disposition=attachment 实现强制下载 */
            // const downloadUrl = data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=attachment';
            /* 可拼接 filename 来实现下载时重命名 */
            /* downloadUrl += ';filename=myname'; */
            // （推荐使用 window.open()方式）这里是新窗口打开 url，如果需要在当前窗口打开，可以使用隐藏的 iframe 下载，或使用 a 标签 download 属性协助下载
            // return downloadUrl
            console.log('downloadUrl', downloadUrl);
            // window.open(downloadUrl);
            resolve(downloadUrl)
        });
    });

    // return url
}