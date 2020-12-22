// miniprogram/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 'home',
        list: [{
            pagePath: "/pages/index/index",
            iconPath: "home-o",
            name: "home",
            text: "优惠"
          }, {
            pagePath: "/pages/search/index",
            iconPath: "search",
            selectedIconPath: "search",
            text: "查找"
          }]
    },

    onChange(event) {
        this.setData({ active: event.detail });
      },
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      }
})