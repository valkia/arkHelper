// pages/change/list/list.js
var app = getApp()
//@ts-ignore
import ArkResp = require('../../model/ArkResp.js');
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    changeList: [],
    CustomBar: app.globalData.CustomBar,
    keyword: '',
    pageIndex: 1,
    pageSize: 10
  },



  methods: {
    
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    },
    ready: function () {
    },
    moved: function () {
    },
    detached: function () {

    },

  },
  pageLifetimes: {
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show: function () {
    },
    hide: function () {
      console.log('Component-1 pageLifetimes >> Hide');
    }
  }
})