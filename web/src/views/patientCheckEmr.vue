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
            <el-button @click="dialogVisible1 = true; removeId = scope.row.name;" type="text" size="small">删除</el-button>
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
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="60%">
      <span>删除后你无法与其他医院(医生)再次分享该病历，确认删除？</span>
      <span slot="footer" class="dialog-footer"> <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="remove">确 定</el-button>
      </span>
    </el-dialog>
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
export default {
  data() {
    return {
        tableData: [{
          id: '1',
          name: '李华-绵阳市中心医院病历',
          date: '2021-10-12',
        }, {
          id: '2',
          name: '李华-绵阳市人民医院病历',
          date: '2021-10-9',
        },{
          id: '3',
          name: '李华-绵阳市中心医院病历',
          date: '2021-06-21',
        },{
          id: '4',
          name: '李华-绵阳市人民医院病历',
          date: '2020-01-16',
        },{
          id: '5',
          name: '李华-绵阳市中医医院病历',
          date: '2018-09-16',
        }],
        multipleSelection: [],
        share: true,
        searchContent: "",
        dialogVisible: false,
        dialogVisible1: false,
        selectOption: [],
        removeId: 0,
        clientHeight: "0",
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
      console.log(row);
      this.$router.push("/patientViewEmr");
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

    send() {
      this.selectOption = this.multipleSelection.map(v => v.id);
      console.log(this.selectOption);
      if(this.selectOption.length == 0){
          this.$message({
          type: "warning",
          message: "请选择需要发送的病历文件!"
        })
      }
      else {
        let emrId = this.selectOption.map(v => v.id);
        const newObj = {
          patientId: 123,
          hospitalId: 456,
          emrId
        }
        console.log(newObj);
      }
      this.selectOption = [];
      this.dialogVisible = false;
    }
  },

  created() {
    this.clientHeight = document.body.clientHeight - 120 + "px";
    console.log(this.clientHeight);
  }
};
</script>
