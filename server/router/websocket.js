var ws = require('nodejs-websocket');
var server = ws.createServer(function(socket){
// 事件名称为text(读取字符串时，就叫做text)，读取客户端传来的字符串
    socket.on('text', function(obj) {
　　     // 在控制台输出前端传来的消息　　
        console.log(obj);
        //向前端回复消息
        socket.sendText(obj);
    });
}).listen(3001); 
console.log("websocket listen 3001");