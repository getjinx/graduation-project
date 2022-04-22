module.exports = (app, router, sequelize) => {
    const hash = require('hash.js');
    app.use(router.routes()).use(router.allowedMethods());
    const Model = require("../model/user.js")(sequelize);
    router.post("/userLogin", async ctx => {
        const { account, password } = ctx.request.body;
        console.log(ctx.request, ctx.request.body);
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
                    userId: data[0].id,
                    success: true,
                    message: "登录成功",
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

    router.post("/userRegister", async ctx => {
        const { account, password } = ctx.request.body;
        const data = await Model.findAll({ where: {account}});
        if(data.length != 0) {
            ctx.body = {
                success: false,
                message: "该账号已被注册"
            }
        }
        else {
            const passwordHash = hash.sha256().update(password).digest('hex');
            await Model.create({account, password: passwordHash, name: ""});
            const user = await Model.findAll({ where: {account}});
            ctx.body = {
                success: true,
                message: "注册成功",
                userId: user[0].id,
            }
        }
    });

    router.put("/user", async ctx => {
        const userInfo = ctx.request.body;
        const data = await Model.update(userInfo, {
            where: {
                id: userInfo.id
            }
        });
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    })
}