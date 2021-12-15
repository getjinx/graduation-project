const Sequelize = require("sequelize");
module.exports = sequelize => {
    const Block = sequelize.define('filelist', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uploader: Sequelize.INTEGER,
        owner: Sequelize.INTEGER,
        size: Sequelize.INTEGER,
        name: Sequelize.STRING,
    }, {
        timestamps: false
    })
    return Block;
};