<template>
  <div class="home">
    <div class="title">
        区块链信息:
    </div>
    <div class="data">
      <el-row :gutter="100">
        <el-col :span="12"><el-input v-model="form.blockCount"><template slot="prepend">区块总数</template></el-input></el-col>
        <el-col :span="12"><el-input v-model="form.transcationCount"><template slot="prepend">交易总数</template></el-input></el-col>
      </el-row>
      <el-row :gutter="100">
        <el-col :span="12"><el-input v-model="form.nextBlockNode"><template slot="prepend">即将记账</template></el-input></el-col>
        <el-col :span="12"><el-input v-model="form.transcationNumber"><template slot="prepend">空余交易</template></el-input></el-col>
      </el-row>
      <div class="title">
        上一个区块信息:
      </div>
      <el-row :gutter="100">
        <el-col :span="12"><el-input v-model="form.lastBlockGenerator"><template slot="prepend">记账节点</template></el-input></el-col>
        <el-col :span="12"><el-input v-model="form.lastBlockGenerateDate"><template slot="prepend">生成日期</template></el-input></el-col>
      </el-row>
      <el-row :gutter="100">
        <el-col :span="12"><el-input v-model="form.lastBlockTranscationCount"><template slot="prepend">交易数量</template></el-input></el-col>
        <el-col :span="12"><el-input v-model="form.lastBlockHash"><template slot="prepend">区块哈希</template></el-input></el-col>
      </el-row>
      <el-row :gutter="100">
        <el-col :span="12"><el-input v-model="form.lastBlockSize"><template slot="prepend">区块大小</template></el-input></el-col>
        <el-col :span="12"><el-input v-model="form.lastBlockMerkleRootHash"><template slot="prepend">默克哈希</template></el-input></el-col>
      </el-row>
    </div>
    <div class="min">
      <div id="chart1"></div>
      <div id="chart2"></div>
    </div>
    <div class="max">
      <div id="chart3"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  margin: 0 auto;
  width: 70%;
  min-width: 960px;
  height: auto;

  .title {
    height: 60px;
    line-height: 60px;
    position: relative;
    font-size: 20px;
  }

  .data {
    margin-top: 20px;
    
    .el-row {
      margin-top: 20px;
    }
  }

  .min {
    position: relative;
    top: 50px;
    display: flex;
    justify-content: space-between;
    height: auto;

    div {
      width: 420px;
      height: 300px;
    }
  }

  .max {
    position: relative;
    top: 50px;
    height: auto;
    
    div {
      width: 960px;
      height: 500px;
    }
  }
}
</style>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      hasAuthority: false,
      dialogVisible: false,
      form: {
        blockCount: 142,
        transcationCount: 94725,
        nextBlockNode: "绵阳市中医医院",
        transcationNumber: 469,
        lastBlockGenerator: "绵阳市中心医院",
        lastBlockGenerateDate: "2021-10-25 11:22:06",
        lastBlockTranscationCount: 891,
        lastBlockHash: "df2cbf91112e13d20403833e7cb201cdf9573300753aa9818292209f9d025865",
        lastBlockMerkleRootHash: "4cde587f90f0dc6cc3ab13223a8f838573fa3966baa0e0abe87c688db53b9bbc",
        lastBlockSize: "1374b",
      }
    };
  },

  methods: {
    checkEmrId() {
      localStorage.emrId.length == 0 && this.$router.push("/index/getEmr");
    }
  },

  mounted() {
    var myChart1 = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));
    var myChart3 = echarts.init(document.getElementById('chart3'));
    myChart1.setOption({
      title: {
        text: "近期区块交易数(笔)",
      },
      xAxis: {
        type: 'category',
        data: ['136', '137', '138', '139', '140', '141', '142']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [1000, 608, 1000, 996, 796, 1000, 891],
          type: 'line',
          smooth: true
        }
      ]
    });
    myChart2.setOption({
      title: {
        text: "近期区块生成周期(min)",
      },
      xAxis: {
        type: 'category',
        data: ['136', '136', '138', '139', '140', '141', '142']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [8.6, 10, 7.2, 10, 10, 4.6, 10],
          type: 'line',
          smooth: true
        }
      ]
    });
    myChart3.setOption({
      title: {
        text: "节点记账次数"
      },
      xAxis: {
        type: 'category',
        data: ['中心医院', '人民医院', '中医医院', '第三人民医院', '富临医院', '407医院', '404医院']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [26, 18, 12, 15, 11, 9, 6],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    });
  }
};
</script>
