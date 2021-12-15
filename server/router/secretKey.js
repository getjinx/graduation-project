module.exports = (app, sequelize) => {
    const router = require("koa-router")();
    app.use(router.routes()).use(router.allowedMethods());
    const lrs = require("lrs");
    router.get("/secretKey", async ctx => {
        const Model = require("../model/secretKey.js")(sequelize);
        const data = await Model.findAll();
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    });
    router.post("/secretKey", async ctx => {
        const Model = require("../model/secretKey.js")(sequelize);
        const key = lrs.gen();
        await Model.create({
            userId: +ctx.request.body.id,
            publicKey: key.publicKey,
            privateKey: key.privateKey,
        });
        const data = await Model.findAll();
        ctx.body = { 
            success: true,
            code: 200,
            data
        }
    });
}