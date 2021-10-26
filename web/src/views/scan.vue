<template>
  <div class="background">
    <div class="cancel">
      <i class="el-icon-circle-close" @click="cancel"></i>
    </div>
    <div class="scan-frame">
      <div class="line"></div>
    </div>
    <div class="hint">请扫描医生端的二维码进行分享</div>
  </div>
</template>
<style lang="scss" scoped>
@keyframes lineRemove {
  0% {
    top: 50px;
    opacity: 0;
  }
  20% {
    top: 130px;
    opacity: 1;
  }
  85% {
    top: 390px;
    opacity: 1;
  }
  100% {
    top: 450px;
    opacity: 0;
  }
}
.background {
  width: 100%;
  height: 100vh;

  .cancel {
    height: 30px;
    font-size: 25px;
    line-height: 30px;
    margin: 20px;
  }

  .scan-frame {
    height: 500px;

    .line {
      width: 80%;
      height: 0;
      margin: 0 auto;
      position: relative;
      top: 50px;
      animation: lineRemove infinite linear 2s;
      border: 1px rgb(30,176,101) solid;
    }
  }


  .hint {
    margin-top: 30px;
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
  }
}
</style>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },

  }
}
</script>
