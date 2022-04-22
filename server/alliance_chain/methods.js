const environmental = require("./environmental.js");
const hash = require('hash.js');
const WebSocket = require('ws');
const WebSocketServer = require('ws').Server;
const serverPort = 3001;
const allCount = 3;
let receiveCount = 0, startTime = endTime = 0;
wss = new WebSocketServer({ port: serverPort });
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        receiveCount++;
        if(receiveCount >= allCount / 3 + 1) {
            endTime = new Date().getTime();
            console.log(endTime - startTime);
            receiveCount = 0;
        }
    });
});
let socket = [];
async function createBlock(sequelize) { //创建区块
    const transcationModel = require("../model/transaction.js")(sequelize);
    const blockModel = require("../model/block.js")(sequelize);
    const transcationData = await transcationModel.findAll({
        raw: true,
        where: {
            handle: false,
        }
    })
    const merkleRoot = createMerkleTree(transcationData,sequelize);
    const transcationNumber = transcationData.length;
    let blockInformation = {
        number: transcationNumber,
        timestamp: new Date().getTime(),
        size: JSON.stringify(transcationData).length,
        vision: "1.0",
        preHash: global.environmental.lastBlockId == 0 ? "null" : global.environmental.lastBlockHash,
        merkleRoot,
    }
    const blockHash = hash.sha256().update(JSON.stringify(blockInformation)).digest('hex');
    blockInformation.hash = blockHash;
    blockModel.create(blockInformation);
    consensus();
    global.environmental.blockId ++;
}

function createMerkleTree(transcationData, sequelize) {   //创建merkle树
    const transcationModel = require("../model/transaction.js")(sequelize);
    let hashArray = transcationData.map( v => {
        let transcationInformation = {
            signature: v.signature,
            receiverPublicKey: v.receiverPublicKey,
            timestamp: v.timestamp,
            handle: true,
            information: v.information,
            blockId: global.environmental.lastBlockId + 1,
        }
        const transcationHash = hash.sha256().update(JSON.stringify(transcationInformation)).digest('hex');
        transcationInformation.id = v.id;
        transcationInformation.hash = transcationHash;
        transcationModel.update(transcationInformation, {
            where:{
                id: v.id
            }
        });
        return transcationHash;
    });
    while(hashArray.length > 1) {
        let len = hashArray.length;
        while(len--) {
            if(len == 1) {
                hashArray.push(hashArray.shift());
            }
            else {
                let hash1 = hashArray.shift();
                let hash2 = hashArray.shift();
                hashArray.push(hash.sha256().update(hash1 + hash2).digest('hex'));
            }
        }
    }
    return hashArray[0];
}

async function consensus(sequelize) {  //共识
    const message = { stage: "request", information: {signature: "123", address: "ws://localhost:3001"} };
    let address = "ws://localhost:8001";
    let sendSocket = new WebSocket(address);
    startTime = new Date().getTime();
    sendSocket.on('open', () => {
        sendSocket.send(JSON.stringify(message));
    });
    
}

async function generateRingSignature(publicKey, privateKey, message, sequelize) {  //生成环签名
    const lrs = require("lrs");
    const ringNeedNumber = 5, userKey = { publicKey, privateKey }
    const keyModel = require("../model/secretKey.js")(sequelize);
    let publicKeyArray = [publicKey], allCount = (await keyModel.findAndCountAll()).count;
    let randomArray = new Array(allCount).fill(0).map((v, index) => index + 1).sort(() => Math.random() - 0.5);
    let ringNumber = 1;
    while(ringNumber < ringNeedNumber) {
        let id = randomArray.shift();
        let key = await keyModel.findOne({ where: {
            id
        }});
        if(key.publicKey == publicKey) {
            continue;
        }
        else {
            publicKeyArray.push(key.publicKey);
            ringNumber++;
        }
    }
    const ringSignature = lrs.sign(publicKeyArray, userKey, message);
    return ringSignature;
}

module.exports = {createBlock, createMerkleTree, consensus, generateRingSignature}