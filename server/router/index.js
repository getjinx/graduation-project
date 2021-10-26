module.exports = (app, sequelize) => {
    require("./secretKey.js")(app, sequelize);
    require("./transaction.js")(app, sequelize);
    require("./blockNode.js")(app, sequelize);
    require("./auxiliary.js")(app, sequelize);
}