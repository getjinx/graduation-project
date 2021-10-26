<template>
  <div class="background">
    <el-main class="content">
        <el-table :data="tableData">
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="account" label="账户" width="120">
          </el-table-column>
          <el-table-column prop="password" label="密码">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="createDate" label="创建日期" width="140">
          </el-table-column>
          <el-table-column prop="algorithm" label="匿名算法" width="120">
          </el-table-column>
          <el-table-column prop="active" label="状态" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="showRemove(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-main>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total">
    </el-pagination>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-input v-model="form.createDate"></el-input>
        </el-form-item>
        <el-form-item label="匿名算法">
          <el-select v-model="form.algorithm">
            <el-option label="sha256" value="sha256"></el-option>
            <el-option label="sha512" value="sha512"></el-option>
            <el-option label="sha1024" value="sha1024"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.active">
            <el-option label="参与共识" value="参与共识"></el-option>
            <el-option label="参与投票" value="参与投票"></el-option>
            <el-option label="暂时禁用" value="暂时禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editNode">完成</el-button>
          <el-button @click="dialogVisible = false;">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
      <span>确认删除该节点？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="remove">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100vw;
  height: 100%;

  .content {
    margin-top: 20px;
    height: 85%;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
  }
  .el-pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        name: "",
        account: "",
        password: "",
        address: "",
        createDate: "",
        algorithm: "",
        active: ""
      },
      total: 1234,
      pageSize: 10,
      currentPage: 1,
      removeId: 0,
    };
  },
  methods: {
    edit(row) {
      this.dialogVisible = true;
      this.form = row;
    },

    showRemove(row) {
      this.removeId = row.id;
      this.dialogVisible1 = true;
      this.getData();
    },

    async remove() {
      const res = await this.$http.delete("/blockNode", {
        params: {
          id: this.removeId
        }
      });
      this.dialogVisible1 = false;
      this.$message({
        type: "success",
        message: "删除成功!"
      })
      console.log(res.data);
    },

    async editNode() {
      const res = await this.$http.put("/blockNode", this.form);
      this.dialogVisible = false;
      console.log(res.data);
    },

    handleSizeChange(size) {
      this.pageSize = size;
    },

    handleCurrentChange(page) {
      this.currentPage = page;
      this.getData();
    },

    async getData() {
      const res = await this.$http.get("/blockNode",{
        params: {
          page: this.currentPage,
          size: this.pageSize
        }
      });
      this.tableData = res.data.data.rows;
      this.total = res.data.data.count;
    }
  },

  created() {
    this.getData();  
  },

  computed: {},
};
</script>
