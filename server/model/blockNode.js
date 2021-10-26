const Sequelize = require("sequelize");
module.exports = sequelize => {
    const Blocknode = sequelize.define('blocknode', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account: Sequelize.STRING, //医院账号
        name: Sequelize.STRING,     //医院名称
        password: Sequelize.STRING, //节点密码(hash)
        algorithm: Sequelize.STRING,    //hash算法
        address: Sequelize.STRING,  //医院地址
        createDate: Sequelize.STRING,   //节点加入日期
        active: Sequelize.STRING,   //节点状态：参与共识，参与投票，暂时弃用
    }, {
        timestamps: false
    })
    return Blocknode;
};