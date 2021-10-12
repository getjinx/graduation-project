const Sequelize = require("sequelize");
module.exports = sequelize => {
    const SecretKey = sequelize.define('secretkey', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: Sequelize.INTEGER,  //密钥所属id
        publicKey: Sequelize.STRING,    //公钥(对称密钥)
        privateKey: Sequelize.STRING,   //私钥(对称密钥)
        algorithm: Sequelize.STRING,    //加密算法
        format: Sequelize.STRING    //格式
    }, {
        timestamps: false
    })
    return SecretKey;
};