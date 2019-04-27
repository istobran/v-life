import Vue from 'vue';

/**
 * 判断用户是否已经登录
 * @param  {Object} resp     响应体对象
 * @return {Object}          响应数据对象
 */
function loginFilter(resp) {
  if (resp.errno === 1000) {
    throw new Error(resp.errmsg);
  }
  return resp;
}

/**
 * 判断请求是否处理成功
 * @param  {Object} resp     响应体对象
 * @return {Object}          响应数据对象
 */
function successFilter(resp) {
  loginFilter(resp);
  if (!resp.errno === 0) {
    throw new Error(resp.msg || resp.message || resp);
  }
  return resp;
}

/**
 * 输出错误信息
 * @param {Error} err       捕获到的错误异常
 */
function errToast(err) {
  Vue.prototype.$message.error(err.message);
}

export { loginFilter, successFilter, errToast };
