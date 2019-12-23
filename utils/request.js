// 封装wx.request
module.exports = function(data){
  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    url: data.url, //仅为示例，并非真实的接口地址
    data: data.data || {},
    method: data.method || 'GET',
    dataType: data.dataType || 'json',
    header: data.header || {
      'content-type': 'application/json', // 默认值
      'Authorization': 'Bearer ' + getApp().getToken()
    },
    success(res) {
      wx.hideLoading();
      if (res.data.Code == 0){
        data.success && data.success(res.data);
      } else if (res.statusCode == 401){
        wx.clearStorage();
        wx.showToast({
          title: '请先进行登陆授权',
          icon: 'none',
          duration: 5000
        })
        wx.redirectTo({
          url: '/pages/mine/mine'
        })
      } else{
        wx.showToast({
          title: res.data.Msg,
          icon: 'none',
          duration: 5000
        })
      }
    },
    fail(fail){
      console.log(fail, 'fail')
      data.fail && data.fail(fail);
    },
    complete(complete) {
      data.complete && data.complete(complete);
    }
  })
}