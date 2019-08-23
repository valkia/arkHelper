"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
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
            this.init();
        },
        upload() {
            this.clean();
            let that = this;
            console.log("upload start");
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    const tempFilePaths = res.tempFilePaths;
                    console.log(tempFilePaths);
                    wx.compressImage({
                        src: tempFilePaths[0],
                        quality: 50,
                        success(res) {
                            const tempFilePath = res.tempFilePath;
                            wx.showLoading({
                                title: '加载中',
                            });
                            wx.uploadFile({
                                url: 'https://ark.dtodo.cn/upload',
                                filePath: tempFilePath,
                                name: 'file',
                                formData: {
                                    'user': 'test'
                                },
                                success(res) {
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
            var that = this;
            app.func.get('/tagsAval', {}, function (response) {
                if (response.status === 200) {
                    that.setData({ tags_aval: JSON.parse(response.data) });
                }
            });
            this.setData({ optStars: ['清空', '6', '5', '4', '3', '2', '1'] });
            _that.calc();
        },
        clickTag(event) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQTtBQUdsQixNQUFNLFNBQVM7SUFNYixZQUFZLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLEdBQVc7UUFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztDQUVGO0FBeUJELFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsSUFBSSxFQUFFO1FBRUosU0FBUyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUztRQUNuQyxJQUFJLEVBQUU7WUFDSjtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUNwSDtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUMvRTtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUNqRjtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUVuUztZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUM3ZDtTQUNGO1FBQ0QsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUNwQixhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFDdEIsUUFBUSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNuQixRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ25CLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFB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QUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUV0QyxFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUNYLEtBQUssRUFBRSxnQkFBZ0I7d0JBQ3ZCLElBQUksRUFBRSxNQUFNO3dCQUNaLFFBQVEsRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FBQTtvQkFHRixPQUFPO2lCQUNSO3FCQUFNO29CQUVMLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakMsS0FBSyxDQUFDLE9BQVEsQ0FBQzt3QkFDYixXQUFXLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXO3FCQUNwQyxDQUFDLENBQUM7aUJBRUo7YUFDRjtZQUNELEtBQUssQ0FBQyxPQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRzFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUdmLENBQUM7S0FDRjtJQUNELFNBQVMsRUFBRTtRQUVULFFBQVEsRUFBRSxjQUFjLENBQUM7UUFDekIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUNELEtBQUssRUFBRSxjQUFjLENBQUM7UUFDdEIsUUFBUSxFQUFFLGNBQWMsQ0FBQztLQUMxQjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vdGFncy5qc1xyXG52YXIgYXBwID0gZ2V0QXBwKClcclxuLy9AdHMtaWdub3JlXHJcbmltcG9ydCBBcmtSZXNwID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvQXJrUmVzcC5qcycpO1xyXG5jbGFzcyBIZXJvQmFzaWMge1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgdHlwZT86IHN0cmluZztcclxuICBsZXZlbD86IG51bWJlcjtcclxuICBpbWc/OiBzdHJpbmdcclxuXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGxldmVsOiBudW1iZXIsIGltZzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcclxuICAgIHRoaXMuaW1nID0gaW1nO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8vIGNsYXNzIEhlcm8gZXh0ZW5kcyBIZXJvQmFzaWMge1xyXG4vLyAgIGNhbXA/OiBzdHJpbmc7XHJcbi8vICAgc2V4Pzogc3RyaW5nO1xyXG4vLyAgIGNoYXJhY3RlcmlzdGljPzogc3RyaW5nO1xyXG4vLyAgIHRhZ3M/OiBzdHJpbmdbXTtcclxuLy8gICBoaWRkZW4/OiBib29sZWFuO1xyXG4vLyAgIFwibmFtZS1lblwiPzogc3RyaW5nO1xyXG5cclxuXHJcbi8vICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjYW1wOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgbGV2ZWw6IG51bWJlciwgc2V4OiBzdHJpbmcsIGNoYXJhY3RlcmlzdGljOiBzdHJpbmcsIHRhZ3M6IFtdLCBoaWRkZW46IGJvb2xlYW4sIG5hbWVfZW46IHN0cmluZywgaW1nOiBzdHJpbmcpIHtcclxuLy8gICAgIHN1cGVyKG5hbWUsIHR5cGUsIGxldmVsLCBpbWcpO1xyXG4vLyAgICAgdGhpcy5jYW1wID0gY2FtcDtcclxuLy8gICAgIHRoaXMuc2V4ID0gc2V4O1xyXG4vLyAgICAgdGhpcy5jaGFyYWN0ZXJpc3RpYyA9IGNoYXJhY3RlcmlzdGljO1xyXG4vLyAgICAgdGhpcy50YWdzID0gdGFncztcclxuLy8gICAgIHRoaXMuaGlkZGVuID0gaGlkZGVuO1xyXG4vLyAgICAgdGhpc1tcIm5hbWUtZW5cIl0gPSBuYW1lX2VuO1xyXG5cclxuLy8gICB9XHJcbi8vIH1cclxuXHJcblxyXG5cclxuQ29tcG9uZW50KHtcclxuICBvcHRpb25zOiB7XHJcbiAgICBhZGRHbG9iYWxDbGFzczogdHJ1ZSxcclxuICB9LFxyXG4gIGRhdGE6IHtcclxuXHJcbiAgICBDdXN0b21CYXI6IGFwcC5nbG9iYWxEYXRhLkN1c3RvbUJhcixcclxuICAgIHRhZ3M6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLotYTotKhcIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIuaWsOaJi1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui1hOa3seW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIumrmOe6p+i1hOa3seW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLkvY3nva5cIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIui/nOeoi+S9jVwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui/keaImOS9jVwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLmgKfliKtcIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIueUt+aAp+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWls+aAp+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLnp43nsbtcIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIuWFiOmUi+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIueLmeWHu+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWMu+eWl+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuacr+W4iOW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui/keWNq+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIumHjeijheW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui+heWKqeW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIueJueenjeW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi6K+N57yAXCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW3sgbmFtZTogXCLmsrvnlpdcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLmlK/mj7RcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLovpPlh7pcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLnvqTmlLtcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLlh4/pgJ9cIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLnlJ/lrZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLpmLLmiqRcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLliYrlvLFcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLkvY3np7tcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLmjqflnLpcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLniIblj5FcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLlj6zllKRcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLlv6vpgJ/lpI3mtLtcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLotLnnlKjlm57lpI1cIiwgc2hvd0ZsYWc6IGZhbHNlIH1dXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICB0YWdzX2F2YWw6IHt9ID0ge30sXHJcbiAgICBjaGVja2VkVGFnczogW10gPSBbXSxcclxuICAgIGNoZWNrZWRUYWdzVEw6IFtdID0gW10sXHJcbiAgICBwb3NzaWJsZTogW10gPSBbe31dLFxyXG4gICAgb3B0U3RhcnM6IFtdID0gW1wiXCJdLFxyXG4gICAgc2hvd1N0YXJzOiBbXSA9IFt7IG5hbWU6IFwi5riF56m6XCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCI2XCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCI1XCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCI0XCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCIzXCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCIyXCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCIxXCIsIHNob3dGbGFnOiB0cnVlIH1dLFxyXG4gICAga2V5d29yZHM6IFwiXCJcclxuXHJcbiAgfSxcclxuXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGxvYWQoKSB7XHJcbiAgICAgIHRoaXMuY2xlYW4oKVxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwidXBsb2FkIHN0YXJ0XCIpO1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxyXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIC8vIHRlbXBGaWxlUGF0aOWPr+S7peS9nOS4umltZ+agh+etvueahHNyY+WxnuaAp+aYvuekuuWbvueJh1xyXG4gICAgICAgICAgY29uc3QgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzKTtcclxuICAgICAgICAgIHd4LmNvbXByZXNzSW1hZ2Uoe1xyXG4gICAgICAgICAgICBzcmM6IHRlbXBGaWxlUGF0aHNbMF0sIC8vIOWbvueJh+i3r+W+hFxyXG4gICAgICAgICAgICBxdWFsaXR5OiA1MCwgLy8g5Y6L57yp6LSo6YePLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcclxuXHJcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcmsuZHRvZG8uY24vdXBsb2FkJywgLy/ku4XkuLrnpLrkvovvvIzpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAndXNlcic6ICd0ZXN0J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICE9ICdbXScpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFnTGlzdCA9IEpTT04ucGFyc2UocmVzLmRhdGEpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFnTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbGlja1RhZ0YodGFnTGlzdFtpXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLmsqHmnInor4bliKvnmoTmi5vli5/moIfnrb7vvIzor7fmo4Dmn6Xlm77niYfjgIJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAvL2RvIHNvbWV0aGluZ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlYXJjaChlOiBhbnkpIHtcclxuICAgICAgbGV0IGtleXdvcmQgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgbGV0IGtleUFycmF5OiBbXSA9IGtleXdvcmQuc3BsaXQoL1xccysvKTtcclxuXHJcblxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmICh0Mi5zaG93RmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0Mi5zaG93RmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGF0LnNldERhdGEhKHtcclxuICAgICAgICBjaGVja2VkVGFnczogW10sXHJcbiAgICAgICAgdGFnczogdGhpcy5kYXRhLnRhZ3MsXHJcbiAgICAgICAga2V5d29yZHM6IGtleXdvcmRcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoa2V5QXJyYXkubGVuZ3RoID09PSAwKSB0aGF0LmNhbGMoKTtcclxuXHJcblxyXG4gICAgICBrZXlBcnJheS5mb3JFYWNoKGtleSA9PiB7XHJcblxyXG4gICAgICAgIGxldCB0aW1lcyA9IDA7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodDIubmFtZS5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgdGltZXMrK1xyXG4gICAgICAgICAgICAgIHJlc3VsdCA9IHQyLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHRpbWVzID09PSAxKSB7XHJcbiAgICAgICAgICB0aGF0LmNsaWNrVGFnRihyZXN1bHQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjbGVhbigpIHtcclxuICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcbiAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHQyLnNob3dGbGFnID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHQyLnNob3dGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgIGNoZWNrZWRUYWdzOiBbXSxcclxuICAgICAgICB0YWdzOiB0aGlzLmRhdGEudGFncyxcclxuICAgICAgICBrZXl3b3JkczogXCJcIlxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jYWxjKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrU3RhcnMoZXZlbnQ6IGFueSkge1xyXG4gICAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQuZGF0YXNldC50aXRsZTtcclxuICAgICAgaWYgKHZhbHVlID09PSAn5riF56m6Jykge1xyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnMuZm9yRWFjaCgoczogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgcy5zaG93RmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnNbMF0gPSB7IG5hbWU6IFwi5YWo6YCJXCIsIHNob3dGbGFnOiB0cnVlIH07XHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBbXSwgc2hvd1N0YXJzOiB0aGlzLmRhdGEuc2hvd1N0YXJzIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gJ+WFqOmAiScpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2hvd1N0YXJzLmZvckVhY2goKHM6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHMuc2hvd0ZsYWcgPSB0cnVlO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnNbMF0gPSB7IG5hbWU6IFwi5riF56m6XCIsIHNob3dGbGFnOiB0cnVlIH07XHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBbJ+a4heepuicsICc2JywgJzUnLCAnNCcsICczJywgJzInLCAnMSddLCBzaG93U3RhcnM6IHRoaXMuZGF0YS5zaG93U3RhcnMgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnMuZm9yRWFjaCgoczogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAocy5uYW1lID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICBzLnNob3dGbGFnID0gIXMuc2hvd0ZsYWc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgdG1wID0gdGhpcy5kYXRhLm9wdFN0YXJzO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEub3B0U3RhcnMuaW5jbHVkZXModmFsdWUpKSB7XHJcbiAgICAgICAgICB0bXAgPSB0aGlzLmRhdGEub3B0U3RhcnMuZmlsdGVyKGZ1bmN0aW9uICh2LCBfLCBfXykge1xyXG4gICAgICAgICAgICByZXR1cm4gdiAhPT0gdmFsdWU7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0bXAucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldERhdGEhKHsgb3B0U3RhcnM6IHRtcCwgc2hvd1N0YXJzOiB0aGlzLmRhdGEuc2hvd1N0YXJzIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2FsYygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiaW5kVmlld1RhcCgpIHtcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnLi4vaW5kZXgvaW5kZXgnXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGMoKSB7XHJcblxyXG4gICAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aDtcclxuICAgICAgbGV0IGNvdW50ID0gTWF0aC5wb3coMiwgdGhpcy5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aCk7XHJcbiAgICAgIGxldCBjb21icyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBsZXQgdHM6IFtdID0gW107XHJcbiAgICAgICAgbGV0IHRzVEw6IFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIG1hc2sgPSAxOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgIGlmICgoaSAmIG1hc2spICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRzLnB1c2godGhpcy5kYXRhLmNoZWNrZWRUYWdzW2pdKTtcclxuICAgICAgICAgICAgdHNUTC5wdXNoKHRoaXMuZGF0YS5jaGVja2VkVGFnc1RMW2pdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG1hc2sgPSBtYXNrICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tYnMucHVzaCh7XHJcbiAgICAgICAgICBcInRhZ3NcIjogdHMsXHJcbiAgICAgICAgICBcInRhZ3NUTFwiOiB0c1RMLFxyXG4gICAgICAgICAgXCJzY29yZVwiOiAwLjAsXHJcbiAgICAgICAgICBcInBvc3NpYmxlXCI6IFtdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IG9wdFN0YXJzOiBzdHJpbmdbXSA9IHRoaXMuZGF0YS5vcHRTdGFycztcclxuICAgICAgLy8gJChcIi5idG4tb3B0XCIpLmVhY2goZnVuY3Rpb24gKF8sIF9fKSB7XHJcbiAgICAgIC8vICAgaWYgKCQodGhpcykuYXR0cihcIm9wdC1pZFwiKSA9PT0gXCJhbGxcIiB8fCAkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLXNlY29uZGFyeVwiKSkgcmV0dXJuO1xyXG4gICAgICAvLyAgIG9wdFN0YXJzLnB1c2goJCh0aGlzKS5hdHRyKFwib3B0LWlkXCIpKTtcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vJChcIiN0Ym9keS1yZWNvbW1lbmRcIikuaHRtbChcIlwiKTtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzOy8v5oqKdGhpc+WvueixoeWkjeWItuWIsOS4tOaXtuWPmOmHj3RoYXRcclxuICAgICAgY29tYnMuZm9yRWFjaCgoY29tYjogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkgPT4ge1xyXG4gICAgICAgIGxldCB0YWdzOiBzdHJpbmdbXSA9IGNvbWIudGFncztcclxuICAgICAgICBpZiAodGFncy5sZW5ndGggPT09IDAgfHwgdGFncy5sZW5ndGggPiAzKSByZXR1cm47XHJcbiAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgIGxldCBjaGFyczogSGVyb0Jhc2ljW10gPSBbLi4udGhhdC5kYXRhLnRhZ3NfYXZhbFt0YWdzWzBdXV07Ly/liIflibLmr4/kuKrlrZfnrKZcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxldCByZWR1Y2VkX2NoYXJzOiBIZXJvQmFzaWNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgIGNoYXJzLmZvckVhY2goKGNoYXI6IEhlcm9CYXNpYykgPT4ge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICAgIGxldCB0bXA6IEhlcm9CYXNpY1tdID0gdGhhdC5kYXRhLnRhZ3NfYXZhbFt0YWdzW2ldXTtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgICAgICB0bXAuZm9yRWFjaCgodGdjaDogSGVyb0Jhc2ljKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXIubmFtZSA9PT0gdGdjaC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZWR1Y2VkX2NoYXJzLnB1c2goY2hhcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgICAgY2hhcnMgPSByZWR1Y2VkX2NoYXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoYXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICBpZiAoIXRhZ3MuaW5jbHVkZXMoXCLpq5jnuqfotYTmt7HlubLlkZhcIikpIHtcclxuICAgICAgICAgIGxldCByZWR1Y2U2OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLmxldmVsICE9PSA2KSB7XHJcbiAgICAgICAgICAgICAgcmVkdWNlNi5wdXNoKGNoYXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNoYXJzID0gcmVkdWNlNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpbHRlcmVkX2NoYXJzOiBIZXJvQmFzaWNbXSA9IFtdO1xyXG4gICAgICAgIGNoYXJzLmZvckVhY2goZnVuY3Rpb24gKGNoYXI6IEhlcm9CYXNpYykge1xyXG4gICAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgICAgaWYgKG9wdFN0YXJzLmluY2x1ZGVzKGNoYXIubGV2ZWwudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgZmlsdGVyZWRfY2hhcnMucHVzaChjaGFyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgY2hhcnMgPSBmaWx0ZXJlZF9jaGFycztcclxuXHJcbiAgICAgICAgY29tYi5wb3NzaWJsZSA9IGNoYXJzO1xyXG4gICAgICAgIGlmIChjaGFycy5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBsZXQgcyA9IDA7XHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogYW55KSB7XHJcbiAgICAgICAgICBzICs9IGNoYXIubGV2ZWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcyA9IHMgLyBjaGFycy5sZW5ndGg7XHJcbiAgICAgICAgY29tYi5zY29yZSA9IHMgKyAwLjEgLyB0YWdzLmxlbmd0aCArIDAuOSAvIGNoYXJzLmxlbmd0aDtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbWJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IChhLnNjb3JlIDwgYi5zY29yZSA/IDEgOlxyXG4gICAgICAgICAgKGEudGFncy5sZW5ndGggPiBiLnRhZ3MubGVuZ3RoID8gMSA6IChhLnRhZ3MubGVuZ3RoIDwgYi50YWdzLmxlbmd0aCA/IC0xIDpcclxuICAgICAgICAgICAgMCkpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vbGV0IG5vID0gMTtcclxuICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICBjb21icy5mb3JFYWNoKChjb21iOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoIWNvbWIucG9zc2libGUgfHwgY29tYi5wb3NzaWJsZS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29tYi5wb3NzaWJsZS5zb3J0KGZ1bmN0aW9uIChhOiBhbnksIGI6IGFueSkge1xyXG4gICAgICAgICAgcmV0dXJuIGEubGV2ZWwgPiBiLmxldmVsID8gLTEgOiAoYS5sZXZlbCA8IGIubGV2ZWwgPyAxIDogMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgIC8vIGlmIChsYW5nICE9PSAnY24nKSAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xyXG4gICAgICAvL2h0dHBzOi8vYWsuZ3JhdWVuZWtvLnh5ei9ha2hyLmpzb25cclxuXHJcblxyXG4gICAgICB0aGF0LnNldERhdGEhKHsgcG9zc2libGU6IGNvbWJzIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0KCkge1xyXG4gICAgICBsZXQgX3RoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgLy9hcHAuZnVuYy5nZXQoJy9ha2hyLmpzb24nLCB7fSwgZnVuY3Rpb24gKGRhdGE6IEhlcm9bXSkge1xyXG4gICAgICAvL2xldCBkYXRhOiBIZXJvW10gPSBqc29uRGF0YS5kYXRhTGlzdDtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICBhcHAuZnVuYy5nZXQoJy90YWdzQXZhbCcsIHt9LCBmdW5jdGlvbiAocmVzcG9uc2U6IEFya1Jlc3ApIHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIHRoYXQuc2V0RGF0YSEoeyB0YWdzX2F2YWw6IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG5cclxuXHJcbnRoaXMuc2V0RGF0YSEoeyBvcHRTdGFyczogWyfmuIXnqbonLCAnNicsICc1JywgJzQnLCAnMycsICcyJywgJzEnXSB9KTsgXHJcblxyXG4gICAgICAvLyBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIC8vICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAvLyAgICAgY29uc3QgY2hhciA9IGRhdGFba2V5XTtcclxuICAgICAgLy8gICAgIGlmIChjaGFyLmhpZGRlbikgY29udGludWU7XHJcbiAgICAgIC8vICAgICBjaGFyLnRhZ3MhLnB1c2goY2hhci50eXBlICsgXCLlubLlkZhcIik7XHJcbiAgICAgIC8vICAgICBjaGFyLnRhZ3MhLnB1c2goY2hhci5zZXggKyBcIuaAp+W5suWRmFwiKTtcclxuICAgICAgLy8gICAgIGxldCBuYW1lID0gY2hhci5uYW1lO1xyXG4gICAgICAvLyAgICAgY2hhci50YWdzIS5mb3JFYWNoKGZ1bmN0aW9uICh0YWc6IHN0cmluZykge1xyXG4gICAgICAvLyAgICAgICBpZiAodGFnIGluIF90aGF0LmRhdGEudGFnc19hdmFsKSB7XHJcblxyXG4gICAgICAvLyAgICAgICAgIGxldCB0bXA6IHsgW2tleTogc3RyaW5nXTogSGVyb0Jhc2ljW10gfSA9IF90aGF0LmRhdGEudGFnc19hdmFsO1xyXG4gICAgICAvLyAgICAgICAgIHRtcFt0YWddLnB1c2goe1xyXG4gICAgICAvLyAgICAgICAgICAgXCJuYW1lXCI6IG5hbWUsXHJcbiAgICAgIC8vICAgICAgICAgICBcImltZ1wiOiBjaGFyW1wibmFtZS1lblwiXSxcclxuICAgICAgLy8gICAgICAgICAgIFwibGV2ZWxcIjogY2hhci5sZXZlbCxcclxuICAgICAgLy8gICAgICAgICAgIFwidHlwZVwiOiBjaGFyLnR5cGVcclxuICAgICAgLy8gICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vICAgICAgICAgX3RoYXQuc2V0RGF0YSEoeyB0YWdzX2F2YWw6IHRtcCB9KVxyXG5cclxuICAgICAgLy8gICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vICAgICAgICAgbGV0IHRtcDogeyBba2V5OiBzdHJpbmddOiBIZXJvQmFzaWNbXSB9ID0gX3RoYXQuZGF0YS50YWdzX2F2YWw7XHJcblxyXG4gICAgICAvLyAgICAgICAgIHRtcFt0YWddID0gW3tcclxuICAgICAgLy8gICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJpbWdcIjogY2hhcltcIm5hbWUtZW5cIl0sXHJcbiAgICAgIC8vICAgICAgICAgICBcImxldmVsXCI6IGNoYXIubGV2ZWwsXHJcbiAgICAgIC8vICAgICAgICAgICBcInR5cGVcIjogY2hhci50eXBlXHJcbiAgICAgIC8vICAgICAgICAgfV07XHJcblxyXG4gICAgICAvLyAgICAgICAgIF90aGF0LnNldERhdGEhKHsgdGFnc19hdmFsOiB0bXAgfSlcclxuXHJcbiAgICAgIC8vICAgICAgIH1cclxuXHJcbiAgICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9XHJcblxyXG5cclxuICAgICAgX3RoYXQuY2FsYygpO1xyXG4gICAgICAvL30pO1xyXG4gICAgfSxcclxuICAgIGNsaWNrVGFnKGV2ZW50OiBhbnkpIHtcclxuICAgICAgbGV0IHRhZyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnRpdGxlO1xyXG4gICAgICB0aGlzLmNsaWNrVGFnRih0YWcsIHRydWUpO1xyXG4gICAgfSxcclxuICAgIC8vIOaYr+WQpuaYr+eCueWHu+i/m+adpeeahOagh+W/lyx0cnVl55qE5pe25YCZ5omN5Lya5Y675o6J54K55Ye75qCH5b+XXHJcbiAgICBjbGlja1RhZ0YodGFnOiBzdHJpbmcsIGNsaWNrRmxhZzogYm9vbGVhbikge1xyXG4gICAgICBsZXQgX3RoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgbGV0IGNoZWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmICghY2xpY2tGbGFnKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodDIubmFtZSA9PT0gdGFnICYmIHQyLnNob3dGbGFnID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIHQyLnNob3dGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmRhdGEudGFncy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICB0WydjbnRhZ3MnXS5mb3JFYWNoKCh0MjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0Mi5uYW1lID09PSB0YWcpIHtcclxuICAgICAgICAgICAgICB0Mi5zaG93RmxhZyA9ICF0Mi5zaG93RmxhZztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICAvL+aYr+WQpueCuei/h1xyXG4gICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgaWYgKChfdGhhdC5kYXRhLmNoZWNrZWRUYWdzKS5pbmNsdWRlcyh0YWcpKSB7XHJcbiAgICAgICAgY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGVja2VkKSB7XHJcbiAgICAgICAgaWYgKGNsaWNrRmxhZykge1xyXG4gICAgICAgICAgbGV0IHRtcCA9IF90aGF0LmRhdGEuY2hlY2tlZFRhZ3M7XHJcbiAgICAgICAgICB0bXAgPSBfdGhhdC5kYXRhLmNoZWNrZWRUYWdzLmZpbHRlcihmdW5jdGlvbiAodiwgXywgX18pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHYgIT09IHRhZztcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIF90aGF0LnNldERhdGEhKHtcclxuICAgICAgICAgICAgY2hlY2tlZFRhZ3M6IHRtcFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfdGhhdC5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aCA+PSA2KSB7XHJcblxyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwi5peg5rOV6YCJ5oup5pu05aSa5qCH562+77ya5pyA5aSaNuS4quOAglwiLFxyXG4gICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgLy9hbGVydChcIuaXoOazlemAieaLqeabtOWkmuagh+etvu+8muacgOWkmjbkuKrjgIJcIik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgX3RoYXQuZGF0YS5jaGVja2VkVGFncy5wdXNoKHRhZyk7XHJcbiAgICAgICAgICBfdGhhdC5zZXREYXRhISh7XHJcbiAgICAgICAgICAgIGNoZWNrZWRUYWdzOiBfdGhhdC5kYXRhLmNoZWNrZWRUYWdzXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIF90aGF0LnNldERhdGEhKHsgdGFnczogX3RoYXQuZGF0YS50YWdzIH0pO1xyXG5cclxuICAgICAgLy8kKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYnRuLXByaW1hcnkgYnRuLXNlY29uZGFyeVwiKTtcclxuICAgICAgX3RoYXQuY2FsYygpO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgfSxcclxuICBsaWZldGltZXM6IHtcclxuICAgIC8vIOeUn+WRveWRqOacn+WHveaVsO+8jOWPr+S7peS4uuWHveaVsO+8jOaIluS4gOS4quWcqG1ldGhvZHPmrrXkuK3lrprkuYnnmoTmlrnms5XlkI1cclxuICAgIGF0dGFjaGVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICByZWFkeTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBtb3ZlZDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgZGV0YWNoZWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICB9XHJcbn0pIl19