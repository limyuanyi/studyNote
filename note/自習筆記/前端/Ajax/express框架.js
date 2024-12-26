// express框架

//1.引入express
const express =  require('express');


//2.創建應用對象
const app = express();

//3.創建路由器規劃

//get
app.get('/server',(request,response)=>{
    //設置響應頭  設置允許跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //設置響應體
    response.send('HELLO AJAX');
});

//post
app.post('/server',(request,response)=>{
    //設置響應頭  設置允許跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //設置響應體
    response.send('HELLO AJAX POST');
});

//4.監聽端口啓動服務
app.listen(8000,()=>{
    console.log('服務器已經啓動，端口監聽中....')
})