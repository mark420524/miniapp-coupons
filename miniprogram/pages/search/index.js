// miniprogram/pages/index/index.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        imageUrl:'',
        tabs: [],
        msg: {},
    },
    onLoad: function (options) {
      db.collection('goods_type')
          .where({status:1})
          .orderBy('sort', 'asc').get().then(res => {
            console.log(res)
          const tabs = res.data
          this.setData({ tabs })
      })

      
      
  },

    onSearch() {
      console.log('搜索s' + this.data.value);
    },
    onClick() {
      console.log('搜索c' + this.data.value);
    },
    onShow(){
    
      if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
    
          this.getTabBar().setData({
            active: 1
          })
        }
    }
    
})