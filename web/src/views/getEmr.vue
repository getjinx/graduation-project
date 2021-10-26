<template>
  <div class="home">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="400px" class="qrcodeFrame">
      <div class="qrcode" v-if="!hasAuthority">
        <div class="hint">请患者扫描二维码获取病历数据</div>
        <div class="picture"></div>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <div class="getdata">
      <el-button type="primary" @click="getEmr">获取病历</el-button>
    </div>
    <div class="content">
      <el-main class="content">
        <el-table :data="tableData">
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="date" label="创建日期">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  .qrcodeFrame {

    .qrcode {
    width: 300px;
    height: 300px;
    margin: auto;
    background: rgb(64, 158, 255);

      .hint {
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        color: black;
      }

      .picture {
        width: 200px;
        height: 200px;
        position: relative;
        top: 20px;
        left: 50px;
        background: url("../assets/image/qrcode.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
    }
  }

  .getdata {
    height: 50px;
    padding: 10px;
  }

  .content {
    height: 92%;
    width: 98%;
    margin: 0 auto;
    overflow: auto;
  }
}
</style>

<script>
export default {
  data() {
    return {
      hasAuthority: false,
      dialogVisible: false,
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
      }]
    };
  },

  methods: {
    check(row) {
      localStorage.emrId = row.id;
      this.$router.push("/index/checkEmr");
    },

    getEmr() {
      this.dialogVisible = true;
      this.getData();
    },

    getData() {
      console.log(123);
    }
  },

  created() {
    this.dialogVisible = true;
    this.getData();
  }
};
</script>
