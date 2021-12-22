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
    // setInterval(() => {
    //     methods.consensus(sequelize); 
    // }, 2000);
    // let publicKey = "ebe8a0632fde491b91293b2ad9f200fcb8f7a1a295ed9ec10916109ab5882a2984a69820ebd46c5d613735e2632e559a8fc0eb0419660731cfbe94ba088cd6458508342909a247ea63a95ea4524f2edb3024cefb2a598afd91e75425251a8ea8";
    // let privateKey = "43cdd0d4e899a83ff25176b3cde5f7a16b5e93f22c1a499e88de5eb7c6643e468a55c73c48fa8fe72ea069a5255d6cb2eb4d3690574eb7159be878e59ab7939ab2aab2e79009870a0eed0ed5680f9fadfc28da3ad0339afc75ee77980b07e793";
    // methods.generateRingSignature(publicKey,privateKey,"123",sequelize);
}
