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
        var that = this;
        if (res.from == "button") {
            if (res.target.dataset.id === '1') {
                return {
                    title: '明日方舟助手-公开招募助手',
                    desc: '想知道你的公开招募会来什么干员？',
                    imageUrl: '../../images/scan.png'
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
                    imageUrl: '../../images/scan.png'
                };
            }
            else {
                return {
                    title: '明日方舟助手-公开招募助手',
                    desc: '想知道你的公开招募会来什么干员？',
                    imageUrl: '../../images/scan.png'
                };
            }
        }
        else {
            return {
                title: '明日方舟-公开招募助手',
                desc: '想知道你的公开招募会来什么干员？',
                imageUrl: '../../images/scan.png',
            };
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxjQUFjO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUE4QkQsV0FBVyxDQUFDLENBQU07UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixPQUFPLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRztTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsR0FBUTtRQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN4QixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUU7Z0JBQ2pDLE9BQU87b0JBQ0wsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDLENBQUE7YUFFRjtpQkFDSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUU7Z0JBQ3RDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQzNDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxHQUFHLGFBQWEsQ0FBQTtpQkFDdEI7Z0JBQ0QsT0FBTztvQkFDTCxLQUFLLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsUUFBUSxFQUFFLHVCQUF1QjtpQkFFbEMsQ0FBQTthQUNGO2lCQUNJO2dCQUNILE9BQU87b0JBQ0wsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDLENBQUE7YUFDRjtTQUNGO2FBR0k7WUFDSCxPQUFPO2dCQUNMLEtBQUssRUFBRSxhQUFhO2dCQUNwQixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixRQUFRLEVBQUUsdUJBQXVCO2FBQ2xDLENBQUE7U0FFRjtJQUdILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2luZGV4LmpzXHJcbi8v6I635Y+W5bqU55So5a6e5L6LXHJcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIG1vdHRvOiAn54K55Ye7IOKAnOe8luivkeKAnSDku6XmnoTlu7onLFxyXG4gICAgdXNlckluZm86IHt9LFxyXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxyXG4gICAgUGFnZUN1cjogXCJiYXNpY3NcIlxyXG4gIH0sXHJcbiAgLy/kuovku7blpITnkIblh73mlbBcclxuICBiaW5kVmlld1RhcCgpIHtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ICcuLi90YWdzL3RhZ3MnXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8gb25Mb2FkKCkge1xyXG4gIC8vICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgLy8gICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gIC8vICAgICAgIHVzZXJJbmZvOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyxcclxuICAvLyAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAvLyAgICAgfSlcclxuICAvLyAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmNhbklVc2Upe1xyXG4gIC8vICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxyXG4gIC8vICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XHJcbiAgLy8gICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSAocmVzKSA9PiB7XHJcbiAgLy8gICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgLy8gICAgICAgICB1c2VySW5mbzogcmVzLFxyXG4gIC8vICAgICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAvLyAgICAgICB9KVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICAvLyDlnKjmsqHmnIkgb3Blbi10eXBlPWdldFVzZXJJbmZvIOeJiOacrOeahOWFvOWuueWkhOeQhlxyXG4gIC8vICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgLy8gICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAvLyAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgLy8gICAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAvLyAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAvLyAgICAgICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAvLyAgICAgICAgIH0pXHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICB9KVxyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xyXG4gICAgY29uc29sZS5sb2coZSlcclxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXHJcbiAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgTmF2Q2hhbmdlKGU6IGFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIFBhZ2VDdXI6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1clxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlczogYW55KSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBpZiAocmVzLmZyb20gPT0gXCJidXR0b25cIikge1xyXG4gICAgICBpZiAocmVzLnRhcmdldC5kYXRhc2V0LmlkID09PSAnMScpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGl0bGU6ICfmmI7ml6XmlrnoiJ/liqnmiYst5YWs5byA5oub5Yuf5Yqp5omLJyxcclxuICAgICAgICAgIGRlc2M6ICfmg7Pnn6XpgZPkvaDnmoTlhazlvIDmi5vli5/kvJrmnaXku4DkuYjlubLlkZjvvJ8nLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6ICcuLi8uLi9pbWFnZXMvc2Nhbi5wbmcnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChyZXMudGFyZ2V0LmRhdGFzZXQuaWQgPT09ICcyJykge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjaGFuZ2VDbHVlJylcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IFwi5b+r5p2l5om+5Yiw5L2g6ZyA6KaB55qE57q/57SiflwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+aYjuaXpeaWueiIn+WKqeaJiy3nur/ntKLkuqTmjaInLFxyXG4gICAgICAgICAgZGVzYzogdmFsdWUsXHJcbiAgICAgICAgICBpbWFnZVVybDogJy4uLy4uL2ltYWdlcy9zY2FuLnBuZydcclxuICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0aXRsZTogJ+aYjuaXpeaWueiIn+WKqeaJiy3lhazlvIDmi5vli5/liqnmiYsnLFxyXG4gICAgICAgICAgZGVzYzogJ+aDs+efpemBk+S9oOeahOWFrOW8gOaLm+WLn+S8muadpeS7gOS5iOW5suWRmO+8nycsXHJcbiAgICAgICAgICBpbWFnZVVybDogJy4uLy4uL2ltYWdlcy9zY2FuLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+m7mOiupFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGl0bGU6ICfmmI7ml6XmlrnoiJ8t5YWs5byA5oub5Yuf5Yqp5omLJyxcclxuICAgICAgICBkZXNjOiAn5oOz55+l6YGT5L2g55qE5YWs5byA5oub5Yuf5Lya5p2l5LuA5LmI5bmy5ZGY77yfJyxcclxuICAgICAgICBpbWFnZVVybDogJy4uLy4uL2ltYWdlcy9zY2FuLnBuZycsXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICB9LFxyXG59KVxyXG4iXX0=