<template>
  <div class="background">
    <header>
      <div class="scan" @click="scan">
        <i class="el-icon-monitor"></i>
      </div>
    </header>
    <div class="content" :style="content">
      <router-view></router-view>
    </div>
    <footer>
      <div class="item" @click="changePage(0)">
        <div class="icon"><i class="el-icon-data-line"></i></div>
        <div class="icon-name">信息总览</div>
      </div>
      <div class="item" @click="changePage(1)">
        <div class="icon"><i class="el-icon-document"></i></div>
        <div class="icon-name">病历查看</div>
      </div>
      <div class="item" @click="changePage(2)">
        <div class="icon"><i class="el-icon-user"></i></div>
        <div class="icon-name">我的主页</div>
      </div>
    </footer>
    <!-- <div :style="info">
      
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;

  header {
    width: 100%;
    height: 60px;
    background: rgb(64,158,255);
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-around;

    &>div {
      width: 90%;
      font-size: 30px;
      color: white;
      margin: auto;
      display: flex;
    }

    .setting {
      flex-direction: row-reverse;
    }
  }

  .content {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    width: 100%;
    margin: auto;
  }

  footer {
    position: absolute;
    z-index: 100;
    width: 100%;
    bottom: 0;
    display: flex;
    height: 60px;
    border-top: 1px gray solid;
    
    .item {
      flex: 1;
      cursor: pointer;
      
      .icon {
        width: 35px;
        height: 35px;
        font-size: 30px;
        margin: 0 auto;
      }

      .icon-name {
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      page: ["/patientIndex/patientCheckInfo","/patientIndex/patientCheckEmr","/patientIndex/patientCheckMine"],
      content: {
        height: "0px"
      },
      info: {
        width: "200px",
        height: "0px",
        border: "1px red solid",
        position: "absolute",
        right: "-200px"
      }
    };
  },
  methods: {
    changePage(num) {
      this.$router.push(this.page[num]);
    },
    scan() {
      this.$router.push("/scan");
    }
  },
  mounted() {
    this.content.height = document.body.clientHeight - 120 + 'px';
    this.info.height = document.body.clientHeight - 60 + 'px';
  }
};
</script>
