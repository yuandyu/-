// pages/network-list/network-list.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: false,
    nodeName: '',
    noMore: false,
    address: '',
    nodeList: [],
    city: '广州',
    coreQrShow: false,
    regionNO: '',
    pageNumber: 1 // 地区请求页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().pages.onLoad(this, options);
    app.pages.getLocation(this.getNodeList)
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
    // this.getNodeList();
    getApp().pages.onShow(this)
    this.setData({
      loginStatus: getApp().getToken() ? true : false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
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
    let data = this.data;
    data.nodeList.length === data.totalCount ? this.setData({
      noMore: true
    }) : this.getNodeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 选择城市
   */
  regionalChoice: function(){
    this.setData({
      condition: !this.data.condition
    });
  },
  anotherEventListener: function(event){
    let address = event.detail;
    this.setData({
      address: address.province + address.city,
      condition: !this.data.condition,
      pageNumber: 1,
      nodeList: [],
      city: address.city,
      regionNO: address.id
    });
    this.getNodeList();
  },
  /**
   * 获取网点列表
   */
  getNodeList: function(){
    app.request({
      url: app.api.Nodes.GetNodeList,
      data: {
        pageNumber: this.data.pageNumber,
        pageSize: 10,
        lat: wx.getStorageSync('latitude') || 23.669682,
        log: wx.getStorageSync('longitude') || 114.724731,
        nodeName: this.data.nodeName,
        regionNO: this.data.regionNO
      },
      success: (res) => {
        let data = this.data.nodeList.concat(res.Data.Rows);
        this.setData({
          nodeList: data,
          pageNumber: this.data.pageNumber + 1,
          totalCount: res.Data.TotalCount
        })
      }
    })
  },

  /**
   * 搜索
   */
  bindSearch: function (event){
    this.setData({
      pageNumber: 1,
      nodeName: event.detail,
      nodeList: [],
      condition: false
    });
    this.getNodeList()
  },
  scanCodeShow: function(){
    this.scanCode(getApp().api.Users.GetUsersInfo)
  }
})