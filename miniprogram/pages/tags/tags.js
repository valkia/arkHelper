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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQTtBQUdsQixNQUFNLFNBQVM7SUFNYixZQUFZLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLEdBQVc7UUFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztDQUVGO0FBeUJELFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsSUFBSSxFQUFFO1FBRUosU0FBUyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUztRQUNuQyxJQUFJLEVBQUU7WUFDSjtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUNwSDtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUMvRTtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUNqRjtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUVuUztZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUM3ZDtTQUNGO1FBQ0QsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUNwQixhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFDdEIsUUFBUSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNuQixRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ25CLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFB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QUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQyxLQUFLLENBQUMsT0FBUSxDQUFDO3dCQUNiLFdBQVcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVc7cUJBQ3BDLENBQUMsQ0FBQztpQkFFSjthQUNGO1lBQ0QsS0FBSyxDQUFDLE9BQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFHMUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBR2YsQ0FBQztLQUNGO0lBQ0QsU0FBUyxFQUFFO1FBRVQsUUFBUSxFQUFFLGNBQWMsQ0FBQztRQUN6QixLQUFLLEVBQUU7WUFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsS0FBSyxFQUFFLGNBQWMsQ0FBQztRQUN0QixRQUFRLEVBQUUsY0FBYyxDQUFDO0tBQzFCO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy90YWdzLmpzXHJcbnZhciBhcHAgPSBnZXRBcHAoKVxyXG4vL0B0cy1pZ25vcmVcclxuaW1wb3J0IEFya1Jlc3AgPSByZXF1aXJlKCcuLi8uLi9tb2RlbC9BcmtSZXNwLmpzJyk7XHJcbmNsYXNzIEhlcm9CYXNpYyB7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICB0eXBlPzogc3RyaW5nO1xyXG4gIGxldmVsPzogbnVtYmVyO1xyXG4gIGltZz86IHN0cmluZ1xyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgbGV2ZWw6IG51bWJlciwgaW1nOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5sZXZlbCA9IGxldmVsO1xyXG4gICAgdGhpcy5pbWcgPSBpbWc7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLy8gY2xhc3MgSGVybyBleHRlbmRzIEhlcm9CYXNpYyB7XHJcbi8vICAgY2FtcD86IHN0cmluZztcclxuLy8gICBzZXg/OiBzdHJpbmc7XHJcbi8vICAgY2hhcmFjdGVyaXN0aWM/OiBzdHJpbmc7XHJcbi8vICAgdGFncz86IHN0cmluZ1tdO1xyXG4vLyAgIGhpZGRlbj86IGJvb2xlYW47XHJcbi8vICAgXCJuYW1lLWVuXCI/OiBzdHJpbmc7XHJcblxyXG5cclxuLy8gICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNhbXA6IHN0cmluZywgdHlwZTogc3RyaW5nLCBsZXZlbDogbnVtYmVyLCBzZXg6IHN0cmluZywgY2hhcmFjdGVyaXN0aWM6IHN0cmluZywgdGFnczogW10sIGhpZGRlbjogYm9vbGVhbiwgbmFtZV9lbjogc3RyaW5nLCBpbWc6IHN0cmluZykge1xyXG4vLyAgICAgc3VwZXIobmFtZSwgdHlwZSwgbGV2ZWwsIGltZyk7XHJcbi8vICAgICB0aGlzLmNhbXAgPSBjYW1wO1xyXG4vLyAgICAgdGhpcy5zZXggPSBzZXg7XHJcbi8vICAgICB0aGlzLmNoYXJhY3RlcmlzdGljID0gY2hhcmFjdGVyaXN0aWM7XHJcbi8vICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4vLyAgICAgdGhpcy5oaWRkZW4gPSBoaWRkZW47XHJcbi8vICAgICB0aGlzW1wibmFtZS1lblwiXSA9IG5hbWVfZW47XHJcblxyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxuXHJcblxyXG5Db21wb25lbnQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG5cclxuICAgIEN1c3RvbUJhcjogYXBwLmdsb2JhbERhdGEuQ3VzdG9tQmFyLFxyXG4gICAgdGFnczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIui1hOi0qFwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi5paw5omLXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6LWE5rex5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6auY57qn6LWE5rex5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuS9jee9rlwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi6L+c56iL5L2NXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6L+R5oiY5L2NXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuaAp+WIq1wiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi55S35oCn5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5aWz5oCn5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuenjeexu1wiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi5YWI6ZSL5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi54uZ5Ye75bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5Yy755aX5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5pyv5biI5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6L+R5Y2r5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6YeN6KOF5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6L6F5Yqp5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi54m556eN5bmy5ZGYXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG5cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLor43nvIBcIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIuayu+eWl1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuaUr+aPtFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui+k+WHulwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIue+pOaUu1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWHj+mAn1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIueUn+WtmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIumYsuaKpFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWJiuW8sVwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuS9jeenu1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuaOp+WculwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIueIhuWPkVwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWPrOWUpFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuW/q+mAn+Wkjea0u1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui0ueeUqOWbnuWkjVwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHRhZ3NfYXZhbDoge30gPSB7fSxcclxuICAgIGNoZWNrZWRUYWdzOiBbXSA9IFtdLFxyXG4gICAgY2hlY2tlZFRhZ3NUTDogW10gPSBbXSxcclxuICAgIHBvc3NpYmxlOiBbXSA9IFt7fV0sXHJcbiAgICBvcHRTdGFyczogW10gPSBbXCJcIl0sXHJcbiAgICBzaG93U3RhcnM6IFtdID0gW3sgbmFtZTogXCLmuIXnqbpcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjZcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjVcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjRcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjNcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjJcIiwgc2hvd0ZsYWc6IHRydWUgfSwgeyBuYW1lOiBcIjFcIiwgc2hvd0ZsYWc6IHRydWUgfV0sXHJcbiAgICBrZXl3b3JkczogXCJcIlxyXG5cclxuICB9LFxyXG5cclxuXHJcbiAgbWV0aG9kczoge1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwbG9hZCgpIHtcclxuICAgICAgdGhpcy5jbGVhbigpXHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcclxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAvLyB0ZW1wRmlsZVBhdGjlj6/ku6XkvZzkuLppbWfmoIfnrb7nmoRzcmPlsZ7mgKfmmL7npLrlm77niYdcclxuICAgICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRoc1xyXG4gICAgICAgICAgd3guY29tcHJlc3NJbWFnZSh7XHJcbiAgICAgICAgICAgIHNyYzogdGVtcEZpbGVQYXRoc1swXSwgLy8g5Zu+54mH6Lev5b6EXHJcbiAgICAgICAgICAgIHF1YWxpdHk6IDgwLCAvLyDljovnvKnotKjph48sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgdGVtcEZpbGVQYXRoID0gcmVzLnRlbXBGaWxlUGF0aFxyXG5cclxuICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2R0b2RvLmNuL2Fyay91cGxvYWQyJywgLy/ku4XkuLrnpLrkvovvvIzpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAndXNlcic6ICd0ZXN0J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICE9ICdbXScpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFnTGlzdCA9IEpTT04ucGFyc2UocmVzLmRhdGEpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFnTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbGlja1RhZ0YodGFnTGlzdFtpXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLmsqHmnInor4bliKvnmoTmi5vli5/moIfnrb7vvIzor7fmo4Dmn6Xlm77niYfjgIJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAvL2RvIHNvbWV0aGluZ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlYXJjaChlOiBhbnkpIHtcclxuICAgICAgbGV0IGtleXdvcmQgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgbGV0IGtleUFycmF5OiBbXSA9IGtleXdvcmQuc3BsaXQoL1xccysvKTtcclxuXHJcblxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmICh0Mi5zaG93RmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0Mi5zaG93RmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGF0LnNldERhdGEhKHtcclxuICAgICAgICBjaGVja2VkVGFnczogW10sXHJcbiAgICAgICAgdGFnczogdGhpcy5kYXRhLnRhZ3MsXHJcbiAgICAgICAga2V5d29yZHM6IGtleXdvcmRcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoa2V5QXJyYXkubGVuZ3RoID09PSAwKSB0aGF0LmNhbGMoKTtcclxuXHJcblxyXG4gICAgICBrZXlBcnJheS5mb3JFYWNoKGtleSA9PiB7XHJcblxyXG4gICAgICAgIGxldCB0aW1lcyA9IDA7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodDIubmFtZS5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgdGltZXMrK1xyXG4gICAgICAgICAgICAgIHJlc3VsdCA9IHQyLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHRpbWVzID09PSAxKSB7XHJcbiAgICAgICAgICB0aGF0LmNsaWNrVGFnRihyZXN1bHQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjbGVhbigpIHtcclxuICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcbiAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHQyLnNob3dGbGFnID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHQyLnNob3dGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgIGNoZWNrZWRUYWdzOiBbXSxcclxuICAgICAgICB0YWdzOiB0aGlzLmRhdGEudGFncyxcclxuICAgICAgICBrZXl3b3JkczogXCJcIlxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jYWxjKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrU3RhcnMoZXZlbnQ6IGFueSkge1xyXG4gICAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQuZGF0YXNldC50aXRsZTtcclxuICAgICAgaWYgKHZhbHVlID09PSAn5riF56m6Jykge1xyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnMuZm9yRWFjaCgoczogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgcy5zaG93RmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnNbMF0gPSB7IG5hbWU6IFwi5YWo6YCJXCIsIHNob3dGbGFnOiB0cnVlIH07XHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBbXSwgc2hvd1N0YXJzOiB0aGlzLmRhdGEuc2hvd1N0YXJzIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gJ+WFqOmAiScpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2hvd1N0YXJzLmZvckVhY2goKHM6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHMuc2hvd0ZsYWcgPSB0cnVlO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnNbMF0gPSB7IG5hbWU6IFwi5riF56m6XCIsIHNob3dGbGFnOiB0cnVlIH07XHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBbJ+a4heepuicsICc2JywgJzUnLCAnNCcsICczJywgJzInLCAnMSddLCBzaG93U3RhcnM6IHRoaXMuZGF0YS5zaG93U3RhcnMgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnMuZm9yRWFjaCgoczogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAocy5uYW1lID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICBzLnNob3dGbGFnID0gIXMuc2hvd0ZsYWc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgdG1wID0gdGhpcy5kYXRhLm9wdFN0YXJzO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEub3B0U3RhcnMuaW5jbHVkZXModmFsdWUpKSB7XHJcbiAgICAgICAgICB0bXAgPSB0aGlzLmRhdGEub3B0U3RhcnMuZmlsdGVyKGZ1bmN0aW9uICh2LCBfLCBfXykge1xyXG4gICAgICAgICAgICByZXR1cm4gdiAhPT0gdmFsdWU7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0bXAucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldERhdGEhKHsgb3B0U3RhcnM6IHRtcCwgc2hvd1N0YXJzOiB0aGlzLmRhdGEuc2hvd1N0YXJzIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2FsYygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiaW5kVmlld1RhcCgpIHtcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnLi4vaW5kZXgvaW5kZXgnXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGMoKSB7XHJcblxyXG4gICAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aDtcclxuICAgICAgbGV0IGNvdW50ID0gTWF0aC5wb3coMiwgdGhpcy5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aCk7XHJcbiAgICAgIGxldCBjb21icyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBsZXQgdHM6IFtdID0gW107XHJcbiAgICAgICAgbGV0IHRzVEw6IFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIG1hc2sgPSAxOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgIGlmICgoaSAmIG1hc2spICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRzLnB1c2godGhpcy5kYXRhLmNoZWNrZWRUYWdzW2pdKTtcclxuICAgICAgICAgICAgdHNUTC5wdXNoKHRoaXMuZGF0YS5jaGVja2VkVGFnc1RMW2pdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG1hc2sgPSBtYXNrICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tYnMucHVzaCh7XHJcbiAgICAgICAgICBcInRhZ3NcIjogdHMsXHJcbiAgICAgICAgICBcInRhZ3NUTFwiOiB0c1RMLFxyXG4gICAgICAgICAgXCJzY29yZVwiOiAwLjAsXHJcbiAgICAgICAgICBcInBvc3NpYmxlXCI6IFtdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IG9wdFN0YXJzOiBzdHJpbmdbXSA9IHRoaXMuZGF0YS5vcHRTdGFycztcclxuICAgICAgLy8gJChcIi5idG4tb3B0XCIpLmVhY2goZnVuY3Rpb24gKF8sIF9fKSB7XHJcbiAgICAgIC8vICAgaWYgKCQodGhpcykuYXR0cihcIm9wdC1pZFwiKSA9PT0gXCJhbGxcIiB8fCAkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLXNlY29uZGFyeVwiKSkgcmV0dXJuO1xyXG4gICAgICAvLyAgIG9wdFN0YXJzLnB1c2goJCh0aGlzKS5hdHRyKFwib3B0LWlkXCIpKTtcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vJChcIiN0Ym9keS1yZWNvbW1lbmRcIikuaHRtbChcIlwiKTtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzOy8v5oqKdGhpc+WvueixoeWkjeWItuWIsOS4tOaXtuWPmOmHj3RoYXRcclxuICAgICAgY29tYnMuZm9yRWFjaCgoY29tYjogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkgPT4ge1xyXG4gICAgICAgIGxldCB0YWdzOiBzdHJpbmdbXSA9IGNvbWIudGFncztcclxuICAgICAgICBpZiAodGFncy5sZW5ndGggPT09IDAgfHwgdGFncy5sZW5ndGggPiAzKSByZXR1cm47XHJcbiAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgIGxldCBjaGFyczogSGVyb0Jhc2ljW10gPSBbLi4udGhhdC5kYXRhLnRhZ3NfYXZhbFt0YWdzWzBdXV07Ly/liIflibLmr4/kuKrlrZfnrKZcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxldCByZWR1Y2VkX2NoYXJzOiBIZXJvQmFzaWNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgIGNoYXJzLmZvckVhY2goKGNoYXI6IEhlcm9CYXNpYykgPT4ge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICAgIGxldCB0bXA6IEhlcm9CYXNpY1tdID0gdGhhdC5kYXRhLnRhZ3NfYXZhbFt0YWdzW2ldXTtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgICAgICB0bXAuZm9yRWFjaCgodGdjaDogSGVyb0Jhc2ljKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXIubmFtZSA9PT0gdGdjaC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZWR1Y2VkX2NoYXJzLnB1c2goY2hhcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgICAgY2hhcnMgPSByZWR1Y2VkX2NoYXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoYXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICBpZiAoIXRhZ3MuaW5jbHVkZXMoXCLpq5jnuqfotYTmt7HlubLlkZhcIikpIHtcclxuICAgICAgICAgIGxldCByZWR1Y2U2OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLmxldmVsICE9PSA2KSB7XHJcbiAgICAgICAgICAgICAgcmVkdWNlNi5wdXNoKGNoYXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNoYXJzID0gcmVkdWNlNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpbHRlcmVkX2NoYXJzOiBIZXJvQmFzaWNbXSA9IFtdO1xyXG4gICAgICAgIGNoYXJzLmZvckVhY2goZnVuY3Rpb24gKGNoYXI6IEhlcm9CYXNpYykge1xyXG4gICAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgICAgaWYgKG9wdFN0YXJzLmluY2x1ZGVzKGNoYXIubGV2ZWwudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgZmlsdGVyZWRfY2hhcnMucHVzaChjaGFyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgY2hhcnMgPSBmaWx0ZXJlZF9jaGFycztcclxuXHJcbiAgICAgICAgY29tYi5wb3NzaWJsZSA9IGNoYXJzO1xyXG4gICAgICAgIGlmIChjaGFycy5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBsZXQgcyA9IDA7XHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogYW55KSB7XHJcbiAgICAgICAgICBzICs9IGNoYXIubGV2ZWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcyA9IHMgLyBjaGFycy5sZW5ndGg7XHJcbiAgICAgICAgY29tYi5zY29yZSA9IHMgKyAwLjEgLyB0YWdzLmxlbmd0aCArIDAuOSAvIGNoYXJzLmxlbmd0aDtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbWJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IChhLnNjb3JlIDwgYi5zY29yZSA/IDEgOlxyXG4gICAgICAgICAgKGEudGFncy5sZW5ndGggPiBiLnRhZ3MubGVuZ3RoID8gMSA6IChhLnRhZ3MubGVuZ3RoIDwgYi50YWdzLmxlbmd0aCA/IC0xIDpcclxuICAgICAgICAgICAgMCkpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vbGV0IG5vID0gMTtcclxuICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICBjb21icy5mb3JFYWNoKChjb21iOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoIWNvbWIucG9zc2libGUgfHwgY29tYi5wb3NzaWJsZS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29tYi5wb3NzaWJsZS5zb3J0KGZ1bmN0aW9uIChhOiBhbnksIGI6IGFueSkge1xyXG4gICAgICAgICAgcmV0dXJuIGEubGV2ZWwgPiBiLmxldmVsID8gLTEgOiAoYS5sZXZlbCA8IGIubGV2ZWwgPyAxIDogMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgIC8vIGlmIChsYW5nICE9PSAnY24nKSAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xyXG4gICAgICAvL2h0dHBzOi8vYWsuZ3JhdWVuZWtvLnh5ei9ha2hyLmpzb25cclxuXHJcblxyXG4gICAgICB0aGF0LnNldERhdGEhKHsgcG9zc2libGU6IGNvbWJzIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0KCkge1xyXG4gICAgICBsZXQgX3RoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgLy9hcHAuZnVuYy5nZXQoJy9ha2hyLmpzb24nLCB7fSwgZnVuY3Rpb24gKGRhdGE6IEhlcm9bXSkge1xyXG4gICAgICAvL2xldCBkYXRhOiBIZXJvW10gPSBqc29uRGF0YS5kYXRhTGlzdDtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICBhcHAuZnVuYy5nZXQoJy90YWdzQXZhbCcsIHt9LCBmdW5jdGlvbiAocmVzcG9uc2U6IEFya1Jlc3ApIHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIHRoYXQuc2V0RGF0YSEoeyB0YWdzX2F2YWw6IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgLy8gZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAvLyAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgLy8gICAgIGNvbnN0IGNoYXIgPSBkYXRhW2tleV07XHJcbiAgICAgIC8vICAgICBpZiAoY2hhci5oaWRkZW4pIGNvbnRpbnVlO1xyXG4gICAgICAvLyAgICAgY2hhci50YWdzIS5wdXNoKGNoYXIudHlwZSArIFwi5bmy5ZGYXCIpO1xyXG4gICAgICAvLyAgICAgY2hhci50YWdzIS5wdXNoKGNoYXIuc2V4ICsgXCLmgKflubLlkZhcIik7XHJcbiAgICAgIC8vICAgICBsZXQgbmFtZSA9IGNoYXIubmFtZTtcclxuICAgICAgLy8gICAgIGNoYXIudGFncyEuZm9yRWFjaChmdW5jdGlvbiAodGFnOiBzdHJpbmcpIHtcclxuICAgICAgLy8gICAgICAgaWYgKHRhZyBpbiBfdGhhdC5kYXRhLnRhZ3NfYXZhbCkge1xyXG5cclxuICAgICAgLy8gICAgICAgICBsZXQgdG1wOiB7IFtrZXk6IHN0cmluZ106IEhlcm9CYXNpY1tdIH0gPSBfdGhhdC5kYXRhLnRhZ3NfYXZhbDtcclxuICAgICAgLy8gICAgICAgICB0bXBbdGFnXS5wdXNoKHtcclxuICAgICAgLy8gICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJpbWdcIjogY2hhcltcIm5hbWUtZW5cIl0sXHJcbiAgICAgIC8vICAgICAgICAgICBcImxldmVsXCI6IGNoYXIubGV2ZWwsXHJcbiAgICAgIC8vICAgICAgICAgICBcInR5cGVcIjogY2hhci50eXBlXHJcbiAgICAgIC8vICAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyAgICAgICAgIF90aGF0LnNldERhdGEhKHsgdGFnc19hdmFsOiB0bXAgfSlcclxuXHJcbiAgICAgIC8vICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyAgICAgICAgIGxldCB0bXA6IHsgW2tleTogc3RyaW5nXTogSGVyb0Jhc2ljW10gfSA9IF90aGF0LmRhdGEudGFnc19hdmFsO1xyXG5cclxuICAgICAgLy8gICAgICAgICB0bXBbdGFnXSA9IFt7XHJcbiAgICAgIC8vICAgICAgICAgICBcIm5hbWVcIjogbmFtZSxcclxuICAgICAgLy8gICAgICAgICAgIFwiaW1nXCI6IGNoYXJbXCJuYW1lLWVuXCJdLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJsZXZlbFwiOiBjaGFyLmxldmVsLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJ0eXBlXCI6IGNoYXIudHlwZVxyXG4gICAgICAvLyAgICAgICAgIH1dO1xyXG5cclxuICAgICAgLy8gICAgICAgICBfdGhhdC5zZXREYXRhISh7IHRhZ3NfYXZhbDogdG1wIH0pXHJcblxyXG4gICAgICAvLyAgICAgICB9XHJcblxyXG4gICAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgIF90aGF0LmNhbGMoKTtcclxuICAgICAgLy99KTtcclxuICAgIH0sXHJcbiAgICBjbGlja1RhZyhldmVudDogYW55KSB7XHJcbiAgICAgIGxldCB0YWcgPSBldmVudC50YXJnZXQuZGF0YXNldC50aXRsZTtcclxuICAgICAgdGhpcy5jbGlja1RhZ0YodGFnLCB0cnVlKTtcclxuICAgIH0sXHJcbiAgICAvLyDmmK/lkKbmmK/ngrnlh7vov5vmnaXnmoTmoIflv5csdHJ1ZeeahOaXtuWAmeaJjeS8muWOu+aOieeCueWHu+agh+W/l1xyXG4gICAgY2xpY2tUYWdGKHRhZzogc3RyaW5nLCBjbGlja0ZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgbGV0IF90aGF0ID0gdGhpcztcclxuXHJcbiAgICAgIGxldCBjaGVja2VkID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoIWNsaWNrRmxhZykge1xyXG4gICAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHQyLm5hbWUgPT09IHRhZyAmJiB0Mi5zaG93RmxhZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICB0Mi5zaG93RmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodDIubmFtZSA9PT0gdGFnKSB7XHJcbiAgICAgICAgICAgICAgdDIuc2hvd0ZsYWcgPSAhdDIuc2hvd0ZsYWc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgLy/mmK/lkKbngrnov4dcclxuICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgIGlmICgoX3RoYXQuZGF0YS5jaGVja2VkVGFncykuaW5jbHVkZXModGFnKSkge1xyXG4gICAgICAgIGNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hlY2tlZCkge1xyXG4gICAgICAgIGlmIChjbGlja0ZsYWcpIHtcclxuICAgICAgICAgIGxldCB0bXAgPSBfdGhhdC5kYXRhLmNoZWNrZWRUYWdzO1xyXG4gICAgICAgICAgdG1wID0gX3RoYXQuZGF0YS5jaGVja2VkVGFncy5maWx0ZXIoZnVuY3Rpb24gKHYsIF8sIF9fKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ICE9PSB0YWc7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBfdGhhdC5zZXREYXRhISh7XHJcbiAgICAgICAgICAgIGNoZWNrZWRUYWdzOiB0bXBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RoYXQuZGF0YS5jaGVja2VkVGFncy5sZW5ndGggPj0gNikge1xyXG5cclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaXoOazlemAieaLqeabtOWkmuagh+etvu+8muacgOWkmjbkuKrjgIJcIixcclxuICAgICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIC8vYWxlcnQoXCLml6Dms5XpgInmi6nmm7TlpJrmoIfnrb7vvJrmnIDlpJo25Liq44CCXCIpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgIF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MucHVzaCh0YWcpO1xyXG4gICAgICAgICAgX3RoYXQuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICBjaGVja2VkVGFnczogX3RoYXQuZGF0YS5jaGVja2VkVGFnc1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBfdGhhdC5zZXREYXRhISh7IHRhZ3M6IF90aGF0LmRhdGEudGFncyB9KTtcclxuXHJcbiAgICAgIC8vJCh0aGlzKS50b2dnbGVDbGFzcyhcImJ0bi1wcmltYXJ5IGJ0bi1zZWNvbmRhcnlcIik7XHJcbiAgICAgIF90aGF0LmNhbGMoKTtcclxuXHJcblxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGlmZXRpbWVzOiB7XHJcbiAgICAvLyDnlJ/lkb3lkajmnJ/lh73mlbDvvIzlj6/ku6XkuLrlh73mlbDvvIzmiJbkuIDkuKrlnKhtZXRob2Rz5q615Lit5a6a5LmJ55qE5pa55rOV5ZCNXHJcbiAgICBhdHRhY2hlZDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgbW92ZWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIGRldGFjaGVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgfVxyXG59KSJdfQ==