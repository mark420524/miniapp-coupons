// miniprogram/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        imageUrl:''
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