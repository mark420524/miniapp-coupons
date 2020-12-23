// miniprogram/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        list: [{
            pagePath: "/pages/index/index",
            iconPath: "home-o",
            
            text: "优惠"
          }, {
            pagePath: "/pages/search/index",
            iconPath: "search",
            selectedIconPath: "search",
            text: "查找"
          }]
    },

    onChange(event) {
        
        const detail = event.detail;
        this.setData({ active: detail });
        console.log(detail)
        const url = this.data.list[detail].pagePath;
        console.log(url);
        wx.switchTab({url})
        
    }
})