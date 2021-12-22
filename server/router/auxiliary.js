module.exports = (app, router, sequelize) => {
    const fs = require("fs");
    const path = require("path");
    app.use(router.routes()).use(router.allowedMethods());
    const Model = require('../model/fileList.js')(sequelize);
    router.post("/uploadEmr", async ctx => {
        const { uploader, owner, name } = ctx.request.body;
        console.log(uploader,owner);
        const saveName = global.fileList.shift();
        const data = await Model.create({ uploader, owner, name, saveName});
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })
    router.post("/getFile", async ctx => {
        let filePath = path.join(path.resolve("./upload"), "1639646836810.pdf");
        let file = fs.readFileSync(filePath);
        ctx.body = file;
    })
}