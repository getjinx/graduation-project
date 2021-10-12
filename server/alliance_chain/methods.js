const environmental = require("./environmental.js");
const hash = require('hash.js');
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

function consensus() {  //共识

    //console.log("第17个节点共识完成，当前完成节点：7");
    // console.log("共完成1000笔交易，20个节点共识，总耗时206ms");
    // console.log("共识完成");
}

function generateRingSignature(publicKey, privateKey) {  //生成环签名
    return privateKey;
}

module.exports = {createBlock, createMerkleTree, consensus, generateRingSignature}