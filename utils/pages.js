// 处理一些页面上的逻辑
import drawQrcode from './weapp.qrcode.esm.js'
module.exports = {
  currentPage: null, // 当前页面数据
  currentPageOptions: {}, // 当前页面参数
  navbarPages: ['pages/recharge/recharge', 'pages/invite/invite', 'pages/recharge-logs/recharge-logs', 'pages/cost-logs/cost-logs', 'pages/news/news', 'pages/coupon/coupon', 'pages/invite-logs/invite-logs', 'pages/invite/new-invite', 'pages/feedback/feedback'],
  onLoad: function(t, e) {
    this.currentPage = t, this.currentPageOptions = e;
    let _this = this;
    if (this.currentPageOptions.hasOwnProperty('scene')) {
      wx.setStorageSync("invitationCode", this.currentPageOptions.scene);
    }
    void 0 === t.bindgetuserinfo && (t.bindgetuserinfo = function(e) {
      _this.bindgetuserinfo(e)
    }), void 0 === t.myLogin && (t.myLogin = function(type) {
      _this.myLogin(type)
    }), void 0 === t.getUserInfo && (t.getUserInfo = function(e) {
      _this.getUserInfo(e)
    }), void 0 === t.getLogin && (t.getLogin = function(e) {
      _this.getLogin(e)
    }), void 0 === t.clickOverlay && (t.clickOverlay = function() {
      _this.clickOverlay()
    }), void 0 === t.onChangeCheckbox && (t.onChangeCheckbox = function(t) {
      _this.onChangeCheckbox(t)
    }), void 0 === t.getUsersBaseInfo && (t.getUsersBaseInfo = function() {
      _this.getUsersBaseInfo(t)
    }), void 0 === t.getPhoneNumber && (t.getPhoneNumber = function(t) {
      _this.getPhoneNumber(t)
      }), void 0 === t.coreQrShowClose && (t.coreQrShowClose = function () {
      _this.coreQrShowClose(t)
      }), void 0 === t.scanCode && (t.scanCode = function (api, data) {
      _this.scanCode(api, data)
      });
    this.setPageNavbar()
  }, 
  onShow: function(e){
    this.currentPage = e;
  },
  // 设置userLocation
  getSetting: function(fn) {
    wx.getSetting({
      scope: 'scope.userLocation',
      success(res) {
        fn;
      }
    })
  },
  // 设置用户地址坐标
  getLocation: function(fn) {
    this.getSetting(
      wx.getLocation({
        success(res) {
          wx.setStorageSync('latitude', res.latitude);
          wx.setStorageSync('longitude', res.longitude);
        },
        complete() {
          fn();
        }
      })
    )
  },
  // 登陆授权拿code
  myLogin: function(event) {
    let type = 'user_info_show';
    if (void 0 !== event) {
      type = event.hasOwnProperty('currentTarget') ? event.currentTarget.dataset.type : event
    }
    /* 
     * type => 授权类型  user_info_show：用户，get_phone_number： 手机号
     */
    wx.login({
      success: (res) => {
        console.log(res, '登陆success')
        this.currentPage.setData({
          [type]: true,
          js_code: res.code
        })
      },
      fail: () => {
        console.log('fail', '登陆')
      }
    })
  },
  // 点击登陆
  bindgetuserinfo: function(event) {
    this.getUserInfo(event);
    this.clickOverlay();
  },
  // 登陆
  getUserInfo: function(e) {
    wx.getUserInfo({
      success: () => {
        console.log('getUserInfo')
        this.getLogin(e.detail);
      }
    })
  },
  // 授权登陆
  getLogin: function(info) {
    console.log(this.currentPage.data.js_code, info.iv, info.encryptedData, wx.getStorageSync('invitationCode'),  'info')
    getApp().request({
      url: getApp().api.Users.Login,
      data: {
        js_code: this.currentPage.data.js_code,
        iv: info.iv,
        encryptedData: info.encryptedData,
        invitationCode: wx.getStorageSync('invitationCode') || '' // 邀请码
      },
      success: (res) => {
        wx.setStorageSync('Token', res.Data.Token);
        wx.setStorageSync('InfoMemID', res.Data.InfoMemID);
        wx.setStorageSync('Phone', res.Data.Phone);
        wx.removeStorageSync('invitationCode');
        if (res.Data.Phone === "" || res.Data.Phone === null || res.Data.Phone === undefined || res.Data.Phone === "undefined"){
          this.myLogin('get_phone_number');
        }
        this.currentPage.onShow();
      }
    })
  },
  // 取消授权
  clickOverlay: function() {
    this.currentPage.setData({
      user_info_show: false,
      get_phone_number: false
    })
  },
  // 获取用户信息
  getUsersBaseInfo: function() {
    getApp().request({
      url: getApp().api.Users.GetUsersBaseInfo,
      data: {
        infoMemID: wx.getStorageSync("InfoMemID")
      },
      success: res => {
        this.currentPage.setData({
          userInfo: res.Data,
          loginStatus: true
        });
        wx.setStorageSync('Phone', res.Data.Mobile1);
      }
    })
  },
  getPhoneNumber: function(e) {
    getApp().request({
      url: getApp().api.Users.BindingPhone,
      data: {
        js_code: this.currentPage.data.js_code,
        iv: e.detail.iv,
        phoneencryptedData: e.detail.encryptedData
      },
      success: res => {
        wx.setStorageSync('Phone', res.Data);
        this.currentPage.onShow();
      },
      complete: () => {
        this.clickOverlay()
      }
    })
  },
  // 判断页面需要登陆
  setPageNavbar() {
    if (void 0 === getApp().getToken()) {
      this.navbarPages.map(item => {
        if (item === this.currentPage.route) {
          wx.showToast({
            title: '请先进行登陆授权',
            icon: 'none',
            duration: '3000'
          })
          wx.redirectTo({
            url: '/pages/mine/mine'
          })
        }
      })
    }
  },
  /*
  * 二维码显示
  */
  coreQrShowClose: function () {
    this.currentPage.setData({
      coreQrShow: false
    })
  },
  /**
   * 获取二维码
  */
  scanCode: function (api, data = {}) {
    getApp().request({
      url: api,
      data: data,
      success: (res) => {
        this.getSystemInfo()
        this.currentPage.setData({
          userInfo: res.Data,
          coreQrShow: true
        })
        drawQrcode({
          width: 190,
          height: 190,
          canvasId: 'myQrcode',
          text: res.Data.QrCodeStr
        })
      }
    })
  },
  getSystemInfo(){
    wx.getSystemInfo({
      success: res => {
        let windowHeight = (190 * (750 / res.windowWidth));
        this.currentPage.setData({
          user_qrcode_w: windowHeight
        })
      }
    })
  }
 
}