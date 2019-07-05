// pages/change/list/list.js
var app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    changeList : [],
    CustomBar: app.globalData.CustomBar,
    keyword:'',
    pageIndex:1,
    pageSize:10
  },

  methods: {
    search:function(){
      let that = this;
      app.func.post('/changeList', { pageIndex: 1, pageSize: 10, keyword: this.data.keyword}, function (response: any) {
        that.setData!({ changeList: response });
      })
    },
    keywordInput: function (e: any){
        let keyword = e.detail.value;
      this.setData!({ keyword: keyword });
    },
    nextPage:function(){
      let page = this.data.pageIndex+1;
      this.setData!({ pageIndex: page });
      let that = this;
      app.func.post('/changeList', { pageIndex: this.data.pageIndex, pageSize: this.data.pageSize, keyword: this.data.keyword }, function (response: any) {
        that.setData!({ changeList: response });
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      })
    },
    lastPage: function () {
      let page = this.data.pageIndex;
      this.setData!({ pageIndex: page-- });
      let that = this;
      app.func.post('/changeList', { pageIndex: this.data.pageIndex, pageSize: this.data.pageSize, keyword: this.data.keyword }, function (response: any) {
        that.setData!({ changeList: response });
      })
    }
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
      console.log(66);
    },
    moved: function () {
      console.log(55);
     },
    detached: function () {
      let that = this;
      app.func.post('/changeList', { pageIndex: 1, pageSize: 10 }, function (response: any) {
        that.setData!({ changeList: response });
      })
     },
    
  },
  pageLifetimes: {
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show: function () {
      let that = this;
      app.func.post('/changeList', { pageIndex: 1, pageSize: 10 }, function (response: any) {
        that.setData!({ changeList: response });
      })
    },
    hide: function () {
      console.log('Component-1 pageLifetimes >> Hide');
    }
  }
})