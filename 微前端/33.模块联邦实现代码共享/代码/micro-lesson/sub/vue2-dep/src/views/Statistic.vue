<template>
  <div>
    <div ref="sleepTime" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Statistic',
  props: {
  },
  data () {
    return {
      sleepTimeData: [8, 4, 7, 8, 10, 3, 7],
      gameTimeData: [1, 10, 4, 3, 1, 4, 2]
    }
  },
  computed: {
    showSleepTimeData() {
      return this.sleepTimeData.map(item => { 
        if (item <= 7) { 
          return {
            value: item,
            itemStyle: {
              color: '#FFB5C5'
            }
          }
        } else { 
          return item
        }
      })
    }
  },
  methods: {
    sleepTimeECharts() { 
      const myChart = echarts.init(this.$refs.sleepTime)
      // 配置图表
      const option = {
        title: {
          text: '睡眠&游戏时长统计'
        },
        tooltip: {},
        legend: {
          data: ['睡眠时长','游戏时长']
        },
        xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        yAxis: {},
        series: [
          {
            name: '睡眠时长',
            type: 'bar',
            //y轴数值
            data: this.showSleepTimeData
          },
          {
            name: '游戏时长',
            type: 'line',
            data: this.gameTimeData
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted() { 
    this.sleepTimeECharts()
  }
}
</script>

<style scoped>

</style>