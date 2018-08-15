Page({
  data: {
    ret: 12, //取值1～12
    speed: 500,
    topval: 0,
    isClubShow:'clubhidden',
    displaySquare: 'block',
    displayClub: '',//骰子遮罩层
    animationTip:'a2 2s ease 1',
    animationData: 'a2 2s ease 1',//骰子动画参数
    tipLocation:'p0',//棋子的坐标类
    screenWidth: 0,
    screenHeight: 0,
    imagewidth: 0,//缩放后的宽
    imageheight: 0,//缩放后的高
    person:{
       start:3,//开始坐标位置
       step:2, //前进的步数
       de:-1    //当前前进的方向1前进 -1后退
    },
    isAn:true,//是否移动
    winnerdata: [{
      tel: 17323442363,
      txt: "88积分抵用券",
      time: '05/29'
    }, {
      tel: 15056921363,
      txt: "18积分抵用券",
      time: '05/29'
    }, {
      tel: 17723446545,
      txt: "88积分抵用券",
      time: '05/29'
    }, {
      tel: 18023445432,
      txt: "18积分抵用券",
      time: '05/29'
    }, {
      tel: 13623445654,
      txt: "188积分抵用券",
      time: '05/29'
    }, {
      tel: 17323445467,
      txt: "88积分抵用券",
      time: '05/29'
    }, {
      tel: 15323446578,
      txt: "18积分抵用券",
      time: '05/29'
    }, {
      tel: 18223446754,
      txt: "88积分抵用券",
      time: '05/29'
    }
    ]
  },
  getUserInfo: function () {
    return wx.getStorageSync('userInfo');
  },
  myPresent:function(){
    console.log("我的奖励");
  },
  getMyClub: function () {
    console.log("我要 骰子");
  },
  //加载背景图
  imageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width,    //获取图片真实高度
      $height = e.detail.height,
      ratio = $width / $height;   //图片的真实宽高比例
    var viewWidth = _this.data.screenWidth,           //设置图片显示宽度，
      viewHeight = _this.data.screenWidth / ratio;    //计算的高度值   
    this.setData({
      imagewidth: viewWidth,
      imageheight: viewHeight
    })

  },
  showClubView: function () {
    var that = this
    var isStart = that.beforeStart();
    console.log(isStart);
    if (!isStart) {
      var range = Math.floor(Math.random() * 6) + 1;
      /** * 筛子动画 */
      console.log("动画开始")
      that.setData({
        displayClub: "block",
        isClubShow:"clubshow"

      })
      console.log(getApp().globalData.count);
      that.setData({
        animationData: 'a' + range + ' 2s ease 1'
      });
      setTimeout(function () {
        that.setData({
          displayClub: "none",
          isClubShow: "clubhidden"
        })
        wx.showModal({
          title: '提示',
          content: '您掷出了' + range + '点',
          showCancel: false,
          success: (res) => {
            //this.reset()
            if (res.confirm) {
              console.log('用户点击确定')
              that.start(isStart, { 'start': getApp().globalData.position,'step':range,'de':1}, that.data.speed);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
            that.setData({
              isDisabled: true
            });
          }
        })

      }.bind(that), 2000)
    }
    /**动画结束** */
  },
  hideClubView: function () {
    this.setData({
      displayClub: "none"
    })
  },
  beforeStart: function () {
    var that = this
    that.setData({
      isDisabled: true
    });
    let isStart = false
    if (wx.getStorageSync('userInfo').score == 0) {
      wx.showModal({
        title: '提示',
        content: '没有剩余次数，分享可以获得更多次数哦~',
        showCancel: false,
      })
      return true;
    } else {
      return false;
    }
  },
/************
 * isFunc：是否是功能牌，如果是，剩余次数不减少
 */
  start: function (isStart, person, speed,isFunc) {
    var that = this
    var _start = person.start,
      _step = person.step,
      _de = person.de;
    that.setData({
      isDisabled: false
    });
    console.log("isStart:" + isStart);
    console.log("range:" + _step);
    
    if (wx.getStorageSync('userInfo').score == 0) {
     if(isFunc){//如果最后一次筛到功能牌
       isStart = false;
     } else{
       isStart = true
    }
    }
    let position = getApp().globalData.position
    if (isStart) return
    that.run(person, that.data.isAn, speed, isFunc);
  },
  scroll: function () {
    var that = this;
    setInterval(function () {
      if (that.data.topval == -384) {
        that.data.topval = 0;
      } else {
        that.data.topval -= 1;
      }
      that.setData({
        topval: that.data.topval
      })
    }, 30)
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
  /** 
 * 控制棋子的移动和棋盘坐标的转换
 *
 * @method run
 *
 * @param  {object}  person [棋子移动的坐标]
 * @param  {Boolean} isAn   [棋子是否需要移动]
 *@param speed [移动速度]
 * @return {object}         [棋子移动的坐标]
 */
  run: function (person, isAn, speed,isFunc) {
    var that = this;
    console.log("进入run函数");
    var _start = person.start,
      _step = person.step,
      _de = person.de;
    // 棋子移动过程的坐标集合
    var gameList = new Array();
    for (var i = 1; i <= _step; i++) {
      _start += _de;
      console.log(_start)
      if (_start == 42) {
        _start = 0
      }
      if (_start == -1) {
        _start = 42
      }
      gameList.push(_start);  // 将移动后的结果保存在集合中
    }
    console.log(gameList);
    // 当需要棋子移动时执行
    if (isAn) {
      console.log("棋子移动");
      var d = 0;
      var j = 0,
        d = 0,
        c = function (j) {
          d = setTimeout(function () {
            if (_de == -1) {
              j--;
            }
            if (_de == 1) {
              j++
            }
            that.setData({
              tipLocation: 'p' + gameList[0]
            });
            that.setData({
              machine: {
                idx: gameList[0],
              }
            })
            gameList.shift(0);
            if (gameList.length == 0) { // 如果棋子移动结束后则弹出相应的结果
              console.log("移动完毕");
              isAn = false;
              clearTimeout(d);
              getApp().globalData.position = _start;
              console.info(j)
              console.info(getApp().globalData.position)
              getApp().globalData.count = j;
              let sorce = that.data.userInfo.score
              if(isFunc){
                sorce = that.data.userInfo.score
              }else{
                sorce = --that.data.userInfo.score
              }
              that.setData({
                userInfo: {
                  name: that.data.userInfo.name,
                  score: sorce
                },
              });
              console.log("是否为功能牌" +isFunc+ "剩余次数" + that.data.userInfo.score + "sorce" + sorce);
              wx.setStorageSync('userInfo', that.data.userInfo);
              that.setData({
                isDisabled: false
              });
              if (getApp().globalData.position == 6) {
                wx.showModal({
                  title: '提示',
                  content: '后退三步',
                  showCancel: false,
                  success: (res) => {
                    //this.reset()
                    if (res.confirm) {
                      console.log('用户点击确定')
                      that.start(false, { start: 6, step: 3, de: -1 }, 100,true);
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                    that.setData({
                      isDisabled: true
                    });
                  }
                })
               
              }
              if (getApp().globalData.position == 2) {
                wx.showModal({
                  title: '提示',
                  content: '前进到十',
                  showCancel: false,
                  success: (res) => {
                    //this.reset()
                    if (res.confirm) {
                      console.log('用户点击确定')
                      that.start(false, { start: 2, step: 8, de: 1 }, 100, true);
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                    that.setData({
                      isDisabled: true
                    });
                  }
                })
                
              }
              if (getApp().globalData.position == 8) {
                wx.showModal({
                  title: '提示',
                  content: '前进两步',
                  showCancel: false,
                  success: (res) => {
                    //this.reset()
                    if (res.confirm) {
                      console.log('用户点击确定')
                      that.start(false, { start: 8, step: 2, de: 1 }, speed, true);
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                    that.setData({
                      isDisabled: true
                    });
                  }
                })
               
              }
            } else {
              c(j);
            }
          }, speed);
        };
      c(j);
    }
  },
  onLoad() {
    this.scroll();
    var that = this;
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });
    that.setData({
      userInfo: that.getUserInfo(),
      tipLocation: wx.getStorageSync('tipLocation')
    });
  },
  onReady() {
    console.log("onReady")
  },
  onUnload() {
    var that = this;
    console.log("onUnload");
    wx.setStorageSync('tipLocation', that.data.tipLocation);
  }

})