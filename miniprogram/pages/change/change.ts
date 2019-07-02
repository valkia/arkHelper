// pages/change/change.js
var app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    server: null,
    serverIndex: null,
    serverList: ['官服', 'B服', '其他'],
    clueList: {
      "need": [{ name: "1", showFlag: false }, { name: "2", showFlag: false }, { name: "3", showFlag: false }, { name: "4", showFlag: false }, { name: "5", showFlag: false }, { name: "6", showFlag: false }, { name: "7", showFlag: false }],
      "have": [{ name: "1", showFlag: false }, { name: "2", showFlag: false }, { name: "3", showFlag: false }, { name: "4", showFlag: false }, { name: "5", showFlag: false }, { name: "6", showFlag: false }, { name: "7", showFlag: false }]
    },
    
  },


  methods: {

    PickerChange(e: any) {

      console.log(e);
      let tmp = this.data.serverList[e.detail.value];
      this.setData!({
        serverIndex: e.detail.value,
        server: tmp
      })
    },
    clickClue(e: any) {
      console.log(e);
      let type = e.target.dataset.type;
      let clue = e.target.dataset.title;

      let clueTmp = this.data.clueList[type][clue];
      clueTmp.showFlag = !clueTmp.showFlag;
      let clueString = "clueList['" + type + "'][" + clue + "]";
      this.setData!({
        clueList: this.data.clueList
      });
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () {
    },
    moved: function () { },
    detached: function () { },
  }
})