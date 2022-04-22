const Sequelize = require("sequelize");
module.exports = sequelize => {
    const VerifyCode = sequelize.define('verifycode', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        owner: Sequelize.INTEGER,
        fileId: Sequelize.INTEGER,
        code: Sequelize.STRING,
        generateTime: Sequelize.STRING,
    }, {
        timestamps: false
    })
    return VerifyCode;
};