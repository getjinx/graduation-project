<template>
  <div class="background">
    <div id="chart1"></div>
    <div id="chart2"></div>
    <div id="chart3"></div>
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: auto;

  &>div {
    width: 100%;
    height: 320px;
  }  
}
</style>
<script>
import * as echarts from 'echarts';
// 基于准备好的dom，初始化echarts实例
export default {
  data() {
    return {

    };
  },
  methods: {
  },
  mounted() {
    var myChart1 = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));
    var myChart3 = echarts.init(document.getElementById('chart3'));
    // 绘制图表
    myChart1.setOption({
      title: {
        text: "近期病历总访问次数",
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [5, 12, 21, 3, 16, 8, 13],
          type: 'line',
          smooth: true
        }
      ]
    });
    myChart2.setOption({
      title: {
        text: "授权病历总数"
      },
      xAxis: {
        type: 'category',
        data: ['医院A', '医院B', '医院C', '医院D', '医院E', '医院F', '医院G']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [6, 12, 2, 3, 9, 15, 11],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    });
    myChart3.setOption({
      title: {
        text: "病历访问次数"
      },
      xAxis: {
        type: 'category',
        data: ['病历A', '病历B', '病历C', '病历D', '病历E', '病历F', '病历G']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [12, 26, 16, 18, 21, 9, 14],
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
