// pages/change/list/list.js
var app = getApp()
//@ts-ignore
import ArkResp = require('../../model/ArkResp.js');
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
      this.setData!({ pageIndex: 1 });
      this.getList();
    },
    getList:function(){
      let that = this;
      app.func.post('/changeList', { pageIndex: this.data.pageIndex, pageSize: this.data.pageSize, keyword: this.data.keyword  }, function (response: ArkResp) {
        if (response.status === 200) {

          let list = response.data;
          // list.forEach((item:any)=>{
          //   if (item.createdtime.slice(0, 10) === new Date().toISOString().slice(0, 10)) {
          //     item.createdtime = "今天";
          //   } else {
          //     item.createdtime = item.createdtime.slice(0, 10);//2014-07-01
          //   }
          // })
          

          that.setData!({ changeList: list });
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 150
          })
        }
      })
    },
    keywordInput: function (e: any){
        let keyword = e.detail.value;
      this.setData!({ keyword: keyword });
    },
    nextPage:function(){
      let page = this.data.pageIndex+1;
      this.setData!({ pageIndex: page });
      this.getList();
    },
    lastPage: function () {
      let page = this.data.pageIndex;
      this.setData!({ pageIndex: page-- });
      this.getList();
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getList();
    },
    ready: function () {
      console.log(66);
    },
    moved: function () {
      console.log(55);
     },
    detached: function () {
      
     },
    
  },
  pageLifetimes: {
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show: function () {
      this.getList();
    },
    hide: function () {
      console.log('Component-1 pageLifetimes >> Hide');
    }
  }
})