const hash = require('hash.js');
const lrs = require('lrs');

function testCreateBlockTPS(transcation) { //交易打包TPS测试
    let transactionPull = transcation;
    while(transactionPull.length > 1) {
        let transactionOne = transactionPull.shift();
        let transcationTwo = transactionPull.shift();
        let newHash = hash.sha256().update(transactionOne + transcationTwo).digest('hex');
        transactionPull.push(newHash);
    }
    return transactionPull.shift();
}

// function testSinatureTPS(publicKey, privateKey, message) {
    
// }

let arr = new Array(1000).fill("test");
let startTime = new Date().getTime();
testCreateBlockTPS(arr);
let endTime = new Date().getTime();
console.log(endTime - startTime);

//交易打包测试结束