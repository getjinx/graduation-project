<template>
  <div class="home">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="400px" class="qrcodeFrame">
      <div class="qrcode" v-if="!hasAuthority">
        <div class="hint">请患者扫描二维码获取病历数据</div>
        <div class="picture"></div>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <div class="getdata">
      <el-button type="primary" @click="dialogVisible = true">获取病历</el-button>
    </div>
    <div class="content">
      <img src="../assets/image/emr.png" width="100%">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  .qrcodeFrame {

    .qrcode {
    width: 300px;
    height: 300px;
    margin: auto;
    background: rgb(64, 158, 255);

      .hint {
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        color: black;
      }

      .picture {
        width: 200px;
        height: 200px;
        position: relative;
        top: 20px;
        left: 50px;
        background: url("../assets/image/qrcode.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
    }
  }

  .getdata {
    height: 50px;
    padding: 10px;
  }

  .content {
    height: 92%;
    width: 98%;
    margin: 0 auto;
    overflow: auto;
  }
}
</style>

<script>
export default {
  data() {
    return {
      hasAuthority: false,
      dialogVisible: false,
    };
  },

  methods: {

  },

  created() {
    this.dialogVisible = true;
  },
};
</script>
