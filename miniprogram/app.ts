//app.ts
//@ts-ignore
import http = require('./utils/request.js')
export interface IMyApp {
  userInfoReadyCallback?(res: wx.UserInfo): void
  globalData: {
    userInfo?: wx.UserInfo,
    ColorList?: [],
    StatusBar?:any,
    CustomBar?: any
  }
  func: {}
}

App<IMyApp>({
  onLaunch() {
    // 展示本地存储能力
    var logs: number[] = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSystemInfo({
      success: e => {
        let statusBarHeight = 68//安卓
        if (e.model.indexOf('iPhone X') !== -1) {
          statusBarHeight = 88//iphone x
        } else if (e.model.indexOf('iPhone') !== -1) {
          statusBarHeight = 64 //iphone
        }
        console.log(e.statusBarHeight);
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = statusBarHeight;
        
        

      }
    })

    // 登录
    wx.login({
      success(_res) {
        // console.log(_res.code)
        // 发送 _res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res.userInfo)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    ColorList:[]
  },
  func: {
    get: http.get,
    post: http.post
  }
})