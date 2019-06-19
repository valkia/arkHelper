"use strict";
var app = getApp();
Page({
    data: {
        tags: [
            {
                "cn": "资质",
                "cntags": ["新手", "资深干员", "高级资深干员"],
                "en": "Qualification",
                "entags": ["Newbie", "Senior", "Advanced Senior"]
            },
            {
                "cn": "位置",
                "cntags": ["远程位", "近战位"],
                "en": "Position",
                "entags": ["Ranged", "Melee"]
            },
            {
                "cn": "性别",
                "cntags": ["男性干员", "女性干员"],
                "en": "Gender",
                "entags": ["Male", "Female"]
            },
            {
                "cn": "种类",
                "cntags": ["先锋干员", "狙击干员", "医疗干员", "术师干员", "近卫干员", "重装干员", "辅助干员", "特种干员"],
                "en": "Class",
                "entags": ["Vanguard", "Sniper", "Medic", "Caster", "Guard", "Defender", "Support",
                    "Specialist"
                ]
            },
            {
                "cn": "词缀",
                "cntags": ["治疗", "支援", "输出", "群攻", "减速", "生存", "防护", "削弱", "位移", "控场", "爆发", "召唤",
                    "快速复活", "费用回复"
                ],
                "en": "Affix",
                "entags": ["Healing", "Support", "DPS", "Splash", "Slow", "Survival", "Protection",
                    "Debuffer", "Displacement", "Crowd Control", "Burst", "Summoner",
                    "Quick Resurrection", "Cost Recovery"
                ]
            }
        ],
        tags_aval: [],
        all_chars: {},
        avg_char_tag: 0,
        checkedTags: [],
        checkedTagsTL: []
    },
    onLoad: function () {
        console.log("666");
        this.calc();
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
        var optStars = [];
        var that = this;
        combs.forEach(function (comb) {
            var tags = comb.tags;
            if (tags.length === 0 || tags.length > 3)
                return;
            var chars = that.data.tags_aval[tags[0]].slice();
            var _loop_1 = function (i) {
                var reduced_chars = [];
                chars.forEach(function (char) {
                    that.data.tags_aval[tags[i]].forEach(tgch, function (any) {
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
                chars.forEach(function (_, char) {
                    if (char.level !== 6) {
                        reduce6_1.push(char);
                    }
                });
                chars = reduce6_1;
            }
            var filtered_chars;
            chars.forEach(function (_, char) {
                if (optStars.includes(char.level.toString())) {
                    filtered_chars.push(char);
                }
            });
            chars = filtered_chars;
            comb.possible = chars;
            if (chars.length === 0)
                return;
            var s = 0;
            chars.forEach(function (_, char) {
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
        combs.forEach(function (_, comb) {
            if (!comb.possible || comb.possible.length === 0)
                return;
            comb.possible.sort(function (a, b) {
                return a.level > b.level ? -1 : (a.level < b.level ? 1 : 0);
            });
        });
        var _that = this;
        app.func.get('/akhr.json', {}, function (data) {
            var tag_count = 0;
            var char_tag_sum = 0;
            data.forEach(function (char) {
                if (char.hidden)
                    return;
                char.tags.push(char.type + "干员");
                char.tags.push(char.sex + "性干员");
                var name = char.name;
                char.tags.forEach(char.tags, function (tag) {
                    if (tag in _that.data.tags_aval) {
                        _that.data.tags_aval[tag].push({
                            "name": name,
                            "img": char["name-en"],
                            "level": char.level,
                            "type": char.type
                        });
                    }
                    else {
                        _that.data.tags_aval[tag] = [{
                                "name": name,
                                "img": char["name-en"],
                                "level": char.level,
                                "type": char.type
                            }];
                        tag_count++;
                    }
                    char_tag_sum++;
                });
                all_chars[name] = {
                    'level': char.level,
                    'tags': char.tags
                };
            });
            avg_char_tag = char_tag_sum / tag_count;
            console.log(data);
            _that.data.checkedTags.push("医疗");
            _that.calc();
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFBO0FBQ2xCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLElBQUksRUFBRTtZQUNKO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO2dCQUNsQyxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQzthQUNsRDtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxVQUFVO2dCQUNoQixRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO2FBQzlCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztnQkFDMUIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQzthQUM3QjtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7Z0JBQzFFLElBQUksRUFBRSxPQUFPO2dCQUNiLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVM7b0JBQ2hGLFlBQVk7aUJBQ2I7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEs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NEJBQzdCLE1BQU0sRUFBRSxJQUFJOzRCQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDOzRCQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7NEJBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTt5QkFDbEIsQ0FBQyxDQUFDO3FCQUNKO3lCQUFNO3dCQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0NBQzNCLE1BQU0sRUFBRSxJQUFJO2dDQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0NBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTs2QkFDbEIsQ0FBQyxDQUFDO3dCQUNILFNBQVMsRUFBRSxDQUFDO3FCQUNiO29CQUNELFlBQVksRUFBRSxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO2lCQUNsQixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSCxZQUFZLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUl4QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUdMLENBQUM7Q0FFQSxDQUdELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL3RhZ3MuanNcclxudmFyIGFwcCA9IGdldEFwcCgpICBcclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgdGFnczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIui1hOi0qFwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFtcIuaWsOaJi1wiLCBcIui1hOa3seW5suWRmFwiLCBcIumrmOe6p+i1hOa3seW5suWRmFwiXSxcclxuICAgICAgICBcImVuXCI6IFwiUXVhbGlmaWNhdGlvblwiLFxyXG4gICAgICAgIFwiZW50YWdzXCI6IFtcIk5ld2JpZVwiLCBcIlNlbmlvclwiLCBcIkFkdmFuY2VkIFNlbmlvclwiXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuS9jee9rlwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFtcIui/nOeoi+S9jVwiLCBcIui/keaImOS9jVwiXSxcclxuICAgICAgICBcImVuXCI6IFwiUG9zaXRpb25cIixcclxuICAgICAgICBcImVudGFnc1wiOiBbXCJSYW5nZWRcIiwgXCJNZWxlZVwiXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuaAp+WIq1wiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFtcIueUt+aAp+W5suWRmFwiLCBcIuWls+aAp+W5suWRmFwiXSxcclxuICAgICAgICBcImVuXCI6IFwiR2VuZGVyXCIsXHJcbiAgICAgICAgXCJlbnRhZ3NcIjogW1wiTWFsZVwiLCBcIkZlbWFsZVwiXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuenjeexu1wiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFtcIuWFiOmUi+W5suWRmFwiLCBcIueLmeWHu+W5suWRmFwiLCBcIuWMu+eWl+W5suWRmFwiLCBcIuacr+W4iOW5suWRmFwiLCBcIui/keWNq+W5suWRmFwiLCBcIumHjeijheW5suWRmFwiLCBcIui+heWKqeW5suWRmFwiLCBcIueJueenjeW5suWRmFwiXSxcclxuICAgICAgICBcImVuXCI6IFwiQ2xhc3NcIixcclxuICAgICAgICBcImVudGFnc1wiOiBbXCJWYW5ndWFyZFwiLCBcIlNuaXBlclwiLCBcIk1lZGljXCIsIFwiQ2FzdGVyXCIsIFwiR3VhcmRcIiwgXCJEZWZlbmRlclwiLCBcIlN1cHBvcnRcIixcclxuICAgICAgICAgIFwiU3BlY2lhbGlzdFwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJjblwiOiBcIuivjee8gFwiLFxyXG4gICAgICAgIFwiY250YWdzXCI6IFtcIuayu+eWl1wiLCBcIuaUr+aPtFwiLCBcIui+k+WHulwiLCBcIue+pOaUu1wiLCBcIuWHj+mAn1wiLCBcIueUn+WtmFwiLCBcIumYsuaKpFwiLCBcIuWJiuW8sVwiLCBcIuS9jeenu1wiLCBcIuaOp+WculwiLCBcIueIhuWPkVwiLCBcIuWPrOWUpFwiLFxyXG4gICAgICAgICAgXCLlv6vpgJ/lpI3mtLtcIiwgXCLotLnnlKjlm57lpI1cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJlblwiOiBcIkFmZml4XCIsXHJcbiAgICAgICAgXCJlbnRhZ3NcIjogW1wiSGVhbGluZ1wiLCBcIlN1cHBvcnRcIiwgXCJEUFNcIiwgXCJTcGxhc2hcIiwgXCJTbG93XCIsIFwiU3Vydml2YWxcIiwgXCJQcm90ZWN0aW9uXCIsXHJcbiAgICAgICAgICBcIkRlYnVmZmVyXCIsIFwiRGlzcGxhY2VtZW50XCIsIFwiQ3Jvd2QgQ29udHJvbFwiLCBcIkJ1cnN0XCIsIFwiU3VtbW9uZXJcIixcclxuICAgICAgICAgIFwiUXVpY2sgUmVzdXJyZWN0aW9uXCIsIFwiQ29zdCBSZWNvdmVyeVwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICBdICxcclxuICAgICB0YWdzX2F2YWwgOiBbXT1bXSxcclxuICAgICBhbGxfY2hhcnMgOiB7fSxcclxuICAgICBhdmdfY2hhcl90YWcgOiAwLFxyXG4gICAgIGNoZWNrZWRUYWdzIDogW109W10sXHJcbiAgICBjaGVja2VkVGFnc1RMOiBbXSA9IFtdXHJcbiAgICAgXHJcbiAgfSxcclxuICBcclxuICBvbkxvYWQoKSB7XHJcbiAgICAvLyB0aGlzLnNldERhdGEhKHtcclxuICAgIC8vICAgbG9nczogKHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW10pLm1hcCgobG9nOiBudW1iZXIpID0+IHtcclxuICAgIC8vICAgICByZXR1cm4gZm9ybWF0VGltZShuZXcgRGF0ZShsb2cpKVxyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gfSlcclxuICAgIGNvbnNvbGUubG9nKFwiNjY2XCIpO1xyXG4gICAgdGhpcy5jYWxjKCk7XHJcbiAgfSxcclxuXHJcblxyXG4gIGNhbGMoKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmNoZWNrZWRUYWdzLmxlbmd0aDtcclxuICAgIGxldCBjb3VudCA9IE1hdGgucG93KDIsIHRoaXMuZGF0YS5jaGVja2VkVGFncy5sZW5ndGgpO1xyXG4gICAgbGV0IGNvbWJzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgbGV0IHRzIDogW109W107XHJcbiAgICAgICAgbGV0ICB0c1RMIDogW109W107XHJcbiAgICAgIGZvciAobGV0IGogPSAwLCBtYXNrID0gMTsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgaWYgKChpICYgbWFzaykgIT09IDApIHtcclxuICAgICAgICAgIHRzLnB1c2godGhpcy5kYXRhLmNoZWNrZWRUYWdzW2pdKTtcclxuICAgICAgICAgIHRzVEwucHVzaCh0aGlzLmRhdGEuY2hlY2tlZFRhZ3NUTFtqXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hc2sgPSBtYXNrICogMjtcclxuICAgICAgfVxyXG4gICAgICBjb21icy5wdXNoKHtcclxuICAgICAgICBcInRhZ3NcIjogdHMsXHJcbiAgICAgICAgXCJ0YWdzVExcIjogdHNUTCxcclxuICAgICAgICBcInNjb3JlXCI6IDAuMCxcclxuICAgICAgICBcInBvc3NpYmxlXCI6IFtdXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2coY29tYnMpOyBcclxuICAgIGxldCBvcHRTdGFycyA6c3RyaW5nW109W107XHJcbiAgICAvLyAkKFwiLmJ0bi1vcHRcIikuZWFjaChmdW5jdGlvbiAoXywgX18pIHtcclxuICAgIC8vICAgaWYgKCQodGhpcykuYXR0cihcIm9wdC1pZFwiKSA9PT0gXCJhbGxcIiB8fCAkKHRoaXMpLmhhc0NsYXNzKFwiYnRuLXNlY29uZGFyeVwiKSkgcmV0dXJuO1xyXG4gICAgLy8gICBvcHRTdGFycy5wdXNoKCQodGhpcykuYXR0cihcIm9wdC1pZFwiKSk7XHJcbiAgICAvLyB9KTtcclxuICAgIC8vY29uc29sZS5sb2cob3B0U3RhcnMpOyBcclxuICAgIC8vJChcIiN0Ym9keS1yZWNvbW1lbmRcIikuaHRtbChcIlwiKTtcclxuIHZhciB0aGF0PXRoaXM7Ly/miop0aGlz5a+56LGh5aSN5Yi25Yiw5Li05pe25Y+Y6YePdGhhdFxyXG4gICAgY29tYnMuZm9yRWFjaCgoY29tYjphbnkpPT4ge1xyXG4gICAgICBsZXQgdGFncyA9IGNvbWIudGFncztcclxuICAgICAgaWYgKHRhZ3MubGVuZ3RoID09PSAwIHx8IHRhZ3MubGVuZ3RoID4gMykgcmV0dXJuO1xyXG4gICAgICBsZXQgY2hhcnMgPSBbLi4udGhhdC5kYXRhLnRhZ3NfYXZhbFt0YWdzWzBdXV07XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCByZWR1Y2VkX2NoYXJzIDogW109W107XHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaCgoY2hhcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWdzX2F2YWxbdGFnc1tpXV0pOyBcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYXIpOyBcclxuICAgICAgICAgIHRoYXQuZGF0YS50YWdzX2F2YWxbdGFnc1tpXV0uZm9yRWFjaCggdGdjaDphbnkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5uYW1lID09PSB0Z2NoLm5hbWUpIHtcclxuICAgICAgICAgICAgICByZWR1Y2VkX2NoYXJzLnB1c2goY2hhcik7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjaGFycyA9IHJlZHVjZWRfY2hhcnM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFycy5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgaWYgKCF0YWdzLmluY2x1ZGVzKFwi6auY57qn6LWE5rex5bmy5ZGYXCIpKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGFncy5qb2luKFwiLFwiKSArIFwiIOS4jeWQqyjpq5jnuqcp6LWE5rex5bmy5ZGYXCIpOyBcclxuICAgICAgICBsZXQgcmVkdWNlNiA6YW55W109W107XHJcbiAgICAgICAgY2hhcnMuZm9yRWFjaCggZnVuY3Rpb24gKF8sIGNoYXI6YW55KSB7XHJcbiAgICAgICAgICBpZiAoY2hhci5sZXZlbCAhPT0gNikge1xyXG4gICAgICAgICAgICByZWR1Y2U2LnB1c2goY2hhcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2hhcnMgPSByZWR1Y2U2O1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBmaWx0ZXJlZF9jaGFycyA6IFtdO1xyXG4gICAgICBjaGFycy5mb3JFYWNoKCBmdW5jdGlvbiAoXywgY2hhcjphbnkpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGNoYXIubGV2ZWwpOyBcclxuICAgICAgICBpZiAob3B0U3RhcnMuaW5jbHVkZXMoY2hhci5sZXZlbC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgZmlsdGVyZWRfY2hhcnMucHVzaChjaGFyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBjaGFycyA9IGZpbHRlcmVkX2NoYXJzO1xyXG5cclxuICAgICAgY29tYi5wb3NzaWJsZSA9IGNoYXJzO1xyXG4gICAgICBpZiAoY2hhcnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgIGxldCBzID0gMDtcclxuICAgICAgY2hhcnMuZm9yRWFjaChmdW5jdGlvbihfLCBjaGFyOmFueSkgIHtcclxuICAgICAgICBzICs9IGNoYXIubGV2ZWw7XHJcbiAgICAgIH0pO1xyXG4gICAgICBzID0gcyAvIGNoYXJzLmxlbmd0aDtcclxuICAgICAgY29tYi5zY29yZSA9IHMgKyAwLjEgLyB0YWdzLmxlbmd0aCArIDAuOSAvIGNoYXJzLmxlbmd0aDtcclxuICAgIH0pO1xyXG4gICAgY29tYnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICByZXR1cm4gYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IChhLnNjb3JlIDwgYi5zY29yZSA/IDEgOlxyXG4gICAgICAgIChhLnRhZ3MubGVuZ3RoID4gYi50YWdzLmxlbmd0aCA/IDEgOiAoYS50YWdzLmxlbmd0aCA8IGIudGFncy5sZW5ndGggPyAtMSA6XHJcbiAgICAgICAgICAwKSkpO1xyXG4gICAgfSk7XHJcbiAgICAvL2xldCBubyA9IDE7XHJcbiAgICBjb21icy5mb3JFYWNoKCBmdW5jdGlvbiAoXywgY29tYjphbnkpIHtcclxuICAgICAgaWYgKCFjb21iLnBvc3NpYmxlfHxjb21iLnBvc3NpYmxlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAvLyBsZXQgY2hhcnMgPSBjb21iLnBvc3NpYmxlO1xyXG4gICAgICAvLyBsZXQgdGFncyA9IGNvbWIudGFncztcclxuICAgICAgLy8gbGV0IHRhZ3NUTCA9IGNvbWIudGFnc1RMO1xyXG4gICAgICAvLyBsZXQgY2hhcnNfaHRtbCA6IGFueVtdO1xyXG4gICAgICAvLyBsZXQgY29sb3JzID0ge1xyXG4gICAgICAvLyAgIDE6IFwiZGFya1wiLFxyXG4gICAgICAvLyAgIDI6IFwibGlnaHRcIixcclxuICAgICAgLy8gICAzOiBcInN1Y2Nlc3NcIixcclxuICAgICAgLy8gICA0OiBcImluZm9cIixcclxuICAgICAgLy8gICA1OiBcIndhcm5pbmdcIixcclxuICAgICAgLy8gICA2OiBcImRhbmdlclwiXHJcbiAgICAgIC8vIH07XHJcbiAgICAgIGNvbWIucG9zc2libGUuc29ydChmdW5jdGlvbiAoYTogYW55LCBiOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gYS5sZXZlbCA+IGIubGV2ZWwgPyAtMSA6IChhLmxldmVsIDwgYi5sZXZlbCA/IDEgOiAwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIGNoYXJzLmZvckVhY2goZnVuY3Rpb24gKF86IGFueSwgY2hhcjphbnkpIHtcclxuICAgICAgLy8gICBsZXQgcGFkZGluZyA9IHNob3dOYW1lICYmIGltYWdlU2l6ZSA8IDYwID8gXCJwYWRkaW5nLXJpZ2h0OiA0cHhcIiA6XHJcbiAgICAgIC8vICAgICBcInBhZGRpbmctcmlnaHQ6IDFweFwiO1xyXG4gICAgICAvLyAgIGxldCBzdHlsZSA9IHNob3dJbWFnZSA/IFwic3R5bGU9XFxcImJvcmRlci1yYWRpdXM6IDVweDtwYWRkaW5nOiAxcHggMXB4O1wiICtcclxuICAgICAgLy8gICAgIHBhZGRpbmcgKyBcIjtcXFwiIFwiIDogXCJcIjtcclxuICAgICAgLy8gICBsZXQgYnV0dG9uc3R5bGUgPSBpbWFnZVNpemUgPiAyNSA/XHJcbiAgICAgIC8vICAgICBcImJhY2tncm91bmQtY29sb3I6ICNBQUE7Ym9yZGVyLXJhZGl1czogNHB4O1wiIDpcclxuICAgICAgLy8gICAgIFwiYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7Ym9yZGVyLXJhZGl1czogNHB4O1wiO1xyXG4gICAgICAvLyAgIGNoYXJzX2h0bWwucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tXCIgK1xyXG4gICAgICAvLyAgICAgY29sb3JzW2NoYXIubGV2ZWxdICsgXCIgYnRuLWNoYXIgbXktMSBkLW5vbmUgZC1zbS1pbmxpbmVcXFwiIFwiICtcclxuICAgICAgLy8gICAgIHN0eWxlICsgXCJ0aXRsZT1cXFwiXCIgKyBjaGFyLm5hbWUgKyBcIlxcXCI+XCIpO1xyXG4gICAgICAvLyAgIGlmIChzaG93SW1hZ2UpIGNoYXJzX2h0bWwucHVzaChcIjxpbWcgc3R5bGU9XFxcIlwiICsgYnV0dG9uc3R5bGUgK1xyXG4gICAgICAvLyAgICAgXCJcXFwiaGVpZ2h0PVxcXCJcIiArIGltYWdlU2l6ZSArIFwiXFxcIiB3aWR0aD1cXFwiXCIgKyBpbWFnZVNpemUgK1xyXG4gICAgICAvLyAgICAgXCJcXFwiIHNyYz1cXFwiaW1nL2NoYXJhL1wiICsgY2hhci5pbWcgKyBcIi5wbmdcXFwiPiAgIFwiKTtcclxuICAgICAgLy8gICBpZiAoaW1hZ2VTaXplID4gNjApIGNoYXJzX2h0bWwucHVzaChcIjxkaXY+XCIpO1xyXG4gICAgICAvLyAgIGlmIChzaG93TmFtZSkgY2hhcnNfaHRtbC5wdXNoKGNoYXIubmFtZSk7XHJcbiAgICAgIC8vICAgaWYgKGltYWdlU2l6ZSA+IDYwKSBjaGFyc19odG1sLnB1c2goXCI8L2Rpdj5cIik7XHJcbiAgICAgIC8vICAgY2hhcnNfaHRtbC5wdXNoKFwiPC9idXR0b24+XFxuXCIpO1xyXG4gICAgICAvLyAgIGNoYXJzX2h0bWwucHVzaChcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zbSBidG4tXCIgK1xyXG4gICAgICAvLyAgICAgY29sb3JzW2NoYXIubGV2ZWxdICsgXCIgYnRuLWNoYXIgbXktMSBkLWlubGluZSBkLXNtLW5vbmVcXFwiIFwiICtcclxuICAgICAgLy8gICAgIFwidGl0bGU9XFxcIlwiICsgY2hhci5uYW1lICsgXCJcXFwiPlwiICsgY2hhci5uYW1lICsgXCI8L2J1dHRvbj5cXG5cIik7XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICAvL2xldCB0YWdzX2h0bWwgPSBbXTtcclxuICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgXHJcbiAgICAgIC8vICAgICB0YWdzX2h0bWwucHVzaChcclxuICAgICAgLy8gICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tc2Vjb25kYXJ5IGJ0bi1jaGFyIG15LTFcIj4nICtcclxuICAgICAgLy8gICAgICAgdGFnc1tpXSArIFwiPC9idXR0b24+XFxuXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAvLyB9XHJcbiAgICAgIC8vICQoXCIjdGJvZHktcmVjb21tZW5kXCIpLmFwcGVuZChcclxuICAgICAgLy8gICBcIjx0ciBjbGFzcz1cXFwidHItcmVjb21tZFxcXCI+XCIgK1xyXG4gICAgICAvLyAgIFwiPHRkIGNsYXNzPVxcXCJweS0yIGQtbm9uZSBkLXNtLXRhYmxlLWNlbGxcXFwiPlwiICsgbm8rKyArIFwiPC90ZD5cIiArXHJcbiAgICAgIC8vICAgXCI8dGQgY2xhc3M9XFxcInB5LTFcXFwiPlwiICsgdGFnc19odG1sLmpvaW4oXCJcIikgKyBcIjwvdGQ+PHRkIGNsYXNzPVxcXCJweS0xXFxcIj5cIiArXHJcbiAgICAgIC8vICAgY2hhcnNfaHRtbC5qb2luKFwiXCIpICtcclxuICAgICAgLy8gICBcIjwvdGQ+XCIgK1xyXG4gICAgICAvLyAgIFwiPHRkIGNsYXNzPVxcXCJweS0yIGQtbm9uZSBkLXNtLXRhYmxlLWNlbGxcXFwiPlwiICsgTWF0aC5mbG9vcihjb21iLnNjb3JlICpcclxuICAgICAgLy8gICAgIDEwMCkgLyAxMDAgKyBcIjwvdGQ+XCIgK1xyXG4gICAgICAvLyAgIFwiPC90cj5cIik7XHJcblxyXG4gICAgfSk7XHJcbiAgICAvLyBpZiAobGFuZyAhPT0gJ2NuJykgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcclxuICAgIC8vaHR0cHM6Ly9hay5ncmF1ZW5la28ueHl6L2FraHIuanNvblxyXG4gICAgbGV0IF90aGF0ID0gdGhpcztcclxuICAgIGFwcC5mdW5jLmdldCgnL2FraHIuanNvbicsIHt9LCBmdW5jdGlvbiAoZGF0YTphbnkpIHtcclxuXHJcbiAgICAgIGxldCB0YWdfY291bnQgPSAwO1xyXG4gICAgICBsZXQgY2hhcl90YWdfc3VtID0gMDtcclxuICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7IFxyXG4gICAgICBkYXRhLmZvckVhY2goIGZ1bmN0aW9uICggY2hhcjphbnkpIHtcclxuICAgICAgICBpZiAoY2hhci5oaWRkZW4pIHJldHVybjtcclxuICAgICAgICBjaGFyLnRhZ3MucHVzaChjaGFyLnR5cGUgKyBcIuW5suWRmFwiKTtcclxuICAgICAgICBjaGFyLnRhZ3MucHVzaChjaGFyLnNleCArIFwi5oCn5bmy5ZGYXCIpO1xyXG4gICAgICAgIGxldCBuYW1lID0gIGNoYXIubmFtZSA7XHJcbiAgICAgICAgY2hhci50YWdzLmZvckVhY2goY2hhci50YWdzLCBmdW5jdGlvbiAoIHRhZzphbnkpIHtcclxuICAgICAgICAgIGlmICh0YWcgaW4gX3RoYXQuZGF0YS50YWdzX2F2YWwpIHtcclxuICAgICAgICAgICAgX3RoYXQuZGF0YS50YWdzX2F2YWxbdGFnXS5wdXNoKHtcclxuICAgICAgICAgICAgICBcIm5hbWVcIjogbmFtZSxcclxuICAgICAgICAgICAgICBcImltZ1wiOiBjaGFyW1wibmFtZS1lblwiXSxcclxuICAgICAgICAgICAgICBcImxldmVsXCI6IGNoYXIubGV2ZWwsXHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IGNoYXIudHlwZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF90aGF0LmRhdGEudGFnc19hdmFsW3RhZ10gPSBbe1xyXG4gICAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICAgICAgICAgIFwiaW1nXCI6IGNoYXJbXCJuYW1lLWVuXCJdLFxyXG4gICAgICAgICAgICAgIFwibGV2ZWxcIjogY2hhci5sZXZlbCxcclxuICAgICAgICAgICAgICBcInR5cGVcIjogY2hhci50eXBlXHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICB0YWdfY291bnQrKztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNoYXJfdGFnX3N1bSsrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFsbF9jaGFyc1tuYW1lXSA9IHtcclxuICAgICAgICAgICdsZXZlbCc6IGNoYXIubGV2ZWwsXHJcbiAgICAgICAgICAndGFncyc6IGNoYXIudGFnc1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICBhdmdfY2hhcl90YWcgPSBjaGFyX3RhZ19zdW0gLyB0YWdfY291bnQ7XHJcblxyXG5cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgIF90aGF0LmRhdGEuY2hlY2tlZFRhZ3MucHVzaChcIuWMu+eWl1wiKTtcclxuICAgICAgX3RoYXQuY2FsYygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcbiAgfSAgXHJcblxyXG4gIH1cclxuXHJcblxyXG59KSJdfQ==