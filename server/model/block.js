const Sequelize = require("sequelize");
module.exports = sequelize => {
    const Block = sequelize.define('block', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        number: Sequelize.INTEGER,  //区块中的交易数
        // inputAmount: Sequelize.DOUBLE,    //区块中所有交易输入金额总和
        // outputAmount: Sequelize.DOUBLE,   //区块中所有交易输出金额总和
        // transcationFee: Sequelize.DOUBLE,   //区块中所有交易差额(矿工获得)
        // blockReceive: Sequelize.DOUBLE, //挖矿奖励(12.5BTC)
        // miner: Sequelize.STRING,     //矿工公钥(节点公钥)
        timestamp: Sequelize.STRING,    //区块创建时间
        // receivedTime: Sequelize.STRING,   //区块共识时间
        // Nonce: Sequelize.STRING,    //随机数(pow的答案)
        // difficulty: Sequelize.DOUBLE,   //难度(pow挖矿难度)
        size: Sequelize.DOUBLE, //区块大小
        // vision: Sequelize.STRING,   //版本号
        preHash: Sequelize.STRING,  //上一个区块hash
        hash: Sequelize.STRING, //区块hash
        merkleRoot: Sequelize.STRING,   //区块merkle根hash
    }, {
    }, {
        timestamps: false
    })
    return Block;
};