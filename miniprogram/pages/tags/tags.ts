//tags.js
var app = getApp()

class Hero {
     name: string;
     camp: string;
     type: string;
     level: number;
     sex: string;
     characteristic: string;
     tags: string[];
     hidden: boolean;
     "name-en": string;


    constructor(name: string, camp: string, type: string, level: number, sex: string, characteristic: string, tags: [], hidden: boolean, name_en: string) {
        this.name = name;
        this.camp = camp;
        this.type = type;
        this.level = level;
        this.sex = sex;
        this.characteristic = characteristic;
        this.tags = tags;
        this.hidden = hidden;
        this["name-en"] = name_en;
    }
}

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
        tags_aval: {}={},
        all_chars: {} = {},
        avg_char_tag: 0,
        checkedTags: [],
        checkedTagsTL: [] = []

    },

    onLoad() {
        // this.setData!({
        //   logs: (wx.getStorageSync('logs') || []).map((log: number) => {
        //     return formatTime(new Date(log))
        //   })
        // })
        console.log("666");
        this.calc();
    },

    bindViewTap() {
        wx.navigateTo({
            url: '../index/index'
        })
    },

    calc() {
        let len = this.data.checkedTags.length;
        let count = Math.pow(2, this.data.checkedTags.length);
        let combs = [];
        for (let i = 0; i < count; i++) {
            let ts: [] = [];
            let tsTL: [] = [];
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
        // console.log(combs);
        let optStars: string[] = [];
        // $(".btn-opt").each(function (_, __) {
        //   if ($(this).attr("opt-id") === "all" || $(this).hasClass("btn-secondary")) return;
        //   optStars.push($(this).attr("opt-id"));
        // });
        //console.log(optStars);
        //$("#tbody-recommend").html("");
        var that = this;//把this对象复制到临时变量that
        combs.forEach((comb: { tags: string[] }) => {
            let tags = comb.tags;
            if (tags.length === 0 || tags.length > 3) return;
            let chars = [...that.data.tags_aval[tags[0]]];
            for (let i = 1; i < tags.length; i++) {
                let reduced_chars: [{ name: string }] = [{name: ""}];

                chars.forEach((char: { name: string }) => {
                    // console.log(tags_aval[tags[i]]);
                    // console.log(char);
                    that.data.tags_aval[tags[i]].forEach((tgch: { name: string }) => {
                        if (char.name === tgch.name) {
                            reduced_chars.push(char);
                            return false;
                        }
                    });
                });
                chars = reduced_chars;
            }

            if (chars.length === 0) return;
            if (!tags.includes("高级资深干员")) {
                // console.log(tags.join(",") + " 不含(高级)资深干员");
                let reduce6: any[] = [];
                chars.forEach(function (char: any) {
                    if (char.level !== 6) {
                        reduce6.push(char);
                    }
                });
                chars = reduce6;
            }
            let filtered_chars: [];
            chars.forEach(function (char: any) {
                //console.log(char.level);
                if (optStars.includes(char.level.toString())) {
                    filtered_chars.push(char);
                }
            });
            chars = filtered_chars;

            comb.possible = chars;
            if (chars.length === 0) return;
            let s = 0;
            chars.forEach(function (char: any) {
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
        //let no = 1;
        combs.forEach(function (comb: any) {
            if (!comb.possible || comb.possible.length === 0) return;
            // let chars = comb.possible;
            // let tags = comb.tags;
            // let tagsTL = comb.tagsTL;
            // let chars_html : any[];
            // let colors = {
            //   1: "dark",
            //   2: "light",
            //   3: "success",
            //   4: "info",
            //   5: "warning",
            //   6: "danger"
            // };
            comb.possible.sort(function (a: any, b: any) {
                return a.level > b.level ? -1 : (a.level < b.level ? 1 : 0);
            });
            // chars.forEach(function (_: any, char:any) {
            //   let padding = showName && imageSize < 60 ? "padding-right: 4px" :
            //     "padding-right: 1px";
            //   let style = showImage ? "style=\"border-radius: 5px;padding: 1px 1px;" +
            //     padding + ";\" " : "";
            //   let buttonstyle = imageSize > 25 ?
            //     "background-color: #AAA;border-radius: 4px;" :
            //     "background-color: transparent;border-radius: 4px;";
            //   chars_html.push("<button type=\"button\" class=\"btn btn-sm btn-" +
            //     colors[char.level] + " btn-char my-1 d-none d-sm-inline\" " +
            //     style + "title=\"" + char.name + "\">");
            //   if (showImage) chars_html.push("<img style=\"" + buttonstyle +
            //     "\"height=\"" + imageSize + "\" width=\"" + imageSize +
            //     "\" src=\"img/chara/" + char.img + ".png\">   ");
            //   if (imageSize > 60) chars_html.push("<div>");
            //   if (showName) chars_html.push(char.name);
            //   if (imageSize > 60) chars_html.push("</div>");
            //   chars_html.push("</button>\n");
            //   chars_html.push("<button type=\"button\" class=\"btn btn-sm btn-" +
            //     colors[char.level] + " btn-char my-1 d-inline d-sm-none\" " +
            //     "title=\"" + char.name + "\">" + char.name + "</button>\n");
            // });
            //let tags_html = [];
            // for (let i = 0; i < tags.length; i++) {

            //     tags_html.push(
            //       '<button type="button" class="btn btn-sm btn-secondary btn-char my-1">' +
            //       tags[i] + "</button>\n");

            // }
            // $("#tbody-recommend").append(
            //   "<tr class=\"tr-recommd\">" +
            //   "<td class=\"py-2 d-none d-sm-table-cell\">" + no++ + "</td>" +
            //   "<td class=\"py-1\">" + tags_html.join("") + "</td><td class=\"py-1\">" +
            //   chars_html.join("") +
            //   "</td>" +
            //   "<td class=\"py-2 d-none d-sm-table-cell\">" + Math.floor(comb.score *
            //     100) / 100 + "</td>" +
            //   "</tr>");

        });
        // if (lang !== 'cn') $('[data-toggle="tooltip"]').tooltip();
        //https://ak.graueneko.xyz/akhr.json
        let _that = this;
        //app.func.get('/akhr.json', {}, function (data: any) {

        let tag_count = 0;
        let char_tag_sum = 0;
        // console.log(data);

        let test = " [\n" +
            "            {\n" +
            "                'name': '暴行',\n" +
            "                'camp': '雷姆必拓',\n" +
            "                'type': '近卫',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '',\n" +
            "                'tags': [\n" +
            "                    '三测暂不实装'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Savage'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': 'Lancet-2',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 1,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '恢复友方单位生命，且不受部署数量限制，但再部署时间极长',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Lancet-2'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': 'Castle-3',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '近卫',\n" +
            "                'level': 1,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '能够阻挡一个敌人，且不受部署数量限制，但再部署时间极长',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '支援'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Castle-3'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '夜刀',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '先锋',\n" +
            "                'level': 2,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡两个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '新手'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Yato'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '杜林',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '术师',\n" +
            "                'level': 2,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '新手'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Durin'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '12F',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '术师',\n" +
            "                'level': 2,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '攻击造成群体法术伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '新手'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': '12F'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '巡林者',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '狙击',\n" +
            "                'level': 2,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '新手'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Rangers'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '黑角',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '重装',\n" +
            "                'level': 2,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '能够阻挡三个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '新手'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Noir Corne'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '芬',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '先锋',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡两个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '费用回复'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Fang'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '香草',\n" +
            "                'camp': '黑钢国际',\n" +
            "                'type': '先锋',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡两个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '费用回复'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Vanilla'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '翎羽',\n" +
            "                'camp': '拉特兰',\n" +
            "                'type': '先锋',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '击杀敌人后获得1点部署费用，撤退时返还初始部署费用',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '费用回复'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Plume'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '芙蓉',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '恢复友方单位生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Hibiscus'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '安赛尔',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 3,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '恢复友方单位生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Ansel'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '炎熔',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '术师',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成群体法术伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '群攻'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Lava'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '史都华德',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '术师',\n" +
            "                'level': 3,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '攻击造成法术伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Steward'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '克洛丝',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '狙击',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Kroos'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '安德切尔',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '狙击',\n" +
            "                'level': 3,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Adnachiel'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '梓兰',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '辅助',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害，并对敌人造成短暂的停顿',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '减速'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Orchid'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '玫兰莎',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '近卫',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡一个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '生存'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Melantha'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '米格鲁',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '重装',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡三个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '防护'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Beagle'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '卡缇',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '重装',\n" +
            "                'level': 3,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡三个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '防护'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Cardigan'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '讯使',\n" +
            "                'camp': '谢拉格',\n" +
            "                'type': '先锋',\n" +
            "                'level': 4,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '能够阻挡两个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '费用回复',\n" +
            "                    '防护'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Courier'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '清道夫',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '先锋',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡两个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '费用回复',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Scavenger'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '红豆',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '先锋',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '击杀敌人后获得1点部署费用，撤退时返还初始部署费用',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '费用回复'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Vigna'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '末药',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '恢复友方单位生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Myrrh'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '嘉维尔',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '恢复友方单位生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Gavial'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '调香师',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '同时恢复三个友方单位的生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Perfumer'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '夜烟',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '术师',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害',\n" +
            "                'tags': [\n" +
            "                    '削弱',\n" +
            "                    '远程位',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Haze'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '远山',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '术师',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成群体法术伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '群攻'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Gitano'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '砾',\n" +
            "                'camp': '卡西米尔',\n" +
            "                'type': '特种',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '再部署时间大幅度减少',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '快速复活',\n" +
            "                    '防护'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Gravel'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '暗索',\n" +
            "                'camp': '雷姆必拓',\n" +
            "                'type': '特种',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '技能可以使敌人产生位移、可以放置于远程位',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '位移'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Rope'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '断罪者',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '特种',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '同时攻击阻挡的所有敌人、技能可以使敌人产生位移',\n" +
            "                'tags': [\n" +
            "                    '三测暂不实装'\n" +
            "                ],\n" +
            "                'hidden': true\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '阿消',\n" +
            "                'camp': '龙门',\n" +
            "                'type': '特种',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '同时攻击阻挡的所有敌人、可以放置于远程位',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '位移'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Shaw'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '梅',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '狙击',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '三测暂不实装'\n" +
            "                ],\n" +
            "                'hidden': true\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '白雪',\n" +
            "                'camp': '龙门',\n" +
            "                'type': '狙击',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成群体物理伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '群攻',\n" +
            "                    '减速'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'ShiraYuki'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '流星',\n" +
            "                'camp': '卡西米尔',\n" +
            "                'type': '狙击',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出',\n" +
            "                    '削弱'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Meteor'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '杰西卡',\n" +
            "                'camp': '黑钢国际',\n" +
            "                'type': '狙击',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出',\n" +
            "                    '生存'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Jessica'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '深海色',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '辅助',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成魔法伤害、可以使用召唤物协助作战',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '召唤'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Deepcolor'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '地灵',\n" +
            "                'camp': '卡普里尼',\n" +
            "                'type': '辅助',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成魔法伤害，并对敌人造成短暂的停顿',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '减速'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Earthspirit'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '杜宾',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '近卫',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '可以攻击到较远敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '支援',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Dobermann'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '艾丝黛尔',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '近卫',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '同时攻击阻挡的所有敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '群攻',\n" +
            "                    '生存'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Estelle'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '猎蜂',\n" +
            "                'camp': '乌萨斯',\n" +
            "                'type': '近卫',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡一个敌人',\n" +
            "                'tags': [\n" +
            "                    '三测暂不实装'\n" +
            "                ],\n" +
            "                'hidden': true\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '慕斯',\n" +
            "                'camp': '维多利亚',\n" +
            "                'type': '近卫',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Mousse'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '霜叶',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '近卫',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '可以进行远程攻击，但此时攻击力降低至80%',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '减速',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Frostleaf'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '缠丸',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '近卫',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡一个敌人',\n" +
            "                'tags': [\n" +
            "                    '输出',\n" +
            "                    '近战位',\n" +
            "                    '生存'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Matoimaru'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '蛇屠箱',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '重装',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡三个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '防护'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Cuora'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '古米',\n" +
            "                'camp': '乌萨斯',\n" +
            "                'type': '重装',\n" +
            "                'level': 4,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '技能可以治疗友方单位',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '防护',\n" +
            "                    '治疗'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'ГУМ'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '角峰',\n" +
            "                'camp': '谢拉格',\n" +
            "                'type': '重装',\n" +
            "                'level': 4,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '能够阻挡三个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '防护'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Matterhorn'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '德克萨斯',\n" +
            "                'camp': '企鹅物流',\n" +
            "                'type': '先锋',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡两个敌人',\n" +
            "                'tags': [\n" +
            "                    '控场',\n" +
            "                    '近战位',\n" +
            "                    '费用回复',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Texas'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '凛冬',\n" +
            "                'camp': '乌萨斯',\n" +
            "                'type': '先锋',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡两个敌人',\n" +
            "                'tags': [\n" +
            "                    '支援',\n" +
            "                    '近战位',\n" +
            "                    '费用回复',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'зима'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '白面鸮',\n" +
            "                'camp': '莱茵生命实验室',\n" +
            "                'type': '医疗',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '同时恢复三个友方单位的生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗',\n" +
            "                    '支援',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Ptilopsis'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '赫默',\n" +
            "                'camp': '莱茵生命实验室',\n" +
            "                'type': '医疗',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '恢复友方单位生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Silence'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '华法琳',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '恢复友方单位生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗',\n" +
            "                    '支援',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Warfarin'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '阿米娅',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '术师',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Amiya'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '夜魔',\n" +
            "                'camp': '维多利亚',\n" +
            "                'type': '术师',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害',\n" +
            "                'tags': [\n" +
            "                    '三测暂不实装'\n" +
            "                ],\n" +
            "                'hidden': true\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '天火',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '术师',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成群体法术伤害',\n" +
            "                'tags': [\n" +
            "                    '控场',\n" +
            "                    '远程位',\n" +
            "                    '群攻',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Skyfire'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '红',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '特种',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '再部署时间大幅减少',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '控场',\n" +
            "                    '快速复活',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Projekt Red'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '狮蝎',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '特种',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '对攻击范围内所有敌人造成伤害、拥有50%的物理和法术闪避且不容易成为敌人的攻击目标',\n" +
            "                'tags': [\n" +
            "                    '生存',\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Manticore'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '崖心',\n" +
            "                'camp': '谢拉格',\n" +
            "                'type': '特种',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '技能可以使敌人产生位移、可以放置于远程位',\n" +
            "                'tags': [\n" +
            "                    '输出',\n" +
            "                    '近战位',\n" +
            "                    '位移',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Cliffheart'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '食铁兽',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '特种',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '同时攻击阻挡的所有敌人、可以放置于远程位',\n" +
            "                'tags': [\n" +
            "                    '减速',\n" +
            "                    '近战位',\n" +
            "                    '位移',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'FEater'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '普罗旺斯',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '狙击',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '高精度的近距离射击',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Provence'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '蓝毒',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '狙击',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Blue Poison'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '守林人',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '狙击',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '优先攻击攻击范围内防御力最低的敌方单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出',\n" +
            "                    '爆发',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Firewatch'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '陨星',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '狙击',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成群体物理伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '群攻',\n" +
            "                    '削弱',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Meteorite'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '白金',\n" +
            "                'camp': '卡西米尔',\n" +
            "                'type': '狙击',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Platinum'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '初雪',\n" +
            "                'camp': '谢拉格',\n" +
            "                'type': '辅助',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成魔法伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '削弱',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Pramanix'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '真理',\n" +
            "                'camp': '乌萨斯',\n" +
            "                'type': '辅助',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害，并对敌人造成短暂的停顿',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '减速',\n" +
            "                    '输出',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Истина'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '梅尔',\n" +
            "                'camp': '莱茵生命实验室',\n" +
            "                'type': '辅助',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成魔法伤害、可以使用召唤物协助作战',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '召唤',\n" +
            "                    '控场',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Mayer'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '空',\n" +
            "                'camp': '企鹅物流',\n" +
            "                'type': '辅助',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '不进行攻击，持续恢复攻击范围内所有友军的生命（每秒恢复相当于空攻击力10%的生命）',\n" +
            "                'tags': [\n" +
            "                    '支援',\n" +
            "                    '远程位',\n" +
            "                    '治疗',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Sora'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '芙兰卡',\n" +
            "                'camp': '黑钢国际',\n" +
            "                'type': '近卫',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡一个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '生存',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Franka'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '幽灵鲨',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '近卫',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '同时攻击阻挡的所有敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '群攻',\n" +
            "                    '生存',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Specter'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '因陀罗',\n" +
            "                'camp': '维多利亚',\n" +
            "                'type': '近卫',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡一个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '生存',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Indra'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '陈',\n" +
            "                'camp': '龙门',\n" +
            "                'type': '近卫',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '三测暂不实装',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '群攻',\n" +
            "                    '支援'\n" +
            "                ],\n" +
            "                'hidden': true\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '拉普兰德',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '近卫',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '可以进行远程攻击，但此时攻击力降低至80%',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '削弱',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Lappland'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '临光',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '重装',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '技能可以治疗友方单位',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '防护',\n" +
            "                    '治疗',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Nearl'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '雷蛇',\n" +
            "                'camp': '黑钢国际',\n" +
            "                'type': '重装',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡三个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '防护',\n" +
            "                    '输出',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Liskarm'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '火神',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '重装',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '无法被友方角色治疗',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '防护',\n" +
            "                    '生存',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Vulcan'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '可颂',\n" +
            "                'camp': '企鹅物流',\n" +
            "                'type': '重装',\n" +
            "                'level': 5,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡三个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '位移',\n" +
            "                    '防护',\n" +
            "                    '资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Croissant'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '推进之王',\n" +
            "                'camp': '维多利亚',\n" +
            "                'type': '先锋',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡两个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '费用回复',\n" +
            "                    '输出',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Siege'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '闪灵',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '恢复友方单位生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '支援',\n" +
            "                    '治疗',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Shining'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '夜莺',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '同时恢复三个友方单位的生命',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '治疗',\n" +
            "                    '支援',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Nightingale'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '凯尔希',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '医疗',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '恢复友方单位生命、可以使用召唤物协助作战',\n" +
            "                'tags': [\n" +
            "                    '三测暂不实装'\n" +
            "                ],\n" +
            "                'hidden': true\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '伊芙利特',\n" +
            "                'camp': '莱茵生命实验室',\n" +
            "                'type': '术师',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成超远距离的群体法术伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '群攻',\n" +
            "                    '削弱',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Ifrit'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '艾雅法拉',\n" +
            "                'camp': '卡普里尼',\n" +
            "                'type': '术师',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出',\n" +
            "                    '削弱',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Eyjafjalla'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '能天使',\n" +
            "                'camp': '企鹅物流',\n" +
            "                'type': '狙击',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '优先攻击空中单位',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '输出',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Exusiai'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '安洁莉娜',\n" +
            "                'camp': '罗德岛',\n" +
            "                'type': '辅助',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '攻击造成法术伤害，并对敌人造成短暂的停顿',\n" +
            "                'tags': [\n" +
            "                    '远程位',\n" +
            "                    '减速',\n" +
            "                    '输出',\n" +
            "                    '支援',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': true,\n" +
            "                'name-en': 'Angelina'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '银灰',\n" +
            "                'camp': '谢拉格',\n" +
            "                'type': '近卫',\n" +
            "                'level': 6,\n" +
            "                'sex': '男',\n" +
            "                'characteristic': '可以进行远程攻击，但此时攻击力降低至80%',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '支援',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'SilverAsh'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '星熊',\n" +
            "                'camp': '龙门',\n" +
            "                'type': '重装',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '能够阻挡三个敌人',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '输出',\n" +
            "                    '防护',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Hoshiguma'\n" +
            "            },\n" +
            "            {\n" +
            "                'name': '塞雷娅',\n" +
            "                'camp': '莱茵生命实验室',\n" +
            "                'type': '重装',\n" +
            "                'level': 6,\n" +
            "                'sex': '女',\n" +
            "                'characteristic': '技能可以治疗友方单位',\n" +
            "                'tags': [\n" +
            "                    '近战位',\n" +
            "                    '支援',\n" +
            "                    '防护',\n" +
            "                    '治疗',\n" +
            "                    '高级资深干员'\n" +
            "                ],\n" +
            "                'hidden': false,\n" +
            "                'name-en': 'Saria'\n" +
            "            }\n" +
            "        ]";
        let data : Hero[]= JSON.parse(test);

        data.forEach( char =>{
            if (char.hidden) return;
            char.tags.push(char.type + "干员");
            char.tags.push(char.sex + "性干员");
            let name = char.name;
            char.tags.forEach(function (tag: any) {
                if (tag in _that.data.tags_aval) {
                    _that.data.tags_aval[tag].push({
                        "name": name,
                        "img": char["name-en"],
                        "level": char.level,
                        "type": char.type
                    });
                } else {
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
            _that.data.all_chars[name] = {
                'level': char.level,
                'tags': char.tags
            };
        });
        _that.data.avg_char_tag = char_tag_sum / tag_count;


        console.log(data)
        _that.data.checkedTags.push("治疗");
        _that.calc();
        //});


    }


})