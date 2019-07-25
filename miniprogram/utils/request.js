var rootDocment = 'https://ark.dtodo.cn:8080/ark';//正式域名
//var rootDocment = 'http://127.0.0.1:8080/ark';//本地开发
//var rootDocment = 'http://176.122.161.8:8080/ark';//正式域名

function success(res, cb){
  if (res.statusCode === 404) {
    wx.showToast({
      title: "系统升级中，请稍等",
      icon: "none",
      duration: 2000
    })
    return;
  }
  else if (res.statusCode === 200) {
  return typeof cb == "function" && cb(res.data)
  }
  else{
    wx.showToast({
      title: "系统出错啦，请联系管理员",
      icon: "none",
      duration: 2000
    })
    return;
  }
}

function fail(cb) {
  wx.showToast({
    title: "请检查网络或服务器升级中",
    icon: "none",
    duration: 2000
  })
  return typeof cb == "function" && cb(false)
}

function post(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return success(res, cb);
    },
    fail: function () {
      return fail(cb);
    }
  })
}

function get(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return success(res, cb);
    },
    fail: function () {
      return fail(cb);
    }
  })
}


module.exports = {
  post: post,
  get:get
}  