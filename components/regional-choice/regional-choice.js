// components/regional-choice/regional-choice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    select: {
      province: '广东',
      city: '石家庄市'
    },
    province_list: [],
    city_list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    provinceClick: function(event){
      let province = event.currentTarget.dataset.province;
      console.log(province, 'province')
      this.getRegionTree(province.id).then(res => {
        this.setData({
          "select.province": province.name,
          city_list: res
        })
      })
    },
    cityClick: function (event){
      console.log(event)
      this.setData({
        "select.city": event.currentTarget.dataset.city
      });
      this.triggerEvent('customevent', event.currentTarget.dataset)
    },
    getRegionTree: function (pId){
      return new Promise((resolve, reject) => {
        getApp().request({
          url: getApp().api.Nodes.GetRegionTree,
          data: {
            pId: pId
          },
          success: (res) => {
            resolve(res.Data)
          }
        })
      })

    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行this.getRegionTree('00010003')
      this.getRegionTree('00010003').then(res => {
        this.setData({
          province_list: res
        });
      });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})