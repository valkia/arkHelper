"use strict";
var app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        appId: "wx8abaf00ee8c3202e",
        extraData: {
            id: "64691",
            customData: {}
        }
    },
    methods: {
        showQrcode: function () {
            wx.previewImage({
                urls: ['https://wx1.sinaimg.cn/mw690/007RRq42gy1g4eofoktc1j30st0jyu0y.jpg'],
                current: 'https://wx1.sinaimg.cn/mw690/007RRq42gy1g4eofoktc1j30st0jyu0y.jpg'
            });
        },
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
        },
        moved: function () { },
        detached: function () { },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYm91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUE7QUFFbEIsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsb0JBQW9CO1FBQzNCLFNBQVMsRUFBRztZQUVWLEVBQUUsRUFBRSxPQUFPO1lBRVgsVUFBVSxFQUFFLEVBQUU7U0FDZjtLQUNGO0lBR0QsT0FBTyxFQUFFO1FBQ1AsVUFBVSxFQUFFO1lBQ1YsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDZCxJQUFJLEVBQUUsQ0FBQyxtRUFBbUUsQ0FBQztnQkFDM0UsT0FBTyxFQUFFLG1FQUFtRTthQUM3RSxDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0Y7SUFDRCxTQUFTLEVBQUU7UUFFVCxRQUFRLEVBQUUsY0FBYSxDQUFDO1FBQ3hCLEtBQUssRUFBRTtRQUNQLENBQUM7UUFDRCxLQUFLLEVBQUUsY0FBYyxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxjQUFjLENBQUM7S0FDMUI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL3RhZ3MuanNcclxudmFyIGFwcCA9IGdldEFwcCgpXHJcblxyXG5Db21wb25lbnQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgYXBwSWQ6IFwid3g4YWJhZjAwZWU4YzMyMDJlXCIsXHJcbiAgICBleHRyYURhdGEgOiB7XHJcbiAgICAgIC8vIOaKijEyMjHmlbDlrZfmjaLmiJDkvaDnmoTkuqflk4FJRO+8jOWQpuWImeS8mui3s+WIsOWIq+eahOS6p+WTgVxyXG4gICAgICBpZDogXCI2NDY5MVwiLFxyXG4gICAgICAvLyDoh6rlrprkuYnlj4LmlbDvvIzlhbfkvZPlj4LogIPmlofmoaNcclxuICAgICAgY3VzdG9tRGF0YToge31cclxuICAgIH1cclxuICB9LFxyXG5cclxuXHJcbiAgbWV0aG9kczoge1xyXG4gICAgc2hvd1FyY29kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgIHVybHM6IFsnaHR0cHM6Ly93eDEuc2luYWltZy5jbi9tdzY5MC8wMDdSUnE0Mmd5MWc0ZW9mb2t0YzFqMzBzdDBqeXUweS5qcGcnXSxcclxuICAgICAgICBjdXJyZW50OiAnaHR0cHM6Ly93eDEuc2luYWltZy5jbi9tdzY5MC8wMDdSUnE0Mmd5MWc0ZW9mb2t0YzFqMzBzdDBqeXUweS5qcGcnIC8vIOW9k+WJjeaYvuekuuWbvueJh+eahGh0dHDpk77mjqUgICAgICBcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgfSxcclxuICBsaWZldGltZXM6IHtcclxuICAgIC8vIOeUn+WRveWRqOacn+WHveaVsO+8jOWPr+S7peS4uuWHveaVsO+8jOaIluS4gOS4quWcqG1ldGhvZHPmrrXkuK3lrprkuYnnmoTmlrnms5XlkI1cclxuICAgIGF0dGFjaGVkOiBmdW5jdGlvbiAoKSB7fSxcclxuICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgbW92ZWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIGRldGFjaGVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgfVxyXG59KSJdfQ==