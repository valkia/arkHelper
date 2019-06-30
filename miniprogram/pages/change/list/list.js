"use strict";
var app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        changeList: []
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFBO0FBRWxCLFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFHLEVBQUU7S0FFaEI7SUFHRCxPQUFPLEVBQUUsRUFFUjtJQUNELFNBQVMsRUFBRTtRQUVULFFBQVEsRUFBRTtZQUNSLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBRSxVQUFVLFFBQWE7Z0JBQzdFLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBQyxVQUFVLEVBQUcsUUFBUSxFQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxLQUFLLEVBQUU7UUFDUCxDQUFDO1FBQ0QsS0FBSyxFQUFFLGNBQWMsQ0FBQztRQUN0QixRQUFRLEVBQUUsY0FBYyxDQUFDO0tBQzFCO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvY2hhbmdlL2xpc3QvbGlzdC5qc1xyXG52YXIgYXBwID0gZ2V0QXBwKClcclxuXHJcbkNvbXBvbmVudCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgYWRkR2xvYmFsQ2xhc3M6IHRydWUsXHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICBjaGFuZ2VMaXN0IDogW11cclxuXHJcbiAgfSxcclxuXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuXHJcbiAgfSxcclxuICBsaWZldGltZXM6IHtcclxuICAgIC8vIOeUn+WRveWRqOacn+WHveaVsO+8jOWPr+S7peS4uuWHveaVsO+8jOaIluS4gOS4quWcqG1ldGhvZHPmrrXkuK3lrprkuYnnmoTmlrnms5XlkI1cclxuICAgIGF0dGFjaGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgYXBwLmZ1bmMucG9zdCgnL2NoYW5nZUxpc3QnLCB7cGFnZUluZGV4OjEscGFnZVNpemU6MTB9LCBmdW5jdGlvbiAocmVzcG9uc2U6IGFueSkge1xyXG4gICAgICAgIHRoYXQuc2V0RGF0YSEoe2NoYW5nZUxpc3QgOiByZXNwb25zZX0pO1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgbW92ZWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIGRldGFjaGVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgfVxyXG59KSJdfQ==