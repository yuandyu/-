// pages/coupon/coupon-details.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    qrcode_w: 170,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().pages.onLoad(this, options);
    wx.getSystemInfo({
      success: res =>{
        let windowHeight = (170 * (750 / res.windowWidth)); 
        this.setData({
          qrcode_w: windowHeight
        })
      }
    })
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
    this.getCouponVoucher()
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
  /**
   * 获取洗车券临时账号和二维码
   */
  getCouponVoucher: function() {
    this.setData({
      canvasImg: ''
    })
    getApp().request({
      url: getApp().api.RecordDetail.GetCouponVoucher,
      data: {
        sendid: 2
      },
      success: (res) => {
        drawQrcode({
          width: 170,
          height: 170,
          canvasId: 'myQrcode',
          text: res.Data.QrCodeStr
        });
        this.setData(res.Data);
      }
    })
  },
  showCouponAccount: function(){
    wx.canvasToTempFilePath({
      canvasId: 'myQrcode',
      success: (res) => {
        console.log(res.tempFilePath)
        this.setData({
          canvasImg: res.tempFilePath
        })
      }
    })
    this.setData({
      show: true
    })
  },
  onClose: function(){
    this.setData({
      show: false
    })
  }
})