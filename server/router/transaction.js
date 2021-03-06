module.exports = (app, router, sequelize) => {
    app.use(router.routes()).use(router.allowedMethods());
    const Model = require("../model/transaction.js")(sequelize);
    router.get("/transaction", async ctx => {
        const data = await Model.findAll();
        ctx.body = {
            success: true,
            code: 200,
            data
        }
    });

    router.post("/transaction", async ctx => {
        const {initiator, receiverPublicKey, timestamp, information} = ctx.request.body;
        const Key = require("../model/secretKey.js")(sequelize);
        const initiatorPublicKey = initiator;
        const initiatorKeyInformation = await Key.findOne({ where: {publicKey: initiatorPublicKey}});
        const initiatorPrivateKey = initiatorKeyInformation.dataValues.privateKey;
        const signature = require("../alliance_chain/methods.js").generateRingSignature(initiatorPublicKey, initiatorPrivateKey);
        const handle = false;
        const transaction = {
            signature,
            receiverPublicKey:initiatorPublicKey,
            timestamp,
            handle,
            information
        }
        console.log(transaction);
        await Model.create(transaction);
        ctx.body = {
            success: true,
            message: "创建交易成功!"
        }
    });
}