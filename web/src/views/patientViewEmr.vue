<template>
  <div class="background">
    <div class="top">
      <div class="cancel">
        <i class="el-icon-circle-close" @click="cancel"></i>
      </div>
      <p class="title">查看病历</p>
    </div>
    <div class="content">
      <img src="../assets/image/emr.png">
    </div>
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .top {
    height: 60px;
    background: rgb(64,158,255);
    position: relative;

    .cancel {
      height: 30px;
      font-size: 25px;
      line-height: 30px;
      margin: 20px;
      color: white;
    }

    p {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 20px;
      transform: translate(-50%, -50%);
    }
  }

  .content {
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
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
    }
  }
}
</script>
