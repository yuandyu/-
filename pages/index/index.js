//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow: function(){
    let validator = {
      set: function (obj, prop, value) {
        console.log(obj, prop, value)
        if (prop === 'age') {
          if (!Number.isInteger(value)) {
            throw new TypeError('The age is not an integer');
          }
          if (value > 200) {
            throw new RangeError('The age seems invalid');
          }
        }

        // The default behavior to store the value
        obj[prop] = value;

        // 表示成功
        return true;
      },
      get: function (target, property, receiver){
        return 11;
      }
    };

    let person = new Proxy({
      name: 'yu'
    }, validator);

    person.age = 100;
    person.hh = 100;
    console.log(person.age); 
  },
  onLoad: function () {
  }
})
