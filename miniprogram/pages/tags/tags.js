"use strict";
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
            var that = this;
            app.func.get('/tagsAval', {}, function (response) {
                if (response.status === 200) {
                    console.log(response.data);
                    that.setData({ tags_aval: JSON.parse(response.data) });
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFBO0FBRWxCLE1BQU0sU0FBUztJQU1iLFlBQVksSUFBWSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsR0FBVztRQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0NBRUY7QUF5QkQsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxJQUFJLEVBQUU7UUFFSixTQUFTLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTO1FBQ25DLElBQUksRUFBRTtZQUNKO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3BIO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQy9FO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ2pGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBRW5TO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQzdkO1NBQ0Y7UUFDRCxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFDbEIsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFO1FBQ3BCLGFBQWEsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUN0QixRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ25CLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDbkIsU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFF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QVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNwRCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUM7b0JBQ25CLENBQUMsQ0FBQyxDQUFDO29CQUVILEtBQUssQ0FBQyxPQUFRLENBQUM7d0JBQ2IsV0FBVyxFQUFFLEdBQUc7cUJBQ2pCLENBQUMsQ0FBQztpQkFDSjthQUNGO2lCQUFNO2dCQUNMLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtvQkFFdEMsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsZ0JBQWdCO3dCQUN2QixJQUFJLEVBQUUsTUFBTTt3QkFDWixRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUE7b0JBR0YsT0FBTztpQkFDUjtxQkFBTTtvQkFFTCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pDLEtBQUssQ0FBQyxPQUFRLENBQUM7d0JBQ2IsV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVztxQkFDcEMsQ0FBQyxDQUFDO2lCQUVKO2FBQ0Y7WUFDRCxLQUFLLENBQUMsT0FBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUcxQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFHZixDQUFDO0tBQ0Y7SUFDRCxTQUFTLEVBQUU7UUFFVCxRQUFRLEVBQUUsY0FBYyxDQUFDO1FBQ3pCLEtBQUssRUFBRTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxLQUFLLEVBQUUsY0FBYyxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxjQUFjLENBQUM7S0FDMUI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL3RhZ3MuanNcclxudmFyIGFwcCA9IGdldEFwcCgpXHJcblxyXG5jbGFzcyBIZXJvQmFzaWMge1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgdHlwZT86IHN0cmluZztcclxuICBsZXZlbD86IG51bWJlcjtcclxuICBpbWc/OiBzdHJpbmdcclxuXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGxldmVsOiBudW1iZXIsIGltZzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcclxuICAgIHRoaXMuaW1nID0gaW1nO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8vIGNsYXNzIEhlcm8gZXh0ZW5kcyBIZXJvQmFzaWMge1xyXG4vLyAgIGNhbXA/OiBzdHJpbmc7XHJcbi8vICAgc2V4Pzogc3RyaW5nO1xyXG4vLyAgIGNoYXJhY3RlcmlzdGljPzogc3RyaW5nO1xyXG4vLyAgIHRhZ3M/OiBzdHJpbmdbXTtcclxuLy8gICBoaWRkZW4/OiBib29sZWFuO1xyXG4vLyAgIFwibmFtZS1lblwiPzogc3RyaW5nO1xyXG5cclxuXHJcbi8vICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjYW1wOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgbGV2ZWw6IG51bWJlciwgc2V4OiBzdHJpbmcsIGNoYXJhY3RlcmlzdGljOiBzdHJpbmcsIHRhZ3M6IFtdLCBoaWRkZW46IGJvb2xlYW4sIG5hbWVfZW46IHN0cmluZywgaW1nOiBzdHJpbmcpIHtcclxuLy8gICAgIHN1cGVyKG5hbWUsIHR5cGUsIGxldmVsLCBpbWcpO1xyXG4vLyAgICAgdGhpcy5jYW1wID0gY2FtcDtcclxuLy8gICAgIHRoaXMuc2V4ID0gc2V4O1xyXG4vLyAgICAgdGhpcy5jaGFyYWN0ZXJpc3RpYyA9IGNoYXJhY3RlcmlzdGljO1xyXG4vLyAgICAgdGhpcy50YWdzID0gdGFncztcclxuLy8gICAgIHRoaXMuaGlkZGVuID0gaGlkZGVuO1xyXG4vLyAgICAgdGhpc1tcIm5hbWUtZW5cIl0gPSBuYW1lX2VuO1xyXG5cclxuLy8gICB9XHJcbi8vIH1cclxuXHJcblxyXG5cclxuQ29tcG9uZW50KHtcclxuICBvcHRpb25zOiB7XHJcbiAgICBhZGRHbG9iYWxDbGFzczogdHJ1ZSxcclxuICB9LFxyXG4gIGRhdGE6IHtcclxuXHJcbiAgICBDdXN0b21CYXI6IGFwcC5nbG9iYWxEYXRhLkN1c3RvbUJhcixcclxuICAgIHRhZ3M6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLotYTotKhcIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIuaWsOaJi1wiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui1hOa3seW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIumrmOe6p+i1hOa3seW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLkvY3nva5cIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIui/nOeoi+S9jVwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui/keaImOS9jVwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLmgKfliKtcIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIueUt+aAp+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWls+aAp+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiY25cIjogXCLnp43nsbtcIixcclxuICAgICAgICBcImNudGFnc1wiOiBbeyBuYW1lOiBcIuWFiOmUi+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIueLmeWHu+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuWMu+eWl+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIuacr+W4iOW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui/keWNq+W5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIumHjeijheW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIui+heWKqeW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfSwgeyBuYW1lOiBcIueJueenjeW5suWRmFwiLCBzaG93RmxhZzogZmFsc2UgfV1cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi6K+N57yAXCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW3sgbmFtZTogXCLmsrvnlpdcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLmlK/mj7RcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLovpPlh7pcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLnvqTmlLtcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLlh4/pgJ9cIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLnlJ/lrZhcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLpmLLmiqRcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLliYrlvLFcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLkvY3np7tcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLmjqflnLpcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLniIblj5FcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLlj6zllKRcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLlv6vpgJ/lpI3mtLtcIiwgc2hvd0ZsYWc6IGZhbHNlIH0sIHsgbmFtZTogXCLotLnnlKjlm57lpI1cIiwgc2hvd0ZsYWc6IGZhbHNlIH1dXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICB0YWdzX2F2YWw6IHt9ID0ge30sXHJcbiAgICBjaGVja2VkVGFnczogW10gPSBbXSxcclxuICAgIGNoZWNrZWRUYWdzVEw6IFtdID0gW10sXHJcbiAgICBwb3NzaWJsZTogW10gPSBbe31dLFxyXG4gICAgb3B0U3RhcnM6IFtdID0gW1wiXCJdLFxyXG4gICAgc2hvd1N0YXJzOiBbXSA9IFt7IG5hbWU6IFwi5riF56m6XCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCI2XCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCI1XCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCI0XCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCIzXCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCIyXCIsIHNob3dGbGFnOiB0cnVlIH0sIHsgbmFtZTogXCIxXCIsIHNob3dGbGFnOiB0cnVlIH1dLFxyXG4gICAga2V5d29yZHM6IFwiXCJcclxuXHJcbiAgfSxcclxuXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwib25sb2FkMzMzXCIpO1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBsb2FkKCkge1xyXG4gICAgICB0aGlzLmNsZWFuKClcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxyXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIC8vIHRlbXBGaWxlUGF0aOWPr+S7peS9nOS4umltZ+agh+etvueahHNyY+WxnuaAp+aYvuekuuWbvueJh1xyXG4gICAgICAgICAgY29uc3QgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgICB3eC5jb21wcmVzc0ltYWdlKHtcclxuICAgICAgICAgICAgc3JjOiB0ZW1wRmlsZVBhdGhzWzBdLCAvLyDlm77niYfot6/lvoRcclxuICAgICAgICAgICAgcXVhbGl0eTogODAsIC8vIOWOi+e8qei0qOmHjyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICBjb25zdCB0ZW1wRmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoXHJcblxyXG4gICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHRvZG8uY24vYXJrL3VwbG9hZDInLCAvL+S7heS4uuekuuS+i++8jOmdnuecn+WunueahOaOpeWPo+WcsOWdgFxyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IHRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICd1c2VyJzogJ3Rlc3QnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YSAhPSAnW10nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhZ0xpc3QgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhZ0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xpY2tUYWdGKHRhZ0xpc3RbaV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5rKh5pyJ6K+G5Yir55qE5oub5Yuf5qCH562+77yM6K+35qOA5p+l5Zu+54mH44CCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZWFyY2goZTogYW55KSB7XHJcbiAgICAgIGxldCBrZXl3b3JkID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgIGxldCBrZXlBcnJheTogW10gPSBrZXl3b3JkLnNwbGl0KC9cXHMrLyk7XHJcblxyXG5cclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGlzLmRhdGEudGFncy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuICAgICAgICB0WydjbnRhZ3MnXS5mb3JFYWNoKCh0MjogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAodDIuc2hvd0ZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdDIuc2hvd0ZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhhdC5zZXREYXRhISh7XHJcbiAgICAgICAgY2hlY2tlZFRhZ3M6IFtdLFxyXG4gICAgICAgIHRhZ3M6IHRoaXMuZGF0YS50YWdzLFxyXG4gICAgICAgIGtleXdvcmRzOiBrZXl3b3JkXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGtleUFycmF5Lmxlbmd0aCA9PT0gMCkgdGhhdC5jYWxjKCk7XHJcblxyXG5cclxuICAgICAga2V5QXJyYXkuZm9yRWFjaChrZXkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgdGltZXMgPSAwO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHQyLm5hbWUuaW5jbHVkZXMoa2V5KSkge1xyXG4gICAgICAgICAgICAgIHRpbWVzKytcclxuICAgICAgICAgICAgICByZXN1bHQgPSB0Mi5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmICh0aW1lcyA9PT0gMSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgIHRoYXQuY2xpY2tUYWdGKHJlc3VsdCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNsZWFuKCkge1xyXG4gICAgICB0aGlzLmRhdGEudGFncy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuICAgICAgICB0WydjbnRhZ3MnXS5mb3JFYWNoKCh0MjogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAodDIuc2hvd0ZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdDIuc2hvd0ZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgY2hlY2tlZFRhZ3M6IFtdLFxyXG4gICAgICAgIHRhZ3M6IHRoaXMuZGF0YS50YWdzLFxyXG4gICAgICAgIGtleXdvcmRzOiBcIlwiXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNhbGMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tTdGFycyhldmVudDogYW55KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudGl0bGU7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gJ+a4heepuicpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2hvd1N0YXJzLmZvckVhY2goKHM6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHMuc2hvd0ZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmRhdGEuc2hvd1N0YXJzWzBdID0geyBuYW1lOiBcIuWFqOmAiVwiLCBzaG93RmxhZzogdHJ1ZSB9O1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoeyBvcHRTdGFyczogW10sIHNob3dTdGFyczogdGhpcy5kYXRhLnNob3dTdGFycyB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUgPT09ICflhajpgIknKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNob3dTdGFycy5mb3JFYWNoKChzOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICBzLnNob3dGbGFnID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmRhdGEuc2hvd1N0YXJzWzBdID0geyBuYW1lOiBcIua4heepulwiLCBzaG93RmxhZzogdHJ1ZSB9O1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoeyBvcHRTdGFyczogWyfmuIXnqbonLCAnNicsICc1JywgJzQnLCAnMycsICcyJywgJzEnXSwgc2hvd1N0YXJzOiB0aGlzLmRhdGEuc2hvd1N0YXJzIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEuc2hvd1N0YXJzLmZvckVhY2goKHM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHMubmFtZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgcy5zaG93RmxhZyA9ICFzLnNob3dGbGFnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHRtcCA9IHRoaXMuZGF0YS5vcHRTdGFycztcclxuICAgICAgICBpZiAodGhpcy5kYXRhLm9wdFN0YXJzLmluY2x1ZGVzKHZhbHVlKSkge1xyXG4gICAgICAgICAgdG1wID0gdGhpcy5kYXRhLm9wdFN0YXJzLmZpbHRlcihmdW5jdGlvbiAodiwgXywgX18pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHYgIT09IHZhbHVlO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG1wLnB1c2godmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiB0bXAsIHNob3dTdGFyczogdGhpcy5kYXRhLnNob3dTdGFycyB9KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNhbGMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYmluZFZpZXdUYXAoKSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4uL2luZGV4L2luZGV4J1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjYWxjKCkge1xyXG5cclxuICAgICAgbGV0IGxlbiA9IHRoaXMuZGF0YS5jaGVja2VkVGFncy5sZW5ndGg7XHJcbiAgICAgIGxldCBjb3VudCA9IE1hdGgucG93KDIsIHRoaXMuZGF0YS5jaGVja2VkVGFncy5sZW5ndGgpO1xyXG4gICAgICBsZXQgY29tYnMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRzOiBbXSA9IFtdO1xyXG4gICAgICAgIGxldCB0c1RMOiBbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBtYXNrID0gMTsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICBpZiAoKGkgJiBtYXNrKSAhPT0gMCkge1xyXG4gICAgICAgICAgICB0cy5wdXNoKHRoaXMuZGF0YS5jaGVja2VkVGFnc1tqXSk7XHJcbiAgICAgICAgICAgIHRzVEwucHVzaCh0aGlzLmRhdGEuY2hlY2tlZFRhZ3NUTFtqXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBtYXNrID0gbWFzayAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbWJzLnB1c2goe1xyXG4gICAgICAgICAgXCJ0YWdzXCI6IHRzLFxyXG4gICAgICAgICAgXCJ0YWdzVExcIjogdHNUTCxcclxuICAgICAgICAgIFwic2NvcmVcIjogMC4wLFxyXG4gICAgICAgICAgXCJwb3NzaWJsZVwiOiBbXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNvbWJzKTtcclxuICAgICAgbGV0IG9wdFN0YXJzOiBzdHJpbmdbXSA9IHRoaXMuZGF0YS5vcHRTdGFycztcclxuICAgICAgLy8gJChcIi5idG4tb3B0XCIpLmVhY2goZnVuY3Rpb24gKF8sIF9fKSB7XHJcbiAgICAgIC8vICAgaWYgKCQodGhpcykuYXR0cihcIm9wdC1pZFwiKSA9PT0gXCJhbGxcIiB8fCAkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLXNlY29uZGFyeVwiKSkgcmV0dXJuO1xyXG4gICAgICAvLyAgIG9wdFN0YXJzLnB1c2goJCh0aGlzKS5hdHRyKFwib3B0LWlkXCIpKTtcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vY29uc29sZS5sb2cob3B0U3RhcnMpO1xyXG4gICAgICAvLyQoXCIjdGJvZHktcmVjb21tZW5kXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpczsvL+aKinRoaXPlr7nosaHlpI3liLbliLDkuLTml7blj5jph490aGF0XHJcbiAgICAgIGNvbWJzLmZvckVhY2goKGNvbWI6IHsgW2tleTogc3RyaW5nXTogYW55IH0pID0+IHtcclxuICAgICAgICBsZXQgdGFnczogc3RyaW5nW10gPSBjb21iLnRhZ3M7XHJcbiAgICAgICAgaWYgKHRhZ3MubGVuZ3RoID09PSAwIHx8IHRhZ3MubGVuZ3RoID4gMykgcmV0dXJuO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICBsZXQgY2hhcnM6IEhlcm9CYXNpY1tdID0gWy4uLnRoYXQuZGF0YS50YWdzX2F2YWxbdGFnc1swXV1dOy8v5YiH5Ymy5q+P5Liq5a2X56ymXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0YWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgcmVkdWNlZF9jaGFyczogSGVyb0Jhc2ljW10gPSBbXTtcclxuXHJcbiAgICAgICAgICBjaGFycy5mb3JFYWNoKChjaGFyOiBIZXJvQmFzaWMpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFnc19hdmFsW3RhZ3NbaV1dKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2hhcik7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICAgICAgbGV0IHRtcDogSGVyb0Jhc2ljW10gPSB0aGF0LmRhdGEudGFnc19hdmFsW3RhZ3NbaV1dO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICAgIHRtcC5mb3JFYWNoKCh0Z2NoOiBIZXJvQmFzaWMpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoY2hhci5uYW1lID09PSB0Z2NoLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJlZHVjZWRfY2hhcnMucHVzaChjaGFyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICBjaGFycyA9IHJlZHVjZWRfY2hhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hhcnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgIGlmICghdGFncy5pbmNsdWRlcyhcIumrmOe6p+i1hOa3seW5suWRmFwiKSkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGFncy5qb2luKFwiLFwiKSArIFwiIOS4jeWQqyjpq5jnuqcp6LWE5rex5bmy5ZGYXCIpO1xyXG4gICAgICAgICAgbGV0IHJlZHVjZTY6IGFueVtdID0gW107XHJcbiAgICAgICAgICBjaGFycy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFyOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIubGV2ZWwgIT09IDYpIHtcclxuICAgICAgICAgICAgICByZWR1Y2U2LnB1c2goY2hhcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY2hhcnMgPSByZWR1Y2U2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmlsdGVyZWRfY2hhcnM6IEhlcm9CYXNpY1tdID0gW107XHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogSGVyb0Jhc2ljKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKGNoYXIubGV2ZWwpO1xyXG4gICAgICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICAgICAgaWYgKG9wdFN0YXJzLmluY2x1ZGVzKGNoYXIubGV2ZWwudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgZmlsdGVyZWRfY2hhcnMucHVzaChjaGFyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgY2hhcnMgPSBmaWx0ZXJlZF9jaGFycztcclxuXHJcbiAgICAgICAgY29tYi5wb3NzaWJsZSA9IGNoYXJzO1xyXG4gICAgICAgIGlmIChjaGFycy5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBsZXQgcyA9IDA7XHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogYW55KSB7XHJcbiAgICAgICAgICBzICs9IGNoYXIubGV2ZWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcyA9IHMgLyBjaGFycy5sZW5ndGg7XHJcbiAgICAgICAgY29tYi5zY29yZSA9IHMgKyAwLjEgLyB0YWdzLmxlbmd0aCArIDAuOSAvIGNoYXJzLmxlbmd0aDtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbWJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IChhLnNjb3JlIDwgYi5zY29yZSA/IDEgOlxyXG4gICAgICAgICAgKGEudGFncy5sZW5ndGggPiBiLnRhZ3MubGVuZ3RoID8gMSA6IChhLnRhZ3MubGVuZ3RoIDwgYi50YWdzLmxlbmd0aCA/IC0xIDpcclxuICAgICAgICAgICAgMCkpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vbGV0IG5vID0gMTtcclxuICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICBjb21icy5mb3JFYWNoKChjb21iOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoIWNvbWIucG9zc2libGUgfHwgY29tYi5wb3NzaWJsZS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29tYi5wb3NzaWJsZS5zb3J0KGZ1bmN0aW9uIChhOiBhbnksIGI6IGFueSkge1xyXG4gICAgICAgICAgcmV0dXJuIGEubGV2ZWwgPiBiLmxldmVsID8gLTEgOiAoYS5sZXZlbCA8IGIubGV2ZWwgPyAxIDogMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgIC8vIGlmIChsYW5nICE9PSAnY24nKSAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xyXG4gICAgICAvL2h0dHBzOi8vYWsuZ3JhdWVuZWtvLnh5ei9ha2hyLmpzb25cclxuXHJcblxyXG4gICAgICB0aGF0LnNldERhdGEhKHsgcG9zc2libGU6IGNvbWJzIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0KCkge1xyXG4gICAgICBsZXQgX3RoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgLy9hcHAuZnVuYy5nZXQoJy9ha2hyLmpzb24nLCB7fSwgZnVuY3Rpb24gKGRhdGE6IEhlcm9bXSkge1xyXG4gICAgICAvL2xldCBkYXRhOiBIZXJvW10gPSBqc29uRGF0YS5kYXRhTGlzdDtcclxuICAgICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBbJ+a4heepuicsICc2JywgJzUnLCAnNCcsICczJywgJzInLCAnMSddIH0pO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICBhcHAuZnVuYy5nZXQoJy90YWdzQXZhbCcsIHt9LCBmdW5jdGlvbiAocmVzcG9uc2U6IEFya1Jlc3ApIHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpXHJcbiAgICAgICAgICAvL1xyXG4gICAgICAgICAgdGhhdC5zZXREYXRhISh7IHRhZ3NfYXZhbDogSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAvLyBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIC8vICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAvLyAgICAgY29uc3QgY2hhciA9IGRhdGFba2V5XTtcclxuICAgICAgLy8gICAgIGlmIChjaGFyLmhpZGRlbikgY29udGludWU7XHJcbiAgICAgIC8vICAgICBjaGFyLnRhZ3MhLnB1c2goY2hhci50eXBlICsgXCLlubLlkZhcIik7XHJcbiAgICAgIC8vICAgICBjaGFyLnRhZ3MhLnB1c2goY2hhci5zZXggKyBcIuaAp+W5suWRmFwiKTtcclxuICAgICAgLy8gICAgIGxldCBuYW1lID0gY2hhci5uYW1lO1xyXG4gICAgICAvLyAgICAgY2hhci50YWdzIS5mb3JFYWNoKGZ1bmN0aW9uICh0YWc6IHN0cmluZykge1xyXG4gICAgICAvLyAgICAgICBpZiAodGFnIGluIF90aGF0LmRhdGEudGFnc19hdmFsKSB7XHJcblxyXG4gICAgICAvLyAgICAgICAgIGxldCB0bXA6IHsgW2tleTogc3RyaW5nXTogSGVyb0Jhc2ljW10gfSA9IF90aGF0LmRhdGEudGFnc19hdmFsO1xyXG4gICAgICAvLyAgICAgICAgIHRtcFt0YWddLnB1c2goe1xyXG4gICAgICAvLyAgICAgICAgICAgXCJuYW1lXCI6IG5hbWUsXHJcbiAgICAgIC8vICAgICAgICAgICBcImltZ1wiOiBjaGFyW1wibmFtZS1lblwiXSxcclxuICAgICAgLy8gICAgICAgICAgIFwibGV2ZWxcIjogY2hhci5sZXZlbCxcclxuICAgICAgLy8gICAgICAgICAgIFwidHlwZVwiOiBjaGFyLnR5cGVcclxuICAgICAgLy8gICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vICAgICAgICAgX3RoYXQuc2V0RGF0YSEoeyB0YWdzX2F2YWw6IHRtcCB9KVxyXG5cclxuICAgICAgLy8gICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vICAgICAgICAgbGV0IHRtcDogeyBba2V5OiBzdHJpbmddOiBIZXJvQmFzaWNbXSB9ID0gX3RoYXQuZGF0YS50YWdzX2F2YWw7XHJcblxyXG4gICAgICAvLyAgICAgICAgIHRtcFt0YWddID0gW3tcclxuICAgICAgLy8gICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICAvLyAgICAgICAgICAgXCJpbWdcIjogY2hhcltcIm5hbWUtZW5cIl0sXHJcbiAgICAgIC8vICAgICAgICAgICBcImxldmVsXCI6IGNoYXIubGV2ZWwsXHJcbiAgICAgIC8vICAgICAgICAgICBcInR5cGVcIjogY2hhci50eXBlXHJcbiAgICAgIC8vICAgICAgICAgfV07XHJcblxyXG4gICAgICAvLyAgICAgICAgIF90aGF0LnNldERhdGEhKHsgdGFnc19hdmFsOiB0bXAgfSlcclxuXHJcbiAgICAgIC8vICAgICAgIH1cclxuXHJcbiAgICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9XHJcblxyXG5cclxuICAgICAgX3RoYXQuY2FsYygpO1xyXG4gICAgICAvL30pO1xyXG4gICAgfSxcclxuICAgIGNsaWNrVGFnKGV2ZW50OiBhbnkpIHtcclxuICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgICBsZXQgdGFnID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudGl0bGU7XHJcbiAgICAgIHRoaXMuY2xpY2tUYWdGKHRhZywgdHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5piv5ZCm5piv54K55Ye76L+b5p2l55qE5qCH5b+XLHRydWXnmoTml7blgJnmiY3kvJrljrvmjonngrnlh7vmoIflv5dcclxuICAgIGNsaWNrVGFnRih0YWc6IHN0cmluZywgY2xpY2tGbGFnOiBib29sZWFuKSB7XHJcbiAgICAgIGxldCBfdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICBsZXQgY2hlY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKCFjbGlja0ZsYWcpIHtcclxuICAgICAgICB0aGlzLmRhdGEudGFncy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICB0WydjbnRhZ3MnXS5mb3JFYWNoKCh0MjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0Mi5uYW1lID09PSB0YWcgJiYgdDIuc2hvd0ZsYWcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgdDIuc2hvd0ZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF0YS50YWdzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgIHRbJ2NudGFncyddLmZvckVhY2goKHQyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHQyLm5hbWUgPT09IHRhZykge1xyXG4gICAgICAgICAgICAgIHQyLnNob3dGbGFnID0gIXQyLnNob3dGbGFnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8v5piv5ZCm54K56L+HXHJcbiAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICBpZiAoKF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MpLmluY2x1ZGVzKHRhZykpIHtcclxuICAgICAgICBjaGVja2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgICBpZiAoY2xpY2tGbGFnKSB7XHJcbiAgICAgICAgICBsZXQgdG1wID0gX3RoYXQuZGF0YS5jaGVja2VkVGFncztcclxuICAgICAgICAgIHRtcCA9IF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MuZmlsdGVyKGZ1bmN0aW9uICh2LCBfLCBfXykge1xyXG4gICAgICAgICAgICByZXR1cm4gdiAhPT0gdGFnO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgX3RoYXQuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICBjaGVja2VkVGFnczogdG1wXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MubGVuZ3RoID49IDYpIHtcclxuXHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCLml6Dms5XpgInmi6nmm7TlpJrmoIfnrb7vvJrmnIDlpJo25Liq44CCXCIsXHJcbiAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAvL2FsZXJ0KFwi5peg5rOV6YCJ5oup5pu05aSa5qCH562+77ya5pyA5aSaNuS4quOAglwiKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICBfdGhhdC5kYXRhLmNoZWNrZWRUYWdzLnB1c2godGFnKTtcclxuICAgICAgICAgIF90aGF0LnNldERhdGEhKHtcclxuICAgICAgICAgICAgY2hlY2tlZFRhZ3M6IF90aGF0LmRhdGEuY2hlY2tlZFRhZ3NcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgX3RoYXQuc2V0RGF0YSEoeyB0YWdzOiBfdGhhdC5kYXRhLnRhZ3MgfSk7XHJcblxyXG4gICAgICAvLyQodGhpcykudG9nZ2xlQ2xhc3MoXCJidG4tcHJpbWFyeSBidG4tc2Vjb25kYXJ5XCIpO1xyXG4gICAgICBfdGhhdC5jYWxjKCk7XHJcblxyXG5cclxuICAgIH1cclxuICB9LFxyXG4gIGxpZmV0aW1lczoge1xyXG4gICAgLy8g55Sf5ZG95ZGo5pyf5Ye95pWw77yM5Y+v5Lul5Li65Ye95pWw77yM5oiW5LiA5Liq5ZyobWV0aG9kc+auteS4reWumuS5ieeahOaWueazleWQjVxyXG4gICAgYXR0YWNoZWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIG1vdmVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICBkZXRhY2hlZDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gIH1cclxufSkiXX0=