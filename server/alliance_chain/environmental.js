module.exports = (sequelize) => {
    const methods = require("./methods.js");
    const maxTranscationNumber = 1024, maxTime = 600;   //最大未打包交易数，max
    global.environmental = {
        lastBlockId: 0,
        lastBlockHash: "",
        // lastTranscationId: 0
    };
    global.transcationNumber = 0, global.time = 0;
    Object.defineProperties(environmental, {    //全局变量绑定 监听数据变化 达到条件时自动创建区块
        "transcationNumber": {
            get() {
                return transcationNumber;
            },
            set(value) {
                transcationNumber = value;
                if(transcationNumber >= maxTranscationNumber) {
                    methods.createBlock();
                }
            }
        },
        "time": {
            get() {
                return time;
            },
            set(value) {
                time = value;
                if(time >= maxTime) {
                    methods.createBlock();
                }
            }
        }
    }) 
    // function timeOut() {         //计时
    //     environmental.time++;
    //     setTimeout(() => {
    //         timeOut();
    //     }, 1000);
    // }
    // timeOut();
    // methods.createBlock(sequelize);
}
