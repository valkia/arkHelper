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
                    title: '支持识别截图的公开招募助手',
                    desc: '支持识别截图的公开招募助手'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxjQUFjO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUErQkQsV0FBVyxDQUFDLENBQU07UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixPQUFPLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRztTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsR0FBUTtRQUV4QixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3hCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRTtnQkFDakMsT0FBTztvQkFDTCxLQUFLLEVBQUUsZUFBZTtvQkFDdEIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DLENBQUE7YUFFRjtpQkFDSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUU7Z0JBQ3RDLE9BQU87b0JBQ0wsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLElBQUksRUFBRSxlQUFlO2lCQUN0QixDQUFBO2FBRUY7aUJBQ0ksSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFO2dCQUN0QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssR0FBRyxhQUFhLENBQUE7aUJBQ3RCO2dCQUNELE9BQU87b0JBQ0wsS0FBSyxFQUFFLEtBQUs7b0JBQ1osSUFBSSxFQUFFLEtBQUs7b0JBQ1gsUUFBUSxFQUFFLHdCQUF3QjtpQkFFbkMsQ0FBQTthQUNGO2lCQUVJO2dCQUNILE9BQU87b0JBQ0wsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLElBQUksRUFBRSxlQUFlO29CQUNyQixRQUFRLEVBQUUsd0JBQXdCO2lCQUNuQyxDQUFBO2FBQ0Y7U0FDRjthQUdJO1lBQ0gsT0FBTztnQkFDTCxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSx3QkFBd0I7YUFDbkMsQ0FBQTtTQUVGO0lBR0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vaW5kZXguanNcclxuLy/ojrflj5blupTnlKjlrp7kvotcclxuaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgbW90dG86ICfngrnlh7sg4oCc57yW6K+R4oCdIOS7peaehOW7uicsXHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICBQYWdlQ3VyOiBcImJhc2ljc1wiXHJcbiAgfSxcclxuICAvL+S6i+S7tuWkhOeQhuWHveaVsFxyXG4gIGJpbmRWaWV3VGFwKCkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4uL3RhZ3MvdGFncydcclxuICAgIH0pXHJcbiAgfSxcclxuICAvLyBvbkxvYWQoKSB7XHJcbiAgLy8gICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAvLyAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgLy8gICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gIC8vICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gIC8vICAgICB9KVxyXG4gIC8vICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuY2FuSVVzZSl7XHJcbiAgLy8gICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgLy8gICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAvLyAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IChyZXMpID0+IHtcclxuICAvLyAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAvLyAgICAgICAgIHVzZXJJbmZvOiByZXMsXHJcbiAgLy8gICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZVxyXG4gIC8vICAgICAgIH0pXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXHJcbiAgLy8gICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAvLyAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gIC8vICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAvLyAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gIC8vICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gIC8vICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZVxyXG4gIC8vICAgICAgICAgfSlcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH0pXHJcbiAgLy8gICB9XHJcbiAgLy8gfSxcclxuXHJcbiAgXHJcbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcclxuICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBOYXZDaGFuZ2UoZTogYW55KSB7XHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgUGFnZUN1cjogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VyXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzOiBhbnkpIHtcclxuICAgIFxyXG4gICAgaWYgKHJlcy5mcm9tID09IFwiYnV0dG9uXCIpIHtcclxuICAgICAgaWYgKHJlcy50YXJnZXQuZGF0YXNldC5pZCA9PT0gJzEnKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiAn5pSv5oyB6K+G5Yir5oiq5Zu+55qE5YWs5byA5oub5Yuf5Yqp5omLJyxcclxuICAgICAgICAgIGRlc2M6ICfmlK/mjIHor4bliKvmiKrlm77nmoTlhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6ICcuLi8uLi9pbWFnZXMvYXJrMTEucG5nJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAocmVzLnRhcmdldC5kYXRhc2V0LmlkID09PSAnMycpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6ICfmlK/mjIHor4bliKvmiKrlm77nmoTlhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgICAgZGVzYzogJ+aUr+aMgeivhuWIq+aIquWbvueahOWFrOW8gOaLm+WLn+WKqeaJiydcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHJlcy50YXJnZXQuZGF0YXNldC5pZCA9PT0gJzInKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NoYW5nZUNsdWUnKVxyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgIHZhbHVlID0gXCLlv6vmnaXmib7liLDkvaDpnIDopoHnmoTnur/ntKJ+XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB2YWx1ZSxcclxuICAgICAgICAgIGRlc2M6IHZhbHVlLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6ICcuLi8uLi9pbWFnZXMvYXJrNjYuanBnJ1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+aUr+aMgeivhuWIq+aIquWbvueahOWFrOW8gOaLm+WLn+WKqeaJiycsXHJcbiAgICAgICAgICBkZXNjOiAn5pSv5oyB6K+G5Yir5oiq5Zu+55qE5YWs5byA5oub5Yuf5Yqp5omLJyxcclxuICAgICAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL2FyazExLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+m7mOiupFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGl0bGU6ICfmlK/mjIHor4bliKvmiKrlm77nmoTlhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgIGRlc2M6ICfmlK/mjIHor4bliKvmiKrlm77nmoTlhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL2FyazExLmpwZycsXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICB9LFxyXG59KVxyXG4iXX0=