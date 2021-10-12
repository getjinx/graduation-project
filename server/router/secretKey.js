module.exports = (app, sequelize) => {
    const router = require("koa-router")();
    app.use(router.routes()).use(router.allowedMethods());
    const crypto = require("multi-crypto-js").Sm2Sm4;
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
        const key = crypto.generateKeyPair();
        await Model.create({
            userId: +ctx.request.body.id,
            publicKey: key.publicKey,
            privateKey: key.privateKey,
            algorithm: key.algorithm,
            format: key.format
        });
        const data = await Model.findAll();
        ctx.body = { 
            success: true,
            code: 200,
            data
        }
    });
}