const WebSocketServer = require('ws').Server;
const WebSocket = require('ws');
const myPort = 8003;
const address = ["ws://localhost:8001","ws://localhost:8002"];
const nodeCount = 3;
const passNumber = (nodeCount - 1) / 3;
let passCount = 0;
let wss = new WebSocketServer({ port: myPort });
let socket = [];
let preparePass = submitPass = replyPass = false;

wss.on('connection', function (ws) {
    console.log('8002已启动服务');
    socket.length == 0 && connect();
    ws.on('message', function (msg) {
        //打印客户端监听的消息
        let message = JSON.parse(msg);
        console.log(message);
        eval(`${message.stage}(message.information)`);
    });
});

function connect() {
    address.forEach(item => {
        const newSocket = new WebSocket(item);
        newSocket.on('open', () => {
            console.log(`${myPort} 与 ${item} 的链接完成`);
        });
        socket.push(newSocket);
    });
}

function wait() {
    for(let i = 0; i < 1000; i++) {
    }
}

function request(information) {
    const message = {stage: "prePrepare", information};
    socket.forEach(item => {
        item.send(JSON.stringify(message));
    });
}

function prePrepare(information) {
    const message = {stage: "prepare", information};
    socket.forEach(item => {
        item.send(JSON.stringify(message));
    });
}

function prepare(information) {
    passCount++;
    wait();
    // console.log(passCount, passNumber);
    if(passCount > passNumber * 2 && !preparePass) {
        const message = {stage: "submit", information};
        socket.forEach(item => {
            item.send(JSON.stringify(message));
        });
        passCount = 0, preparePass = true, replyPass = false;
    }
}

function submit(information) {
    passCount++;
    wait();
    // console.log(passCount, passNumber);
    if(passCount > passNumber * 2 && !submitPass) {
        const message = {stage: "reply", information};
        socket.forEach(item => {
            item.send(JSON.stringify(message));
        });
        passCount = 0, submitPass = true;
    }
}

function reply(information) {
    passCount++;
    wait();
    // console.log(passCount, passNumber);
    if(passCount > passNumber && !replyPass) {
        const message = "ok";
        const replySocket = new WebSocket(information.address);
        replySocket.on('open', () => {
            console.log("开始回复成功消息");
            replySocket.send(message);
        });
        passCount = 0, replyPass = true, preparePass = submitPass = false;
    }
}

function veryfy(publicKeyArray, ringSignature, message) {
    return lrs.verify(publicKeyArray, ringSignature, message);
}