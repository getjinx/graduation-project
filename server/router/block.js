module.exports = (app, sequelize) => {
    const router = require("koa-router")();
    app.use(router.routes()).use(router.allowedMethods());
    router.get("/block", async ctx => {
        const Model = require("../model/block.js")(sequelize);
        const data = await Model.findAll();
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    });
    router.post("/block", async ctx => {
        const Model = require("../model/block.js")(sequelize);
        ctx.body = {
            success: true,
            code: 200,
        }
    });
}