(function () {
    var obj = {
        init: function () {
            this.getData();
            this.option = {
                title: {
                    text: '',
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    // 地区/性别
                    data: []
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        // 数据
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        },
        getData: function () {
            var self = this;
            $.ajax({
                url:"http://api.duyiedu.com/api/student/findAll?appkey=52891375_1559024080793",
                success: function (data) {
                    var data = JSON.parse(data);
                    console.log(data);
                    self.areaChart(data.data);
                    self.sexChart(data.data);
                }
            })
        },
        areaChart: function (data) {
            var myAreaChart = echarts.init($('.area')[0]);
            var legendArr = [], seriesArr = [];
            var numObj = {};
            data.forEach(function (ele, index) {
                if (!numObj[ele.address]) {
                    numObj[ele.address] = 1;
                    legendArr.push(ele.address);
                } else {
                    numObj[ele.address]++;
                }
            })
            for (var prop in numObj) {
                var obj = {};
                obj.name = prop;
                obj.value = numObj[prop]
                seriesArr.push(obj);
            }
            this.option.title.text = '渡一教育学生地区分布统计';
            this.option.legend.data = legendArr;
            this.option.series[0].data = seriesArr;
            var option = this.option;
            myAreaChart.setOption(option);
        },
        sexChart: function (data) {
            var mySexChart = echarts.init($('.sex')[0]);
            var legendArr = ['男', '女'], seriesArr = [{ '男': '' }, { '女': '' }];
            var numObj = {};
            data.forEach(function (ele, index) {
                if (!numObj[ele.sex]) {
                    numObj[ele.sex] = 1;
                } else {
                    numObj[ele.sex]++;
                }
            });
            seriesArr = [{ value: numObj[0], name: '男' }, { value: numObj[1], name: '女' }];
            this.option.legend.data = legendArr;
            this.option.series[0].data = seriesArr;
            this.option.title.text = '渡一教育学生性别统计';
            mySexChart.setOption(this.option);
        }
    };
    obj.init();
})();