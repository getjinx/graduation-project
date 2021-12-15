<template>
  <div class="background">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header>
        <el-container>
          <el-aside width="200px" style="font-size: 20px">分布式电子病历隐私保护系统</el-aside>
          <!-- <el-container style="display:flex; flex-direction: row-reverse; padding-right: 40px;">
            <span>XXXX中心医院</span>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-container> -->
        </el-container>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%">
          <el-menu :router="true" :default-openeds="['1','2']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-setting"></i>联盟节点管理</template>
                <el-menu-item index="/manage/manageNode">编辑节点</el-menu-item>
                <el-menu-item index="/manage/addNode">新增节点</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-document"></i>状态查看</template>
                <el-menu-item index="/manage/checkBlock">状态总览</el-menu-item>
                <el-menu-item index="/manage/checkBlockInfo">所有区块信息</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container style="height: 90vh;overflow-x: hidden;">
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
    return {

    };
  },
  methods: {
  },
};
</script>
