// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    tabs: [{
      value: 0,
      name: '全部'
    }, {
        value: 1,
        name: '待使用'
      }, {
        value: 2,
        name: '已使用'
      }, {
        value: 4,
        name: '已过期'
      }],
    state: 0,
    TotalCount: '',
    pageNumber: 1,
    noMsg: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().pages.onLoad(this, options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCouponList()
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
    if (this.data.couponList.length >= this.data.TotalCount) return;
    this.getCouponList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 优惠券列表
  */
  getCouponList: function(){
    getApp().request({
      url: getApp().api.RecordDetail.GetTicketSendList,
      data: {
        infoMemID: wx.getStorageSync('InfoMemID'),
        state: this.data.state,
        pageNumber: this.data.pageNumber,
        pageSize: 6
      },
      success: (res) => {
        let data = res.Data;
        if (data.TotalCount === 0){
          this.setData({
            noMsg: false
          })
        }
        this.setData({
          couponList: this.data.couponList.concat(data.Rows),
          TotalCount: data.TotalCount,
          pageNumber: this.data.pageNumber + 1
        })
      }
    })
  },

  /**
   * tab切换
  */
  onChange(event) {
    this.setData({
      state: event.detail.name,
      couponList: [], 
      pageNumber: 1,
      noMsg: true
    });
    this.getCouponList();
  },

  /**
   * 获取洗车券临时账号和二维码
  */
  getCouponVoucher: function(event){
    let dataset = event.currentTarget.dataset;
    if (dataset.state !== 1){
      let text = dataset.state === 4 ? '已经过期' : '已经使用'
      wx.showToast({
        title: '该洗车券' + text,
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: 'coupon-details?sendid=' + dataset.id,
    })
    // this.scanCode(getApp().api.RecordDetail.GetCouponVoucher, {sendid: dataset.id})
  }
})