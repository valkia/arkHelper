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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQTtBQUdsQixNQUFNLFNBQVM7SUFNYixZQUFZLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLEdBQVc7UUFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztDQUVGO0FBeUJELFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsSUFBSSxFQUFFO1FBRUosU0FBUyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUztRQUNuQyxJQUFJLEVBQUU7WUFDSjtnQkFDRSxJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUNwSDtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUMvRTtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUNqRjtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUVuUztZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUM3ZDtTQUNGO1FBQ0QsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUNwQixhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFDdEIsUUFBUSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNuQixRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ25CLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFB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QUFLLEVBQUUsZ0JBQWdCO3dCQUN2QixJQUFJLEVBQUUsTUFBTTt3QkFDWixRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUE7b0JBR0YsT0FBTztpQkFDUjtxQkFBTTtvQkFFTCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pDLEtBQUssQ0FBQyxPQUFRLENBQUM7d0JBQ2IsV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVztxQkFDcEMsQ0FBQyxDQUFDO2lCQUVKO2FBQ0Y7WUFDRCxLQUFLLENBQUMsT0FBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUcxQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFHZixDQUFDO0tBQ0Y7SUFDRCxTQUFTLEVBQUU7UUFFVCxRQUFRLEVBQUUsY0FBYyxDQUFDO1FBQ3pCLEtBQUssRUFBRTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxLQUFLLEVBQUUsY0FBYyxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxjQUFjLENBQUM7S0FDMUI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL3RhZ3MuanNcclxudmFyIGFwcCA9IGdldEFwcCgpXHJcbi8vQHRzLWlnbm9yZVxyXG5pbXBvcnQgQXJrUmVzcCA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL0Fya1Jlc3AuanMnKTtcclxuY2xhc3MgSGVyb0Jhc2ljIHtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIHR5cGU/OiBzdHJpbmc7XHJcbiAgbGV2ZWw/OiBudW1iZXI7XHJcbiAgaW1nPzogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBsZXZlbDogbnVtYmVyLCBpbWc6IHN0cmluZykge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmxldmVsID0gbGV2ZWw7XHJcbiAgICB0aGlzLmltZyA9IGltZztcclxuICB9XHJcblxyXG59XHJcblxyXG4vLyBjbGFzcyBIZXJvIGV4dGVuZHMgSGVyb0Jhc2ljIHtcclxuLy8gICBjYW1wPzogc3RyaW5nO1xyXG4vLyAgIHNleD86IHN0cmluZztcclxuLy8gICBjaGFyYWN0ZXJpc3RpYz86IHN0cmluZztcclxuLy8gICB0YWdzPzogc3RyaW5nW107XHJcbi8vICAgaGlkZGVuPzogYm9vbGVhbjtcclxuLy8gICBcIm5hbWUtZW5cIj86IHN0cmluZztcclxuXHJcblxyXG4vLyAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY2FtcDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGxldmVsOiBudW1iZXIsIHNleDogc3RyaW5nLCBjaGFyYWN0ZXJpc3RpYzogc3RyaW5nLCB0YWdzOiBbXSwgaGlkZGVuOiBib29sZWFuLCBuYW1lX2VuOiBzdHJpbmcsIGltZzogc3RyaW5nKSB7XHJcbi8vICAgICBzdXBlcihuYW1lLCB0eXBlLCBsZXZlbCwgaW1nKTtcclxuLy8gICAgIHRoaXMuY2FtcCA9IGNhbXA7XHJcbi8vICAgICB0aGlzLnNleCA9IHNleDtcclxuLy8gICAgIHRoaXMuY2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYztcclxuLy8gICAgIHRoaXMudGFncyA9IHRhZ3M7XHJcbi8vICAgICB0aGlzLmhpZGRlbiA9IGhpZGRlbjtcclxuLy8gICAgIHRoaXNbXCJuYW1lLWVuXCJdID0gbmFtZV9lbjtcclxuXHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5cclxuXHJcbkNvbXBvbmVudCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgYWRkR2xvYmFsQ2xhc3M6IHRydWUsXHJcbiAgfSxcclxuICBkYXRhOiB7XHJcblxyXG4gICAgQ3VzdG9tQmFyOiBhcHAuZ2xvYmFsRGF0YS5DdXN0b21CYXIsXHJcbiAgICB0YWdzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi6LWE6LSoXCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW3sgbmFtZTogXCLmlrDmiYtcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLotYTmt7HlubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLpq5jnuqfotYTmt7HlubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH1dXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi5L2N572uXCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW3sgbmFtZTogXCLov5znqIvkvY1cIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLov5HmiJjkvY1cIiwgc2hvd0ZsYWc6IGZhbHNlIH1dXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi5oCn5YirXCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW3sgbmFtZTogXCLnlLfmgKflubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLlpbPmgKflubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH1dXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi56eN57G7XCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW3sgbmFtZTogXCLlhYjplIvlubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLni5nlh7vlubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLljLvnlpflubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLmnK/luIjlubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLov5HljavlubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLph43oo4XlubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLovoXliqnlubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLnibnnp43lubLlkZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH1dXHJcblxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuivjee8gFwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFt7IG5hbWU6IFwi5rK755aXXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5pSv5o+0XCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6L6T5Ye6XCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi576k5pS7XCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5YeP6YCfXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi55Sf5a2YXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6Ziy5oqkXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5YmK5byxXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5L2N56e7XCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5o6n5Zy6XCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi54iG5Y+RXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5Y+s5ZSkXCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi5b+r6YCf5aSN5rS7XCIsIHNob3dGbGFnOiBmYWxzZSB9LCB7IG5hbWU6IFwi6LS555So5Zue5aSNXCIsIHNob3dGbGFnOiBmYWxzZSB9XVxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgdGFnc19hdmFsOiB7fSA9IHt9LFxyXG4gICAgY2hlY2tlZFRhZ3M6IFtdID0gW10sXHJcbiAgICBjaGVja2VkVGFnc1RMOiBbXSA9IFtdLFxyXG4gICAgcG9zc2libGU6IFtdID0gW3t9XSxcclxuICAgIG9wdFN0YXJzOiBbXSA9IFtcIlwiXSxcclxuICAgIHNob3dTdGFyczogW10gPSBbeyBuYW1lOiBcIua4heepulwiLCBzaG93RmxhZzogdHJ1ZSB9LCB7IG5hbWU6IFwiNlwiLCBzaG93RmxhZzogdHJ1ZSB9LCB7IG5hbWU6IFwiNVwiLCBzaG93RmxhZzogdHJ1ZSB9LCB7IG5hbWU6IFwiNFwiLCBzaG93RmxhZzogdHJ1ZSB9LCB7IG5hbWU6IFwiM1wiLCBzaG93RmxhZzogdHJ1ZSB9LCB7IG5hbWU6IFwiMlwiLCBzaG93RmxhZzogdHJ1ZSB9LCB7IG5hbWU6IFwiMVwiLCBzaG93RmxhZzogdHJ1ZSB9XSxcclxuICAgIGtleXdvcmRzOiBcIlwiXHJcblxyXG4gIH0sXHJcblxyXG5cclxuICBtZXRob2RzOiB7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBsb2FkKCkge1xyXG4gICAgICB0aGlzLmNsZWFuKClcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxyXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIC8vIHRlbXBGaWxlUGF0aOWPr+S7peS9nOS4umltZ+agh+etvueahHNyY+WxnuaAp+aYvuekuuWbvueJh1xyXG4gICAgICAgICAgY29uc3QgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgICB3eC5jb21wcmVzc0ltYWdlKHtcclxuICAgICAgICAgICAgc3JjOiB0ZW1wRmlsZVBhdGhzWzBdLCAvLyDlm77niYfot6/lvoRcclxuICAgICAgICAgICAgcXVhbGl0eTogODAsIC8vIOWOi+e8qei0qOmHjyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICBjb25zdCB0ZW1wRmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoXHJcblxyXG4gICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHRvZG8uY24vYXJrL3VwbG9hZDInLCAvL+S7heS4uuekuuS+i++8jOmdnuecn+WunueahOaOpeWPo+WcsOWdgFxyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IHRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICd1c2VyJzogJ3Rlc3QnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEgIT0gJ1tdJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YWdMaXN0ID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsaWNrVGFnRih0YWdMaXN0W2ldLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuayoeacieivhuWIq+eahOaLm+WLn+agh+etvu+8jOivt+ajgOafpeWbvueJh+OAglwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vZG8gc29tZXRoaW5nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2VhcmNoKGU6IGFueSkge1xyXG4gICAgICBsZXQga2V5d29yZCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICBsZXQga2V5QXJyYXk6IFtdID0ga2V5d29yZC5zcGxpdCgvXFxzKy8pO1xyXG5cclxuXHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgdGhpcy5kYXRhLnRhZ3MuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcbiAgICAgICAgdFsnY250YWdzJ10uZm9yRWFjaCgodDI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHQyLnNob3dGbGFnID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHQyLnNob3dGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoYXQuc2V0RGF0YSEoe1xyXG4gICAgICAgIGNoZWNrZWRUYWdzOiBbXSxcclxuICAgICAgICB0YWdzOiB0aGlzLmRhdGEudGFncyxcclxuICAgICAgICBrZXl3b3Jkczoga2V5d29yZFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChrZXlBcnJheS5sZW5ndGggPT09IDApIHRoYXQuY2FsYygpO1xyXG5cclxuXHJcbiAgICAgIGtleUFycmF5LmZvckVhY2goa2V5ID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVzID0gMDtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLmRhdGEudGFncy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICB0WydjbnRhZ3MnXS5mb3JFYWNoKCh0MjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0Mi5uYW1lLmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgICAgICAgICB0aW1lcysrXHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0gdDIubmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAodGltZXMgPT09IDEpIHtcclxuICAgICAgICAgIHRoYXQuY2xpY2tUYWdGKHJlc3VsdCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNsZWFuKCkge1xyXG4gICAgICB0aGlzLmRhdGEudGFncy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuICAgICAgICB0WydjbnRhZ3MnXS5mb3JFYWNoKCh0MjogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAodDIuc2hvd0ZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdDIuc2hvd0ZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgY2hlY2tlZFRhZ3M6IFtdLFxyXG4gICAgICAgIHRhZ3M6IHRoaXMuZGF0YS50YWdzLFxyXG4gICAgICAgIGtleXdvcmRzOiBcIlwiXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNhbGMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tTdGFycyhldmVudDogYW55KSB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnRpdGxlO1xyXG4gICAgICBpZiAodmFsdWUgPT09ICfmuIXnqbonKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNob3dTdGFycy5mb3JFYWNoKChzOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICBzLnNob3dGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5kYXRhLnNob3dTdGFyc1swXSA9IHsgbmFtZTogXCLlhajpgIlcIiwgc2hvd0ZsYWc6IHRydWUgfTtcclxuICAgICAgICB0aGlzLnNldERhdGEhKHsgb3B0U3RhcnM6IFtdLCBzaG93U3RhcnM6IHRoaXMuZGF0YS5zaG93U3RhcnMgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbHVlID09PSAn5YWo6YCJJykge1xyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93U3RhcnMuZm9yRWFjaCgoczogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgcy5zaG93RmxhZyA9IHRydWU7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5kYXRhLnNob3dTdGFyc1swXSA9IHsgbmFtZTogXCLmuIXnqbpcIiwgc2hvd0ZsYWc6IHRydWUgfTtcclxuICAgICAgICB0aGlzLnNldERhdGEhKHsgb3B0U3RhcnM6IFsn5riF56m6JywgJzYnLCAnNScsICc0JywgJzMnLCAnMicsICcxJ10sIHNob3dTdGFyczogdGhpcy5kYXRhLnNob3dTdGFycyB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhLnNob3dTdGFycy5mb3JFYWNoKChzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChzLm5hbWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHMuc2hvd0ZsYWcgPSAhcy5zaG93RmxhZztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCB0bXAgPSB0aGlzLmRhdGEub3B0U3RhcnM7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5vcHRTdGFycy5pbmNsdWRlcyh2YWx1ZSkpIHtcclxuICAgICAgICAgIHRtcCA9IHRoaXMuZGF0YS5vcHRTdGFycy5maWx0ZXIoZnVuY3Rpb24gKHYsIF8sIF9fKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ICE9PSB2YWx1ZTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRtcC5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoeyBvcHRTdGFyczogdG1wLCBzaG93U3RhcnM6IHRoaXMuZGF0YS5zaG93U3RhcnMgfSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jYWxjKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGJpbmRWaWV3VGFwKCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9pbmRleC9pbmRleCdcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY2FsYygpIHtcclxuXHJcbiAgICAgIGxldCBsZW4gPSB0aGlzLmRhdGEuY2hlY2tlZFRhZ3MubGVuZ3RoO1xyXG4gICAgICBsZXQgY291bnQgPSBNYXRoLnBvdygyLCB0aGlzLmRhdGEuY2hlY2tlZFRhZ3MubGVuZ3RoKTtcclxuICAgICAgbGV0IGNvbWJzID0gW107XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIGxldCB0czogW10gPSBbXTtcclxuICAgICAgICBsZXQgdHNUTDogW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMCwgbWFzayA9IDE7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgICAgaWYgKChpICYgbWFzaykgIT09IDApIHtcclxuICAgICAgICAgICAgdHMucHVzaCh0aGlzLmRhdGEuY2hlY2tlZFRhZ3Nbal0pO1xyXG4gICAgICAgICAgICB0c1RMLnB1c2godGhpcy5kYXRhLmNoZWNrZWRUYWdzVExbal0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbWFzayA9IG1hc2sgKiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb21icy5wdXNoKHtcclxuICAgICAgICAgIFwidGFnc1wiOiB0cyxcclxuICAgICAgICAgIFwidGFnc1RMXCI6IHRzVEwsXHJcbiAgICAgICAgICBcInNjb3JlXCI6IDAuMCxcclxuICAgICAgICAgIFwicG9zc2libGVcIjogW11cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgb3B0U3RhcnM6IHN0cmluZ1tdID0gdGhpcy5kYXRhLm9wdFN0YXJzO1xyXG4gICAgICAvLyAkKFwiLmJ0bi1vcHRcIikuZWFjaChmdW5jdGlvbiAoXywgX18pIHtcclxuICAgICAgLy8gICBpZiAoJCh0aGlzKS5hdHRyKFwib3B0LWlkXCIpID09PSBcImFsbFwiIHx8ICQodGhpcykuaGFzQ2xhc3MoXCJidG4tc2Vjb25kYXJ5XCIpKSByZXR1cm47XHJcbiAgICAgIC8vICAgb3B0U3RhcnMucHVzaCgkKHRoaXMpLmF0dHIoXCJvcHQtaWRcIikpO1xyXG4gICAgICAvLyB9KTtcclxuICAgICAgLy8kKFwiI3Rib2R5LXJlY29tbWVuZFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7Ly/miop0aGlz5a+56LGh5aSN5Yi25Yiw5Li05pe25Y+Y6YePdGhhdFxyXG4gICAgICBjb21icy5mb3JFYWNoKChjb21iOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSA9PiB7XHJcbiAgICAgICAgbGV0IHRhZ3M6IHN0cmluZ1tdID0gY29tYi50YWdzO1xyXG4gICAgICAgIGlmICh0YWdzLmxlbmd0aCA9PT0gMCB8fCB0YWdzLmxlbmd0aCA+IDMpIHJldHVybjtcclxuICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgbGV0IGNoYXJzOiBIZXJvQmFzaWNbXSA9IFsuLi50aGF0LmRhdGEudGFnc19hdmFsW3RhZ3NbMF1dXTsvL+WIh+WJsuavj+S4quWtl+esplxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbGV0IHJlZHVjZWRfY2hhcnM6IEhlcm9CYXNpY1tdID0gW107XHJcblxyXG4gICAgICAgICAgY2hhcnMuZm9yRWFjaCgoY2hhcjogSGVyb0Jhc2ljKSA9PiB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICAgICAgbGV0IHRtcDogSGVyb0Jhc2ljW10gPSB0aGF0LmRhdGEudGFnc19hdmFsW3RhZ3NbaV1dO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICAgIHRtcC5mb3JFYWNoKCh0Z2NoOiBIZXJvQmFzaWMpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoY2hhci5uYW1lID09PSB0Z2NoLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJlZHVjZWRfY2hhcnMucHVzaChjaGFyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICBjaGFycyA9IHJlZHVjZWRfY2hhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hhcnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgIGlmICghdGFncy5pbmNsdWRlcyhcIumrmOe6p+i1hOa3seW5suWRmFwiKSkge1xyXG4gICAgICAgICAgbGV0IHJlZHVjZTY6IGFueVtdID0gW107XHJcbiAgICAgICAgICBjaGFycy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFyOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIubGV2ZWwgIT09IDYpIHtcclxuICAgICAgICAgICAgICByZWR1Y2U2LnB1c2goY2hhcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY2hhcnMgPSByZWR1Y2U2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmlsdGVyZWRfY2hhcnM6IEhlcm9CYXNpY1tdID0gW107XHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogSGVyb0Jhc2ljKSB7XHJcbiAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICBpZiAob3B0U3RhcnMuaW5jbHVkZXMoY2hhci5sZXZlbC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBmaWx0ZXJlZF9jaGFycy5wdXNoKGNoYXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICBjaGFycyA9IGZpbHRlcmVkX2NoYXJzO1xyXG5cclxuICAgICAgICBjb21iLnBvc3NpYmxlID0gY2hhcnM7XHJcbiAgICAgICAgaWYgKGNoYXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBzID0gMDtcclxuICAgICAgICBjaGFycy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFyOiBhbnkpIHtcclxuICAgICAgICAgIHMgKz0gY2hhci5sZXZlbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzID0gcyAvIGNoYXJzLmxlbmd0aDtcclxuICAgICAgICBjb21iLnNjb3JlID0gcyArIDAuMSAvIHRhZ3MubGVuZ3RoICsgMC45IC8gY2hhcnMubGVuZ3RoO1xyXG4gICAgICB9KTtcclxuICAgICAgY29tYnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhLnNjb3JlID4gYi5zY29yZSA/IC0xIDogKGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6XHJcbiAgICAgICAgICAoYS50YWdzLmxlbmd0aCA+IGIudGFncy5sZW5ndGggPyAxIDogKGEudGFncy5sZW5ndGggPCBiLnRhZ3MubGVuZ3RoID8gLTEgOlxyXG4gICAgICAgICAgICAwKSkpO1xyXG4gICAgICB9KTtcclxuICAgICAgLy9sZXQgbm8gPSAxO1xyXG4gICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgIGNvbWJzLmZvckVhY2goKGNvbWI6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICghY29tYi5wb3NzaWJsZSB8fCBjb21iLnBvc3NpYmxlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb21iLnBvc3NpYmxlLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XHJcbiAgICAgICAgICByZXR1cm4gYS5sZXZlbCA+IGIubGV2ZWwgPyAtMSA6IChhLmxldmVsIDwgYi5sZXZlbCA/IDEgOiAwKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgLy8gaWYgKGxhbmcgIT09ICdjbicpICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XHJcbiAgICAgIC8vaHR0cHM6Ly9hay5ncmF1ZW5la28ueHl6L2FraHIuanNvblxyXG5cclxuXHJcbiAgICAgIHRoYXQuc2V0RGF0YSEoeyBwb3NzaWJsZTogY29tYnMgfSk7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXQoKSB7XHJcbiAgICAgIGxldCBfdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAvL2FwcC5mdW5jLmdldCgnL2FraHIuanNvbicsIHt9LCBmdW5jdGlvbiAoZGF0YTogSGVyb1tdKSB7XHJcbiAgICAgIC8vbGV0IGRhdGE6IEhlcm9bXSA9IGpzb25EYXRhLmRhdGFMaXN0O1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGFwcC5mdW5jLmdldCgnL3RhZ3NBdmFsJywge30sIGZ1bmN0aW9uIChyZXNwb25zZTogQXJrUmVzcCkge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgdGhhdC5zZXREYXRhISh7IHRhZ3NfYXZhbDogSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcblxyXG5cclxudGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBbJ+a4heepuicsICc2JywgJzUnLCAnNCcsICczJywgJzInLCAnMSddIH0pOyBcclxuXHJcbiAgICAgIC8vIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuICAgICAgLy8gICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgIC8vICAgICBjb25zdCBjaGFyID0gZGF0YVtrZXldO1xyXG4gICAgICAvLyAgICAgaWYgKGNoYXIuaGlkZGVuKSBjb250aW51ZTtcclxuICAgICAgLy8gICAgIGNoYXIudGFncyEucHVzaChjaGFyLnR5cGUgKyBcIuW5suWRmFwiKTtcclxuICAgICAgLy8gICAgIGNoYXIudGFncyEucHVzaChjaGFyLnNleCArIFwi5oCn5bmy5ZGYXCIpO1xyXG4gICAgICAvLyAgICAgbGV0IG5hbWUgPSBjaGFyLm5hbWU7XHJcbiAgICAgIC8vICAgICBjaGFyLnRhZ3MhLmZvckVhY2goZnVuY3Rpb24gKHRhZzogc3RyaW5nKSB7XHJcbiAgICAgIC8vICAgICAgIGlmICh0YWcgaW4gX3RoYXQuZGF0YS50YWdzX2F2YWwpIHtcclxuXHJcbiAgICAgIC8vICAgICAgICAgbGV0IHRtcDogeyBba2V5OiBzdHJpbmddOiBIZXJvQmFzaWNbXSB9ID0gX3RoYXQuZGF0YS50YWdzX2F2YWw7XHJcbiAgICAgIC8vICAgICAgICAgdG1wW3RhZ10ucHVzaCh7XHJcbiAgICAgIC8vICAgICAgICAgICBcIm5hbWVcIjogbmFtZSxcclxuICAgICAgLy8gICAgICAgICAgIFwiaW1nXCI6IGNoYXJbXCJuYW1lLWVuXCJdLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJsZXZlbFwiOiBjaGFyLmxldmVsLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJ0eXBlXCI6IGNoYXIudHlwZVxyXG4gICAgICAvLyAgICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gICAgICAgICBfdGhhdC5zZXREYXRhISh7IHRhZ3NfYXZhbDogdG1wIH0pXHJcblxyXG4gICAgICAvLyAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gICAgICAgICBsZXQgdG1wOiB7IFtrZXk6IHN0cmluZ106IEhlcm9CYXNpY1tdIH0gPSBfdGhhdC5kYXRhLnRhZ3NfYXZhbDtcclxuXHJcbiAgICAgIC8vICAgICAgICAgdG1wW3RhZ10gPSBbe1xyXG4gICAgICAvLyAgICAgICAgICAgXCJuYW1lXCI6IG5hbWUsXHJcbiAgICAgIC8vICAgICAgICAgICBcImltZ1wiOiBjaGFyW1wibmFtZS1lblwiXSxcclxuICAgICAgLy8gICAgICAgICAgIFwibGV2ZWxcIjogY2hhci5sZXZlbCxcclxuICAgICAgLy8gICAgICAgICAgIFwidHlwZVwiOiBjaGFyLnR5cGVcclxuICAgICAgLy8gICAgICAgICB9XTtcclxuXHJcbiAgICAgIC8vICAgICAgICAgX3RoYXQuc2V0RGF0YSEoeyB0YWdzX2F2YWw6IHRtcCB9KVxyXG5cclxuICAgICAgLy8gICAgICAgfVxyXG5cclxuICAgICAgLy8gICAgIH0pO1xyXG5cclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICBfdGhhdC5jYWxjKCk7XHJcbiAgICAgIC8vfSk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tUYWcoZXZlbnQ6IGFueSkge1xyXG4gICAgICBsZXQgdGFnID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudGl0bGU7XHJcbiAgICAgIHRoaXMuY2xpY2tUYWdGKHRhZywgdHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5piv5ZCm5piv54K55Ye76L+b5p2l55qE5qCH5b+XLHRydWXnmoTml7blgJnmiY3kvJrljrvmjonngrnlh7vmoIflv5dcclxuICAgIGNsaWNrVGFnRih0YWc6IHN0cmluZywgY2xpY2tGbGFnOiBib29sZWFuKSB7XHJcbiAgICAgIGxldCBfdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICBsZXQgY2hlY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKCFjbGlja0ZsYWcpIHtcclxuICAgICAgICB0aGlzLmRhdGEudGFncy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICB0WydjbnRhZ3MnXS5mb3JFYWNoKCh0MjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0Mi5uYW1lID09PSB0YWcgJiYgdDIuc2hvd0ZsYWcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgdDIuc2hvd0ZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHQyLm5hbWUgPT09IHRhZykge1xyXG4gICAgICAgICAgICAgIHQyLnNob3dGbGFnID0gIXQyLnNob3dGbGFnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8v5piv5ZCm54K56L+HXHJcbiAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICBpZiAoKF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MpLmluY2x1ZGVzKHRhZykpIHtcclxuICAgICAgICBjaGVja2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgICBpZiAoY2xpY2tGbGFnKSB7XHJcbiAgICAgICAgICBsZXQgdG1wID0gX3RoYXQuZGF0YS5jaGVja2VkVGFncztcclxuICAgICAgICAgIHRtcCA9IF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MuZmlsdGVyKGZ1bmN0aW9uICh2LCBfLCBfXykge1xyXG4gICAgICAgICAgICByZXR1cm4gdiAhPT0gdGFnO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgX3RoYXQuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICBjaGVja2VkVGFnczogdG1wXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MubGVuZ3RoID49IDYpIHtcclxuXHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCLml6Dms5XpgInmi6nmm7TlpJrmoIfnrb7vvJrmnIDlpJo25Liq44CCXCIsXHJcbiAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAvL2FsZXJ0KFwi5peg5rOV6YCJ5oup5pu05aSa5qCH562+77ya5pyA5aSaNuS4quOAglwiKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICBfdGhhdC5kYXRhLmNoZWNrZWRUYWdzLnB1c2godGFnKTtcclxuICAgICAgICAgIF90aGF0LnNldERhdGEhKHtcclxuICAgICAgICAgICAgY2hlY2tlZFRhZ3M6IF90aGF0LmRhdGEuY2hlY2tlZFRhZ3NcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgX3RoYXQuc2V0RGF0YSEoeyB0YWdzOiBfdGhhdC5kYXRhLnRhZ3MgfSk7XHJcblxyXG4gICAgICAvLyQodGhpcykudG9nZ2xlQ2xhc3MoXCJidG4tcHJpbWFyeSBidG4tc2Vjb25kYXJ5XCIpO1xyXG4gICAgICBfdGhhdC5jYWxjKCk7XHJcblxyXG5cclxuICAgIH1cclxuICB9LFxyXG4gIGxpZmV0aW1lczoge1xyXG4gICAgLy8g55Sf5ZG95ZGo5pyf5Ye95pWw77yM5Y+v5Lul5Li65Ye95pWw77yM5oiW5LiA5Liq5ZyobWV0aG9kc+auteS4reWumuS5ieeahOaWueazleWQjVxyXG4gICAgYXR0YWNoZWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIG1vdmVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICBkZXRhY2hlZDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gIH1cclxufSkiXX0=