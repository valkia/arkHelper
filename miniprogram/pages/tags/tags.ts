//tags.js
var app = getApp()
//@ts-ignore
import ArkResp = require('../../model/ArkResp.js');
class HeroBasic {
  name?: string;
  type?: string;
  level?: number;
  img?: string

  constructor(name: string, type: string, level: number, img: string) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.img = img;
  }

}

// class Hero extends HeroBasic {
//   camp?: string;
//   sex?: string;
//   characteristic?: string;
//   tags?: string[];
//   hidden?: boolean;
//   "name-en"?: string;


//   constructor(name: string, camp: string, type: string, level: number, sex: string, characteristic: string, tags: [], hidden: boolean, name_en: string, img: string) {
//     super(name, type, level, img);
//     this.camp = camp;
//     this.sex = sex;
//     this.characteristic = characteristic;
//     this.tags = tags;
//     this.hidden = hidden;
//     this["name-en"] = name_en;

//   }
// }



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
      this.clean()
      let that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          wx.compressImage({
            src: tempFilePaths[0], // 图片路径
            quality: 80, // 压缩质量,
            success(res) {
              const tempFilePath = res.tempFilePath

              wx.showLoading({
                title: '加载中',
              })

              wx.uploadFile({
                url: 'https://dtodo.cn/ark/upload2', //仅为示例，非真实的接口地址
                filePath: tempFilePath,
                name: 'file',
                formData: {
                  'user': 'test'
                },
                success(res) {
                  wx.hideLoading()
                  if (res.data != '[]') {
                    let tagList = JSON.parse(res.data)

                    for (let i = 0; i < tagList.length; i++) {
                      that.clickTagF(tagList[i], true);
                    }
                  } else {
                    wx.showToast({
                      title: "没有识别的招募标签，请检查图片。",
                      icon: "none",
                      duration: 2000
                    })
                  }

                  //do something
                },
                fail(res) {
                  console.log(res)
                  wx.hideLoading()
                }
              })
            }
          })
        }
      })


    },

    search(e: any) {
      let keyword = e.detail.value;
      let keyArray: [] = keyword.split(/\s+/);


      let that = this;
      this.data.tags.forEach((t: any) => {
        t['cntags'].forEach((t2: any) => {
          if (t2.showFlag === true) {
            t2.showFlag = false;
          }
        })
      })

      that.setData!({
        checkedTags: [],
        tags: this.data.tags,
        keywords: keyword
      });

      if (keyArray.length === 0) that.calc();


      keyArray.forEach(key => {

        let times = 0;
        let result = "";
        this.data.tags.forEach((t: any) => {

          t['cntags'].forEach((t2: any) => {
            if (t2.name.includes(key)) {
              times++
              result = t2.name;
            }

          })
        })
        if (times === 1) {
          that.clickTagF(result, false);
        }

      })
    },

    clean() {
      this.data.tags.forEach((t: any) => {
        t['cntags'].forEach((t2: any) => {
          if (t2.showFlag === true) {
            t2.showFlag = false;
          }
        })
      })

      this.setData!({
        checkedTags: [],
        tags: this.data.tags,
        keywords: ""
      });
      this.calc();
    },

    clickStars(event: any) {
      let value = event.target.dataset.title;
      if (value === '清空') {
        this.data.showStars.forEach((s: any) => {

          s.showFlag = false;

        })
        this.data.showStars[0] = { name: "全选", showFlag: true };
        this.setData!({ optStars: [], showStars: this.data.showStars });
      }
      if (value === '全选') {
        this.data.showStars.forEach((s: any) => {

          s.showFlag = true;

        })
        this.data.showStars[0] = { name: "清空", showFlag: true };
        this.setData!({ optStars: ['清空', '6', '5', '4', '3', '2', '1'], showStars: this.data.showStars });
      }
      else {

        this.data.showStars.forEach((s: any) => {
          if (s.name === value) {
            s.showFlag = !s.showFlag;
          }
        })
        let tmp = this.data.optStars;
        if (this.data.optStars.includes(value)) {
          tmp = this.data.optStars.filter(function (v, _, __) {
            return v !== value;
          });


        } else {
          tmp.push(value);
        }

        this.setData!({ optStars: tmp, showStars: this.data.showStars });
      }
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
      let optStars: string[] = this.data.optStars;
      // $(".btn-opt").each(function (_, __) {
      //   if ($(this).attr("opt-id") === "all" || $(this).hasClass("btn-secondary")) return;
      //   optStars.push($(this).attr("opt-id"));
      // });
      //$("#tbody-recommend").html("");
      var that = this;//把this对象复制到临时变量that
      combs.forEach((comb: { [key: string]: any }) => {
        let tags: string[] = comb.tags;
        if (tags.length === 0 || tags.length > 3) return;
        //@ts-ignore 
        let chars: HeroBasic[] = [...that.data.tags_aval[tags[0]]];//切割每个字符
        for (let i = 1; i < tags.length; i++) {
          let reduced_chars: HeroBasic[] = [];

          chars.forEach((char: HeroBasic) => {
            //@ts-ignore 
            let tmp: HeroBasic[] = that.data.tags_aval[tags[i]];
            //@ts-ignore 
            tmp.forEach((tgch: HeroBasic) => {
              if (char.name === tgch.name) {
                reduced_chars.push(char);
                return false;
              }
            });
          });
          //@ts-ignore 
          chars = reduced_chars;
        }

        if (chars.length === 0) return;
        //@ts-ignore 
        if (!tags.includes("高级资深干员")) {
          let reduce6: any[] = [];
          chars.forEach(function (char: any) {
            if (char.level !== 6) {
              reduce6.push(char);
            }
          });
          chars = reduce6;
        }
        let filtered_chars: HeroBasic[] = [];
        chars.forEach(function (char: HeroBasic) {
          //@ts-ignore 
          if (optStars.includes(char.level.toString())) {
            filtered_chars.push(char);
          }
        });
        //@ts-ignore 
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
      //@ts-ignore 
      combs.forEach((comb: any) => {
        if (!comb.possible || comb.possible.length === 0) return false;

        comb.possible.sort(function (a: any, b: any) {
          return a.level > b.level ? -1 : (a.level < b.level ? 1 : 0);
        });


      });



      // if (lang !== 'cn') $('[data-toggle="tooltip"]').tooltip();
      //https://ak.graueneko.xyz/akhr.json


      that.setData!({ possible: combs });

    },
    init() {
      let _that = this;

      //app.func.get('/akhr.json', {}, function (data: Hero[]) {
      //let data: Hero[] = jsonData.dataList;
      var that = this;
      app.func.get('/tagsAval', {}, function (response: ArkResp) {
        if (response.status === 200) {
          that.setData!({ tags_aval: JSON.parse(response.data) })
        }
      })



this.setData!({ optStars: ['清空', '6', '5', '4', '3', '2', '1'] }); 

      // for (const key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     const char = data[key];
      //     if (char.hidden) continue;
      //     char.tags!.push(char.type + "干员");
      //     char.tags!.push(char.sex + "性干员");
      //     let name = char.name;
      //     char.tags!.forEach(function (tag: string) {
      //       if (tag in _that.data.tags_aval) {

      //         let tmp: { [key: string]: HeroBasic[] } = _that.data.tags_aval;
      //         tmp[tag].push({
      //           "name": name,
      //           "img": char["name-en"],
      //           "level": char.level,
      //           "type": char.type
      //         });

      //         _that.setData!({ tags_aval: tmp })

      //       } else {

      //         let tmp: { [key: string]: HeroBasic[] } = _that.data.tags_aval;

      //         tmp[tag] = [{
      //           "name": name,
      //           "img": char["name-en"],
      //           "level": char.level,
      //           "type": char.type
      //         }];

      //         _that.setData!({ tags_aval: tmp })

      //       }

      //     });

      //   }
      // }


      _that.calc();
      //});
    },
    clickTag(event: any) {
      let tag = event.target.dataset.title;
      this.clickTagF(tag, true);
    },
    // 是否是点击进来的标志,true的时候才会去掉点击标志
    clickTagF(tag: string, clickFlag: boolean) {
      let _that = this;

      let checked = false;

      if (!clickFlag) {
        this.data.tags.forEach((t: any) => {

          t['cntags'].forEach((t2: any) => {
            if (t2.name === tag && t2.showFlag === false) {
              t2.showFlag = true;
            }

          })
        })
      } else {
        this.data.tags.forEach((t: any) => {

          t['cntags'].forEach((t2: any) => {
            if (t2.name === tag) {
              t2.showFlag = !t2.showFlag;
            }

          })
        })
      }
      //是否点过
      //@ts-ignore
      if ((_that.data.checkedTags).includes(tag)) {
        checked = true;
      }

      if (checked) {
        if (clickFlag) {
          let tmp = _that.data.checkedTags;
          tmp = _that.data.checkedTags.filter(function (v, _, __) {
            return v !== tag;
          });

          _that.setData!({
            checkedTags: tmp
          });
        }
      } else {
        if (_that.data.checkedTags.length >= 6) {

          wx.showToast({
            title: "无法选择更多标签：最多6个。",
            icon: "none",
            duration: 2000
          })

          //alert("无法选择更多标签：最多6个。");
          return;
        } else {
          //@ts-ignore
          _that.data.checkedTags.push(tag);
          _that.setData!({
            checkedTags: _that.data.checkedTags
          });

        }
      }
      _that.setData!({ tags: _that.data.tags });

      //$(this).toggleClass("btn-primary btn-secondary");
      _that.calc();


    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () {
      this.init();
    },
    moved: function () { },
    detached: function () { },
  }
})