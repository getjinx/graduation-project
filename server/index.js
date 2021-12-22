const Koa = require("koa");
const app = new Koa();
const Sequelize = require("sequelize");
// const bodyparse = require("koa-bodyparser");
// app.use(bodyparse());
const cors = require("koa2-cors");
app.use(cors());
const path = require('path');
const koaBody = require('koa-body');
const router = require('koa-router')();
global.fileList = [];
const sequelize = new Sequelize("graduation_project", "root", "123456", {
    host: "localhost",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    dialect: "mysql"
}); 
app.use(koaBody({
  multipart: true, // 支持文件上传
  // encoding:'gzip',
  formidable:{
    uploadDir: path.join(__dirname,'upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 5 * 1024 * 1024, // 文件上传大小
    onFileBegin:async (name, file) => { // 文件上传前的设置
      const dirName = new Date().getTime();
      file.path = path.join(__dirname,'upload/') + dirName + '.pdf';
      global.fileList.push(dirName + '.pdf');
    }
  }
}));
require("./alliance_chain/environmental.js")(sequelize);
require("./router/index")(app, router, sequelize);
console.log("http://localhost:3000");
app.listen("3000");