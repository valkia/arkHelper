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
    getTimeAgo: function (dateTimeStamp: number) {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
      let result = "";
      var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      //var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();   //获取当前时间毫秒
      console.log(now)
      var diffValue = now - dateTimeStamp;//时间差

      if (diffValue < 0) {
        return;
      }
      var minC = diffValue / minute;
      //计算时间差的分，时，天，周，月
      var hourC = diffValue / hour;
      var dayC = diffValue / day;
      var weekC = diffValue / week;
      var monthC = diffValue / month;
      if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC.toString()) + "月前"
      } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC.toString()) + "周前"
      } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC.toString()) + "天前"
      } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC.toString()) + "小时前"
      } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC.toString()) + "分钟前"
      } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
      } else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        //var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        //var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        //var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
      }
      return result;
    },
    search: function () {
      this.setData!({ pageIndex: 1 });
      this.getList();
    },
    getList: function () {
      let that = this;
      app.func.post('/changeList', { pageIndex: this.data.pageIndex, pageSize: this.data.pageSize, keyword: this.data.keyword }, function (response: ArkResp) {
        if (response.status === 200) {

          let list = response.data;

          list.forEach((item: any) => {
            item.createdtime = that.getTimeAgo(new Date(item.CreatedAt).getTime());
          })


          that.setData!({ changeList: list });
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 150
          })
        }
      })
    },
    keywordInput: function (e: any) {
      let keyword = e.detail.value;
      this.setData!({ keyword: keyword });
    },
    nextPage: function () {
      let page = this.data.pageIndex + 1;
      this.setData!({ pageIndex: page });
      this.getList();
    },
    lastPage: function () {
      let page = this.data.pageIndex;
      this.setData!({ pageIndex: page-- });
      this.getList();
    },
    // 一键复制事件
    copyBtn: function (e: any) {
      wx.setClipboardData({
        //准备复制的数据
        data: e.target.dataset.name,
        success: function () {
          wx.showToast({
            title: '复制成功',
          });
        }
      });
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getList();
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
      this.getList();
    },
    hide: function () {
      console.log('Component-1 pageLifetimes >> Hide');
    }
  }
})