<template>
  <div class="background" id="main">
    <div class="portrait">
      <div class="content">
        <div class="picture"></div>
        <div class="name">李华</div>
      </div>
    </div>
    <div class="setting">
      <div class="item">
        <div class="hint">修改密码</div>
        <div class="skip"><i class="el-icon-arrow-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div class="item">
        <div class="hint">密钥管理</div>
        <div class="skip"><i class="el-icon-arrow-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div class="item">
        <div class="hint">辅助功能</div>
        <div class="skip"><i class="el-icon-arrow-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div class="item">
        <div class="hint">帮助</div>
        <div class="skip"><i class="el-icon-arrow-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div class="item">
        <div class="hint">退出登录</div>
        <div class="skip"><i class="el-icon-arrow-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
  
  .portrait {
    height: 150px;
    display: flex;
    
    .content {
      width: 80px;
      height: 110px;
      margin: auto;

      .picture {
        height: 80px;
        background: url("../assets/image/patient.png") no-repeat 0 0;
        background-size: 100% 100%;
      }

      .name {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        text-align: center;
      }
    }
  }
  
  .setting {
    height: auto;
    
    .item {
      height: 60px;
      display: flex;

      &>div {
        width: 50%;
        line-height: 60px;
        text-indent: 20px;
      }
      
      .skip {
        text-align: right;
      }
    }
    
  }
}
</style>
<script>
</script>
