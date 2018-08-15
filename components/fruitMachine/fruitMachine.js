Page({
  data: {
    userInfo: {},
    bet: 0, // 下注的筹码
    betByCalculate: 0, // 用于计算
    sigleScore: 0, // 本次得分
    showDiceTemplateArray: [], // 用于存储显示哪些骰子模版
    showDiceArray: [0, 1, 2], // 用于存储随机数
    gaming: false, //判断是否在游戏中
    moneyClass: '', // 用于添加金额的动画类
    chipsClass: '', // 用于添加闪烁动画类
    finger: { // 用于移动定位
      Y: 0,
      X: 0
    },
    showBet: false, // 是否显示黑盘中的筹码
    timeArray: []
  },
 
})
