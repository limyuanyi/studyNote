## Promise （ES6 引入的解決方案）
* 舊方案使用回調函數
* 問題：回調地獄
* 支持鏈式調用，解決地獄問題


# util
## 引入util模塊
const util = require('util')

## 直接進行封裝
let mineReadFile = util.promisify(original)
返回promise

## 可直接調用then
let mineReadFile('./...').then(value =>{
   
})

## Promise狀態
實例對象中的一個屬性[PromiseState]
* pending
* resolved / fullfilled
* rejected

## Promise内的resolve和reject
*改變狀態 和 設置promise對象的結果

## Promise 對象的值
實例對象中的另一個屬性 [PromiseResult]
保存著對象[成功/失敗]的結果
* resolve
* reject

## Then & catch
* catch 只能執行失敗的回調

## Promise.resolve 
* 可直接快速封裝得到返回的值
如果傳入的參數非promise類型，返回結果都爲成功promise對象
如果傳入的參數為promise類型，則參數結果決定了resolve結果

如果有一個失敗的promise，還沒有一個回調做處理，就會報錯

## Promise.reject
* same with Previous
PromiseState都爲rejected
PromiseResult為傳入的結果

## Promise.all
* 包含n個promise的數組
全部都為成功 return 成功
PromiseResult 為 n個promise傳入的值
其中之一為失敗 return 失敗
PromiseResult 為 失敗的promise的值

## Promise.race
* 包含n個promise的數組
PromiseState由第一個完成的promise決定

爲一個promise指定多個回調，回調都會執行

Q1 改變promise狀態，和指定回調函數，誰先誰后？
* 黨promise内有異步狀態，就then先執行
* 在promsie内調用resolve/reject，就先執行改變狀態

指定回調=改變狀態-執行回調

## then
1. 抛出錯誤 throw'error'
PromiseState 為 rejected
2. 返回結果是非Promise類型對象
PromiseState 為 fulfilled
PromiseResult 為 返回結果
3. 返回結果是Promise對象
PromiseState = Promise對象的返回狀態

## Promise 串接多個操作任務
* 用then來做鏈式調用，

## 異常穿透
在then的鏈式調用最後一個增加.catch()就可直接抓取異常
中間的then都取消

## Promise自定義封裝
* function Promise(excutor){}可覆蓋原本全局的Promise

## 添加then方法
* Promise.prototype.then = function(onResolved,onRejected){}

## async & await

## util可以把api轉換為promise函數
const fs = require('fs');
const util = require('util');
const f1 = util.promisify(fs.readFile);
