"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("./utils/request.js");
App({
    onLaunch: function () {
        var _this = this;
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        wx.getSystemInfo({
            success: function (e) {
                _this.globalData.StatusBar = e.statusBarHeight;
                var custom = wx.getMenuButtonBoundingClientRect();
                _this.globalData.Custom = custom;
                _this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQTJDO0FBcUYzQyxHQUFHLENBQVM7SUFDVixRQUFRO1FBQVIsaUJBeUNDO1FBdkNDLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDeEIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFL0IsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUNmLE9BQU8sRUFBRSxVQUFBLENBQUM7Z0JBQ1IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQztnQkFDOUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLCtCQUErQixFQUFFLENBQUM7Z0JBQ2xELEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDN0UsQ0FBQztTQUNGLENBQUMsQ0FBQTtRQUdGLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLFlBQUMsSUFBSTtZQUdaLENBQUM7U0FDRixDQUFDLENBQUE7UUFFRixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osT0FBTyxFQUFFLFVBQUMsR0FBRztnQkFDWCxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFFckMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt3QkFDYixPQUFPLEVBQUUsVUFBQSxHQUFHOzRCQUVWLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7NEJBR3ZDLElBQUksS0FBSSxDQUFDLHFCQUFxQixFQUFFO2dDQUM5QixLQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBOzZCQUN6Qzt3QkFDSCxDQUFDO3FCQUNGLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsVUFBVSxFQUFFLEVBRVg7SUFDRCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7UUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7S0FDaEI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2FwcC50c1xyXG5pbXBvcnQgaHR0cCA9IHJlcXVpcmUoJy4vdXRpbHMvcmVxdWVzdC5qcycpIFxyXG5leHBvcnQgaW50ZXJmYWNlIElNeUFwcCB7XHJcbiAgdXNlckluZm9SZWFkeUNhbGxiYWNrPyhyZXM6IHd4LlVzZXJJbmZvKTogdm9pZFxyXG4gIGdsb2JhbERhdGE6IHtcclxuICAgIHVzZXJJbmZvPzogd3guVXNlckluZm8sXHJcbiAgICBDb2xvckxpc3Q6IFt7XHJcbiAgICAgIHRpdGxlOiAn5auj57qiJyxcclxuICAgICAgbmFtZTogJ3JlZCcsXHJcbiAgICAgIGNvbG9yOiAnI2U1NGQ0MidcclxuICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+ahlOapmScsXHJcbiAgICAgICAgbmFtZTogJ29yYW5nZScsXHJcbiAgICAgICAgY29sb3I6ICcjZjM3YjFkJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfmmI7pu4QnLFxyXG4gICAgICAgIG5hbWU6ICd5ZWxsb3cnLFxyXG4gICAgICAgIGNvbG9yOiAnI2ZiYmQwOCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5qmE5qaEJyxcclxuICAgICAgICBuYW1lOiAnb2xpdmUnLFxyXG4gICAgICAgIGNvbG9yOiAnIzhkYzYzZidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5qOu57u/JyxcclxuICAgICAgICBuYW1lOiAnZ3JlZW4nLFxyXG4gICAgICAgIGNvbG9yOiAnIzM5YjU0YSdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5aSp6Z2SJyxcclxuICAgICAgICBuYW1lOiAnY3lhbicsXHJcbiAgICAgICAgY29sb3I6ICcjMWNiYmI0J1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfmtbfok50nLFxyXG4gICAgICAgIG5hbWU6ICdibHVlJyxcclxuICAgICAgICBjb2xvcjogJyMwMDgxZmYnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+Wnuee0qycsXHJcbiAgICAgICAgbmFtZTogJ3B1cnBsZScsXHJcbiAgICAgICAgY29sb3I6ICcjNjczOWI2J1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfmnKjmp78nLFxyXG4gICAgICAgIG5hbWU6ICdtYXV2ZScsXHJcbiAgICAgICAgY29sb3I6ICcjOWMyNmIwJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfmoYPnsoknLFxyXG4gICAgICAgIG5hbWU6ICdwaW5rJyxcclxuICAgICAgICBjb2xvcjogJyNlMDM5OTcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+ajleikkCcsXHJcbiAgICAgICAgbmFtZTogJ2Jyb3duJyxcclxuICAgICAgICBjb2xvcjogJyNhNTY3M2YnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+eOhOeBsCcsXHJcbiAgICAgICAgbmFtZTogJ2dyZXknLFxyXG4gICAgICAgIGNvbG9yOiAnIzg3OTlhMydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn6I2J54GwJyxcclxuICAgICAgICBuYW1lOiAnZ3JheScsXHJcbiAgICAgICAgY29sb3I6ICcjYWFhYWFhJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfloqjpu5EnLFxyXG4gICAgICAgIG5hbWU6ICdibGFjaycsXHJcbiAgICAgICAgY29sb3I6ICcjMzMzMzMzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfpm4Xnmb0nLFxyXG4gICAgICAgIG5hbWU6ICd3aGl0ZScsXHJcbiAgICAgICAgY29sb3I6ICcjZmZmZmZmJ1xyXG4gICAgICB9LFxyXG4gICAgXVxyXG4gIH1cclxuICBmdW5jOnt9XHJcbn1cclxuIFxyXG5BcHA8SU15QXBwPih7XHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICAvLyDlsZXnpLrmnKzlnLDlrZjlgqjog73liptcclxuICAgIHZhciBsb2dzOiBudW1iZXJbXSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cclxuICAgIGxvZ3MudW5zaGlmdChEYXRlLm5vdygpKVxyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2xvZ3MnLCBsb2dzKVxyXG5cclxuICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICBzdWNjZXNzOiBlID0+IHtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuU3RhdHVzQmFyID0gZS5zdGF0dXNCYXJIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGN1c3RvbSA9IHd4LmdldE1lbnVCdXR0b25Cb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuQ3VzdG9tID0gY3VzdG9tO1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5DdXN0b21CYXIgPSBjdXN0b20uYm90dG9tICsgY3VzdG9tLnRvcCAtIGUuc3RhdHVzQmFySGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIOeZu+W9lVxyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzKF9yZXMpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfcmVzLmNvZGUpXHJcbiAgICAgICAgLy8g5Y+R6YCBIF9yZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgIHd4LmdldFNldHRpbmcoe1xyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxyXG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcclxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxyXG4gICAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcy51c2VySW5mbylcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZ2xvYmFsRGF0YToge1xyXG4gICAgXHJcbiAgfSxcclxuICBmdW5jOiB7XHJcbiAgICBnZXQ6IGh0dHAuZ2V0LFxyXG4gICAgcG9zdDogaHR0cC5wb3N0XHJcbiAgfSBcclxufSkiXX0=