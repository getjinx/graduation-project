<template>
  <div class="background">
    <div class="oprate">
      <div class="send"><el-button v-if="share" type="primary" @click="dialogVisible = true" round>发送病历</el-button></div>
      <div class="search">
        <el-input placeholder="请输入搜索内容" v-model="searchContent" suffix-icon="el-icon-search" @change="search">
        </el-input>
      </div>
    </div>
    <div class="content">
      <el-table ref="multipleTable" :height="clientHeight" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" v-if="share">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="120" sortable>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="120" sortable>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
            <!-- <el-button @click="dialogVisible1 = true; removeId = scope.row.name;" type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <span>发送即向该医院(医生)授予永久访问权限，是否确认？</span>
      <span slot="footer" class="dialog-footer"> <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="send">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog title="提示" :visible.sync="dialogVisible1" width="60%">
      <span>删除后你无法与其他医院(医生)再次分享该病历，确认删除？</span>
      <span slot="footer" class="dialog-footer"> <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="remove">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100vw;
  height: auto;

  .oprate {
    width: 100%;
    height: 50px;
    display: flex;

    &>div {
      width: 50%;
      display: flex;
    }
    
    .send {
      margin: 10px;
      height: 40px;
    }

    .search {
      margin: 10px;
      flex-direction: row-reverse;
    }
  }
  
}
</style>
<script>
import * as dayjs from 'dayjs'
export default {
  data() {
    return {
        tableData: [],
        multipleSelection: [],
        share: true,
        searchContent: "",
        dialogVisible: false,
        dialogVisible1: false,
        selectOption: [],
        removeId: 0,
        clientHeight: "0",
        userId: 0,
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    check(row) {
      this.$router.push({
        name: "patientViewEmr",
        params: {
          id: row.id
        }
      });
    },

    remove() {
      console.log(this.removeId);
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.dialogVisible1 = false;
    },

    search(val) {
      console.log(val);
    },

    async send() {
      this.selectOption = this.multipleSelection.map(v => v.id);
      console.log(this.selectOption);
      if(this.selectOption.length == 0){
          this.$message({
          type: "warning",
          message: "请选择需要发送的病历文件!"
        })
      }
      else {
        let emrId = this.selectOption;
        const newObj = {
          owner: 123,
          emrId
        }
        console.log(newObj);
        const res = await this.$http.post("/sendFile", newObj);
        if(res.data.success) {
          this.$alert(`分享成功,获取码为${res.data.data},两分钟有效！`, '分享成功', {
            confirmButtonText: '确定',
          });
        }
        else {
          this.$message({
            type: "error",
            message: "分享失败，请稍后重试"
          })
        }
      }
      this.selectOption = [];
      this.dialogVisible = false;
    },

    async getData() {
      const res = await this.$http.get("/getFileList", {
        params: {
          userId: this.userId
        }
      });
      console.log(this.tableData);
      this.tableData = res.data.data.map(v => {
        return {
          name: v.name,
          date: dayjs(+v.saveTime).format("YYYY-MM-DD"),
          id: v.id
        }
      });
    }
  },

  created() {
    this.userId = localStorage.userId;
    this.clientHeight = document.body.clientHeight - 120 + "px";
    console.log(this.clientHeight);
    this.getData();
  }
};
</script>
