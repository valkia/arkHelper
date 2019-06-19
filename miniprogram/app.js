"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("./utils/request.js");
App({
    onLaunch: function () {
        var _this = this;
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        wx.login({
            success: function (_res) {
            }
        });
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            _this.globalData.userInfo = res.userInfo;
                            if (_this.userInfoReadyCallback) {
                                _this.userInfoReadyCallback(res.userInfo);
                            }
                        }
                    });
                }
            }
        });
    },
    globalData: {},
    func: {
        get: http.get,
        post: http.post
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQTJDO0FBUzNDLEdBQUcsQ0FBUztJQUNWLFFBQVE7UUFBUixpQkFnQ0M7UUE5QkMsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUN4QixFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUcvQixFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxZQUFDLElBQUk7WUFHWixDQUFDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ1gsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBRXJDLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0JBQ2IsT0FBTyxFQUFFLFVBQUEsR0FBRzs0QkFFVixLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBOzRCQUd2QyxJQUFJLEtBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDOUIsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTs2QkFDekM7d0JBQ0gsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFVBQVUsRUFBRSxFQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0tBQ2hCO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy9hcHAudHNcbmltcG9ydCBodHRwID0gcmVxdWlyZSgnLi91dGlscy9yZXF1ZXN0LmpzJykgXG5leHBvcnQgaW50ZXJmYWNlIElNeUFwcCB7XG4gIHVzZXJJbmZvUmVhZHlDYWxsYmFjaz8ocmVzOiB3eC5Vc2VySW5mbyk6IHZvaWRcbiAgZ2xvYmFsRGF0YToge1xuICAgIHVzZXJJbmZvPzogd3guVXNlckluZm9cbiAgfVxuICBmdW5jOnt9XG59XG4gXG5BcHA8SU15QXBwPih7XG4gIG9uTGF1bmNoKCkge1xuICAgIC8vIOWxleekuuacrOWcsOWtmOWCqOiDveWKm1xuICAgIHZhciBsb2dzOiBudW1iZXJbXSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cbiAgICBsb2dzLnVuc2hpZnQoRGF0ZS5ub3coKSlcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnbG9ncycsIGxvZ3MpXG5cbiAgICAvLyDnmbvlvZVcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzKF9yZXMpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coX3Jlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIEgX3Jlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcbiAgICAgIH1cbiAgICB9KVxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgICAgICAgICAgaWYgKHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzLnVzZXJJbmZvKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGdsb2JhbERhdGE6IHtcbiAgfSxcbiAgZnVuYzoge1xuICAgIGdldDogaHR0cC5nZXQsXG4gICAgcG9zdDogaHR0cC5wb3N0XG4gIH0gXG59KSJdfQ==