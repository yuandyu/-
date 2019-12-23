//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    logs: []
  },
  onShow: function(){
    app.page.selectedTab(1)
  },
  onLoad: function () {
    app.page.onLoad(this);
  }
})
