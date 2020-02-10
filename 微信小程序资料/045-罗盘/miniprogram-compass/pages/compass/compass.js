// pages/compass/compass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    direction:"--",
    angle:"--",
    rotate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //开始罗盘操作
    let that = this
    wx.onCompassChange(function(res){
      //罗盘数据保留小数2位
      //console.log(res)
      let directions = res.direction.toFixed(2)
      let radios =res.direction.toFixed(0)
      that.setData({
        angle:directions,
        rotate: 360 - radios,
        direction: check(radios)
      })
    })
    //判断手机是否有陀螺仪
    /**
     * 外部检测，如果没有陀螺仪，代码是不会进入wx.onCompassChange事件的
     * 使用settimeout包裹代码，负责代码立即执行都会弹窗
     */
    setTimeout(() => {
      if (that.data.direction == '--' && that.data.angle == '--') {
        wx.showToast({
          title: '您的手机没有带电子罗盘或被禁用',
          icon: 'loading',
          duration: 5000,
          mask: true
        })
      }
    }, 3000);
    /**
       * 方向判断函数
       */
    function check(i){
      if (15 < i && i <= 75) {
        return '东北'
      } else if (75 < i && i < 105) {
        return '正东'
      } else if (105 < i && i < 195) {
        return '东南'
      } else if (165 < i && i < 195) {
        return '正南'
      } else if (195 < i && i <= 255) {
        return '正西'
      } else if (285 < i && i < 345) {
        return '西北'
      } else {
        return '正北'
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'我现在面向 '+ this.data.direction+" 方向，点我使用迷你指南针为您指引方向！",
      path:'/pages/compass/compass'
    }
  }
})