## Axios
* Ajax請求庫

1. Axios-api
2. Axios源碼
3. Axios仿寫

## 前置知識
* Promise
* AJAX

游覽器端 發送AJAX請求（XMLHttpRequest）
Nodejs 向遠端 發送 http請求

Request Config
{
    url:,
    Method:,
    baseURL:,
    transformRequest:,
    transformResponse:,
    headers:,
    params:,
    paramsSerializer:,
    auth:,
    responseType:,
    responseEncoding:,
    xsrfCookieName:,
    xsrfHeaderName:,
    onUploadProgress:,
    onDownloadProgress:,
    validateStatus:,
    maxRedirects:,跳轉次數
    socketPath:,
    httpAgent:,
    httpsAgent:,
    Proxy:,中間代理
    cancelToken:,
    decompress:,解壓
}

## 攔截器
* 請求
 
* 響應

## Axios源碼
* axios() 


## axios()發送請求步驟
1. 聲明構造函數
function Axios(){}
Axios.prototype.request = function(config){}

2. dispatchRequest 函數
function dispatchRequest(config){}

3. xhrAdapter適配器
function xhrAdapter(config){}

4. 創建axios函數
let axios = Axios.prototype,request.bind(null);
axios({ })