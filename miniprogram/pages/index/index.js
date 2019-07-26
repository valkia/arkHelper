"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = getApp();
Page({
    data: {
        motto: '点击 “编译” 以构建',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        PageCur: "basics"
    },
    bindViewTap() {
        wx.navigateTo({
            url: '../tags/tags'
        });
    },
    getUserInfo(e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },
    NavChange(e) {
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        });
    },
    onShareAppMessage(res) {
        if (res.from == "button") {
            if (res.target.dataset.id === '1') {
                return {
                    title: '支持识别截图的公开招募助手',
                    desc: '支持识别截图的公开招募助手',
                    imageUrl: '../../images/ark11.png'
                };
            }
            else if (res.target.dataset.id === '3') {
                return {
                    title: '支持识别截图的公开招募助手2',
                    desc: '支持识别截图的公开招募助手2'
                };
            }
            else if (res.target.dataset.id === '2') {
                var value = wx.getStorageSync('changeClue');
                if (!value) {
                    value = "快来找到你需要的线索~";
                }
                return {
                    title: value,
                    desc: value,
                    imageUrl: '../../images/ark66.jpg'
                };
            }
            else {
                return {
                    title: '支持识别截图的公开招募助手',
                    desc: '支持识别截图的公开招募助手',
                    imageUrl: '../../images/ark11.png'
                };
            }
        }
        else {
            return {
                title: '支持识别截图的公开招募助手',
                desc: '支持识别截图的公开招募助手',
                imageUrl: '../../images/ark11.jpg',
            };
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxjQUFjO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUErQkQsV0FBVyxDQUFDLENBQU07UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixPQUFPLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRztTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsR0FBUTtRQUV4QixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3hCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRTtnQkFDakMsT0FBTztvQkFDTCxLQUFLLEVBQUUsZUFBZTtvQkFDdEIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DLENBQUE7YUFFRjtpQkFDSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUU7Z0JBQ3RDLE9BQU87b0JBQ0wsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsSUFBSSxFQUFFLGdCQUFnQjtpQkFDdkIsQ0FBQTthQUVGO2lCQUNJLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRTtnQkFDdEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDM0MsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEdBQUcsYUFBYSxDQUFBO2lCQUN0QjtnQkFDRCxPQUFPO29CQUNMLEtBQUssRUFBRSxLQUFLO29CQUNaLElBQUksRUFBRSxLQUFLO29CQUNYLFFBQVEsRUFBRSx3QkFBd0I7aUJBRW5DLENBQUE7YUFDRjtpQkFFSTtnQkFDSCxPQUFPO29CQUNMLEtBQUssRUFBRSxlQUFlO29CQUN0QixJQUFJLEVBQUUsZUFBZTtvQkFDckIsUUFBUSxFQUFFLHdCQUF3QjtpQkFDbkMsQ0FBQTthQUNGO1NBQ0Y7YUFHSTtZQUNILE9BQU87Z0JBQ0wsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsd0JBQXdCO2FBQ25DLENBQUE7U0FFRjtJQUdILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2luZGV4LmpzXHJcbi8v6I635Y+W5bqU55So5a6e5L6LXHJcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIG1vdHRvOiAn54K55Ye7IOKAnOe8luivkeKAnSDku6XmnoTlu7onLFxyXG4gICAgdXNlckluZm86IHt9LFxyXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxyXG4gICAgUGFnZUN1cjogXCJiYXNpY3NcIlxyXG4gIH0sXHJcbiAgLy/kuovku7blpITnkIblh73mlbBcclxuICBiaW5kVmlld1RhcCgpIHtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ICcuLi90YWdzL3RhZ3MnXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8gb25Mb2FkKCkge1xyXG4gIC8vICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgLy8gICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gIC8vICAgICAgIHVzZXJJbmZvOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyxcclxuICAvLyAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAvLyAgICAgfSlcclxuICAvLyAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmNhbklVc2Upe1xyXG4gIC8vICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxyXG4gIC8vICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XHJcbiAgLy8gICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSAocmVzKSA9PiB7XHJcbiAgLy8gICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgLy8gICAgICAgICB1c2VySW5mbzogcmVzLFxyXG4gIC8vICAgICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAvLyAgICAgICB9KVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICAvLyDlnKjmsqHmnIkgb3Blbi10eXBlPWdldFVzZXJJbmZvIOeJiOacrOeahOWFvOWuueWkhOeQhlxyXG4gIC8vICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgLy8gICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAvLyAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgLy8gICAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAvLyAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAvLyAgICAgICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAvLyAgICAgICAgIH0pXHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICB9KVxyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIFxyXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xyXG4gICAgY29uc29sZS5sb2coZSlcclxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXHJcbiAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgTmF2Q2hhbmdlKGU6IGFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIFBhZ2VDdXI6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1clxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlczogYW55KSB7XHJcbiAgICBcclxuICAgIGlmIChyZXMuZnJvbSA9PSBcImJ1dHRvblwiKSB7XHJcbiAgICAgIGlmIChyZXMudGFyZ2V0LmRhdGFzZXQuaWQgPT09ICcxJykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+aUr+aMgeivhuWIq+aIquWbvueahOWFrOW8gOaLm+WLn+WKqeaJiycsXHJcbiAgICAgICAgICBkZXNjOiAn5pSv5oyB6K+G5Yir5oiq5Zu+55qE5YWs5byA5oub5Yuf5Yqp5omLJyxcclxuICAgICAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL2FyazExLnBuZydcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHJlcy50YXJnZXQuZGF0YXNldC5pZCA9PT0gJzMnKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiAn5pSv5oyB6K+G5Yir5oiq5Zu+55qE5YWs5byA5oub5Yuf5Yqp5omLMicsXHJcbiAgICAgICAgICBkZXNjOiAn5pSv5oyB6K+G5Yir5oiq5Zu+55qE5YWs5byA5oub5Yuf5Yqp5omLMidcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHJlcy50YXJnZXQuZGF0YXNldC5pZCA9PT0gJzInKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NoYW5nZUNsdWUnKVxyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgIHZhbHVlID0gXCLlv6vmnaXmib7liLDkvaDpnIDopoHnmoTnur/ntKJ+XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB2YWx1ZSxcclxuICAgICAgICAgIGRlc2M6IHZhbHVlLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6ICcuLi8uLi9pbWFnZXMvYXJrNjYuanBnJ1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+aUr+aMgeivhuWIq+aIquWbvueahOWFrOW8gOaLm+WLn+WKqeaJiycsXHJcbiAgICAgICAgICBkZXNjOiAn5pSv5oyB6K+G5Yir5oiq5Zu+55qE5YWs5byA5oub5Yuf5Yqp5omLJyxcclxuICAgICAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL2FyazExLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+m7mOiupFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGl0bGU6ICfmlK/mjIHor4bliKvmiKrlm77nmoTlhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgIGRlc2M6ICfmlK/mjIHor4bliKvmiKrlm77nmoTlhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL2FyazExLmpwZycsXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICB9LFxyXG59KVxyXG4iXX0=