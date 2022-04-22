<template>
  <div class="home">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="400px" class="qrcodeFrame">
      <div class="qrcode" v-if="!hasAuthority">
        <div class="hint">获取病历
          <el-input placeholder="请输入病历获取码，获取病历！" v-model="code"></el-input>
        </div>
        <el-button class="getInfo" type="primary" @click="getFile">确定</el-button>
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
          <el-table-column prop="saveTime" label="创建日期">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
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
    height: 100px;
    margin: auto;
    // background: rgb(64, 158, 255);

      .hint {
        text-align: left;
        font-size: 18px;
        color: black;
      }

      .getInfo {
        position: relative;
        top: 10px;
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
import * as dayjs from 'dayjs'
export default {
  data() {
    return {
      hasAuthority: false,
      dialogVisible: false,
      hospitalId: 10,
      userId: 1,
      tableData: [],
      code: "",
    };
  },

  methods: {
    check(row) {
      localStorage.emrId = row.id;
        this.$router.push({name : "preview", params: {
          url: row.saveName
      }});
    },

    getEmr() {
      this.dialogVisible = true;
    },

    async getFile() {
      let data = [];
      const res = await this.$http.get("getFileId", {
        params: {
          code: this.code
        }
      });
      data = res.data.data.map(v => {
        return {
          id: v.id,
          name: v.name,
          saveTime: dayjs(+v.saveTime).format("YYYY-MM-DD"),
          saveName: v.saveName,
          owner: v.owner
        }
      });
      this.tableData = data;
      sessionStorage.tableData = JSON.stringify(data);
      localStorage.userId = data[0].owner;
      this.dialogVisible = false;
    },

    async download(row) {
      const res = await this.$http.get("/getFile", {
        params: {
          name: "",
        },
        responseType: 'arraybuffer'
      });
      let blob = new Blob([res.data], {
        type: "application/pdf"
      });
      let url = window.URL.createObjectURL(blob);
      let ele = document.createElement("a");
      ele.style.display = "none";
      ele.href = url;
      this.url = res.data;
      ele.download = row.name;
      document.querySelectorAll("body")[0].appendChild(ele);
      ele.click();
      ele.remove();
    },

    preview(row) {
      this.$router.push({name : "preview", params: {
        url: row.saveName
      }});
    }
  },

  created() {
    if(!sessionStorage.tableData) {
      this.dialogVisible = true;
    }
    else {
      this.tableData = JSON.parse(sessionStorage.tableData);
    }
    this.hospitalId = localStorage.hospitalId;
  }
};
</script>
