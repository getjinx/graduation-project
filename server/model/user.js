const Sequelize = require("sequelize");
module.exports = sequelize => {
    const Block = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account: Sequelize.STRING, //病人账号
        password: Sequelize.STRING, //病人密码hash
        name: Sequelize.STRING  //病人姓名
    }, {
        timestamps: false
    })
    return Block;
};