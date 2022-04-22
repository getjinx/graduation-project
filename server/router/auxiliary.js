module.exports = (app, router, sequelize) => {
    const fs = require("fs");
    const path = require("path");
    const lrs = require("lrs");
    app.use(router.routes()).use(router.allowedMethods());
    const Model = require('../model/fileList.js')(sequelize);
    const codeModel = require("../model/verifyCode")(sequelize);
    function generateCode() {
        return randomNumber = Math.floor(Math.random() * 1000000);
    }
    router.post("/uploadEmr", async ctx => {
        console.log(global.fileList);
        const { uploader, owner, name } = ctx.request.body;
        const saveName = global.fileList.shift();
        const saveTime = saveName.split(".")[0];
        const data = await Model.create({ uploader, owner, name, saveName, saveTime});
        console.log(saveTime);
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })

    router.get("/getFile", async ctx => {
        let filePath = path.join(path.resolve("./upload"), "1649749037234.pdf");
        let file = fs.readFileSync(filePath);
        console.log(file);
        ctx.body = file;
    })

    router.get("/getFileList", async ctx => {
        const { userId } = ctx.query;
        const data = await Model.findAll({where: {owner:userId}});
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })

    router.post("/sendFile", async ctx => {
        const { owner, emrId } = ctx.request.body;
        const generateTime = new Date().getTime();
        let code = generateCode();
        await emrId.forEach(async item => {
            hasCode = await codeModel.findAll({where: { code: randomNumber}});
            while(hasCode.length != 0){
                code = generateCode();
                hasCode = await codeModel.findAll({where: { code: randomNumber}});
            }
            await codeModel.create({
                owner,
                code,
                generateTime,
                fileId: item,
            })
        });
        ctx.body = {
            success: true,
            code: 200,
            data: code
        }
    })

    router.get("/getFileId", async ctx => {
        const { code } = ctx.query;
        let res = [];
        const data = await codeModel.findAll({where: {code}});
        if(data.length == 0 || data[0].generateTime + 1200000 < new Date().getTime()) {
            ctx.body = {
                success: true,
                code: 200,
                message: "获取码错误或失效！"
            }
        }
        else {
            for(let i = 0; i < data.length; i++) {
                let fileInfo = await Model.findOne({ raw: true, where: {id: data[i].fileId}});
                res.push(fileInfo);
            }
            ctx.body = {
                success: true,
                code: 200,
                data: res
            }
        }
    })

    router.post("/deleteFile", async ctx => {
        const { userId } = ctx.request.body;
        await Model.destroy({where: {owner: userId}});
    })
    
    let publicKey = new Array(5).fill("123");
    let privateKey = ("321");
    router.post("/ring", ctx => {
        const res = lrs.sign(publicKey, privateKey, "789");
        ctx.body = "res";
    })

    router.get("/getFileInfo", async ctx => {
        const data = await Model.findAll();
        ctx.body = data;
    })

    router.get("/jsonp", async ctx => {
        ctx.body="jsonp(123)";
    })

}