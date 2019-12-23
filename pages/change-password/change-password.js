// pages/change-password/change-password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    smsText: '发送验证码',
    error: false,
    errorMessage: '',
    smsErrorMessage: '',
    password: '',
    code: '',
    icon: true,
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().pages.onLoad(this, options)
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
    this.setData({
      phone: wx.getStorageSync("Phone")
    })
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
   * 发送验证码
   */
  bindSms: function() {
    
  },
  /**
   * 倒计时
   */
  onChange: function(e) {
    this.setData({
      timeData: e.detail
    });
  },
  /**
   * 倒计时结束
   */
  finished: function() {
    this.setData({
      time: 0,
      smsText: '重新发送验证码'
    })
  },
  /**
   * 输入密码时判断
   */
  bindChange: function(e) {
    if ((/^\d+$/).test(e.detail)) {
      this.setData({
        error: false,
        errorMessage: '',
        password: e.detail
      })
    } else {
      this.setData({
        error: true,
        errorMessage: '将密码设置为6位数字',
        password: e.detail
      })
    }
  },
  /**
   * 显示密码
   */
  onClickIcon: function() {
    this.setData({
      icon: !this.data.icon
    })
  },
  /**
   * 设置验证码值
   */
  bindChangeSms: function(e) {
    this.setData({
      code: e.detail
    })
  },
  /**
   * 设置密码
   */
  updatePassword: function() {
    let data = this.data;
    function showT(title){
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 5000
      })
      return
    }
    if (data.icon && data.password.length !== 6) {
      showT('输入正确的密码')
    } else if (data.code.length !== 4){
      showT('输入正确的验证码')
    }
    getApp().request({
      url: getApp().api.Users.UpdatePassword,
      method: 'POST',
      data: {
        newPwd: data.password,
        code: data.code,
        phoneNo: data.phone
      },
      success: (res) => {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 5000
        })
        wx.redirectTo({
          url: '/pages/mine/mine'
        })
      }
    })
  },
  sendSMSCode: function(){
    getApp().request({
      url: getApp().api.SystemServe.SendSMSCode,
      method: 'POST',
      data: {
        phoneNo: this.data.phone,
        codeType: 0
      },
      success: (res) => {
        this.setData({
          time: 60 * 1000
        });
      }
    })
  }
})