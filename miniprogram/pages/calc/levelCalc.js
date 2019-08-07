// pages/calc/levelCalc.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
     penguinURL : 'https://penguin-stats.io/PenguinStats/api/result/matrix?show_stage_details=true&show_item_details=true',
     synthesisTable : {
      le3: {},
      gt3: {}
    },
     materialConstraints: {},
    dropTable: {},
     pSettingInit : {
      elites: [false, false],
      skills: {
        normal: [false, 1, 7],
        elite: [
          [false, 7, 10],
          [false, 7, 10],
          [false, 7, 10]
        ]
      },
      state: 'add'
    },
 lastShowMaterials: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
