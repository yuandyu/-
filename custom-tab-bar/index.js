Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "success",
      selectedIconPath: "success",
      text: "组件"
    }, {
      pagePath: "/pages/logs/logs",
        iconPath: "plus",
        selectedIconPath: "plus",
      text: "接口"
      }, {
        pagePath: "/pages/logs/logs",
        iconPath: "plus",
        selectedIconPath: "plus",
        text: "接口"
      }, {
      pagePath: "/pages/logs/logs",
        iconPath: "plus",
        selectedIconPath: "plus",
      text: "接口"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({url})
    }
  }
})