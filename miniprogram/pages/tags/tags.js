"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var jsonData = require("/data.js");
var HeroBasic = (function () {
    function HeroBasic(name, type, level, img) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.img = img;
    }
    return HeroBasic;
}());
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(name, camp, type, level, sex, characteristic, tags, hidden, name_en, img) {
        var _this = _super.call(this, name, type, level, img) || this;
        _this.camp = camp;
        _this.sex = sex;
        _this.characteristic = characteristic;
        _this.tags = tags;
        _this.hidden = hidden;
        _this["name-en"] = name_en;
        return _this;
    }
    return Hero;
}(HeroBasic));
Page({
    data: {
        tags: [
            {
                "cn": "资质",
                "cntags": ["新手", "资深干员", "高级资深干员"]
            },
            {
                "cn": "位置",
                "cntags": ["远程位", "近战位"]
            },
            {
                "cn": "性别",
                "cntags": ["男性干员", "女性干员"]
            },
            {
                "cn": "种类",
                "cntags": ["先锋干员", "狙击干员", "医疗干员", "术师干员", "近卫干员", "重装干员", "辅助干员", "特种干员"]
            },
            {
                "cn": "词缀",
                "cntags": ["治疗", "支援", "输出", "群攻", "减速", "生存", "防护", "削弱", "位移", "控场", "爆发", "召唤",
                    "快速复活", "费用回复"]
            }
        ],
        tags_aval: {},
        all_chars: {},
        avg_char_tag: 0,
        checkedTags: [],
        checkedTagsTL: [],
        possible: [],
        optStars: []
    },
    onLoad: function () {
        console.log(jsonData.dataList);
        this.init();
    },
    clickStars: function (event) {
        console.log(event);
        var _that = this;
        var value = event.target.dataset.title;
        if (value === '清空') {
            this.setData({ optStars: [] });
        }
        else {
            this.data.optStars = this.data.optStars.filter(function (v, _, __) {
                return v !== value;
            });
            this.setData({ optStars: this.data.optStars });
        }
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../index/index'
        });
    },
    calc: function () {
        var len = this.data.checkedTags.length;
        var count = Math.pow(2, this.data.checkedTags.length);
        var combs = [];
        for (var i = 0; i < count; i++) {
            var ts = [];
            var tsTL = [];
            for (var j = 0, mask = 1; j < len; j++) {
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
        var optStars = this.data.optStars;
        var that = this;
        combs.forEach(function (comb) {
            var tags = comb.tags;
            if (tags.length === 0 || tags.length > 3)
                return;
            var chars = that.data.tags_aval[tags[0]].slice();
            var _loop_1 = function (i) {
                var reduced_chars = [];
                chars.forEach(function (char) {
                    var tmp = that.data.tags_aval[tags[i]];
                    tmp.forEach(function (tgch) {
                        if (char.name === tgch.name) {
                            reduced_chars.push(char);
                            return false;
                        }
                    });
                });
                chars = reduced_chars;
            };
            for (var i = 1; i < tags.length; i++) {
                _loop_1(i);
            }
            if (chars.length === 0)
                return;
            if (!tags.includes("高级资深干员")) {
                var reduce6_1 = [];
                chars.forEach(function (char) {
                    if (char.level !== 6) {
                        reduce6_1.push(char);
                    }
                });
                chars = reduce6_1;
            }
            var filtered_chars = [];
            chars.forEach(function (char) {
                if (optStars.includes(char.level.toString())) {
                    filtered_chars.push(char);
                }
            });
            chars = filtered_chars;
            comb.possible = chars;
            if (chars.length === 0)
                return;
            var s = 0;
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
        combs.forEach(function (comb) {
            if (!comb.possible || comb.possible.length === 0)
                return false;
            var chars = comb.possible;
            var tags = comb.tags;
            console.log(tags);
            var tagsTL = comb.tagsTL;
            var chars_html;
            var colors = {
                1: "dark",
                2: "light",
                3: "success",
                4: "info",
                5: "warning",
                6: "danger"
            };
            comb.possible.sort(function (a, b) {
                return a.level > b.level ? -1 : (a.level < b.level ? 1 : 0);
            });
            var result = [];
            chars.forEach(function (char, index) {
                var tagsTmp = [];
                for (var i = 0; i < tags.length; i++) {
                    tagsTmp.push(tags[i]);
                }
                var scope = Math.floor(comb.score * 100) / 100;
                result.push({ tag: tagsTmp, scope: scope });
            });
            console.log(result);
        });
        that.setData({ possible: combs });
    },
    init: function () {
        var _that = this;
        var data = jsonData.dataList;
        this.setData({ optStars: "['清空','6','5','4','3','2','1']" });
        var tag_count = 0;
        var char_tag_sum = 0;
        var _loop_2 = function (key) {
            if (data.hasOwnProperty(key)) {
                var char_1 = data[key];
                if (char_1.hidden)
                    return "continue";
                char_1.tags.push(char_1.type + "干员");
                char_1.tags.push(char_1.sex + "性干员");
                var name_1 = char_1.name;
                char_1.tags.forEach(function (tag) {
                    if (tag in _that.data.tags_aval) {
                        var tmp_1 = _that.data.tags_aval;
                        tmp_1[tag].push({
                            "name": name_1,
                            "img": char_1["name-en"],
                            "level": char_1.level,
                            "type": char_1.type
                        });
                        _that.setData({ tags_aval: tmp_1 });
                    }
                    else {
                        var tmp_2 = _that.data.tags_aval;
                        tmp_2[tag] = [{
                                "name": name_1,
                                "img": char_1["name-en"],
                                "level": char_1.level,
                                "type": char_1.type
                            }];
                        _that.setData({ tags_aval: tmp_2 });
                        tag_count++;
                    }
                    char_tag_sum++;
                });
                var tmp = _that.data.all_chars;
                tmp.name = {
                    'level': char_1.level,
                    'tags': char_1.tags
                };
                _that.setData({ all_chars: tmp });
            }
        };
        for (var key in data) {
            _loop_2(key);
        }
        _that.setData({ avg_char_tag: (char_tag_sum / tag_count) });
        _that.calc();
    },
    clickTag: function (event) {
        console.log(event);
        var _that = this;
        var tag = event.target.dataset.title;
        var checked = false;
        if ((_that.data.checkedTags).includes(tag)) {
            checked = true;
        }
        if (checked) {
            _that.data.checkedTags = _that.data.checkedTags.filter(function (v, _, __) {
                return v !== tag;
            });
            _that.setData({
                checkedTags: _that.data.checkedTags
            });
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
        _that.calc();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUE7QUFDbEIsbUNBQXNDO0FBRXRDO0lBTUUsbUJBQVksSUFBWSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsR0FBVztRQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRUgsZ0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQUVEO0lBQW1CLHdCQUFTO0lBUzFCLGNBQVksSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLEdBQVcsRUFBRSxjQUFzQixFQUFFLElBQVEsRUFBRSxNQUFlLEVBQUUsT0FBZSxFQUFFLEdBQVc7UUFBakssWUFDRSxrQkFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsU0FROUI7UUFQQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixLQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7O0lBRTVCLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFtQixTQUFTLEdBbUIzQjtBQUlELElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLElBQUksRUFBRTtZ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QUN0QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFBRSxPQUFPO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNWLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFTO2dCQUMvQixDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUNILENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN2QixPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFTO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQUUsT0FBTyxL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R0YsT0FBTzthQUNSO2lCQUFNO2dCQUVMLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakMsS0FBSyxDQUFDLE9BQVEsQ0FBQztvQkFDYixXQUFXLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXO2lCQUNwQyxDQUFDLENBQUM7YUFFSjtTQUNGO1FBRUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBSWYsQ0FBQztDQUdGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vdGFncy5qc1xyXG52YXIgYXBwID0gZ2V0QXBwKClcclxuaW1wb3J0IGpzb25EYXRhID0gcmVxdWlyZSgnL2RhdGEuanMnKTtcclxuXHJcbmNsYXNzIEhlcm9CYXNpYyB7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICB0eXBlPzogc3RyaW5nO1xyXG4gIGxldmVsPzogbnVtYmVyO1xyXG4gIGltZz86IHN0cmluZ1xyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgbGV2ZWw6IG51bWJlciwgaW1nOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5sZXZlbCA9IGxldmVsO1xyXG4gICAgdGhpcy5pbWcgPSBpbWc7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgSGVybyBleHRlbmRzIEhlcm9CYXNpYyB7XHJcbiAgY2FtcD86IHN0cmluZztcclxuICBzZXg/OiBzdHJpbmc7XHJcbiAgY2hhcmFjdGVyaXN0aWM/OiBzdHJpbmc7XHJcbiAgdGFncz86IHN0cmluZ1tdO1xyXG4gIGhpZGRlbj86IGJvb2xlYW47XHJcbiAgXCJuYW1lLWVuXCI/OiBzdHJpbmc7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNhbXA6IHN0cmluZywgdHlwZTogc3RyaW5nLCBsZXZlbDogbnVtYmVyLCBzZXg6IHN0cmluZywgY2hhcmFjdGVyaXN0aWM6IHN0cmluZywgdGFnczogW10sIGhpZGRlbjogYm9vbGVhbiwgbmFtZV9lbjogc3RyaW5nLCBpbWc6IHN0cmluZykge1xyXG4gICAgc3VwZXIobmFtZSwgdHlwZSwgbGV2ZWwsIGltZyk7XHJcbiAgICB0aGlzLmNhbXAgPSBjYW1wO1xyXG4gICAgdGhpcy5zZXggPSBzZXg7XHJcbiAgICB0aGlzLmNoYXJhY3RlcmlzdGljID0gY2hhcmFjdGVyaXN0aWM7XHJcbiAgICB0aGlzLnRhZ3MgPSB0YWdzO1xyXG4gICAgdGhpcy5oaWRkZW4gPSBoaWRkZW47XHJcbiAgICB0aGlzW1wibmFtZS1lblwiXSA9IG5hbWVfZW47XHJcblxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICB0YWdzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi6LWE6LSoXCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW1wi5paw5omLXCIsIFwi6LWE5rex5bmy5ZGYXCIsIFwi6auY57qn6LWE5rex5bmy5ZGYXCJdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi5L2N572uXCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW1wi6L+c56iL5L2NXCIsIFwi6L+R5oiY5L2NXCJdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi5oCn5YirXCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW1wi55S35oCn5bmy5ZGYXCIsIFwi5aWz5oCn5bmy5ZGYXCJdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImNuXCI6IFwi56eN57G7XCIsXHJcbiAgICAgICAgXCJjbnRhZ3NcIjogW1wi5YWI6ZSL5bmy5ZGYXCIsIFwi54uZ5Ye75bmy5ZGYXCIsIFwi5Yy755aX5bmy5ZGYXCIsIFwi5pyv5biI5bmy5ZGYXCIsIFwi6L+R5Y2r5bmy5ZGYXCIsIFwi6YeN6KOF5bmy5ZGYXCIsIFwi6L6F5Yqp5bmy5ZGYXCIsIFwi54m556eN5bmy5ZGYXCJdXHJcblxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuivjee8gFwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFtcIuayu+eWl1wiLCBcIuaUr+aPtFwiLCBcIui+k+WHulwiLCBcIue+pOaUu1wiLCBcIuWHj+mAn1wiLCBcIueUn+WtmFwiLCBcIumYsuaKpFwiLCBcIuWJiuW8sVwiLCBcIuS9jeenu1wiLCBcIuaOp+WculwiLCBcIueIhuWPkVwiLCBcIuWPrOWUpFwiLFxyXG4gICAgICAgICAgXCLlv6vpgJ/lpI3mtLtcIiwgXCLotLnnlKjlm57lpI1cIl1cclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHRhZ3NfYXZhbDoge30gPSB7fSxcclxuICAgIGFsbF9jaGFyczoge30gPSB7fSxcclxuICAgIGF2Z19jaGFyX3RhZzogMCxcclxuICAgIGNoZWNrZWRUYWdzOiBbXSA9IFtdLFxyXG4gICAgY2hlY2tlZFRhZ3NUTDogW10gPSBbXSxcclxuICAgIHBvc3NpYmxlOiBbXSA9IFtdLFxyXG4gICAgb3B0U3RhcnM6IFtdID0gW11cclxuXHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8gdGhpcy5zZXREYXRhISh7XHJcbiAgICAvLyAgIGxvZ3M6ICh3eC5nZXRTdG9yYWdlU3luYygnbG9ncycpIHx8IFtdKS5tYXAoKGxvZzogbnVtYmVyKSA9PiB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGZvcm1hdFRpbWUobmV3IERhdGUobG9nKSlcclxuICAgIC8vICAgfSlcclxuICAgIC8vIH0pXHJcbiAgICBjb25zb2xlLmxvZyhqc29uRGF0YS5kYXRhTGlzdCk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgY2xpY2tTdGFycyhldmVudDogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICBsZXQgX3RoYXQgPSB0aGlzO1xyXG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudGl0bGU7XHJcbiAgICBpZiAodmFsdWUgPT09ICfmuIXnqbonKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSEoeyBvcHRTdGFyczogW10gfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRhdGEub3B0U3RhcnMgPSB0aGlzLmRhdGEub3B0U3RhcnMuZmlsdGVyKGZ1bmN0aW9uICh2LCBfLCBfXykge1xyXG4gICAgICAgIHJldHVybiB2ICE9PSB2YWx1ZTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSEoeyBvcHRTdGFyczogdGhpcy5kYXRhLm9wdFN0YXJzIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGJpbmRWaWV3VGFwKCkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4uL2luZGV4L2luZGV4J1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBjYWxjKCkge1xyXG5cclxuICAgIGxldCBsZW4gPSB0aGlzLmRhdGEuY2hlY2tlZFRhZ3MubGVuZ3RoO1xyXG4gICAgbGV0IGNvdW50ID0gTWF0aC5wb3coMiwgdGhpcy5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aCk7XHJcbiAgICBsZXQgY29tYnMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICBsZXQgdHM6IFtdID0gW107XHJcbiAgICAgIGxldCB0c1RMOiBbXSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBqID0gMCwgbWFzayA9IDE7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgIGlmICgoaSAmIG1hc2spICE9PSAwKSB7XHJcbiAgICAgICAgICB0cy5wdXNoKHRoaXMuZGF0YS5jaGVja2VkVGFnc1tqXSk7XHJcbiAgICAgICAgICB0c1RMLnB1c2godGhpcy5kYXRhLmNoZWNrZWRUYWdzVExbal0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtYXNrID0gbWFzayAqIDI7XHJcbiAgICAgIH1cclxuICAgICAgY29tYnMucHVzaCh7XHJcbiAgICAgICAgXCJ0YWdzXCI6IHRzLFxyXG4gICAgICAgIFwidGFnc1RMXCI6IHRzVEwsXHJcbiAgICAgICAgXCJzY29yZVwiOiAwLjAsXHJcbiAgICAgICAgXCJwb3NzaWJsZVwiOiBbXVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKGNvbWJzKTtcclxuICAgIGxldCBvcHRTdGFyczogc3RyaW5nW10gPSB0aGlzLmRhdGEub3B0U3RhcnM7XHJcbiAgICAvLyAkKFwiLmJ0bi1vcHRcIikuZWFjaChmdW5jdGlvbiAoXywgX18pIHtcclxuICAgIC8vICAgaWYgKCQodGhpcykuYXR0cihcIm9wdC1pZFwiKSA9PT0gXCJhbGxcIiB8fCAkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLXNlY29uZGFyeVwiKSkgcmV0dXJuO1xyXG4gICAgLy8gICBvcHRTdGFycy5wdXNoKCQodGhpcykuYXR0cihcIm9wdC1pZFwiKSk7XHJcbiAgICAvLyB9KTtcclxuICAgIC8vY29uc29sZS5sb2cob3B0U3RhcnMpO1xyXG4gICAgLy8kKFwiI3Rib2R5LXJlY29tbWVuZFwiKS5odG1sKFwiXCIpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzOy8v5oqKdGhpc+WvueixoeWkjeWItuWIsOS4tOaXtuWPmOmHj3RoYXRcclxuICAgIGNvbWJzLmZvckVhY2goKGNvbWI6IHsgW2tleTogc3RyaW5nXTogYW55IH0pID0+IHtcclxuICAgICAgbGV0IHRhZ3M6IHN0cmluZ1tdID0gY29tYi50YWdzO1xyXG4gICAgICBpZiAodGFncy5sZW5ndGggPT09IDAgfHwgdGFncy5sZW5ndGggPiAzKSByZXR1cm47XHJcbiAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgbGV0IGNoYXJzOiBIZXJvQmFzaWNbXSA9IFsuLi50aGF0LmRhdGEudGFnc19hdmFsW3RhZ3NbMF1dXTsvL+WIh+WJsuavj+S4quWtl+esplxyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcmVkdWNlZF9jaGFyczogSGVyb0Jhc2ljW10gPSBbXTtcclxuXHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaCgoY2hhcjogSGVyb0Jhc2ljKSA9PiB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWdzX2F2YWxbdGFnc1tpXV0pO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coY2hhcik7XHJcbiAgICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgICBsZXQgdG1wOiBIZXJvQmFzaWNbXSA9IHRoYXQuZGF0YS50YWdzX2F2YWxbdGFnc1tpXV07XHJcbiAgICAgICAgICB0bXAuZm9yRWFjaCgodGdjaDogSGVyb0Jhc2ljKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLm5hbWUgPT09IHRnY2gubmFtZSkge1xyXG4gICAgICAgICAgICAgIHJlZHVjZWRfY2hhcnMucHVzaChjaGFyKTtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZSBcclxuICAgICAgICBjaGFycyA9IHJlZHVjZWRfY2hhcnM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFycy5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICBpZiAoIXRhZ3MuaW5jbHVkZXMoXCLpq5jnuqfotYTmt7HlubLlkZhcIikpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWdzLmpvaW4oXCIsXCIpICsgXCIg5LiN5ZCrKOmrmOe6pynotYTmt7HlubLlkZhcIik7XHJcbiAgICAgICAgbGV0IHJlZHVjZTY6IGFueVtdID0gW107XHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogYW55KSB7XHJcbiAgICAgICAgICBpZiAoY2hhci5sZXZlbCAhPT0gNikge1xyXG4gICAgICAgICAgICByZWR1Y2U2LnB1c2goY2hhcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2hhcnMgPSByZWR1Y2U2O1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBmaWx0ZXJlZF9jaGFyczogSGVyb0Jhc2ljW10gPSBbXTtcclxuICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogSGVyb0Jhc2ljKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaGFyLmxldmVsKTtcclxuICAgICAgICAvL0B0cy1pZ25vcmUgXHJcbiAgICAgICAgaWYgKG9wdFN0YXJzLmluY2x1ZGVzKGNoYXIubGV2ZWwudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgIGZpbHRlcmVkX2NoYXJzLnB1c2goY2hhcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgLy9AdHMtaWdub3JlIFxyXG4gICAgICBjaGFycyA9IGZpbHRlcmVkX2NoYXJzO1xyXG5cclxuICAgICAgY29tYi5wb3NzaWJsZSA9IGNoYXJzO1xyXG4gICAgICBpZiAoY2hhcnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgIGxldCBzID0gMDtcclxuICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcjogYW55KSB7XHJcbiAgICAgICAgcyArPSBjaGFyLmxldmVsO1xyXG4gICAgICB9KTtcclxuICAgICAgcyA9IHMgLyBjaGFycy5sZW5ndGg7XHJcbiAgICAgIGNvbWIuc2NvcmUgPSBzICsgMC4xIC8gdGFncy5sZW5ndGggKyAwLjkgLyBjaGFycy5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIGNvbWJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgcmV0dXJuIGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiAoYS5zY29yZSA8IGIuc2NvcmUgPyAxIDpcclxuICAgICAgICAoYS50YWdzLmxlbmd0aCA+IGIudGFncy5sZW5ndGggPyAxIDogKGEudGFncy5sZW5ndGggPCBiLnRhZ3MubGVuZ3RoID8gLTEgOlxyXG4gICAgICAgICAgMCkpKTtcclxuICAgIH0pO1xyXG4gICAgLy9sZXQgbm8gPSAxO1xyXG4gICAgY29tYnMuZm9yRWFjaChmdW5jdGlvbiAoY29tYjogYW55KSB7XHJcbiAgICAgIGlmICghY29tYi5wb3NzaWJsZSB8fCBjb21iLnBvc3NpYmxlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBsZXQgY2hhcnMgPSBjb21iLnBvc3NpYmxlO1xyXG5cclxuICAgICAgbGV0IHRhZ3MgPSBjb21iLnRhZ3M7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRhZ3MpO1xyXG4gICAgICBsZXQgdGFnc1RMID0gY29tYi50YWdzVEw7XHJcbiAgICAgIGxldCBjaGFyc19odG1sOiBhbnlbXTtcclxuICAgICAgbGV0IGNvbG9ycyA9IHtcclxuICAgICAgICAxOiBcImRhcmtcIixcclxuICAgICAgICAyOiBcImxpZ2h0XCIsXHJcbiAgICAgICAgMzogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgNDogXCJpbmZvXCIsXHJcbiAgICAgICAgNTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgNjogXCJkYW5nZXJcIlxyXG4gICAgICB9O1xyXG4gICAgICBjb21iLnBvc3NpYmxlLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGEubGV2ZWwgPiBiLmxldmVsID8gLTEgOiAoYS5sZXZlbCA8IGIubGV2ZWwgPyAxIDogMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBsZXQgcmVzdWx0OiB7IHRhZzogYW55W10sIHNjb3BlOiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgIGNoYXJzLmZvckVhY2goZnVuY3Rpb24gKGNoYXI6IEhlcm9CYXNpYywgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0YWdzVG1wOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgIHRhZ3NUbXAucHVzaCh0YWdzW2ldKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzY29wZSA9IE1hdGguZmxvb3IoY29tYi5zY29yZSAqIDEwMCkgLyAxMDA7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goeyB0YWc6IHRhZ3NUbXAsIHNjb3BlOiBzY29wZSB9KTtcclxuXHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgIC8vIGNoYXJzLmZvckVhY2goZnVuY3Rpb24gKF86IGFueSwgY2hhcjphbnkpIHtcclxuICAgICAgLy8gICBsZXQgcGFkZGluZyA9IHNob3dOYW1lICYmIGltYWdlU2l6ZSA8IDYwID8gXCJwYWRkaW5nLXJpZ2h0OiA0cHhcIiA6XHJcbiAgICAgIC8vICAgICBcInBhZGRpbmctcmlnaHQ6IDFweFwiO1xyXG4gICAgICAvLyAgIGxldCBzdHlsZSA9IHNob3dJbWFnZSA/IFwic3R5bGU9XFxcImJvcmRlci1yYWRpdXM6IDVweDtwYWRkaW5nOiAxcHggMXB4O1wiICtcclxuICAgICAgLy8gICAgIHBhZGRpbmcgKyBcIjtcXFwiIFwiIDogXCJcIjtcclxuICAgICAgLy8gICBsZXQgYnV0dG9uc3R5bGUgPSBpbWFnZVNpemUgPiAyNSA/XHJcbiAgICAgIC8vICAgICBcImJhY2tncm91bmQtY29sb3I6ICNBQUE7Ym9yZGVyLXJhZGl1czogNHB4O1wiIDpcclxuICAgICAgLy8gICAgIFwiYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7Ym9yZGVyLXJhZGl1czogNHB4O1wiO1xyXG4gICAgICAvLyAgIGNoYXJzX2h0bWwucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tXCIgK1xyXG4gICAgICAvLyAgICAgY29sb3JzW2NoYXIubGV2ZWxdICsgXCIgYnRuLWNoYXIgbXktMSBkLW5vbmUgZC1zbS1pbmxpbmVcXFwiIFwiICtcclxuICAgICAgLy8gICAgIHN0eWxlICsgXCJ0aXRsZT1cXFwiXCIgKyBjaGFyLm5hbWUgKyBcIlxcXCI+XCIpO1xyXG4gICAgICAvLyAgIGlmIChzaG93SW1hZ2UpIGNoYXJzX2h0bWwucHVzaChcIjxpbWcgc3R5bGU9XFxcIlwiICsgYnV0dG9uc3R5bGUgK1xyXG4gICAgICAvLyAgICAgXCJcXFwiaGVpZ2h0PVxcXCJcIiArIGltYWdlU2l6ZSArIFwiXFxcIiB3aWR0aD1cXFwiXCIgKyBpbWFnZVNpemUgK1xyXG4gICAgICAvLyAgICAgXCJcXFwiIHNyYz1cXFwiaW1nL2NoYXJhL1wiICsgY2hhci5pbWcgKyBcIi5wbmdcXFwiPiAgIFwiKTtcclxuICAgICAgLy8gICBpZiAoaW1hZ2VTaXplID4gNjApIGNoYXJzX2h0bWwucHVzaChcIjxkaXY+XCIpO1xyXG4gICAgICAvLyAgIGlmIChzaG93TmFtZSkgY2hhcnNfaHRtbC5wdXNoKGNoYXIubmFtZSk7XHJcbiAgICAgIC8vICAgaWYgKGltYWdlU2l6ZSA+IDYwKSBjaGFyc19odG1sLnB1c2goXCI8L2Rpdj5cIik7XHJcbiAgICAgIC8vICAgY2hhcnNfaHRtbC5wdXNoKFwiPC9idXR0b24+XFxuXCIpO1xyXG4gICAgICAvLyAgIGNoYXJzX2h0bWwucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tXCIgK1xyXG4gICAgICAvLyAgICAgY29sb3JzW2NoYXIubGV2ZWxdICsgXCIgYnRuLWNoYXIgbXktMSBkLWlubGluZSBkLXNtLW5vbmVcXFwiIFwiICtcclxuICAgICAgLy8gICAgIFwidGl0bGU9XFxcIlwiICsgY2hhci5uYW1lICsgXCJcXFwiPlwiICsgY2hhci5uYW1lICsgXCI8L2J1dHRvbj5cXG5cIik7XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICAvL2xldCB0YWdzX2h0bWwgPSBbXTtcclxuICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAvLyAgICAgdGFnc19odG1sLnB1c2goXHJcbiAgICAgIC8vICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc20gYnRuLXNlY29uZGFyeSBidG4tY2hhciBteS0xXCI+JyArXHJcbiAgICAgIC8vICAgICAgIHRhZ3NbaV0gKyBcIjwvYnV0dG9uPlxcblwiKTtcclxuXHJcbiAgICAgIC8vIH1cclxuICAgICAgLy8gJChcIiN0Ym9keS1yZWNvbW1lbmRcIikuYXBwZW5kKFxyXG4gICAgICAvLyAgIFwiPHRyIGNsYXNzPVxcXCJ0ci1yZWNvbW1kXFxcIj5cIiArXHJcbiAgICAgIC8vICAgXCI8dGQgY2xhc3M9XFxcInB5LTIgZC1ub25lIGQtc20tdGFibGUtY2VsbFxcXCI+XCIgKyBubysrICsgXCI8L3RkPlwiICtcclxuICAgICAgLy8gICBcIjx0ZCBjbGFzcz1cXFwicHktMVxcXCI+XCIgKyB0YWdzX2h0bWwuam9pbihcIlwiKSArIFwiPC90ZD48dGQgY2xhc3M9XFxcInB5LTFcXFwiPlwiICtcclxuICAgICAgLy8gICBjaGFyc19odG1sLmpvaW4oXCJcIikgK1xyXG4gICAgICAvLyAgIFwiPC90ZD5cIiArXHJcbiAgICAgIC8vICAgXCI8dGQgY2xhc3M9XFxcInB5LTIgZC1ub25lIGQtc20tdGFibGUtY2VsbFxcXCI+XCIgKyBNYXRoLmZsb29yKGNvbWIuc2NvcmUgKlxyXG4gICAgICAvLyAgICAgMTAwKSAvIDEwMCArIFwiPC90ZD5cIiArXHJcbiAgICAgIC8vICAgXCI8L3RyPlwiKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIC8vIGlmIChsYW5nICE9PSAnY24nKSAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xyXG4gICAgLy9odHRwczovL2FrLmdyYXVlbmVrby54eXovYWtoci5qc29uXHJcblxyXG5cclxuICAgIHRoYXQuc2V0RGF0YSEoeyBwb3NzaWJsZTogY29tYnMgfSk7XHJcblxyXG4gIH0sXHJcbiAgaW5pdCgpIHtcclxuICAgIGxldCBfdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgLy9hcHAuZnVuYy5nZXQoJy9ha2hyLmpzb24nLCB7fSwgZnVuY3Rpb24gKGRhdGE6IEhlcm9bXSkge1xyXG4gICAgbGV0IGRhdGE6IEhlcm9bXSA9IGpzb25EYXRhLmRhdGFMaXN0O1xyXG4gICAgdGhpcy5zZXREYXRhISh7IG9wdFN0YXJzOiBcIlsn5riF56m6JywnNicsJzUnLCc0JywnMycsJzInLCcxJ11cIiB9KTtcclxuICAgIGxldCB0YWdfY291bnQgPSAwO1xyXG4gICAgbGV0IGNoYXJfdGFnX3N1bSA9IDA7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBjb25zdCBjaGFyID0gZGF0YVtrZXldO1xyXG4gICAgICAgIGlmIChjaGFyLmhpZGRlbikgY29udGludWU7XHJcbiAgICAgICAgY2hhci50YWdzIS5wdXNoKGNoYXIudHlwZSArIFwi5bmy5ZGYXCIpO1xyXG4gICAgICAgIGNoYXIudGFncyEucHVzaChjaGFyLnNleCArIFwi5oCn5bmy5ZGYXCIpO1xyXG4gICAgICAgIGxldCBuYW1lID0gY2hhci5uYW1lO1xyXG4gICAgICAgIGNoYXIudGFncyEuZm9yRWFjaChmdW5jdGlvbiAodGFnOiBzdHJpbmcpIHtcclxuICAgICAgICAgIGlmICh0YWcgaW4gX3RoYXQuZGF0YS50YWdzX2F2YWwpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0bXA6IHsgW2tleTogc3RyaW5nXTogSGVyb0Jhc2ljW10gfSA9IF90aGF0LmRhdGEudGFnc19hdmFsO1xyXG4gICAgICAgICAgICB0bXBbdGFnXS5wdXNoKHtcclxuICAgICAgICAgICAgICBcIm5hbWVcIjogbmFtZSxcclxuICAgICAgICAgICAgICBcImltZ1wiOiBjaGFyW1wibmFtZS1lblwiXSxcclxuICAgICAgICAgICAgICBcImxldmVsXCI6IGNoYXIubGV2ZWwsXHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IGNoYXIudHlwZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIF90aGF0LnNldERhdGEhKHsgdGFnc19hdmFsOiB0bXAgfSlcclxuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRtcDogeyBba2V5OiBzdHJpbmddOiBIZXJvQmFzaWNbXSB9ID0gX3RoYXQuZGF0YS50YWdzX2F2YWw7XHJcblxyXG4gICAgICAgICAgICB0bXBbdGFnXSA9IFt7XHJcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IG5hbWUsXHJcbiAgICAgICAgICAgICAgXCJpbWdcIjogY2hhcltcIm5hbWUtZW5cIl0sXHJcbiAgICAgICAgICAgICAgXCJsZXZlbFwiOiBjaGFyLmxldmVsLFxyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBjaGFyLnR5cGVcclxuICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICBfdGhhdC5zZXREYXRhISh7IHRhZ3NfYXZhbDogdG1wIH0pXHJcbiAgICAgICAgICAgIHRhZ19jb3VudCsrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhcl90YWdfc3VtKys7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHRtcDogeyBba2V5OiBzdHJpbmddOiBIZXJvIH0gPSBfdGhhdC5kYXRhLmFsbF9jaGFycztcclxuICAgICAgICB0bXAubmFtZSA9IHtcclxuICAgICAgICAgICdsZXZlbCc6IGNoYXIubGV2ZWwsXHJcbiAgICAgICAgICAndGFncyc6IGNoYXIudGFnc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoYXQuc2V0RGF0YSEoeyBhbGxfY2hhcnM6IHRtcCB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgX3RoYXQuc2V0RGF0YSEoeyBhdmdfY2hhcl90YWc6IChjaGFyX3RhZ19zdW0gLyB0YWdfY291bnQpIH0pO1xyXG5cclxuICAgIF90aGF0LmNhbGMoKTtcclxuICAgIC8vfSk7XHJcbiAgfSxcclxuICBjbGlja1RhZyhldmVudDogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICBsZXQgX3RoYXQgPSB0aGlzO1xyXG4gICAgbGV0IHRhZyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnRpdGxlO1xyXG4gICAgbGV0IGNoZWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvL+aYr+WQpueCuei/h1xyXG4gICAgaWYgKChfdGhhdC5kYXRhLmNoZWNrZWRUYWdzKS5pbmNsdWRlcyh0YWcpKSB7XHJcbiAgICAgIGNoZWNrZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGVja2VkKSB7XHJcbiAgICAgIF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MgPSBfdGhhdC5kYXRhLmNoZWNrZWRUYWdzLmZpbHRlcihmdW5jdGlvbiAodiwgXywgX18pIHtcclxuICAgICAgICByZXR1cm4gdiAhPT0gdGFnO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIF90aGF0LnNldERhdGEhKHtcclxuICAgICAgICBjaGVja2VkVGFnczogX3RoYXQuZGF0YS5jaGVja2VkVGFnc1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX3RoYXQuZGF0YS5jaGVja2VkVGFncy5sZW5ndGggPj0gNikge1xyXG5cclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IFwi5peg5rOV6YCJ5oup5pu05aSa5qCH562+77ya5pyA5aSaNuS4quOAglwiLFxyXG4gICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vYWxlcnQoXCLml6Dms5XpgInmi6nmm7TlpJrmoIfnrb7vvJrmnIDlpJo25Liq44CCXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBfdGhhdC5kYXRhLmNoZWNrZWRUYWdzLnB1c2godGFnKTtcclxuICAgICAgICBfdGhhdC5zZXREYXRhISh7XHJcbiAgICAgICAgICBjaGVja2VkVGFnczogX3RoYXQuZGF0YS5jaGVja2VkVGFnc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8kKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYnRuLXByaW1hcnkgYnRuLXNlY29uZGFyeVwiKTtcclxuICAgIF90aGF0LmNhbGMoKTtcclxuXHJcblxyXG5cclxuICB9XHJcblxyXG5cclxufSkiXX0=