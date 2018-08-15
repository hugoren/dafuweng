Page({
  global: {
    timer: null,
    isRand: false
  },
  data: {
    userInfo: {},
    dice: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'],
    buttonType: 'primary',
    buttonValue: '摇一摇',
    isShow: 'hidden',
    num: 0,
    total: 0,
    station: 0, //用于记录当前位置
    listData: [
      { "first": "1", "second": "10元券", "third": "3", "fourth": "前进3步", "fifth": "5"},
      { "first": "10", "second": "退至5", "third": "8", "fourth": "7", "fifth": "平安积分" },
      { "first": "11", "second": "12", "third": "优酷视频", "fourth": "14", "fifth": "15"},
      { "first": "20", "second": "19", "third": "18", "fourth": "17", "fifth": "16" }
    ]
  },
  shakeClick: function () {
    let me = this;
    this.global.isRand = !this.global.isRand;
    if (this.global.isRand) {
      this.global.timer = setInterval(function () {
        let num = Math.floor(Math.random() * 6);
        me.setData({ num: num });
        me.setData({ total: num + 1 });
      }, 50);
    } else {
      clearInterval(this.global.timer);
    }

    this.setData({
      dice: this.data.dice,
      buttonType: (this.global.isRand) ? 'default' : 'primary',
      buttonValue: (this.global.isRand) ? '停止' : '摇一摇',
      isShow: (this.global.isRand) ? 'hidden' : 'show',
      //isShow1: (this.global.isRand) ? 'show' : 'hidden'
    });
  },
  onLoad: function () {
    console.log('onLoad')
  }
})
  