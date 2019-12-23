// pages/network-details/network-details.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    value: 5,
    nodeDetail: {},
    carWasherNodeID: "1" ,
    pageNumber: 1,
    msglist:[],
    totalCount: 0,
    show: false,
    showImg: '',
    IMG_HEAD: app.IMG_HEAD
  },
  /**
   * popup弹出
   */
  showPopup(event) {
    this.setData({ show: true, showImg : event.currentTarget.dataset.img });
  },
  /**
   * popup关闭
   */
  onClose() {
    this.setData({ show: false });
  },
  /**
   * tab切换
  */
  onChange(event) {
    console.log(event)
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.title}`,
    //   icon: 'none'
    // });
  },
  /**
   * 拨打电话
  */
  telCall(event){
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.tel //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().pages.onLoad(this, options);
    this.getNodeDetail(options.id);
    this.getconsumeevaluationlist(options.id);
  
    this.setData({
      distance: options.distance
    })
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
    if (this.data.totalCount != this.data.msglist.length) {
      this.getconsumeevaluationlist() 
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getNodeDetail: function(id){
    app.request({
      url: app.api.Nodes.GetNodeDetail,
      data: {
        nodeID: id
      },
      success: (res) => {
        this.setData({
          nodeDetail: res.Data
        })
      }
    })
  },
  navigation: function(event){
    let dataset = event.currentTarget.dataset;
    wx.openLocation({
      latitude: dataset.lat,
      longitude: dataset.lon,
      name: dataset.address
    })
  },
  /**
   * 获取评论
   */
  getconsumeevaluationlist: function(id) {
    app.request({
      url: app.api.Washer.GetConsumeEvaluationList,
      data: {
        carWasherNodeID: id,
        pageNumber: this.data.pageNumber
      },
      success: (reslist) => {
        let data = reslist.Data.Rows;
        console.log(reslist,'1')
        if (data !== null) {
          data.map(item => {
            if (item.Photo !== "") {
              item.Photo = item.Photo.split(",")
            }
          })
          data = this.data.msglist.concat(data);
        }
        this.setData({
          msglist: data,
          pageNumber: this.data.pageNumber + 1,
          totalCount: reslist.Data.TotalCount
        })
      } 
    })
  },
  bindNodeDetail: function(){
    if (getApp().getToken()){
      this.scanCode(getApp().api.Users.GetUsersInfo)
    } else{
      this.myLogin()
    }
  }
})