const Sequelize = require("sequelize");
module.exports = sequelize => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // initiator: Sequelize.STRING,    //发起方
        signature: Sequelize.STRING,    //发起方签名
        // referenceId: Sequelize.STRING,  //交易来源id
        // transcationAmount: Sequelize.DOUBLE,    //交易数量
        // transcationFee: Sequelize.DOUBLE,   //交易费用
        // receiver: Sequelize.STRING, //接收方
        receiverPublicKey: Sequelize.STRING,    //接收方公钥
        timestamp: Sequelize.STRING,    //交易时间戳
        handle: Sequelize.BOOLEAN,   //交易是否被打包
        information: Sequelize.STRING,  //交易附加信息
        blockId: Sequelize.INTEGER,  //交易所属区块id
        hash: Sequelize.STRING      //交易hash
    }, {
        timestamps: false
    })
    return Transaction;
};