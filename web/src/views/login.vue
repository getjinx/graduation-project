<template>
  <div class="login-background">
    <div class="login-frame">
      <div class="title">
        <div>账户登录</div>
      </div>
      <div class="info">
        <div class="account">
          <div class="info-left">账户</div>
          <div class="info-right"><el-input prefix-icon = "el-icon-user"></el-input></div>
        </div>
        <div class="password">
          <div class="info-left">密码</div>
          <div class="info-right"><el-input prefix-icon = "el-icon-lock"></el-input></div>
        </div>
      </div>
      <div class="login">
        <el-button type="primary" class="login" round @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .login-background {
    width: 100vw;
    height: 100vh;
    background: url("../assets/image/loginBackground.jpg") no-repeat 0 0;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-frame {
      width: 400px;
      height: 300px;
      background: rgb(248,248,248);

      .title {
        height: 50px;
        color: rgb(64,158,255);
        line-height: 50px;
        font-size: 20px;
        text-align: center;
      }

      .info {
        width: 300px;
        height: 150px;
        margin: 0 auto;

        &>div {
          height: 40px;
          margin: 20px;
          display: flex;
          
          .info-left {
            width: 40px;
            line-height: 40px;
            text-align: right;
          }

          .info-right {
            width: 260px;
            margin-left: 20px;
          }
        }
      }

      .login {
        width: 100px;
        margin: 0 auto;
      }
    }
  }
</style>
<script>
export default {
  data() {
    return {
      isLogin: true,
    }
  },
  methods: {
    login() {
      this.$message({
        type: "success",
        message: "登录成功"
      });
      this.$router.push("/index");
    }
  },
  computed: {
  }
}
</script>
