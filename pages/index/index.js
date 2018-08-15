//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {}
  },
  //进入游戏
  goGame: function() {
    wx.navigateTo({
      url: '../fruitMachine/fruitMachine'
    })
  },
  //进入游戏
  goToGame: function () {
    wx.navigateTo({
      url: '../game/game'
    })
  },
  //处理emoji表情
  killEmoji: function(text) {
    return text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  //登陆
  onLoad: function () {
    console.log('onLoad')
    wx.setStorageSync('userInfo', {score: 5 })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      userInfo.nickName = that.killEmoji(userInfo.nickName);
      if(!userInfo.nickName) {
        userInfo.nickName = 'Emoji';
      }
      wx.setStorageSync('userInfo', {name: userInfo.nickName, score: 70})
      console.log("hahah"+wx.getStorageSync('tipLocation'));
      if (wx.getStorageSync('tipLocation') == undefined || wx.getStorageSync('tipLocation') == '') {
        wx.setStorageSync('tipLocation', 'p0')
      } else {

      }
      //更新数据
      that.setData({
        userInfo:userInfo,
        motto: '欢迎您，' + userInfo.nickName
      })
    })
  }
})
