// pages/change/new/new.js
var app = getApp()

Page({
  data: {
    id:"",
    server: null,
    serverIndex: null,
    serverList: ['官服', 'B服', '其他'],
    clueList: {
      "need": [{ name: "1", showFlag: false }, { name: "2", showFlag: false }, { name: "3", showFlag: false }, { name: "4", showFlag: false }, { name: "5", showFlag: false }, { name: "6", showFlag: false }, { name: "7", showFlag: false }],
      "have": [{ name: "1", showFlag: false }, { name: "2", showFlag: false }, { name: "3", showFlag: false }, { name: "4", showFlag: false }, { name: "5", showFlag: false }, { name: "6", showFlag: false }, { name: "7", showFlag: false }]
    },
remark:""
  },


  

    PickerChange(e: any) {

      console.log(e);
      let tmp = this.data.serverList[e.detail.value];
      this.setData!({
        serverIndex: e.detail.value,
        server: tmp
      })
    },

  InputChange: function (e: any){
    console.log(e.target.dataset.type);
    let type = e.target.dataset.type;
    this.setData!({
      type:e.detail.value
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
    },
    saveChange(){
      //判断空

      let req = { id: this.data.id,server: this.data.server, remark: this.data.remark, clueList: this.data.clueList}
      app.func.post('/postChange', req, function (response: any) {
        console.log(response);
      })
    }
  
})