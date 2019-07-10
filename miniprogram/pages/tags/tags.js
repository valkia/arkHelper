"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
const jsonData = require("/data.js");
class HeroBasic {
    constructor(name, type, level, img) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.img = img;
    }
}
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        CustomBar: app.globalData.CustomBar,
        tags: [
            {
                "cn": "资质",
                "cntags": [{ name: "新手", showFlag: false }, { name: "资深干员", showFlag: false }, { name: "高级资深干员", showFlag: false }]
            },
            {
                "cn": "位置",
                "cntags": [{ name: "远程位", showFlag: false }, { name: "近战位", showFlag: false }]
            },
            {
                "cn": "性别",
                "cntags": [{ name: "男性干员", showFlag: false }, { name: "女性干员", showFlag: false }]
            },
            {
                "cn": "种类",
                "cntags": [{ name: "先锋干员", showFlag: false }, { name: "狙击干员", showFlag: false }, { name: "医疗干员", showFlag: false }, { name: "术师干员", showFlag: false }, { name: "近卫干员", showFlag: false }, { name: "重装干员", showFlag: false }, { name: "辅助干员", showFlag: false }, { name: "特种干员", showFlag: false }]
            },
            {
                "cn": "词缀",
                "cntags": [{ name: "治疗", showFlag: false }, { name: "支援", showFlag: false }, { name: "输出", showFlag: false }, { name: "群攻", showFlag: false }, { name: "减速", showFlag: false }, { name: "生存", showFlag: false }, { name: "防护", showFlag: false }, { name: "削弱", showFlag: false }, { name: "位移", showFlag: false }, { name: "控场", showFlag: false }, { name: "爆发", showFlag: false }, { name: "召唤", showFlag: false }, { name: "快速复活", showFlag: false }, { name: "费用回复", showFlag: false }]
            }
        ],
        tags_aval: {} = {},
        checkedTags: [] = [],
        checkedTagsTL: [] = [],
        possible: [] = [{}],
        optStars: [] = [""],
        showStars: [] = [{ name: "清空", showFlag: true }, { name: "6", showFlag: true }, { name: "5", showFlag: true }, { name: "4", showFlag: true }, { name: "3", showFlag: true }, { name: "2", showFlag: true }, { name: "1", showFlag: true }],
        keywords: ""
    },
    methods: {
        onLoad() {
            console.log("onload333");
            this.init();
        },
        upload() {
            this.clean();
            let that = this;
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    const tempFilePaths = res.tempFilePaths;
                    wx.compressImage({
                        src: tempFilePaths[0],
                        quality: 80,
                        success(res) {
                            const tempFilePath = res.tempFilePath;
                            wx.showLoading({
                                title: '加载中',
                            });
                            wx.uploadFile({
                                url: 'https://dtodo.cn/ark/upload2',
                                filePath: tempFilePath,
                                name: 'file',
                                formData: {
                                    'user': 'test'
                                },
                                success(res) {
                                    console.log(res);
                                    wx.hideLoading();
                                    if (res.data != '[]') {
                                        let tagList = JSON.parse(res.data);
                                        for (let i = 0; i < tagList.length; i++) {
                                            that.clickTagF(tagList[i], true);
                                        }
                                    }
                                    else {
                                        wx.showToast({
                                            title: "没有识别的招募标签，请检查图片。",
                                            icon: "none",
                                            duration: 2000
                                        });
                                    }
                                },
                                fail(res) {
                                    console.log(res);
                                    wx.hideLoading();
                                }
                            });
                        }
                    });
                }
            });
        },
        search(e) {
            let keyword = e.detail.value;
            let keyArray = keyword.split(/\s+/);
            let that = this;
            this.data.tags.forEach((t) => {
                t['cntags'].forEach((t2) => {
                    if (t2.showFlag === true) {
                        t2.showFlag = false;
                    }
                });
            });
            that.setData({
                checkedTags: [],
                tags: this.data.tags,
                keywords: keyword
            });
            if (keyArray.length === 0)
                that.calc();
            keyArray.forEach(key => {
                let times = 0;
                let result = "";
                this.data.tags.forEach((t) => {
                    t['cntags'].forEach((t2) => {
                        if (t2.name.includes(key)) {
                            times++;
                            result = t2.name;
                        }
                    });
                });
                if (times === 1) {
                    console.log(result);
                    that.clickTagF(result, false);
                }
            });
        },
        clean() {
            this.data.tags.forEach((t) => {
                t['cntags'].forEach((t2) => {
                    if (t2.showFlag === true) {
                        t2.showFlag = false;
                    }
                });
            });
            this.setData({
                checkedTags: [],
                tags: this.data.tags,
                keywords: ""
            });
            this.calc();
        },
        clickStars(event) {
            console.log(event);
            let value = event.target.dataset.title;
            if (value === '清空') {
                this.data.showStars.forEach((s) => {
                    s.showFlag = false;
                });
                this.data.showStars[0] = { name: "全选", showFlag: true };
                this.setData({ optStars: [], showStars: this.data.showStars });
            }
            if (value === '全选') {
                this.data.showStars.forEach((s) => {
                    s.showFlag = true;
                });
                this.data.showStars[0] = { name: "清空", showFlag: true };
                this.setData({ optStars: ['清空', '6', '5', '4', '3', '2', '1'], showStars: this.data.showStars });
            }
            else {
                this.data.showStars.forEach((s) => {
                    if (s.name === value) {
                        s.showFlag = !s.showFlag;
                    }
                });
                let tmp = this.data.optStars;
                if (this.data.optStars.includes(value)) {
                    tmp = this.data.optStars.filter(function (v, _, __) {
                        return v !== value;
                    });
                }
                else {
                    tmp.push(value);
                }
                this.setData({ optStars: tmp, showStars: this.data.showStars });
            }
            this.calc();
        },
        bindViewTap() {
            wx.navigateTo({
                url: '../index/index'
            });
        },
        calc() {
            let len = this.data.checkedTags.length;
            let count = Math.pow(2, this.data.checkedTags.length);
            let combs = [];
            for (let i = 0; i < count; i++) {
                let ts = [];
                let tsTL = [];
                for (let j = 0, mask = 1; j < len; j++) {
                    if ((i & mask) !== 0) {
                        ts.push(this.data.checkedTags[j]);
                        tsTL.push(this.data.checkedTagsTL[j]);
                    }
                    mask = mask * 2;
                }
                combs.push({
                    "tags": ts,
                    "tagsTL": tsTL,
                    "score": 0.0,
                    "possible": []
                });
            }
            let optStars = this.data.optStars;
            var that = this;
            combs.forEach((comb) => {
                let tags = comb.tags;
                if (tags.length === 0 || tags.length > 3)
                    return;
                let chars = [...that.data.tags_aval[tags[0]]];
                for (let i = 1; i < tags.length; i++) {
                    let reduced_chars = [];
                    chars.forEach((char) => {
                        let tmp = that.data.tags_aval[tags[i]];
                        tmp.forEach((tgch) => {
                            if (char.name === tgch.name) {
                                reduced_chars.push(char);
                                return false;
                            }
                        });
                    });
                    chars = reduced_chars;
                }
                if (chars.length === 0)
                    return;
                if (!tags.includes("高级资深干员")) {
                    let reduce6 = [];
                    chars.forEach(function (char) {
                        if (char.level !== 6) {
                            reduce6.push(char);
                        }
                    });
                    chars = reduce6;
                }
                let filtered_chars = [];
                chars.forEach(function (char) {
                    if (optStars.includes(char.level.toString())) {
                        filtered_chars.push(char);
                    }
                });
                chars = filtered_chars;
                comb.possible = chars;
                if (chars.length === 0)
                    return;
                let s = 0;
                chars.forEach(function (char) {
                    s += char.level;
                });
                s = s / chars.length;
                comb.score = s + 0.1 / tags.length + 0.9 / chars.length;
            });
            combs.sort(function (a, b) {
                return a.score > b.score ? -1 : (a.score < b.score ? 1 :
                    (a.tags.length > b.tags.length ? 1 : (a.tags.length < b.tags.length ? -1 :
                        0)));
            });
            combs.forEach((comb) => {
                if (!comb.possible || comb.possible.length === 0)
                    return false;
                comb.possible.sort(function (a, b) {
                    return a.level > b.level ? -1 : (a.level < b.level ? 1 : 0);
                });
            });
            that.setData({ possible: combs });
        },
        init() {
            let _that = this;
            this.setData({ optStars: ['清空', '6', '5', '4', '3', '2', '1'] });
            this.setData({ tags_aval: jsonData.aval });
            _that.calc();
        },
        clickTag(event) {
            console.log(event);
            let tag = event.target.dataset.title;
            this.clickTagF(tag, true);
        },
        clickTagF(tag, clickFlag) {
            let _that = this;
            let checked = false;
            if (!clickFlag) {
                this.data.tags.forEach((t) => {
                    t['cntags'].forEach((t2) => {
                        if (t2.name === tag && t2.showFlag === false) {
                            t2.showFlag = true;
                        }
                    });
                });
            }
            else {
                this.data.tags.forEach((t) => {
                    t['cntags'].forEach((t2) => {
                        if (t2.name === tag) {
                            t2.showFlag = !t2.showFlag;
                        }
                    });
                });
            }
            if ((_that.data.checkedTags).includes(tag)) {
                checked = true;
            }
            if (checked) {
                if (clickFlag) {
                    let tmp = _that.data.checkedTags;
                    tmp = _that.data.checkedTags.filter(function (v, _, __) {
                        return v !== tag;
                    });
                    _that.setData({
                        checkedTags: tmp
                    });
                }
            }
            else {
                if (_that.data.checkedTags.length >= 6) {
                    wx.showToast({
                        title: "无法选择更多标签：最多6个。",
                        icon: "none",
                        duration: 2000
                    });
                    return;
                }
                else {
                    _that.data.checkedTags.push(tag);
                    _that.setData({
                        checkedTags: _that.data.checkedTags
                    });
                }
            }
            _that.setData({ tags: _that.data.tags });
            _that.calc();
        }
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
            this.init();
        },
        moved: function () { },
        detached: function () { },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQTtBQUVsQixxQ0FBc0M7QUFFdEMsTUFBTSxTQUFTO0lBTWIsWUFBWSxJQUFZLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxHQUFXO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7Q0FFRjtBQXlCRCxTQUFTLENBQUM7SUFDUixPQUFPLEVBQUU7UUFDUCxjQUFjLEVBQUUsSUFBSTtLQUNyQjtJQUNELElBQUksRUFBRTtRQUVKLFNBQVMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVM7UUFDbkMsSUFBSSxFQUFFO1lBQ0o7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDcEg7WUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDL0U7WUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDakY7WUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFFblM7WUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDN2Q7U0FDRjtRQUNELFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUNsQixXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFDcEIsYUFBYSxFQUFFLEVBQUUsR0FBRyxFQUFFO1FBQ3RCLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDbkIsUUFBUSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNuQixTQUFTLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUs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LEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLGdCQUFnQjt3QkFDdkIsSUFBSSxFQUFFLE1BQU07d0JBQ1osUUFBUSxFQUFFLElBQUk7cUJBQ2YsQ0FBQyxDQUFBO29CQUdGLE9BQU87aUJBQ1I7cUJBQU07b0JBRUwsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQyxLQUFLLENBQUMsT0FBUSxDQUFDO3dCQUNiLFdBQVcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVc7cUJBQ3BDLENBQUMsQ0FBQztpQkFFSjthQUNGO1lBQ0QsS0FBSyxDQUFDLE9BQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFHMUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBR2YsQ0FBQztLQUNGO0lBQ0QsU0FBUyxFQUFFO1FBRVQsUUFBUSxFQUFFLGNBQWMsQ0FBQztRQUN6QixLQUFLLEVBQUU7WUFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsS0FBSyxFQUFFLGNBQWMsQ0FBQztRQUN0QixRQUFRLEVBQUUsY0FBYyxDQUFDO0tBQzFCO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy90YWdzLmpzXHJcbnZhciBhcHAgPSBnZXRBcHAoKVxyXG4vL0B0cy1pZ25vcmVcclxuaW1wb3J0IGpzb25EYXRhID0gcmVxdWlyZSgnL2RhdGEuanMnKTtcclxuXHJcbmNsYXNzIEhlcm9CYXNpYyB7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICB0eXBlPzogc3RyaW5nO1xyXG4gIGxldmVsPzogbnVtYmVyO1xyXG4gIGltZz86IHN0cmluZ1xyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgbGV2ZWw6IG51bWJlciwgaW1nOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5sZXZlbCA9IGxldmVsO1xyXG4gICAgdGhpcy5pbWcgPSBpbWc7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLy8gY2xhc3MgSGVybyBleHRlbmRzIEhlcm9CYXNpYyB7XHJcbi8vICAgY2FtcD86IHN0cmluZztcclxuLy8gICBzZXg/OiBzdHJpbmc7XHJcbi8vICAgY2hhcmFjdGVyaXN0aWM/OiBzdHJpbmc7XHJcbi8vICAgdGFncz86IHN0cmluZ1tdO1xyXG4vLyAgIGhpZGRlbj86IGJvb2xlYW47XHJcbi8vICAgXCJuYW1lLWVuXCI/OiBzdHJpbmc7XHJcblxyXG5cclxuLy8gICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNhbXA6IHN0cmluZywgdHlwZTogc3RyaW5nLCBsZXZlbDogbnVtYmVyLCBzZXg6IHN0cmluZywgY2hhcmFjdGVyaXN0aWM6IHN0cmluZywgdGFnczogW10sIGhpZGRlbjogYm9vbGVhbiwgbmFtZV9lbjogc3RyaW5nLCBpbWc6IHN0cmluZykge1xyXG4vLyAgICAgc3VwZXIobmFtZSwgdHlwZSwgbGV2ZWwsIGltZyk7XHJcbi8vICAgICB0aGlzLmNhbXAgPSBjYW1wO1xyXG4vLyAgICAgdGhpcy5zZXggPSBzZXg7XHJcbi8vICAgICB0aGlzLmNoYXJhY3RlcmlzdGljID0gY2hhcmFjdGVyaXN0aWM7XHJcbi8vICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4vLyAgICAgdGhpcy5oaWRkZW4gPSBoaWRkZW47XHJcbi8vICAgICB0aGlzW1wibmFtZS1lblwiXSA9IG5hbWVfZW47XHJcblxyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxuXHJcblxyXG5Db21wb25lbnQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG5cclxuICAgIEN1c3RvbUJhcjogYXBwLmdsb2JhbERhdGEuQ3VzdG9tQmFyLFxyXG4gICAgdGFnczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIui1hOi0qFwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi5paw5omLXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6LWE5rex5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6auY57qn6LWE5rex5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuS9jee9rlwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi6L+c56iL5L2NXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6L+R5oiY5L2NXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuaAp+WIq1wiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi55S35oCn5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5aWz5oCn5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuenjeexu1wiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi5YWI6ZSL5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi54uZ5Ye75bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5Yy755aX5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5pyv5biI5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6L+R5Y2r5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6YeN6KOF5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6L6F5Yqp5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi54m556eN5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG5cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLor43nvIBcIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIuayu+eWl1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuaUr+aPtFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui+k+WHulwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIue+pOaUu1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWHj+mAn1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIueUn+WtmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIumYsuaKpFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWJiuW8sVwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuS9jeenu1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuaOp+WculwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIueIhuWPkVwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWPrOWUpFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuW/q+mAn+Wkjea0u1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui0ueeUqOWbnuWkjVwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHRhZ3NfYXZhbDoge30gPSB7fSxcclxuICAgIGNoZWNrZWRUYWdzOiBbXSA9IFtdLFxyXG4gICAgY2hlY2tlZFRhZ3NUTDogW10gPSBbXSxcclxuICAgIHBvc3NpYmxlOiBbXSA9IFt7fV0sXHJcbiAgICBvcHRTdGFyczogW10gPSBbXCJcIl0sXHJcbiAgICBzaG93U3RhcnM6IFtdID0gW3sgbmFtZTogXCLmuIXnqbpcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjZcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjVcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjRcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjNcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjJcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjFcIiwgc2hvd0ZsYWc6IHRydWUgfV0sXHJcbiAgICBrZXl3b3JkczogXCJcIlxyXG5cclxuICB9LFxyXG5cclxuXHJcbiAgbWV0aG9kczoge1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJvbmxvYWQzMzNcIik7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGxvYWQoKSB7XHJcbiAgICAgIHRoaXMuY2xlYW4oKVxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICBjb3VudDogMSxcclxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXHJcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgLy8gdGVtcEZpbGVQYXRo5Y+v5Lul5L2c5Li6aW1n5qCH562+55qEc3Jj5bGe5oCn5pi+56S65Zu+54mHXHJcbiAgICAgICAgICBjb25zdCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHNcclxuICAgICAgICAgIHd4LmNvbXByZXNzSW1hZ2Uoe1xyXG4gICAgICAgICAgICBzcmM6IHRlbXBGaWxlUGF0aHNbMF0sIC8vIOWbvueJh+i3r+W+hFxyXG4gICAgICAgICAgICBxdWFsaXR5OiA4MCwgLy8g5Y6L57yp6LSo6YePLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcclxuXHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kdG9kby5jbi9hcmsvdXBsb2FkMicsIC8v5LuF5Li656S65L6L77yM6Z2e55yf5a6e55qE5o6l5Y+j5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDogdGVtcEZpbGVQYXRoLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgJ3VzZXInOiAndGVzdCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhIT0nW10nKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFnTGlzdCA9IEpTT04ucGFyc2UocmVzLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdMaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbGlja1RhZ0YodGFnTGlzdFtpXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5rKh5pyJ6K+G5Yir55qE5oub5Yuf5qCH562+77yM6K+35qOA5p+l5Zu+54mH44CCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlYXJjaChlOiBhbnkpIHtcclxuICAgICAgbGV0IGtleXdvcmQgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgbGV0IGtleUFycmF5OiBbXSA9IGtleXdvcmQuc3BsaXQoL1xccysvKTtcclxuXHJcblxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmICh0Mi5zaG93RmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0Mi5zaG93RmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGF0LnNldERhdGEhKHtcclxuICAgICAgICBjaGVja2VkVGFnczogW10sXHJcbiAgICAgICAgdGFnczogdGhpcy5kYXRhLnRhZ3MsXHJcbiAgICAgICAga2V5d29yZHM6IGtleXdvcmRcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoa2V5QXJyYXkubGVuZ3RoID09PSAwKSB0aGF0LmNhbGMoKTtcclxuXHJcblxyXG4gICAgICBrZXlBcnJheS5mb3JFYWNoKGtleSA9PiB7XHJcblxyXG4gICAgICAgIGxldCB0aW1lcyA9IDA7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodDIubmFtZS5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgdGltZXMrK1xyXG4gICAgICAgICAgICAgIHJlc3VsdCA9IHQyLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHRpbWVzID09PSAxKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgdGhhdC5jbGlja1RhZ0YocmVzdWx0LCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY2xlYW4oKSB7XHJcbiAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmICh0Mi5zaG93RmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0Mi5zaG93RmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgICBjaGVja2VkVGFnczogW10sXHJcbiAgICAgICAgdGFnczogdGhpcy5kYXRhLnRhZ3MsXHJcbiAgICAgICAga2V5d29yZHM6IFwiXCJcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuY2FsYygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja1N0YXJzKGV2ZW50OiBhbnkpIHtcclxuICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQuZGF0YXNldC50aXRsZTtcclxuICAgICAgaWYgKHZhbHVlID09PSAn5riF56m6Jykge1xyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnMuZm9yRWFjaCgoczogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgcy5zaG93RmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnNbMF0gPSB7IG5hbWU6IFwi5YWo6YCJXCIsIHNob3dGbGFnOiB0cnVlIH07XHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBbXSwgc2hvd1N0YXJzOiB0aGlzLmRhdGEuc2hvd1N0YXJzIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gJ+WFqOmAiScpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2hvd1N0YXJzLmZvckVhY2goKHM6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHMuc2hvd0ZsYWcgPSB0cnVlO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnNbMF0gPSB7IG5hbWU6IFwi5riF56m6XCIsIHNob3dGbGFnOiB0cnVlIH07XHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBbJ+a4heepuicsICc2JywgJzUnLCAnNCcsICczJywgJzInLCAnMSddLCBzaG93U3RhcnM6IHRoaXMuZGF0YS5zaG93U3RhcnMgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnMuZm9yRWFjaCgoczogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAocy5uYW1lID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICBzLnNob3dGbGFnID0gIXMuc2hvd0ZsYWc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgdG1wID0gdGhpcy5kYXRhLm9wdFN0YXJzO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEub3B0U3RhcnMuaW5jbHVkZXModmFsdWUpKSB7XHJcbiAgICAgICAgICB0bXAgPSB0aGlzLmRhdGEub3B0U3RhcnMuZmlsdGVyKGZ1bmN0aW9uICh2LCBfLCBfXykge1xyXG4gICAgICAgICAgICByZXR1cm4gdiAhPT0gdmFsdWU7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0bXAucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldERhdGEhKHsgb3B0U3RhcnM6IHRtcCwgc2hvd1N0YXJzOiB0aGlzLmRhdGEuc2hvd1N0YXJzIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2FsYygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiaW5kVmlld1RhcCgpIHtcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnLi4vaW5kZXgvaW5kZXgnXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGMoKSB7XHJcblxyXG4gICAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aDtcclxuICAgICAgbGV0IGNvdW50ID0gTWF0aC5wb3coMiwgdGhpcy5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aCk7XHJcbiAgICAgIGxldCBjb21icyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBsZXQgdHM6IFtdID0gW107XHJcbiAgICAgICAgbGV0IHRzVEw6IFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIG1hc2sgPSAxOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgIGlmICgoaSAmIG1hc2spICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRzLnB1c2godGhpcy5kYXRhLmNoZWNrZWRUYWdzW2pdKTtcclxuICAgICAgICAgICAgdHNUTC5wdXNoKHRoaXMuZGF0YS5jaGVja2VkVGFnc1RMW2pdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG1hc2sgPSBtYXNrICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tYnMucHVzaCh7XHJcbiAgICAgICAgICBcInRhZ3NcIjogdHMsXHJcbiAgICAgICAgICBcInRhZ3NUTFwiOiB0c1RMLFxyXG4gICAgICAgICAgXCJzY29yZVwiOiAwLjAsXHJcbiAgICAgICAgICBcInBvc3NpYmxlXCI6IFtdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gY29uc29sZS5sb2coY29tYnMpO1xyXG4gICAgICBsZXQgb3B0U3RhcnM6IHN0cmluZ1tdID0gdGhpcy5kYXRhLm9wdFN0YXJzO1xyXG4gICAgICAvLyAkKFwiLmJ0bi1vcHRcIikuZWFjaChmdW5jdGlvbiAoXywgX18pIHtcclxuICAgICAgLy8gICBpZiAoJCh0aGlzKS5hdHRyKFwib3B0LWlkXCIpID09PSBcImFsbFwiIHx8ICQodGhpcykuaGFzQ2xhc3MoXCJidG4tc2Vjb25kYXJ5XCIpKSByZXR1cm47XHJcbiAgICAgIC8vICAgb3B0U3RhcnMucHVzaCgkKHRoaXMpLmF0dHIoXCJvcHQtaWRcIikpO1xyXG4gICAgICAvLyB9KTtcclxuICAgICAgLy9jb25zb2xlLmxvZyhvcHRTdGFycyk7XHJcbiAgICAgIC8vJChcIiN0Ym9keS1yZWNvbW1lbmRcIikuaHRtbChcIlwiKTtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzOy8v5oqKdGhpc+WvueixoeWkjeWItuWIsOS4tOaXtuWPmOmHj3RoYXRcclxuICAgICAgY29tYnMuZm9yRWFjaCgoY29tYjogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkgPT4ge1xyXG4gICAgICAgIGxldCB0YWdzOiBzdHJpbmdbXSA9IGNvbWIudGFncztcclxuICAgICAgICBpZiAodGFncy5sZW5ndGggPT09IDAgfHwgdGFncy5sZW5ndGggPiAzKSByZXR1cm47XHJcbiAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgIGxldCBjaGFyczogSGVyb0Jhc2ljW10gPSBbLi4udGhhdC5kYXRhLnRhZ3NfYXZhbFt0YWdzWzBdXV07Ly/liIflibLmr4/kuKrlrZfnrKZcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxldCByZWR1Y2VkX2NoYXJzOiBIZXJvQmFzaWNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgIGNoYXJzLmZvckVhY2goKGNoYXI6IEhlcm9CYXNpYykgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWdzX2F2YWxbdGFnc1tpXV0pO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGFyKTtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgICAgICBsZXQgdG1wOiBIZXJvQmFzaWNbXSA9IHRoYXQuZGF0YS50YWdzX2F2YWxbdGFnc1tpXV07XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICAgICAgdG1wLmZvckVhY2goKHRnY2g6IEhlcm9CYXNpYykgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyLm5hbWUgPT09IHRnY2gubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmVkdWNlZF9jaGFycy5wdXNoKGNoYXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICAgIGNoYXJzID0gcmVkdWNlZF9jaGFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFycy5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgaWYgKCF0YWdzLmluY2x1ZGVzKFwi6auY57qn6LWE5rex5bmy5ZGYXCIpKSB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWdzLmpvaW4oXCIsXCIpICsgXCIg5LiN5ZCrKOmrmOe6pynotYTmt7HlubLlkZhcIik7XHJcbiAgICAgICAgICBsZXQgcmVkdWNlNjogYW55W10gPSBbXTtcclxuICAgICAgICAgIGNoYXJzLmZvckVhY2goZnVuY3Rpb24gKGNoYXI6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5sZXZlbCAhPT0gNikge1xyXG4gICAgICAgICAgICAgIHJlZHVjZTYucHVzaChjaGFyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjaGFycyA9IHJlZHVjZTY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmaWx0ZXJlZF9jaGFyczogSGVyb0Jhc2ljW10gPSBbXTtcclxuICAgICAgICBjaGFycy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFyOiBIZXJvQmFzaWMpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coY2hhci5sZXZlbCk7XHJcbiAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICBpZiAob3B0U3RhcnMuaW5jbHVkZXMoY2hhci5sZXZlbC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBmaWx0ZXJlZF9jaGFycy5wdXNoKGNoYXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICBjaGFycyA9IGZpbHRlcmVkX2NoYXJzO1xyXG5cclxuICAgICAgICBjb21iLnBvc3NpYmxlID0gY2hhcnM7XHJcbiAgICAgICAgaWYgKGNoYXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBzID0gMDtcclxuICAgICAgICBjaGFycy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFyOiBhbnkpIHtcclxuICAgICAgICAgIHMgKz0gY2hhci5sZXZlbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzID0gcyAvIGNoYXJzLmxlbmd0aDtcclxuICAgICAgICBjb21iLnNjb3JlID0gcyArIDAuMSAvIHRhZ3MubGVuZ3RoICsgMC45IC8gY2hhcnMubGVuZ3RoO1xyXG4gICAgICB9KTtcclxuICAgICAgY29tYnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhLnNjb3JlID4gYi5zY29yZSA/IC0xIDogKGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6XHJcbiAgICAgICAgICAoYS50YWdzLmxlbmd0aCA+IGIudGFncy5sZW5ndGggPyAxIDogKGEudGFncy5sZW5ndGggPCBiLnRhZ3MubGVuZ3RoID8gLTEgOlxyXG4gICAgICAgICAgICAwKSkpO1xyXG4gICAgICB9KTtcclxuICAgICAgLy9sZXQgbm8gPSAxO1xyXG4gICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgIGNvbWJzLmZvckVhY2goKGNvbWI6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICghY29tYi5wb3NzaWJsZSB8fCBjb21iLnBvc3NpYmxlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb21iLnBvc3NpYmxlLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XHJcbiAgICAgICAgICByZXR1cm4gYS5sZXZlbCA+IGIubGV2ZWwgPyAtMSA6IChhLmxldmVsIDwgYi5sZXZlbCA/IDEgOiAwKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgLy8gaWYgKGxhbmcgIT09ICdjbicpICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XHJcbiAgICAgIC8vaHR0cHM6Ly9hay5ncmF1ZW5la28ueHl6L2FraHIuanNvblxyXG5cclxuXHJcbiAgICAgIHRoYXQuc2V0RGF0YSEoeyBwb3NzaWJsZTogY29tYnMgfSk7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXQoKSB7XHJcbiAgICAgIGxldCBfdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAvL2FwcC5mdW5jLmdldCgnL2FraHIuanNvbicsIHt9LCBmdW5jdGlvbiAoZGF0YTogSGVyb1tdKSB7XHJcbiAgICAgIC8vbGV0IGRhdGE6IEhlcm9bXSA9IGpzb25EYXRhLmRhdGFMaXN0O1xyXG4gICAgICB0aGlzLnNldERhdGEhKHsgb3B0U3RhcnM6IFsn5riF56m6JywgJzYnLCAnNScsICc0JywgJzMnLCAnMicsICcxJ10gfSk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICB0aGlzLnNldERhdGEhKHsgdGFnc19hdmFsOiBqc29uRGF0YS5hdmFsIH0pXHJcblxyXG5cclxuXHJcbiAgICAgIC8vIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuICAgICAgLy8gICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgIC8vICAgICBjb25zdCBjaGFyID0gZGF0YVtrZXldO1xyXG4gICAgICAvLyAgICAgaWYgKGNoYXIuaGlkZGVuKSBjb250aW51ZTtcclxuICAgICAgLy8gICAgIGNoYXIudGFncyEucHVzaChjaGFyLnR5cGUgKyBcIuW5suWRmFwiKTtcclxuICAgICAgLy8gICAgIGNoYXIudGFncyEucHVzaChjaGFyLnNleCArIFwi5oCn5bmy5ZGYXCIpO1xyXG4gICAgICAvLyAgICAgbGV0IG5hbWUgPSBjaGFyLm5hbWU7XHJcbiAgICAgIC8vICAgICBjaGFyLnRhZ3MhLmZvckVhY2goZnVuY3Rpb24gKHRhZzogc3RyaW5nKSB7XHJcbiAgICAgIC8vICAgICAgIGlmICh0YWcgaW4gX3RoYXQuZGF0YS50YWdzX2F2YWwpIHtcclxuXHJcbiAgICAgIC8vICAgICAgICAgbGV0IHRtcDogeyBba2V5OiBzdHJpbmddOiBIZXJvQmFzaWNbXSB9ID0gX3RoYXQuZGF0YS50YWdzX2F2YWw7XHJcbiAgICAgIC8vICAgICAgICAgdG1wW3RhZ10ucHVzaCh7XHJcbiAgICAgIC8vICAgICAgICAgICBcIm5hbWVcIjogbmFtZSxcclxuICAgICAgLy8gICAgICAgICAgIFwiaW1nXCI6IGNoYXJbXCJuYW1lLWVuXCJdLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJsZXZlbFwiOiBjaGFyLmxldmVsLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJ0eXBlXCI6IGNoYXIudHlwZVxyXG4gICAgICAvLyAgICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gICAgICAgICBfdGhhdC5zZXREYXRhISh7IHRhZ3NfYXZhbDogdG1wIH0pXHJcblxyXG4gICAgICAvLyAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gICAgICAgICBsZXQgdG1wOiB7IFtrZXk6IHN0cmluZ106IEhlcm9CYXNpY1tdIH0gPSBfdGhhdC5kYXRhLnRhZ3NfYXZhbDtcclxuXHJcbiAgICAgIC8vICAgICAgICAgdG1wW3RhZ10gPSBbe1xyXG4gICAgICAvLyAgICAgICAgICAgXCJuYW1lXCI6IG5hbWUsXHJcbiAgICAgIC8vICAgICAgICAgICBcImltZ1wiOiBjaGFyW1wibmFtZS1lblwiXSxcclxuICAgICAgLy8gICAgICAgICAgIFwibGV2ZWxcIjogY2hhci5sZXZlbCxcclxuICAgICAgLy8gICAgICAgICAgIFwidHlwZVwiOiBjaGFyLnR5cGVcclxuICAgICAgLy8gICAgICAgICB9XTtcclxuXHJcbiAgICAgIC8vICAgICAgICAgX3RoYXQuc2V0RGF0YSEoeyB0YWdzX2F2YWw6IHRtcCB9KVxyXG5cclxuICAgICAgLy8gICAgICAgfVxyXG5cclxuICAgICAgLy8gICAgIH0pO1xyXG5cclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICBfdGhhdC5jYWxjKCk7XHJcbiAgICAgIC8vfSk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tUYWcoZXZlbnQ6IGFueSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgIGxldCB0YWcgPSBldmVudC50YXJnZXQuZGF0YXNldC50aXRsZTtcclxuICAgICAgdGhpcy5jbGlja1RhZ0YodGFnLCB0cnVlKTtcclxuICAgIH0sXHJcbiAgICAvLyDmmK/lkKbmmK/ngrnlh7vov5vmnaXnmoTmoIflv5csdHJ1ZeeahOaXtuWAmeaJjeS8muWOu+aOieeCueWHu+agh+W/l1xyXG4gICAgY2xpY2tUYWdGKHRhZzogc3RyaW5nLCBjbGlja0ZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgbGV0IF90aGF0ID0gdGhpcztcclxuXHJcbiAgICAgIGxldCBjaGVja2VkID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoIWNsaWNrRmxhZykge1xyXG4gICAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHQyLm5hbWUgPT09IHRhZyAmJiB0Mi5zaG93RmxhZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICB0Mi5zaG93RmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodDIubmFtZSA9PT0gdGFnKSB7XHJcbiAgICAgICAgICAgICAgdDIuc2hvd0ZsYWcgPSAhdDIuc2hvd0ZsYWc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgLy/mmK/lkKbngrnov4dcclxuICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgIGlmICgoX3RoYXQuZGF0YS5jaGVja2VkVGFncykuaW5jbHVkZXModGFnKSkge1xyXG4gICAgICAgIGNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hlY2tlZCkge1xyXG4gICAgICAgIGlmIChjbGlja0ZsYWcpIHtcclxuICAgICAgICAgIGxldCB0bXAgPSBfdGhhdC5kYXRhLmNoZWNrZWRUYWdzO1xyXG4gICAgICAgICAgdG1wID0gX3RoYXQuZGF0YS5jaGVja2VkVGFncy5maWx0ZXIoZnVuY3Rpb24gKHYsIF8sIF9fKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ICE9PSB0YWc7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBfdGhhdC5zZXREYXRhISh7XHJcbiAgICAgICAgICAgIGNoZWNrZWRUYWdzOiB0bXBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RoYXQuZGF0YS5jaGVja2VkVGFncy5sZW5ndGggPj0gNikge1xyXG5cclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaXoOazlemAieaLqeabtOWkmuagh+etvu+8muacgOWkmjbkuKrjgIJcIixcclxuICAgICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIC8vYWxlcnQoXCLml6Dms5XpgInmi6nmm7TlpJrmoIfnrb7vvJrmnIDlpJo25Liq44CCXCIpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgIF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MucHVzaCh0YWcpO1xyXG4gICAgICAgICAgX3RoYXQuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICBjaGVja2VkVGFnczogX3RoYXQuZGF0YS5jaGVja2VkVGFnc1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBfdGhhdC5zZXREYXRhISh7IHRhZ3M6IF90aGF0LmRhdGEudGFncyB9KTtcclxuXHJcbiAgICAgIC8vJCh0aGlzKS50b2dnbGVDbGFzcyhcImJ0bi1wcmltYXJ5IGJ0bi1zZWNvbmRhcnlcIik7XHJcbiAgICAgIF90aGF0LmNhbGMoKTtcclxuXHJcblxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGlmZXRpbWVzOiB7XHJcbiAgICAvLyDnlJ/lkb3lkajmnJ/lh73mlbDvvIzlj6/ku6XkuLrlh73mlbDvvIzmiJbkuIDkuKrlnKhtZXRob2Rz5q615Lit5a6a5LmJ55qE5pa55rOV5ZCNXHJcbiAgICBhdHRhY2hlZDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgbW92ZWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIGRldGFjaGVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgfVxyXG59KSJdfQ==