const Koa = require("koa");
const app = new Koa();
const Sequelize = require("sequelize");
const bodyparse = require("koa-bodyparser");
app.use(bodyparse());
const cors = require("koa2-cors");
app.use(cors());
const sequelize = new Sequelize("graduation_project", "root", "123456", {
    host: "localhost",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    dialect: "mysql"
}); 
require("./alliance_chain/environmental.js")(sequelize);
require("./router/index")(app, sequelize); 
// require("./router/websocket.js");
console.log("http://localhost:3000");
app.listen("3000");