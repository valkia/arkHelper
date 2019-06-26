//tags.js
var app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    appId: "wx8abaf00ee8c3202e",
    extraData : {
      // 把1221数字换成你的产品ID，否则会跳到别的产品
      id: "64691",
      // 自定义参数，具体参考文档
      customData: {}
    }
  },


  methods: {
    showQrcode: function () {
      wx.previewImage({
        urls: ['https://wx1.sinaimg.cn/mw690/007RRq42gy1g4eofoktc1j30st0jyu0y.jpg'],
        current: 'https://wx1.sinaimg.cn/mw690/007RRq42gy1g4eofoktc1j30st0jyu0y.jpg' // 当前显示图片的http链接      
      })
    },
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    ready: function () {
    },
    moved: function () { },
    detached: function () { },
  }
})