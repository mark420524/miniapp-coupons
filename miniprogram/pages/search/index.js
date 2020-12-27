// miniprogram/pages/index/index.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        imageUrl:'',
        activeTab: 0,
        tabs: [],
        msg: {},
        page:1,
        size:10,
        goods_type:0
    },
    onLoad: function (options) {
      db.collection('goods_type')
          .where({status:1})
          .orderBy('sort', 'asc').get().then(res => {
            console.log(res)
          const tabs = res.data
          this.setData({ tabs })
          const type = this.data.tabs[0]['_id']
          //
          this.setData({goods_type:type})
          this.getGoods(type,0)
      })
    },
    
    getGoods(type,index){
      var that = this;
      var tabs = that.data.tabs;
      var currentTab = tabs[index]
      currentTab['goodsList']=[]
      wx.request({
        url: 'http://127.0.0.1:10324/goods', 
        data: {
          page: this.data.page,
          size: this.data.size,
          type:type
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        success (res) {
          console.log(res.data)
          currentTab['goodsList']=res.data;
          that.setData({tabs:tabs})
        }
      })
    },
    onSearch() {
      console.log('搜索s' + this.data.value);
    },
    onClick() {
      console.log('搜索c' + this.data.value);
    },
    copyLink(e) {
      
      const dataset = e.target.dataset;
      const url = dataset.url;
      console.log(url)
      wx.setClipboardData({
        data: url,
        success (res) {
          
        }
      })
    },
    onChange(e) {
      
      
      const index = e.detail.index
      this.setData({ activeTab: parseInt(index) })
      const type = this.data.tabs[index]['_id']
      //this.getGoods(type)
      console.log(type)
      this.setData({goods_type:type})
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