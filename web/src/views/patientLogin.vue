<template>
  <div class="login-background">
    <div class="login-frame">
      <div class="title">
        <div>账户{{ isLogin ? "登录" : "注册" }}</div>
      </div>
      <div class="info">
        <div class="account">
          <div class="info-left">账户</div>
          <div class="info-right"><el-input prefix-icon = "el-icon-user" v-model="account"></el-input></div>
        </div>
        <div class="password">
          <div class="info-left">密码</div>
          <div class="info-right"><el-input prefix-icon = "el-icon-lock" v-model="password" type="password"></el-input></div>
        </div>
        <div class="confirmPassword" v-if="!isLogin">
          <div class="info-left">确认密码</div>
          <div class="info-right"><el-input prefix-icon = "el-icon-lock" v-model="confirmPassword" type="password"></el-input></div>
        </div>
      </div>
      <div class="login">
        <el-button type="primary" class="login" round @click="operate">{{ isLogin ? "登录" : "注册登录"}}</el-button>
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
      width: 360px;
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
        width: 340px;
        height: 150px;
        margin: 0 auto;

        &>div {
          height: 40px;
          margin: 20px;
          display: flex;
          
          .info-left {
            width: 80px;
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
        margin-top: 10px;
        text-align: center;
      }
    }
  }
</style>
<script>
export default {
  data() {
    return {
      isLogin: true,
      account: "",
      password: "",
      confirmPassword: ""
    }
  },
  methods: {
    async login() {
      const userInfo = {
        account: this.account,
        password: this.password
      };
      const res = await this.$http.post("/userLogin", userInfo);
      if(res.data.success == true) {
        this.$message({
          type: "success",
          message: "登录成功"
        });
        this.$router.push("/index");
      }
      else {
        this.$message({
          type: "error",
          message: "账号或密码错误"
        })
      }
    },
    async register() {
      if(this.password != this.confirmPassword) {
        this.$message({
          type: "error",
          message: "确认密码不匹配"
        });
        return ;
      }
      else {
        const userInfo = {
          account: this.account,
          password: this.password,
        }
        const res = await this.$http.post("/userRegister", userInfo);
        if(res.data.success == true) {
          this.$message({
            type: "success",
            message: "注册成功"
          });
          this.$router.push("/index");
        }
      }
    },
    operate() {
      if(this.isLogin) {
        this.login();
      }
      else {
        this.register();
      }
    }
  },
  computed: {
  }
}
</script>
