// miniprogram/pages/index/index.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showOverlay:true,
        value: '',
        goodsList:[],
        imageUrl:'',
        activeTab: 0,
        tabs: [],
        msg: {},
        page:1,
        size:10,
        goods_type:0,
        bottomLoad:false
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
          this.setData({
            goods_type:type          
          })
          this.getGoods(type,0)
      })
    },
    
    getGoods(type,index){
      var that = this;
      var tabs = that.data.tabs;
      var currentTab = tabs[index]
      if (!currentTab['goodsList']) {
        currentTab['goodsList']=[]
      }
      
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
          var goodsList = currentTab['goodsList'];
          if (res.data){
            res.data.forEach(citem => {
              goodsList.push(citem)
            })
          }
          that.setData({tabs:tabs,showOverlay:false,goodsList:goodsList})
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
      this.setData({ activeTab: parseInt(index),showOverlay:true,page: 1 })
      var tabs = this.data.tabs;
      var currentTab = tabs[index]
      if (!currentTab['goodsList']) {
        currentTab['goodsList']=[]
      }
      
      const type = tabs[index]['_id']
      this.getGoods(type, index)
      //console.log(type)
      this.setData({goods_type:type,goodsList:currentTab['goodsList']})
  },
    onShow(){
    
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          
        this.getTabBar().setData({
          active: 1
        })
      }
    },
    onPullDownRefresh: function() {
      console.log('pulldown')
    },
    onReachBottom: function() {
      this.setData({bottomLoad:true})
      this.data.page++;
      this.getGoods(this.data.goods_type, this.data.activeTab)
      console.log('bottom')
      
    }
    
})