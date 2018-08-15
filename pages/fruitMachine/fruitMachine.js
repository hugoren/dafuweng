import FruitMachine from "../../components/fruitMachine/fruit.js"

Page({
  data: {

  },
  getUserInfo: function () {
    return wx.getStorageSync('userInfo');
  },
  onLoad () {
    var that = this;
    that.setData({
      userInfo: that.getUserInfo(),
    });
    this.fruitMachine = new FruitMachine(this, {
      ret: 12, //取值1～12
      speed: 500,
      position: getApp().globalData.position,
      callback: () => {
        that.setData({
          userInfo: {
            name: that.data.userInfo.name,
            score: --that.data.userInfo.score 
          },
        });
        wx.setStorageSync('userInfo', that.data.userInfo);
        wx.showModal({
          title: '提示',
          content: '您掷出了' + getApp().globalData.count + '点',
          showCancel: false,
          success: (res) => {
            this.fruitMachine.reset()
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })        
      }            
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      var that = this;
      that.setData({
        userInfo: {
          name: wx.getStorageSync('userInfo').name,
          score: ++wx.getStorageSync('userInfo').score
        }
      });
      wx.setStorageSync('userInfo', that.data.userInfo);
      console.log(res.target)
    }
    return {
      title: 'sinosoft大富翁',
      path: '/pages/fruitMachine?id=coldxiangyu',
      success: function (res) {
        
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  onReady () {
    console.log("onReady")    
  }

})