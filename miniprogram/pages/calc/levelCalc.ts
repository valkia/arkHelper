// pages/change/list/list.js
var app = getApp()
//@ts-ignore
import ArkResp = require('../../model/ArkResp.js');
//@ts-ignore
import MaterialItemData = require('../../model/materialitemdata.js');
//@ts-ignore
import MaterialInfo = require('../../model/materialinfo.js');
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    material: { "30135": { "id": "30135", "name": "D32钢", "rarity": 5, "source": {}, "madeof": { "三水锰矿": 1, "五水研磨石": 1, "RMA70-24": 1 }, "icon": "MTL_SL_DS", "sort": 23 }, "30125": { "id": "30125", "name": "双极纳米片", "rarity": 5, "source": {}, "madeof": { "改量装置": 1, "白马醇": 2 }, "icon": "MTL_SL_BN", "sort": 24 }, "30115": { "id": "30115", "name": "聚合剂", "rarity": 5, "source": {}, "madeof": { "提纯源岩": 1, "异铁块": 1, "酮阵列": 1 }, "icon": "MTL_SL_PP", "sort": 25 }, "30104": { "id": "30104", "name": "RMA70-24", "rarity": 4, "source": { "4-9": "罕见" }, "madeof": { "RMA70-12": 1, "固源岩组": 2, "酮凝集组": 1 }, "icon": "MTL_SL_RMA7024", "sort": 32 }, "30094": { "id": "30094", "name": "五水研磨石", "rarity": 4, "source": { "4-8": "罕见" }, "madeof": { "研磨石": 1, "异铁组": 1, "全新装置": 1 }, "icon": "MTL_SL_PG2", "sort": 30 }, "30084": { "id": "30084", "name": "三水锰矿", "rarity": 4, "source": { "4-7": "罕见" }, "madeof": { "轻锰矿": 2, "聚酸酯组": 1, "扭转醇": 1 }, "icon": "MTL_SL_MANGANESE2", "sort": 28 }, "30074": { "id": "30074", "name": "白马醇", "rarity": 4, "source": { "4-4": "罕见" }, "madeof": { "扭转醇": 1, "糖组": 1, "RMA70-12": 1 }, "icon": "MTL_SL_ALCOHOL2", "sort": 26 }, "30064": { "id": "30064", "name": "改量装置", "rarity": 4, "source": { "4-10": "罕见" }, "madeof": { "全新装置": 1, "固源岩组": 2, "研磨石": 1 }, "icon": "MTL_SL_BOSS4", "sort": 38 }, "30054": { "id": "30054", "name": "酮阵列", "rarity": 4, "source": { "4-5": "罕见" }, "madeof": { "酮凝集组": 2, "糖组": 1, "轻锰矿": 1 }, "icon": "MTL_SL_KETONE4", "sort": 54 }, "30044": { "id": "30044", "name": "异铁块", "rarity": 4, "source": { "S4-1": "罕见", "5-5": "罕见" }, "madeof": { "异铁组": 2, "全新装置": 1, "聚酸酯组": 1 }, "icon": "MTL_SL_IRON4", "sort": 50 }, "30034": { "id": "30034", "name": "聚酸酯块", "rarity": 4, "source": { "3-8": "罕见" }, "madeof": { "聚酸酯组": 2, "酮凝集组": 1, "扭转醇": 1 }, "icon": "MTL_SL_RUSH4", "sort": 42 }, "30024": { "id": "30024", "name": "糖聚块", "rarity": 4, "source": { "4-2": "罕见", "5-2": "罕见" }, "madeof": { "糖组": 2, "异铁组": 1, "轻锰矿": 1 }, "icon": "MTL_SL_STRG4", "sort": 46 }, "30014": { "id": "30014", "name": "提纯源岩", "rarity": 4, "source": { "4-6": "罕见" }, "madeof": { "固源岩组": 4 }, "icon": "MTL_SL_G4", "sort": 34 }, "30063": { "id": "30063", "name": "全新装置", "rarity": 3, "source": { "3-4": "小概率", "4-10": "小概率", "5-10": "小概率" }, "madeof": { "装置": 4 }, "icon": "MTL_SL_BOSS3", "sort": 39 }, "30053": { "id": "30053", "name": "酮凝集组", "rarity": 3, "source": { "3-1": "小概率", "4-5": "小概率", "5-8": "小概率" }, "madeof": { "酮凝集": 4 }, "icon": "MTL_SL_KETONE3", "sort": 55 }, "30043": { "id": "30043", "name": "异铁组", "rarity": 3, "source": { "2-8": "小概率", "S4-1": "小概率", "5-5": "小概率" }, "madeof": { "异铁": 4 }, "icon": "MTL_SL_IRON3", "sort": 51 }, "30033": { "id": "30033", "name": "聚酸酯组", "rarity": 3, "source": { "2-6": "小概率", "3-8": "小概率", "5-3": "中概率" }, "madeof": { "聚酸酯": 4 }, "icon": "MTL_SL_RUSH3", "sort": 43 }, "30023": { "id": "30023", "name": "糖组", "rarity": 3, "source": { "2-5": "小概率", "4-2": "小概率", "5-2": "小概率" }, "madeof": { "糖": 4 }, "icon": "MTL_SL_STRG3", "sort": 47 }, "30013": { "id": "30013", "name": "固源岩组", "rarity": 3, "source": { "2-4": "小概率", "4-6": "小概率", "5-1": "小概率" }, "madeof": { "固源岩": 5 }, "icon": "MTL_SL_G3", "sort": 35 }, "30062": { "id": "30062", "name": "装置", "rarity": 2, "source": { "1-12": "中概率", "S3-4": "大概率" }, "madeof": { "破损装置": 3 }, "icon": "MTL_SL_BOSS2", "sort": 40 }, "30052": { "id": "30052", "name": "酮凝集", "rarity": 2, "source": { "S2-1": "中概率", "3-7": "固定" }, "madeof": { "双酮": 3 }, "icon": "MTL_SL_KETONE2", "sort": 56 }, "30042": { "id": "30042", "name": "异铁", "rarity": 2, "source": { "2-1": "中概率", "S3-3": "固定" }, "madeof": { "异铁碎片": 3 }, "icon": "MTL_SL_IRON2", "sort": 52 }, "30032": { "id": "30032", "name": "聚酸酯", "rarity": 2, "source": { "1-8": "大概率", "S3-2": "固定" }, "madeof": { "酯原料": 3 }, "icon": "MTL_SL_RUSH2", "sort": 44 }, "30022": { "id": "30022", "name": "糖", "rarity": 2, "source": { "2-2": "大概率", "S3-1": "固定", "5-3": "中概率" }, "madeof": { "代糖": 3 }, "icon": "MTL_SL_STRG2", "sort": 48 }, "30012": { "id": "30012", "name": "固源岩", "rarity": 2, "source": { "1-7": "固定", "S2-12": "固定" }, "madeof": { "源岩": 3 }, "icon": "MTL_SL_G2", "sort": 36 }, "30061": { "id": "30061", "name": "破损装置", "rarity": 1, "source": { "1-5": "中概率", "2-3": "固定" }, "madeof": {}, "icon": "MTL_SL_BOSS1", "sort": 41 }, "30051": { "id": "30051", "name": "双酮", "rarity": 1, "source": { "1-6": "大概率", "S2-9": "固定" }, "madeof": {}, "icon": "MTL_SL_KETONE1", "sort": 57 }, "30041": { "id": "30041", "name": "异铁碎片", "rarity": 1, "source": { "1-3": "大概率", "S2-8": "固定" }, "madeof": {}, "icon": "MTL_SL_IRON1", "sort": 53 }, "30031": { "id": "30031", "name": "酯原料", "rarity": 1, "source": { "0-11": "固定", "S2-7": "固定" }, "madeof": {}, "icon": "MTL_SL_RUSH1", "sort": 45 }, "30021": { "id": "30021", "name": "代糖", "rarity": 1, "source": { "0-7": "固定", "S2-6": "固定" }, "madeof": {}, "icon": "MTL_SL_STRG1", "sort": 49 }, "30011": { "id": "30011", "name": "源岩", "rarity": 1, "source": { "0-9": "固定", "S2-5": "固定" }, "madeof": {}, "icon": "MTL_SL_G1", "sort": 37 }, "30073": { "id": "30073", "name": "扭转醇", "rarity": 3, "source": { "2-9": "小概率", "4-4": "小概率", "5-4": "小概率" }, "madeof": {}, "icon": "MTL_SL_ALCOHOL1", "sort": 27 }, "30093": { "id": "30093", "name": "研磨石", "rarity": 3, "source": { "3-3": "小概率", "4-8": "小概率", "5-7": "小概率" }, "madeof": {}, "icon": "MTL_SL_PG1", "sort": 31 }, "30083": { "id": "30083", "name": "轻锰矿", "rarity": 3, "source": { "3-2": "小概率", "4-7": "小概率", "5-6": "小概率" }, "madeof": {}, "icon": "MTL_SL_MANGANESE1", "sort": 29 }, "30103": { "id": "30103", "name": "RMA70-12", "rarity": 3, "source": { "2-10": "小概率", "4-9": "小概率", "5-9": "小概率" }, "madeof": {}, "icon": "MTL_SL_RMA7012", "sort": 33 }, "3301": { "id": "3301", "name": "技巧概要·卷1", "rarity": 3, "source": { "二三五日": "", "1-10": "固定" }, "madeof": {}, "icon": "MTL_SKILL1", "sort": 72 }, "3302": { "id": "3302", "name": "技巧概要·卷2", "rarity": 4, "source": { "二三五日": "" }, "madeof": { "技巧概要·卷1": 3 }, "icon": "MTL_SKILL2", "sort": 71 }, "3303": { "id": "3303", "name": "技巧概要·卷3", "rarity": 5, "source": { "二三五日": "" }, "madeof": { "技巧概要·卷2": 3 }, "icon": "MTL_SKILL3", "sort": 70 }, "32001": { "id": "32001", "name": "芯片助剂", "rarity": 4, "icon": "MTL_ASC_DI", "source": { "一四六日": "" }, "madeof": {}, "sort": 73 }, "3211": { "id": "3211", "name": "先锋芯片", "rarity": 3, "icon": "MTL_ASC_PIO1", "source": { "三四六日": "" }, "madeof": {}, "sort": 76 }, "3212": { "id": "3212", "name": "先锋芯片组", "rarity": 4, "icon": "MTL_ASC_PIO2", "source": { "三四六日": "" }, "madeof": {}, "sort": 75 }, "3213": { "id": "3213", "name": "先锋双芯片", "rarity": 5, "icon": "MTL_ASC_PIO3", "source": {}, "madeof": { "先锋芯片组": 2, "芯片助剂": 1 }, "sort": 74 }, "3221": { "id": "3221", "name": "近卫芯片", "rarity": 3, "icon": "MTL_ASC_GRD1", "source": { "二三六日": "" }, "madeof": {}, "sort": 79 }, "3222": { "id": "3222", "name": "近卫芯片组", "rarity": 4, "icon": "MTL_ASC_GRD2", "source": { "二三六日": "" }, "madeof": {}, "sort": 78 }, "3223": { "id": "3223", "name": "近卫双芯片", "rarity": 5, "icon": "MTL_ASC_GRD3", "source": {}, "madeof": { "近卫芯片组": 2, "芯片助剂": 1 }, "sort": 77 }, "3231": { "id": "3231", "name": "重装芯片", "rarity": 3, "icon": "MTL_ASC_TNK1", "source": { "一四五日": "" }, "madeof": {}, "sort": 82 }, "3232": { "id": "3232", "name": "重装芯片组", "rarity": 4, "icon": "MTL_ASC_TNK2", "source": { "一四五日": "" }, "madeof": {}, "sort": 81 }, "3233": { "id": "3233", "name": "重装双芯片", "rarity": 5, "icon": "MTL_ASC_TNK3", "source": {}, "madeof": { "重装芯片组": 2, "芯片助剂": 1 }, "sort": 80 }, "3241": { "id": "3241", "name": "狙击芯片", "rarity": 3, "icon": "MTL_ASC_SNP1", "source": { "一二五六": "" }, "madeof": {}, "sort": 85 }, "3242": { "id": "3242", "name": "狙击芯片组", "rarity": 4, "icon": "MTL_ASC_SNP2", "source": { "一二五六": "" }, "madeof": {}, "sort": 84 }, "3243": { "id": "3243", "name": "狙击双芯片", "rarity": 5, "icon": "MTL_ASC_SNP3", "source": {}, "madeof": { "狙击芯片组": 2, "芯片助剂": 1 }, "sort": 83 }, "3251": { "id": "3251", "name": "术师芯片", "rarity": 3, "icon": "MTL_ASC_CST1", "source": { "一二五六": "" }, "madeof": {}, "sort": 88 }, "3252": { "id": "3252", "name": "术师芯片组", "rarity": 4, "icon": "MTL_ASC_CST2", "source": { "一二五六": "" }, "madeof": {}, "sort": 87 }, "3253": { "id": "3253", "name": "术师双芯片", "rarity": 5, "icon": "MTL_ASC_CST3", "source": {}, "madeof": { "术师芯片组": 2, "芯片助剂": 1 }, "sort": 86 }, "3261": { "id": "3261", "name": "医疗芯片", "rarity": 3, "icon": "MTL_ASC_MED1", "source": { "一四五日": "" }, "madeof": {}, "sort": 91 }, "3262": { "id": "3262", "name": "医疗芯片组", "rarity": 4, "icon": "MTL_ASC_MED2", "source": { "一四五日": "" }, "madeof": {}, "sort": 90 }, "3263": { "id": "3263", "name": "医疗双芯片", "rarity": 5, "icon": "MTL_ASC_MED3", "source": {}, "madeof": { "医疗芯片组": 2, "芯片助剂": 1 }, "sort": 89 }, "3271": { "id": "3271", "name": "辅助芯片", "rarity": 3, "icon": "MTL_ASC_SUP1", "source": { "三四六日": "" }, "madeof": {}, "sort": 94 }, "3272": { "id": "3272", "name": "辅助芯片组", "rarity": 4, "icon": "MTL_ASC_SUP2", "source": { "三四六日": "" }, "madeof": {}, "sort": 93 }, "3273": { "id": "3273", "name": "辅助双芯片", "rarity": 5, "icon": "MTL_ASC_SUP3", "source": {}, "madeof": { "辅助芯片组": 2, "芯片助剂": 1 }, "sort": 92 }, "3281": { "id": "3281", "name": "特种芯片", "rarity": 3, "icon": "MTL_ASC_SPC1", "source": { "二三六日": "" }, "madeof": {}, "sort": 97 }, "3282": { "id": "3282", "name": "特种芯片组", "rarity": 4, "icon": "MTL_ASC_SPC2", "source": { "二三六日": "" }, "madeof": {}, "sort": 96 }, "3283": { "id": "3283", "name": "特种双芯片", "rarity": 5, "icon": "MTL_ASC_SPC3", "source": {}, "madeof": { "特种芯片组": 2, "芯片助剂": 1 }, "sort": 95 } },

    CustomBar: app.globalData.CustomBar,

    items: [MaterialInfo],
    mByLvl: [[""]],
    mIdx: {},// [""]: MaterialInfo 
    data: {},// [""]: MaterialItemData 
    planResult: {
      cost: 0,
      stages: [],
      syntheses: []
    },
    dialog: undefined,
    cost: 0,
    stagesText: [],
    synsText: [],
    options:{
      filtered:true,
      showOnly3plus:true,
      showMat:true,
      showBook:true,
      showChip: true
    }

  },



  methods: {

    calc() {
      const counts = {};
      for (const i of this.data.items) {
        const need = this.data.data[i.name].need;
        const have = this.data.data[i.name].have;
        const diff = need - have;
        counts[i.name] = {
          need,
          have_s: have,
          have,
          upper: 0,
          lack: diff > 0 ? diff : 0
        };
      }
      // 稀有度由高到低，生成所有合成路线
      for (let i = 4; i >= 0; i--) {
        for (let j = this.data.mByLvl[i].length-1 ; j >= 0; j--) {
          const m = this.data.mIdx[this.data.mByLvl[i][j]];
          console.log(i,j);
          console.log(m);
          if (m){

          
          const mm = m.madeof;
          for (const k in mm) {
            if (mm[k]) {
              counts[k].upper += mm[k] * counts[m.name].lack;
              const diff = counts[k].need + counts[k].upper - counts[k].have;
              counts[k].lack = diff > 0 ? diff : 0;
            }
          }
          }
        }
      }
      // 稀有度由低到高，检查现有材料是否能向上合成
      for (let i = 1; i < 5; i++) {
        for (let j = this.data.mByLvl[i].length - 1; j >= 0; j--) {
          const m = this.data.mIdx[this.data.mByLvl[i][j]];
          if (counts[m.name].lack === 0) {
            counts[m.name].canMerge = false;
            continue;
          }
          let maxCompose = Object.keys(m.madeof).length === 0 ? 0 : Number.MAX_SAFE_INTEGER;
          for (const k in m.madeof) {
            if (counts[k]) {
              const cm = counts[k];
              if (cm.have / m.madeof[k] < maxCompose) {
                maxCompose = cm.have / m.madeof[k];
              }
            }
          }
          maxCompose = Math.floor(maxCompose > counts[m.name].lack ? counts[m.name].lack : maxCompose);
          counts[m.name].canMerge = maxCompose > 0;
        }
      }
      const newData = {};
      for (const i of this.data.items) {
        const name = i.name;
        const newItemData = new MaterialItemData(name);
        newItemData.lack = counts[name].lack;
        newItemData.have = counts[name].have;
        newItemData.need = counts[name].need;
        newItemData.canMerge = counts[name].canMerge;
        newData[name] = newItemData;
      }
      this.setData!({data:newData});
      //this.fetchService.setLocalStorage('m-data', this.data);
    }

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    },
    ready: function () {


      const items = [];
      //this.data.mByLvl = [];
      //this.data.mIdx = {};
      for (let i = 0; i < 5; i++) {
        this.data.mByLvl.push([]);
      }
      const ldata = {};
      //const ldata = this.fetchService.getLocalStorage('m-data', {});
      //@ts-ignore
      console.log(this.data.material);
      for (let key in this.data.material) {
        if (this.data.material[key]) {
          const item = this.data.material[key];
          items.push(item);
          if (!(item.name in ldata)) { ldata[item.name] = new MaterialItemData(item.name); }
          this.data.mByLvl[this.data.material[key].rarity - 1].push(this.data.material[key].name);
          this.data.mIdx[this.data.material[key].name] = this.data.material[key];
        }
      }

      // this.data.data = ldata;
      let itemsTmp = items.sort((a, b) => {
        return a.sort > b.sort ? 1 : (a.sort < b.sort ? -1 : 0);
      });
      this.setData!({ data: ldata, items: itemsTmp });
      this.calc();

      //this.data.material.forEach((dataItem: MaterialItemData,key:string)=> {

      // if (this.data.data[k]) {
      //   const item = this.data.data[k];
      //   items.push(item);
      //   if (!(item.name in ldata)) { ldata[item.name] = new MaterialItemData(item.name); }
      //   this.data.mByLvl[this.data.data[k].rarity - 1].push(this.data.data[k].name);
      //   this.data.mIdx[this.data.data[k].name] = this.data.data[k];
      // }
      //})
      // this.data.data = ldata;
      // this.data.items = items.sort((a, b) => {
      //   return a.sort > b.sort ? 1 : (a.sort < b.sort ? -1 : 0);
      // });
      // this.calc();

    },
    moved: function () {
    },
    detached: function () {

    },

  },
  pageLifetimes: {
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show: function () {
    },
    hide: function () {
      console.log('Component-1 pageLifetimes >> Hide');
    }
  }
})