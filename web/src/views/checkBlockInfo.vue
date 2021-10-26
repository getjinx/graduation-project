<template>
  <div class="background">
    <el-main class="content">
        <el-table :data="tableData">
          <el-table-column prop="id" label="编号" width="50">
          </el-table-column>
          <el-table-column prop="BlockGenerator" label="记账节点" width="150">
          </el-table-column>
          <el-table-column prop="BlockGenerateDate" label="记账时间" width="180">
          </el-table-column>
          <el-table-column prop="BlockTimeUse" label="记账耗时" width="100">
          </el-table-column>
          <el-table-column prop="BlockTranscationCount" label="交易数量" width="100">
          </el-table-column>
          <el-table-column prop="BlockHash" label="区块哈希">
          </el-table-column>
          <el-table-column prop="BlockMerkleRootHash" label="默克哈希">
          </el-table-column>
          <el-table-column prop="BlockSize" label="区块大小" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="check(scope.row)" type="text" size="small">查看详情</el-button>
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
      tableData: [{
      id: "142",
      BlockGenerator: "绵阳市中心医院",
      BlockGenerateDate: "2021-10-25 15:49:06",
      BlockTranscationCount: 891,
      BlockTimeUse: 600,
      BlockHash: "df2cbf91112e13d20403833e7cb201cdf9573300753aa9818292209f9d025865",
      BlockMerkleRootHash: "4cde587f90f0dc6cc3ab13223a8f838573fa3966baa0e0abe87c688db53b9bbc",
      BlockSize: "1374b",
    },{
      id: "141",
      BlockGenerator: "绵阳市人民医院",
      BlockGenerateDate: "2021-10-25 15:39:06",
      BlockTranscationCount: 1000,
      BlockTimeUse: 276,
      BlockHash: "01cdf9573300753aa98df2cbf91112e13d20400258653833e7cb218292209f9d",
      BlockMerkleRootHash: "0f0dc6cc3ab13223a8f83854cde5b53b9bbc87f973fa3966baa0e0abe87c688d",
      BlockSize: "1641b",
    },{
      id: "140",
      BlockGenerator: "绵阳市中心医院",
      BlockGenerateDate: "2021-10-25 15:34:30",
      BlockTranscationCount: 796,
      BlockTimeUse: 600,
      BlockHash: "18292209f9d0258651112e13d20403833e7cb20df2cbf91cdf9573300753aa98",
      BlockMerkleRootHash: "e0abe87c688db53b9bbc0dc6cc3ab13223a8f838573fa3966baa04cde587f90f",
      BlockSize: "1216b",
    },{
      id: "139",
      BlockGenerator: "绵阳市中医医院",
      BlockGenerateDate: "2021-10-25 15:24:30",
      BlockTranscationCount: 996,
      BlockTimeUse: 600,
      BlockHash: "403833e7cb201cdf9573300df2d025865cbf91112e13d20753aa9818292209f9",
      BlockMerkleRootHash: "ab13223a8f8688db53b9bbc38573fa34cde587f90f0dc6cc3966baa0e0abe87c",
      BlockSize: "1694b",
    },{
      id: "138",
      BlockGenerator: "绵阳市第三人民医院",
      BlockGenerateDate: "2021-10-25 15:14:34",
      BlockTranscationCount: 1000,
      BlockTimeUse: 432,
      BlockHash: "3833e7cb2092209f9d0258651cdf9573300753aa9df2cbf91112e13d20408182",
      BlockMerkleRootHash: "a0e0abe87bbc4cde587f90f0dc6cc3ab13838573fa3966ba223c688db53b9a8f",
      BlockSize: "1983b",
    },{
      id: "137",
      BlockGenerator: "绵阳市人民医院",
      BlockGenerateDate: "2021-10-25 15:07:32",
      BlockTranscationCount: 608,
      BlockTimeUse: 600,
      BlockHash: "01cdf2cbf91112e13dd20403833e209f9d0258657cb2f9573300753aa9818292",
      BlockMerkleRootHash: "66baa0e0abe87ce587f90f0dc6cc3adb53b9bbcb4cd913223a8f838573fa3688",
      BlockSize: "2563b",
    },{
      id: "136",
      BlockGenerator: "绵阳市407医院",
      BlockGenerateDate: "2021-10-25 14:57:32",
      BlockTranscationCount: 1000,
      BlockTimeUse: 516,
      BlockHash: "865cbf91112e13d20403833e7cb20df1cdf95733007532aa9818292209f9d025",
      BlockMerkleRootHash: "3ab13223a8f838573fab3966baa0e0abe8b4cde587f90f0dc6ccc7c688db53b9",
      BlockSize: "1342b",
    },{
      id: "135",
      BlockGenerator: "绵阳市富临医院",
      BlockGenerateDate: "2021-10-25 14:50:56",
      BlockTranscationCount: 789,
      BlockTimeUse: 600,
      BlockHash: "5865e13d20403833e7cb2a9818292209f9d02201cdf9573300df2cbf9111753a",
      BlockMerkleRootHash: "6be87c688db4cde587f223a8f8389fa3953b9bbc0f0dc6cc3ab135736baa0e0a",
      BlockSize: "2236b",
    },{
      id: "134",
      BlockGenerator: "绵阳市人民医院",
      BlockGenerateDate: "2021-10-25 14:40:56",
      BlockTranscationCount: 649,
      BlockTimeUse: 600,
      BlockHash: "292865df2cbf957e7cb201c3aa93209f9d0253007504038338181112e13d2df9",
      BlockMerkleRootHash: "b138573fade587f4837c688db53c6cc3a90f09bbcdc3966baa0e0abe8223a8fb",
      BlockSize: "2184b",
    },{
      id: "133",
      BlockGenerator: "绵阳市404医院",
      BlockGenerateDate: "2021-10-25 14:30:56",
      BlockTranscationCount: 1000,
      BlockTimeUse: 495,
      BlockHash: "a981dfdd20403833e7cb282929209f9f2cbf01c95733007531112e13d025865a",
      BlockMerkleRootHash: "6cc3af90f0dcb132273baa0e0b53ba8f838573fa3966abe87c4cde58689bbc8d",
      BlockSize: "1548b",
    }],
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
      total: 142,
      pageSize: 10,
      currentPage: 1,
      removeId: 0,
    };
  },
  methods: {
    check(row) {
      console.log(row.id);
    },

    showRemove(row) {
      this.removeId = row.id;
      this.dialogVisible1 = true;
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
    // this.getData();  
  },

  computed: {},
};
</script>
