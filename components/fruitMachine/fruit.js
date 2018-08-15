/**
 * Class FruitMachine
 * @class
 * @classdesc 大富翁游戏逻辑部分
 * @author pfan
 * 
 * @example
 *  new FruitMachine(this,{
 *    len: 12, //宫格个数
 *    ret: 12, //抽奖结果对应值1～12   
 *    speed: 100  // 速度值
 *    callback: (idx, award) => {
 *      //结束回调， 参数对应宫格索引，对应奖项    
 *    }
 *  })
 */
 class FruitMachine {
  /**
   * @constructs FruitMachine构造函数
   * @param  {Object} pageContext page路由指针
   * @param  {Object} opts      组件所需参数
   * @param  {Number} opts.len  宫格个数
   * @param  {Number} opts.ret  抽奖结果对应值1～9
   * @param  {Number} opts.speed  速度值
   * @param  {Function} opts.callback  结束回调
   */  
  constructor (pageContext, opts) {
    this.page = pageContext
    this.len = opts.len || 12
    this.ret = opts.ret
    this.speed = opts.speed
    this.isStart = false
    this.endCallBack = opts.callback
    this.page.start = this.start.bind(this)
    this.position = opts.position
  }
  
  start () {
  
    let { idx, ret, len, speed, isStart, position} = this
    if (wx.getStorageSync('userInfo').score == 0){
      wx.showModal({
        title: '提示',
        content: '没有剩余次数，分享可以获得更多次数哦~',
        showCancel: false,
      })
    }
    if (wx.getStorageSync('userInfo').score == 0) {
      isStart = true
    }
    if(isStart)return
    position = getApp().globalData.position
    let range =  Math.floor(Math.random()*6)
    let count = 0
    let flag = false
    //let spd2 = speed*2
    !(function interval(self){
      setTimeout( () => {
        count++
        if (count != range + 1) {
          interval(self)
        }else{
          self.isStart = false
          getApp().globalData.position += count;
          console.info(count)
          console.info(getApp().globalData.position)
          getApp().globalData.count = count;
          self.endCallBack && self.endCallBack()
        }
        self.page.setData({
          machine: {
            idx: (position + count) % 12 == 0 ? 12 : (position + count) % 12,
          },
        })
      }, speed)
    })(this)
  }

  reset () {
     this.page.setData({
      machine: {
        count: '',
      }
    })   
  }
}

export default FruitMachine