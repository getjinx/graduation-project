<template>
  <div class="background">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header>
        <el-container>
          <el-aside width="200px" style="font-size: 20px">电子病历共享系统</el-aside>
          <el-container style="display:flex; flex-direction: row-reverse; padding-right: 40px;">
            <span>XXXX中心医院</span>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-container>
        </el-container>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%">
          <el-menu :router="true" :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-document"></i>病历操作</template>
                <el-menu-item index="/index/getEmr">查看病历</el-menu-item>
                <el-menu-item index="/index/uploademr">病历上传</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container style="height: 90vh;">
          <!-- <el-main>
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
            </el-table>
          </el-main> -->
          <router-view></router-view>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.el-container {
  border: none !important;
}

.el-menu {
  border: none !important;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.background {
  width: 100vw;
  height: 100vh;
}
</style>
<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
  methods: {
    login() {
      this.$message({
        type: "success",
        message: "登录成功",
      });
      this.$router.push("/index");
    },
  },
  computed: {},
};
</script>
