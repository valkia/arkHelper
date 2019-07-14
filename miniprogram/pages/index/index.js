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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxjQUFjO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUE4QkQsV0FBVyxDQUFDLENBQU07UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixPQUFPLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRztTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsR0FBUTtRQUV4QixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3hCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRTtnQkFDakMsT0FBTztvQkFDTCxLQUFLLEVBQUUsZUFBZTtvQkFDdEIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DLENBQUE7YUFFRjtpQkFDSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUU7Z0JBQ3RDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQzNDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxHQUFHLGFBQWEsQ0FBQTtpQkFDdEI7Z0JBQ0QsT0FBTztvQkFDTCxLQUFLLEVBQUUsS0FBSztvQkFDWixJQUFJLEVBQUUsS0FBSztvQkFDWCxRQUFRLEVBQUUsd0JBQXdCO2lCQUVuQyxDQUFBO2FBQ0Y7aUJBRUk7Z0JBQ0gsT0FBTztvQkFDTCxLQUFLLEVBQUUsZUFBZTtvQkFDdEIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DLENBQUE7YUFDRjtTQUNGO2FBR0k7WUFDSCxPQUFPO2dCQUNMLEtBQUssRUFBRSxlQUFlO2dCQUN0QixJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLHdCQUF3QjthQUNuQyxDQUFBO1NBRUY7SUFHSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbmRleC5qc1xyXG4vL+iOt+WPluW6lOeUqOWunuS+i1xyXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBtb3R0bzogJ+eCueWHuyDigJznvJbor5HigJ0g5Lul5p6E5bu6JyxcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIFBhZ2VDdXI6IFwiYmFzaWNzXCJcclxuICB9LFxyXG4gIC8v5LqL5Lu25aSE55CG5Ye95pWwXHJcbiAgYmluZFZpZXdUYXAoKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiAnLi4vdGFncy90YWdzJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIC8vIG9uTG9hZCgpIHtcclxuICAvLyAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gIC8vICAgICB0aGlzLnNldERhdGEhKHtcclxuICAvLyAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXHJcbiAgLy8gICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgLy8gICAgIH0pXHJcbiAgLy8gICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKXtcclxuICAvLyAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAvLyAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxyXG4gIC8vICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gKHJlcykgPT4ge1xyXG4gIC8vICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gIC8vICAgICAgICAgdXNlckluZm86IHJlcyxcclxuICAvLyAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXHJcbiAgLy8gICAgICAgfSlcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSBlbHNlIHtcclxuICAvLyAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcclxuICAvLyAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gIC8vICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgLy8gICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gIC8vICAgICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgLy8gICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXHJcbiAgLy8gICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXHJcbiAgLy8gICAgICAgICB9KVxyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfSlcclxuICAvLyAgIH1cclxuICAvLyB9LFxyXG5cclxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxyXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIE5hdkNoYW5nZShlOiBhbnkpIHtcclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICBQYWdlQ3VyOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJcclxuICAgIH0pXHJcbiAgfSxcclxuICBvblNoYXJlQXBwTWVzc2FnZShyZXM6IGFueSkge1xyXG4gICAgXHJcbiAgICBpZiAocmVzLmZyb20gPT0gXCJidXR0b25cIikge1xyXG4gICAgICBpZiAocmVzLnRhcmdldC5kYXRhc2V0LmlkID09PSAnMScpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6ICfmlK/mjIHor4bliKvmiKrlm77nmoTlhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgICAgZGVzYzogJ+aUr+aMgeivhuWIq+aIquWbvueahOWFrOW8gOaLm+WLn+WKqeaJiycsXHJcbiAgICAgICAgICBpbWFnZVVybDogJy4uLy4uL2ltYWdlcy9hcmsxMS5wbmcnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChyZXMudGFyZ2V0LmRhdGFzZXQuaWQgPT09ICcyJykge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjaGFuZ2VDbHVlJylcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IFwi5b+r5p2l5om+5Yiw5L2g6ZyA6KaB55qE57q/57SiflwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogdmFsdWUsXHJcbiAgICAgICAgICBkZXNjOiB2YWx1ZSxcclxuICAgICAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL2FyazY2LmpwZydcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6ICfmlK/mjIHor4bliKvmiKrlm77nmoTlhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgICAgZGVzYzogJ+aUr+aMgeivhuWIq+aIquWbvueahOWFrOW8gOaLm+WLn+WKqeaJiycsXHJcbiAgICAgICAgICBpbWFnZVVybDogJy4uLy4uL2ltYWdlcy9hcmsxMS5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/pu5jorqRcclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiAn5pSv5oyB6K+G5Yir5oiq5Zu+55qE5YWs5byA5oub5Yuf5Yqp5omLJyxcclxuICAgICAgICBkZXNjOiAn5pSv5oyB6K+G5Yir5oiq5Zu+55qE5YWs5byA5oub5Yuf5Yqp5omLJyxcclxuICAgICAgICBpbWFnZVVybDogJy4uLy4uL2ltYWdlcy9hcmsxMS5qcGcnLFxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgfSxcclxufSlcclxuIl19