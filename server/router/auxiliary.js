module.exports = (app, sequelize) => {
    const router = require("koa-router")();
    app.use(router.routes()).use(router.allowedMethods());
    router.post("/uploadEmr", async ctx => {
        const data = ctx.request.body;
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })
}