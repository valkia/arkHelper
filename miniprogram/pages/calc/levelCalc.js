"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        changeList: [],
        CustomBar: app.globalData.CustomBar,
        keyword: '',
        pageIndex: 1,
        pageSize: 10
    },
    methods: {},
    lifetimes: {
        attached: function () {
        },
        ready: function () {
        },
        moved: function () {
        },
        detached: function () {
        },
    },
    pageLifetimes: {
        show: function () {
        },
        hide: function () {
            console.log('Component-1 pageLifetimes >> Hide');
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWxDYWxjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGV2ZWxDYWxjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUE7QUFHbEIsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVM7UUFDbkMsT0FBTyxFQUFFLEVBQUU7UUFDWCxTQUFTLEVBQUUsQ0FBQztRQUNaLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFJRCxPQUFPLEVBQUUsRUFFUjtJQUNELFNBQVMsRUFBRTtRQUVULFFBQVEsRUFBRTtRQUNWLENBQUM7UUFDRCxLQUFLLEVBQUU7UUFDUCxDQUFDO1FBQ0QsS0FBSyxFQUFFO1FBQ1AsQ0FBQztRQUNELFFBQVEsRUFBRTtRQUVWLENBQUM7S0FFRjtJQUNELGFBQWEsRUFBRTtRQUViLElBQUksRUFBRTtRQUNOLENBQUM7UUFDRCxJQUFJLEVBQUU7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvY2hhbmdlL2xpc3QvbGlzdC5qc1xyXG52YXIgYXBwID0gZ2V0QXBwKClcclxuLy9AdHMtaWdub3JlXHJcbmltcG9ydCBBcmtSZXNwID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvQXJrUmVzcC5qcycpO1xyXG5Db21wb25lbnQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgY2hhbmdlTGlzdDogW10sXHJcbiAgICBDdXN0b21CYXI6IGFwcC5nbG9iYWxEYXRhLkN1c3RvbUJhcixcclxuICAgIGtleXdvcmQ6ICcnLFxyXG4gICAgcGFnZUluZGV4OiAxLFxyXG4gICAgcGFnZVNpemU6IDEwXHJcbiAgfSxcclxuXHJcblxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICBcclxuICB9LFxyXG4gIGxpZmV0aW1lczoge1xyXG4gICAgLy8g55Sf5ZG95ZGo5pyf5Ye95pWw77yM5Y+v5Lul5Li65Ye95pWw77yM5oiW5LiA5Liq5ZyobWV0aG9kc+auteS4reWumuS5ieeahOaWueazleWQjVxyXG4gICAgYXR0YWNoZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIH0sXHJcbiAgICByZWFkeTogZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuICAgIG1vdmVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgZGV0YWNoZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICB9LFxyXG4gIHBhZ2VMaWZldGltZXM6IHtcclxuICAgIC8vIOe7hOS7tuaJgOWcqOmhtemdoueahOeUn+WRveWRqOacn+WjsOaYjuWvueixoe+8jOebruWJjeS7heaUr+aMgemhtemdoueahHNob3flkoxoaWRl5Lik5Liq55Sf5ZG95ZGo5pyfXHJcbiAgICBzaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgaGlkZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnQ29tcG9uZW50LTEgcGFnZUxpZmV0aW1lcyA+PiBIaWRlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59KSJdfQ==