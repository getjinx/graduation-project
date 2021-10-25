<template>
  <div class="background">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="form.account" placeholder="请输入账户"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="匿名算法">
          <el-input v-model="form.algorithm"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.active">
            <el-option label="参与共识" value="参与共识"></el-option>
            <el-option label="参与投票" value="参与投票"></el-option>
            <el-option label="暂时禁用" value="暂时禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addNode">添加节点</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<style lang="scss" scoped>

.background {
  width: 30%;
  height: 100vh;
  margin-top: 50px;
}
</style>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "XXXXXX医院",
        account: "",
        password: "",
        address: "",
        date: "2021-10-20",
        algorithm: "sha256",
        active: "参与共识"
      }
    };
  },
  methods: {
    addNode() {
      console.log(this.form);
      this.$message({
        type: "success",
        message: "添加节点成功!"
      });
      this.$router.push("/manage/manageNode");
    }
  },
  computed: {},
};
</script>
