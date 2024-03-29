// pages/stype/stype.js

//获取应用实例
const app = getApp()
const apis = app.apis;
Page({
  data: {
    banner: null,
    type: 1,
    productions: [],
    list_id: "",
    request_id: "",
    search_id: "",
    total_count: 0,
    // 排序方式:0-综合排序;3-按价格升序;4-按价格降序;6-按销量降序;12-按照加入多多进宝时间降序;;8-优惠券金额排序降序
    offset: 0,
    limit: 10,
  },
  onPullDownRefresh: function() {
    this.reloadData();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },
  onReachBottom: function() {
    this.loadNext();
  },
  reloadData() {
    wx.showLoading({
      title: '加载中...',
    })
    this.data.offset = 0;
    let data =  { 
      limit: this.data.limit,
      offset: this.data.offset,
      channelType: this.data.type,
    }
    let that = this;
    apis.pddGoodsStype(data)
   .then(res => {
      if (res   && res.goods_basic_detail_response.list) {
        const list = res.goods_basic_detail_response.list;
        that.setData({
          productions: list,
          list_id:  res.goods_basic_detail_response.list_id,
          request_id:  res.goods_basic_detail_response.request_id,
          search_id:  res.goods_basic_detail_response.search_id,
          total_count:  res.goods_basic_detail_response.total_count,
        });
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },
  loadNext() {
    wx.showLoading({
      title: '加载中...',
    });    
    let data= {
      limit: this.data.limit,
      offset: this.data.offset + this.data.limit,
      channelType: this.data.type,
    }
    let that = this;
    apis.pddGoodsStype(data)
    .then(res => {
      wx.hideLoading();
      if (res && res.goods_basic_detail_response.list) {
        const list = res.goods_basic_detail_response.list;
        that.setData({
          productions: that.data.productions.concat(list),
          list_id:  res.goods_basic_detail_response.list_id,
          request_id:  res.goods_basic_detail_response.request_id,
          search_id:  res.goods_basic_detail_response.search_id,
          total_count:  res.goods_basic_detail_response.total_count,
          offset: that.data.offset + that.data.limit,
        });
      }
    }) 
  },
  onLoad: function (option) {
    
    this.data.type = option.type;
    wx.setNavigationBarTitle({
      title: option.title,
    });
    if (option.banner) {
      
      this.setData({
        banner: option.banner.trim()
      });
    }
    this.reloadData();
  },
})
