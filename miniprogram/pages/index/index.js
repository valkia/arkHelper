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
                    title: '明日方舟助手-公开招募助手',
                    desc: '想知道你的公开招募会来什么干员？',
                    imageUrl: '../../images/ark11.png'
                };
            }
            else if (res.target.dataset.id === '2') {
                var value = wx.getStorageSync('changeClue');
                if (!value) {
                    value = "快来找到你需要的线索~";
                }
                return {
                    title: '明日方舟助手-线索交换',
                    desc: value,
                    imageUrl: '../../images/ark66.jpg'
                };
            }
            else {
                return {
                    title: '明日方舟助手-公开招募助手',
                    desc: '想知道你的公开招募会来什么干员？',
                    imageUrl: '../../images/ark11.png'
                };
            }
        }
        else {
            return {
                title: '明日方舟-公开招募助手',
                desc: '想知道你的公开招募会来什么干员？',
                imageUrl: '../../images/ark11.jpg',
            };
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxjQUFjO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUE4QkQsV0FBVyxDQUFDLENBQU07UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixPQUFPLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRztTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsR0FBUTtRQUV4QixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3hCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRTtnQkFDakMsT0FBTztvQkFDTCxLQUFLLEVBQUUsZUFBZTtvQkFDdEIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsUUFBUSxFQUFFLHdCQUF3QjtpQkFDbkMsQ0FBQTthQUVGO2lCQUNJLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRTtnQkFDdEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDM0MsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEdBQUcsYUFBYSxDQUFBO2lCQUN0QjtnQkFDRCxPQUFPO29CQUNMLEtBQUssRUFBRSxhQUFhO29CQUNwQixJQUFJLEVBQUUsS0FBSztvQkFDWCxRQUFRLEVBQUUsd0JBQXdCO2lCQUVuQyxDQUFBO2FBQ0Y7aUJBQ0k7Z0JBQ0gsT0FBTztvQkFDTCxLQUFLLEVBQUUsZUFBZTtvQkFDdEIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsUUFBUSxFQUFFLHdCQUF3QjtpQkFDbkMsQ0FBQTthQUNGO1NBQ0Y7YUFHSTtZQUNILE9BQU87Z0JBQ0wsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLFFBQVEsRUFBRSx3QkFBd0I7YUFDbkMsQ0FBQTtTQUVGO0lBR0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vaW5kZXguanNcclxuLy/ojrflj5blupTnlKjlrp7kvotcclxuaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgbW90dG86ICfngrnlh7sg4oCc57yW6K+R4oCdIOS7peaehOW7uicsXHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXHJcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICBQYWdlQ3VyOiBcImJhc2ljc1wiXHJcbiAgfSxcclxuICAvL+S6i+S7tuWkhOeQhuWHveaVsFxyXG4gIGJpbmRWaWV3VGFwKCkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4uL3RhZ3MvdGFncydcclxuICAgIH0pXHJcbiAgfSxcclxuICAvLyBvbkxvYWQoKSB7XHJcbiAgLy8gICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAvLyAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgLy8gICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gIC8vICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gIC8vICAgICB9KVxyXG4gIC8vICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuY2FuSVVzZSl7XHJcbiAgLy8gICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgLy8gICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAvLyAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IChyZXMpID0+IHtcclxuICAvLyAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAvLyAgICAgICAgIHVzZXJJbmZvOiByZXMsXHJcbiAgLy8gICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZVxyXG4gIC8vICAgICAgIH0pXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXHJcbiAgLy8gICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAvLyAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gIC8vICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAvLyAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gIC8vICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gIC8vICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZVxyXG4gIC8vICAgICAgICAgfSlcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH0pXHJcbiAgLy8gICB9XHJcbiAgLy8gfSxcclxuXHJcbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcclxuICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBOYXZDaGFuZ2UoZTogYW55KSB7XHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgUGFnZUN1cjogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VyXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzOiBhbnkpIHtcclxuICAgIFxyXG4gICAgaWYgKHJlcy5mcm9tID09IFwiYnV0dG9uXCIpIHtcclxuICAgICAgaWYgKHJlcy50YXJnZXQuZGF0YXNldC5pZCA9PT0gJzEnKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiAn5piO5pel5pa56Iif5Yqp5omLLeWFrOW8gOaLm+WLn+WKqeaJiycsXHJcbiAgICAgICAgICBkZXNjOiAn5oOz55+l6YGT5L2g55qE5YWs5byA5oub5Yuf5Lya5p2l5LuA5LmI5bmy5ZGY77yfJyxcclxuICAgICAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL2FyazExLnBuZydcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHJlcy50YXJnZXQuZGF0YXNldC5pZCA9PT0gJzInKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NoYW5nZUNsdWUnKVxyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgIHZhbHVlID0gXCLlv6vmnaXmib7liLDkvaDpnIDopoHnmoTnur/ntKJ+XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiAn5piO5pel5pa56Iif5Yqp5omLLee6v+e0ouS6pOaNoicsXHJcbiAgICAgICAgICBkZXNjOiB2YWx1ZSxcclxuICAgICAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL2FyazY2LmpwZydcclxuICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+aYjuaXpeaWueiIn+WKqeaJiy3lhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgICAgZGVzYzogJ+aDs+efpemBk+S9oOeahOWFrOW8gOaLm+WLn+S8muadpeS7gOS5iOW5suWRmO+8nycsXHJcbiAgICAgICAgICBpbWFnZVVybDogJy4uLy4uL2ltYWdlcy9hcmsxMS5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/pu5jorqRcclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiAn5piO5pel5pa56IifLeWFrOW8gOaLm+WLn+WKqeaJiycsXHJcbiAgICAgICAgZGVzYzogJ+aDs+efpemBk+S9oOeahOWFrOW8gOaLm+WLn+S8muadpeS7gOS5iOW5suWRmO+8nycsXHJcbiAgICAgICAgaW1hZ2VVcmw6ICcuLi8uLi9pbWFnZXMvYXJrMTEuanBnJyxcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gIH0sXHJcbn0pXHJcbiJdfQ==