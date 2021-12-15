module.exports = (app, sequelize) => {
    const router = require("koa-router")();
    const fs = require("fs");
    const path = require("path");
    app.use(router.routes()).use(router.allowedMethods());
    router.post("/uploadEmr", async ctx => {
        const data = ctx.request.body;
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })
    router.get("/getFile", async ctx => {
        let filePath = path.join(path.resolve("./upload"), "upload_9d9e851a619eb0e3f64b2c66904c4db9.pdf");
        let file = fs.readFileSync(filePath);
        ctx.body = file;
        console.log(typeof file);
    })
}