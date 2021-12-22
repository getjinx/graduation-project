module.exports = (app, router, sequelize) => {
    const hash = require('hash.js');
    app.use(router.routes()).use(router.allowedMethods());
    const Model = require("../model/blockNode.js")(sequelize);

    router.get("/blockNode", async ctx => {
        const {page, size} = ctx.query;
        const data = await Model.findAndCountAll({
            offset: (page - 1) * +size,
            limit: +size,
        });
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    });

    router.post("/addBlockNode", async ctx => {
        const block  = ctx.request.body;
        const data = await Model.create(block);
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })

    router.put("/blockNode", async ctx => {
        const block = ctx.request.body;
        const data = await Model.update(block, {
            where: {
                id: block.id
            }
        });
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })

    router.delete("/blockNode", async ctx => {
        const {id} = ctx.query;
        const data = await Model.destroy({
            where: {
                id
            }
        })
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })

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
}