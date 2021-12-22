module.exports = (app, router, sequelize) => {
    require("./secretKey.js")(app, router, sequelize);
    require("./transaction.js")(app, router, sequelize);
    require("./blockNode.js")(app, router, sequelize);
    require("./auxiliary.js")(app, router, sequelize);
    require("./user.js")(app, router, sequelize);
}