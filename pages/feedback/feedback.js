// pages/feedback/feedback.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messagelist: {
      "FeedbackContent": "",
      "FeedbackType": 1,
      "FeedbackImageList": []
    },
    message: '',
    typeData: [{
      name: '商品相关',
      id: 1,
      select: true
    }, {
      name: '服务相关',
      id: 3,
      select: false
    }, {
      name: '活动相关',
      id: 4,
      select: false
    }, {
      name: '网站相关',
      id: 5,
      select: false
    }, {
      name: '其他问题',
      id: 6,
      select: false
    }]
  },
  inputmsg: function (value) {
    console.log(value.detail)
    this.setData({
      ['messagelist.FeedbackContent']: value.detail
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  typeSelect: function(event){
    console.log(event.currentTarget.dataset.id)
    this.data.typeData.map((item, index) => {
      if (item.id === event.currentTarget.dataset.id){
        this.setData({
          ['typeData[' + index + '].select']: true,
          ['messagelist.FeedbackType']: event.currentTarget.dataset.id
        })
      } else{
        this.setData({
          ['typeData[' + index + '].select']: false
        })
      }
    })
  },
  /**
   *图片删除 
   */
  imgdelete: function (event) {
    console.log(event.detail.index)
    let index = event.detail.index
    this.data.messagelist.FeedbackImageList.splice(index, index + 1)
    console.log(this.data.messagelist)
    this.setData({
      ['messagelist.FeedbackImageList']: this.data.messagelist.FeedbackImageList
    })
  },
  /**
   *意见提交 
   */
  postfeedback: function () {
    app.request({
      url: app.api.SystemServe.PostFeedback,
      data: this.data.messagelist,
      method: "POST",
      success: (res) => {
        wx.redirectTo({
          url: './success'
        })
        console.log(res)
      }
    })
  },
  /**
   * 点击提交
   */
  postmsg: function () {
    if (this.data.messagelist.FeedbackContent == '') {
      wx.showToast({
        title: '请输入描述问题！',
        icon: 'none'
      })
    }else{
      this.postfeedback()
    }
  },
  /**
   * 图片上传
   */
  afterRead(event) {
    console.log(event)
    const { file } = event.detail;
    // 当设置 mutiple 为 true 是 file 是一个数组，mutiple 默认为 false，file 是一个对象
    wx.uploadFile({
      url: app.api.Picture.UploadImg, //仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      success: (res) => {
        var data = JSON.parse(res.data);
        let img = data.Data;
        console.log(this.data.messagelist.FeedbackImageList, 'this.data.fileList')
        this.data.messagelist.FeedbackImageList.push({
          "url": img,
          "ImgName" : '图片'
        })
        this.setData({
          ['messagelist.FeedbackImageList']: this.data.messagelist.FeedbackImageList
        });
      }
    });
  }
})