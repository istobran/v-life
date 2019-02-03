const API_ROOT = '/';

/**
 * 通过 XHR API 进行请求
 * @param   {String}    url      请求地址
 * @param   {Object}    params   请求参数
 * @param   {String}    method   请求方法
 * @return  {Promise}
 */
function xhrRequest(url, params, method, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.open(method, url, true);
    if (method === 'post') {
      if (contentType !== false) {
        xhr.setRequestHeader('Content-type', contentType);
      }
    }
    xhr.addEventListener('load', () => {
      if (xhr.status !== 200) {
        reject(new Error(`${xhr.status} ${xhr.statusText}`));
      }
      resolve(xhr.responseText);
    });
    xhr.addEventListener('error', reject);
    const queryParam = params instanceof FormData ? params : JSON.stringify(params);
    xhr.send(method === 'get' ? '' : queryParam);
  }).then(JSON.parse);
}

/**
 * 过滤空字符
 * @param   {Any} params 请求的参数
 * @return  {Any}        过滤完成后的结果
 */
function paramsFilter(params) {
  // 仅转换狭义的 Object，不转换 FormData 等参数，因此不用 typeof 进行判断
  if (Object.prototype.toString.call(params) === '[object Object]') {
    // 过滤 undefined
    return JSON.parse(JSON.stringify(params));
  }
  return params;
}

/**
 * 将 json 转换为 urlString
 * @param  {Object}           params    参数列表
 * @return {URLSearchParams}            转换结果
 */
function tranformObject(params) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return params;
  }
  return new URLSearchParams(params);
}

/**
 * 构造 GET 请求函数
 * @param  {String}     url   待请求的 url
 * @return {Function}         用于发起请求的函数
 */
function GET(url) {
  return function (params) {
    return xhrRequest(API_ROOT + url, paramsFilter(params), 'get');
  };
}

/**
 * 构造 POST 请求函数
 * @param  {String}   url         待请求的 url
 * @param  {Boolean}  isURLForm   是否使用表单形式提交（x-www-form-urlencoded）
 * @return {Function}             用于发起请求的函数
 */
function POST(url, isURLForm) {
  return function (params) {
    let data = paramsFilter(params);
    if (isURLForm) {
      data = tranformObject(data);
    }
    return xhrRequest(API_ROOT + url, data, 'post');
  };
}

export { GET, POST };
