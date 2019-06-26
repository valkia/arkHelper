// miniprogram/pages/book/heroList.js
Component({

  /**
   * 页面的初始数据
   */
  data: {

  },
  attached: function () {
    console.log(22);
  },
  ready: function () {
    console.log(11);
  },
  detached: function () {
    console.log(33);
  },
  moved: function () {
  },
  
  /**
   * 生命周期函数--监听页面加载
   */

methods:{
  bindViewTap: function () {
    wx.navigateTo({
      url: '../index/index'
    });
  },
},

})