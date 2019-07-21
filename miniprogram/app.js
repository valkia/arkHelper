"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("./utils/request.js");
App({
    onLaunch() {
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        wx.getSystemInfo({
            success: e => {
                console.log(e.statusBarHeight);
                this.globalData.StatusBar = e.statusBarHeight;
                this.globalData.CustomBar = e.statusBarHeight + 46;
            }
        });
        wx.login({
            success(_res) {
            }
        });
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo;
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res.userInfo);
                            }
                        }
                    });
                }
            }
        });
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                console.log(res);
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    updateManager.applyUpdate();
                                }
                            }
                        });
                    });
                    updateManager.onUpdateFailed(function () {
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开~',
                        });
                    });
                }
            });
        }
        else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，请升级到最新微信版本后重试。'
            });
        }
    },
    globalData: {
        ColorList: []
    },
    func: {
        get: http.get,
        post: http.post
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMkNBQTJDO0FBWTNDLEdBQUcsQ0FBUztJQUNWLFFBQVE7UUFFTixJQUFJLElBQUksR0FBYSxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ3hCLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRS9CLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDZixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxlQUFlLEdBQUUsRUFBRSxDQUFDO1lBSXBELENBQUM7U0FDRixDQUFDLENBQUE7UUFHRixFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxDQUFDLElBQUk7WUFHWixDQUFDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNmLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUVyQyxFQUFFLENBQUMsV0FBVyxDQUFDO3dCQUNiLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTs0QkFFYixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBOzRCQUd2QyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTs2QkFDekM7d0JBQ0gsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDbEMsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUE7WUFDM0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBUTtnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDaEIsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFO29CQUNqQixhQUFhLENBQUMsYUFBYSxDQUFDO3dCQUMxQixFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNYLEtBQUssRUFBRSxNQUFNOzRCQUNiLE9BQU8sRUFBRSxrQkFBa0I7NEJBQzNCLE9BQU8sRUFBRSxVQUFVLEdBQVE7Z0NBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtvQ0FDZixhQUFhLENBQUMsV0FBVyxFQUFFLENBQUE7aUNBQzVCOzRCQUNILENBQUM7eUJBQ0YsQ0FBQyxDQUFBO29CQUNKLENBQUMsQ0FBQyxDQUFBO29CQUNGLGFBQWEsQ0FBQyxjQUFjLENBQUM7d0JBQzNCLEVBQUUsQ0FBQyxTQUFTLENBQUM7NEJBQ1gsS0FBSyxFQUFFLFdBQVc7NEJBQ2xCLE9BQU8sRUFBRSw2QkFBNkI7eUJBQ3ZDLENBQUMsQ0FBQTtvQkFDSixDQUFDLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTyxFQUFFLHlCQUF5QjthQUNuQyxDQUFDLENBQUE7U0FDSDtJQUVILENBQUM7SUFHRCxVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUMsRUFBRTtLQUNiO0lBQ0QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0tBQ2hCO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy9hcHAudHNcclxuLy9AdHMtaWdub3JlXHJcbmltcG9ydCBodHRwID0gcmVxdWlyZSgnLi91dGlscy9yZXF1ZXN0LmpzJylcclxuZXhwb3J0IGludGVyZmFjZSBJTXlBcHAge1xyXG4gIHVzZXJJbmZvUmVhZHlDYWxsYmFjaz8ocmVzOiB3eC5Vc2VySW5mbyk6IHZvaWRcclxuICBnbG9iYWxEYXRhOiB7XHJcbiAgICB1c2VySW5mbz86IHd4LlVzZXJJbmZvLFxyXG4gICAgQ29sb3JMaXN0PzogW10sXHJcbiAgICBTdGF0dXNCYXI/OmFueSxcclxuICAgIEN1c3RvbUJhcj86IGFueVxyXG4gIH1cclxuICBmdW5jOiB7fVxyXG59XHJcblxyXG5BcHA8SU15QXBwPih7XHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICAvLyDlsZXnpLrmnKzlnLDlrZjlgqjog73liptcclxuICAgIHZhciBsb2dzOiBudW1iZXJbXSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cclxuICAgIGxvZ3MudW5zaGlmdChEYXRlLm5vdygpKVxyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2xvZ3MnLCBsb2dzKVxyXG5cclxuICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICBzdWNjZXNzOiBlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLnN0YXR1c0JhckhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLlN0YXR1c0JhciA9IGUuc3RhdHVzQmFySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5DdXN0b21CYXIgPSBlLnN0YXR1c0JhckhlaWdodCsgNDY7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIOeZu+W9lVxyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzKF9yZXMpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfcmVzLmNvZGUpXHJcbiAgICAgICAgLy8g5Y+R6YCBIF9yZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgIHd4LmdldFNldHRpbmcoe1xyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxyXG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcclxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxyXG4gICAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcy51c2VySW5mbylcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBpZiAod3guY2FuSVVzZSgnZ2V0VXBkYXRlTWFuYWdlcicpKSB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZU1hbmFnZXIgPSB3eC5nZXRVcGRhdGVNYW5hZ2VyKClcclxuICAgICAgdXBkYXRlTWFuYWdlci5vbkNoZWNrRm9yVXBkYXRlKGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICBpZiAocmVzLmhhc1VwZGF0ZSkgeyAvLyDor7fmsYLlrozmlrDniYjmnKzkv6Hmga/nmoTlm57osINcclxuICAgICAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVSZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmm7TmlrDmj5DnpLonLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmlrDniYjmnKzlt7Lnu4/lh4blpIflpb3vvIzmmK/lkKbph43lkK/lupTnlKjvvJ8nLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7Ly8g5paw55qE54mI5pys5bey57uP5LiL6L295aW977yM6LCD55SoIGFwcGx5VXBkYXRlIOW6lOeUqOaWsOeJiOacrOW5tumHjeWQr1xyXG4gICAgICAgICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZUZhaWxlZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7Ly8g5paw55qE54mI5pys5LiL6L295aSx6LSlXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/mnInmlrDniYjmnKzkuoblk59+JyxcclxuICAgICAgICAgICAgICBjb250ZW50OiAn5paw54mI5pys5bey57uP5LiK57q/5ZWmfu+8jOivt+aCqOWIoOmZpOW9k+WJjeWwj+eoi+W6j++8jOmHjeaWsOaQnOe0ouaJk+W8gH4nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3eC5zaG93TW9kYWwoey8vIOWmguaenOW4jOacm+eUqOaIt+WcqOacgOaWsOeJiOacrOeahOWuouaIt+err+S4iuS9k+mqjOaCqOeahOWwj+eoi+W6j++8jOWPr+S7pei/meagt+WtkOaPkOekulxyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSxcclxuXHJcblxyXG4gIGdsb2JhbERhdGE6IHtcclxuICAgIENvbG9yTGlzdDpbXVxyXG4gIH0sXHJcbiAgZnVuYzoge1xyXG4gICAgZ2V0OiBodHRwLmdldCxcclxuICAgIHBvc3Q6IGh0dHAucG9zdFxyXG4gIH1cclxufSkiXX0=