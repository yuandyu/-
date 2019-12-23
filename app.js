//app.js
const request = require('./utils/request.js'), api = require('./utils/api.js'), pages = require('./utils/pages.js'), util = require('/utils/util.js');
import $toast from '@vant/weapp/toast/toast';

App({
  util,
  request,
  api,
  pages,
  $toast,
  IMG_HEAD: 'http://cloud.chehaiyang.com',
  onLaunch: function () {
    // console.log(pages.setUserInfo())
    
  },
  onShow: function(){

  },
  globalData: {
  },
  userInfo: { },
  getToken: function(){
    return wx.getStorageSync("Token");
  }
})