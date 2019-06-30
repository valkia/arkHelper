// pages/change/list/list.js
var app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    changeList : []

  },


  methods: {

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      let that = this;
      app.func.post('/changeList', {pageIndex:1,pageSize:10}, function (response: any) {
        that.setData!({changeList : response});
      })
    },
    ready: function () {
    },
    moved: function () { },
    detached: function () { },
  }
})