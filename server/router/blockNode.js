module.exports = (app, sequelize) => {
    const hash = require('hash.js');
    const router = require("koa-router")();
    app.use(router.routes()).use(router.allowedMethods());
    const Model = require("../model/blockNode.js")(sequelize);
    hash.sha256().update('abc').digest('hex');

    router.get("/blockNode", async ctx => {
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    });

    router.post("/blockNode", async ctx => {    //医院账号登录
        const {account, password} = ctx.request.body;
        const data = await Model.findAll({ where: {account}});
        if(data.length == 0) {
            ctx.body = {
                success: false,
                message: "账号不存在"
            }
        }
        else {
            const passwordHash = hash.sha256().update(password).digest('hex');
            if(passwordHash == data[0].password) {
                ctx.body = {
                    success: true,
                    message: "登录成功",
                    name: data.name
                }
            }
            else {
                ctx.body = {
                    success: false,
                    message: "账号或密码错误",
                }
            }
        }
    });

    router.post("/blockNode/:id", async ctx => {    //医院账号修改密码
        const {password} = ctx.request.body;
        const passwordHash = hash.sha256().update(password).digest('hex');
        await Model.update({password: passwordHash}, { where: {id: ctx.params.id} });
        ctx.body = {
            success: true,
            message: "修改成功",
        }
    });

    router.post("/createBlockNode", async ctx => {  //创建医院账号节点
        const {account, name, password} = ctx.request.body;
        const data = await Model.findAll({ where: {account}});
        if(data.length == 0) {
            let passwordHash = hash.sha256().update(password).digest('hex');
            await Model.create({
                account,
                name,
                password: passwordHash,
                algorithm: "sha256"
            });
            ctx.body = {
                success: true,
                message: "创建成功"
            };
        }
        else {
            ctx.body = {
                success: false,
                message: "该账户已存在!"
            }
        }
    });
}