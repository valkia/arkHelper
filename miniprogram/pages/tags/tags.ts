//tags.js
var app = getApp()  
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
    ] ,
     tags_aval : []=[],
     all_chars : {},
     avg_char_tag : 0,
     checkedTags : []=[],
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
      let ts : []=[];
        let  tsTL : []=[];
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
    let optStars :string[]=[];
    // $(".btn-opt").each(function (_, __) {
    //   if ($(this).attr("opt-id") === "all" || $(this).hasClass("btn-secondary")) return;
    //   optStars.push($(this).attr("opt-id"));
    // });
    //console.log(optStars); 
    //$("#tbody-recommend").html("");
 var that=this;//把this对象复制到临时变量that
    combs.forEach((comb:any)=> {
      let tags = comb.tags;
      if (tags.length === 0 || tags.length > 3) return;
      let chars = [...that.data.tags_aval[tags[0]]];
      for (let i = 1; i < tags.length; i++) {
        let reduced_chars : []=[];
        chars.forEach((char: any) => {
          // console.log(tags_aval[tags[i]]); 
          // console.log(char); 
          that.data.tags_aval[tags[i]].forEach( tgch:any => {
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
        let reduce6 :any[]=[];
        chars.forEach( function (_, char:any) {
          if (char.level !== 6) {
            reduce6.push(char);
          }
        });
        chars = reduce6;
      }
      let filtered_chars : [];
      chars.forEach( function (_, char:any) {
        //console.log(char.level); 
        if (optStars.includes(char.level.toString())) {
          filtered_chars.push(char);
        }
      });
      chars = filtered_chars;

      comb.possible = chars;
      if (chars.length === 0) return;
      let s = 0;
      chars.forEach(function(_, char:any)  {
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
    combs.forEach( function (_, comb:any) {
      if (!comb.possible||comb.possible.length === 0) return;
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
    app.func.get('/akhr.json', {}, function (data:any) {

      let tag_count = 0;
      let char_tag_sum = 0;
      // console.log(data); 
      data.forEach( function ( char:any) {
        if (char.hidden) return;
        char.tags.push(char.type + "干员");
        char.tags.push(char.sex + "性干员");
        let name =  char.name ;
        char.tags.forEach( function ( tag:any) {
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
    });

    
  }  

  }


})