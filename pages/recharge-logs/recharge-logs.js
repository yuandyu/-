// pages/recharge-logs/recharge-logs.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNumber: 1,
    rechargelist: [],
    rechargesums:'',
    balance: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().pages.onLoad(this, options);
    this.gettechargeloglist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getApp().pages.onShow(this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.gettechargeloglist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取充值记录
   */
  gettechargeloglist: function () {
    app.request({
      url: app.api.Recharge.GetRechargeLogList,
      data:{
        pageNumber: this.data.pageNumber
      },
      success: (res) => {
        let balance = res.Data.Balance;
        let sum = res.Data.ChargeSumData;
        if (res.Data.TotalCount !== 0) {
          let data = this.data.rechargelist.concat(res.Data.Rows);
          console.log(res)
          this.setData({
            balance: balance,
            rechargesums: sum,
            rechargelist: data,
            pageNumber: this.data.pageNumber + 1
          })
        }
        this.setData({
          balance: balance,
          rechargesums: sum,
        })
      }
    })
  }
})