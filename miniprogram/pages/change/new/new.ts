// pages/change/new/new.js
var app = getApp()
import ArkResp = require('../../model/ArkResp.js');
Page({
  data: {
    id: "",
    server: null,
    serverIndex: null,
    serverList: ['官服', 'B服', '其他'],
    clueList: {
      "need": [{ name: "1", showFlag: false }, { name: "2", showFlag: false }, { name: "3", showFlag: false }, { name: "4", showFlag: false }, { name: "5", showFlag: false }, { name: "6", showFlag: false }, { name: "7", showFlag: false }],
      "have": [{ name: "1", showFlag: false }, { name: "2", showFlag: false }, { name: "3", showFlag: false }, { name: "4", showFlag: false }, { name: "5", showFlag: false }, { name: "6", showFlag: false }, { name: "7", showFlag: false }]
    },
    remark: "",
    loading: false
  },




  PickerChange(e: any) {

    console.log(e);
    let tmp = this.data.serverList[e.detail.value];
    this.setData!({
      serverIndex: e.detail.value,
      server: tmp
    })
  },

  InputChange: function (e: any) {
    console.log(e.target.dataset.type);
    console.log(e.detail.value)
    let type = e.target.dataset.type;
    if (type === 'remark') {
      this.setData!({
        remark: e.detail.value
      })
    } else if (type === 'id') {
      this.setData!({
        id: e.detail.value
      })
    }

  },



  clickClue(e: any) {
    console.log(e);
    let type = e.target.dataset.type;
    let clue = e.target.dataset.title;

    let clueTmp = this.data.clueList[type][clue];
    clueTmp.showFlag = !clueTmp.showFlag;
    let clueString = "clueList['" + type + "'][" + clue + "]";
    this.setData!({
      clueList: this.data.clueList
    });
  },
  saveChange() {
    //判断空
    if (!this.data.id) {
      wx.showToast({
        title: "请输入游戏id",
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (!this.data.server) {
      wx.showToast({
        title: "请选择游戏区服",
        icon: "none",
        duration: 2000
      })
      return;
    }


    let needFlag = false;
    let needStr = "";
    this.data.clueList['need'].forEach((clue: any) => {
      if (clue.showFlag) {
        needFlag = true;
        needStr += clue.name + " "
      }
    })

    let haveFlag = false;
    let haveStr = "";
    this.data.clueList['have'].forEach((clue: any) => {
      if (clue.showFlag) {
        haveFlag = true;
        haveStr += clue.name + " "
      }
    })

    if (!needFlag) {
      wx.showToast({
        title: "请选择至少一个需要的线索",
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (!haveFlag) {
      wx.showToast({
        title: "请选择至少一个用来交换的线索",
        icon: "none",
        duration: 2000
      })
      return;
    }
    let req = { id: this.data.id, server: this.data.server, remark: this.data.remark, clueList: this.data.clueList }
    let that = this;
    let changeClueStr = this.data.id + " " + this.data.server + " " + haveStr + " 换 " + needStr;
    that.setData!({
      loading: true
    });
    app.func.post('/postChange', req, function (response: ArkResp) {
      console.log(response);

      if (response.status === 200) {
        wx.setStorage({
          key: "changeClue",
          data: changeClueStr
        })
        that.setData!({
          loading: false
        });
        wx.showToast({
          title: "发布成功",
          icon: "none",
          duration: 2000
        })
        wx.navigateBack({     //返回上一页面或多级页面
          delta: 1
        })
      }
    })
  }

})