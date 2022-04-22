const Sequelize = require("sequelize");
module.exports = sequelize => {
    const Filelist = sequelize.define('filelist', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uploader: Sequelize.INTEGER,
        owner: Sequelize.INTEGER,
        name: Sequelize.STRING,
        saveName: Sequelize.STRING,
        saveTime: Sequelize.STRING
    }, {
        timestamps: false
    })
    return Filelist;
};