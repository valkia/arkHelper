"use strict";
var app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        changeList: [],
        CustomBar: app.globalData.CustomBar,
    },
    methods: {},
    lifetimes: {
        attached: function () {
            let that = this;
            app.func.post('/changeList', { pageIndex: 1, pageSize: 10 }, function (response) {
                that.setData({ changeList: response });
            });
        },
        ready: function () {
        },
        moved: function () { },
        detached: function () { },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFBO0FBRWxCLFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFHLEVBQUU7UUFDZixTQUFTLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTO0tBRXBDO0lBR0QsT0FBTyxFQUFFLEVBRVI7SUFDRCxTQUFTLEVBQUU7UUFFVCxRQUFRLEVBQUU7WUFDUixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUUsVUFBVSxRQUFhO2dCQUM3RSxJQUFJLENBQUMsT0FBUSxDQUFDLEVBQUMsVUFBVSxFQUFHLFFBQVEsRUFBQyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsS0FBSyxFQUFFO1FBQ1AsQ0FBQztRQUNELEtBQUssRUFBRSxjQUFjLENBQUM7UUFDdEIsUUFBUSxFQUFFLGNBQWMsQ0FBQztLQUMxQjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2NoYW5nZS9saXN0L2xpc3QuanNcclxudmFyIGFwcCA9IGdldEFwcCgpXHJcblxyXG5Db21wb25lbnQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgY2hhbmdlTGlzdCA6IFtdLFxyXG4gICAgQ3VzdG9tQmFyOiBhcHAuZ2xvYmFsRGF0YS5DdXN0b21CYXIsXHJcblxyXG4gIH0sXHJcblxyXG5cclxuICBtZXRob2RzOiB7XHJcblxyXG4gIH0sXHJcbiAgbGlmZXRpbWVzOiB7XHJcbiAgICAvLyDnlJ/lkb3lkajmnJ/lh73mlbDvvIzlj6/ku6XkuLrlh73mlbDvvIzmiJbkuIDkuKrlnKhtZXRob2Rz5q615Lit5a6a5LmJ55qE5pa55rOV5ZCNXHJcbiAgICBhdHRhY2hlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGFwcC5mdW5jLnBvc3QoJy9jaGFuZ2VMaXN0Jywge3BhZ2VJbmRleDoxLHBhZ2VTaXplOjEwfSwgZnVuY3Rpb24gKHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICB0aGF0LnNldERhdGEhKHtjaGFuZ2VMaXN0IDogcmVzcG9uc2V9KTtcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICByZWFkeTogZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuICAgIG1vdmVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICBkZXRhY2hlZDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gIH1cclxufSkiXX0=