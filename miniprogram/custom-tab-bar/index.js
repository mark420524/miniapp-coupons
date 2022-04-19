// miniprogram/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        list: [
          {
            pagePath: "/pages/pddindex/index",
            iconPath: "coupon-o",
            selectedIconPath: "coupon-o",
            text: "购物"
          },
          {
            pagePath: "/pages/newsearch/search",
            iconPath: "search",
            selectedIconPath: "search",
            text: "查找"
          },
         {
            pagePath: "/pages/index/index",
            iconPath: "home-o",
            
            text: "优惠"
          }
        ]
    },

    onChange(event) {
        
        const detail = event.detail;
        this.setData({ active: detail });
        //console.log(detail)
        const url = this.data.list[detail].pagePath;
        //console.log(url);
        wx.switchTab({url})
        
    }
})