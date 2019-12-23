// pages/recharge/recharge.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: [],
    banner: [{
      url: 'http://cloud.chehaiyang.com/content/mobile/img/etc.png',
      appId: '',
      path: '/pages/mine/mine'
    }, {
      url: 'https://chy-vending-1253882812.cos.ap-guangzhou.myqcloud.com/Chy.CarWash/images/ad1.png',
      appId: 'wx1045ed196b15f9ca',
      path: ''
    }, {
      url: 'https://chy-vending-1253882812.cos.ap-guangzhou.myqcloud.com/Chy.CarWash/images/banner_710_250.png',
      appId: 'wx1045ed196b15f9ca',
      path: ''
    }],
    userInfo: {
      Mobile1: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().pages.onLoad(this, options);
    this.getRechargeViewInfo()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    getApp().pages.onShow(this)
    this.getUsersBaseInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 发起支付
  pay: function() {
    let payAmount = 0;
    this.data.amount.map(item => {
      if (item.select) {
        payAmount = item.rechargeAmount;
      }
    })
    app.request({
      url: app.api.Recharge.Pay,
      method: "POST",
      data: {
        "PayAmount": payAmount
      },
      success: (res) => {
        this.requestPayment(res.Data)
      }
    })
  },
  // 支付
  requestPayment: function(data) {
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
      success(res) {
        wx.redirectTo({
          url: '/pages/mine/mine',
        })
      },
      fail(res) {
        wx.showToast({
          title: '支付未完成，请重新支付',
          icon: 'none',
          duration: 5000
        })
      }
    })
  },
  // 获取充值金额
  getRechargeViewInfo: function() {
    getApp().request({
      url: getApp().api.Recharge.GetRechargeViewInfo,
      data: {
        infoMemID: wx.getStorageSync("InfoMemID")
      },
      success: res => {
        let rechargeAmount = 'RechargeAmount',
          giftAmount = 'GiftAmount',
          arr = [{}, {}, {}, {}, {}, {}];
        for (let i in res.Data.activity) {
          if (i.startsWith(rechargeAmount)) {
            arr[i.charAt(i.length - 1)].rechargeAmount = res.Data.activity[i]
          }
          if (i.startsWith(giftAmount)) {
            arr[i.charAt(i.length - 1)].giftAmount = res.Data.activity[i]
            arr[i.charAt(i.length - 1)].select = false
          }
        }
        arr[0].select = true;
        this.setData({
          amount: arr
        })
      }
    })
  },
  // 点击充值金额
  buttonClick: function(event) {
    // let event = event.currentTarget.dataset.item
    this.data.amount.map((item, index) => {
      if (item.rechargeAmount === event.currentTarget.dataset.item.rechargeAmount) {
        this.setData({
          ['amount[' + index + '].select']: true
        })
      } else {
        this.setData({
          ['amount[' + index + '].select']: false
        })
      }
    });
  }
})