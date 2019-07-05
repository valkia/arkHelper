//index.js
//获取应用实例
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({
  data: {
    motto: '点击 “编译” 以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    PageCur: "basics"
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../tags/tags'
    })
  },
  // onLoad() {
  //   if (app.globalData.userInfo) {
  //     this.setData!({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true,
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = (res) => {
  //       this.setData!({
  //         userInfo: res,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData!({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },

  getUserInfo(e: any) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData!({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  NavChange(e: any) {
    this.setData!({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage(res: any) {
    var that = this;
    if (res.from == "button") {
      if (res.target.dataset.id === '1') {
        return {
          title: '明日方舟助手-公开招募助手',
          desc: '想知道你的公开招募会来什么干员？',
          imageUrl: '../../images/scan.png'
        }

      }
      else if (res.target.dataset.id === '2') {
        var value = wx.getStorageSync('changeClue')
        if (!value) {
          value = "快来找到你需要的线索~"
        }
        return {
          title: '明日方舟助手-线索交换',
          desc: value,
          imageUrl: '../../images/scan.png'
         
        }
      }
      else {
        return {
          title: '明日方舟助手-公开招募助手',
          desc: '想知道你的公开招募会来什么干员？',
          imageUrl: '../../images/scan.png'
        }
      }
    }

    //默认
    else {
      return {
        title: '明日方舟-公开招募助手',
        desc: '想知道你的公开招募会来什么干员？',
        imageUrl: '../../images/scan.png',
      }

    }


  },
})
