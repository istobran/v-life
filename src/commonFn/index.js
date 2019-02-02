import MD5 from 'js-md5';
import Axios from 'axios';

window.axios = Axios.create({
  baseURL: 'http://127.0.0.1:8360/',
  timeout: 1e3,
});

window.Tool = {
  hash: MD5.hex,
};

/**
 * 全局请求方法
 * @param  {String} url     请求url
 * @param  {Object} req     请求body数据
 * @param  {Function} scb   成功的回调 success callback
 * @param  {String} method  请求方式
 * @param  {Function} ecb   失败的回调 error callback
 */
window.$ajax = (url, req, scb, method = 'post', ecb) => {
  axios[method](url, req).then((resp) => {
    if (resp.data.errno === 0) {
      scb && scb();
    } else {
      ecb && ecb();
    }
  }).catch((err) => {
    G.warningGo('网络出错');
  });
};

export default window.Tool;
