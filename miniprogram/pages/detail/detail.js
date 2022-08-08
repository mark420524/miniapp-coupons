// pages/detail/detail.js
const app = getApp();
const apis=app.apis;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: [],
    search_id: "",
    detail: null,
    goods_sign : "",
    goods_sign_list : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goods_id =  options["gid"];
    this.data.search_id = options["search_id"];
    let goods_sign = options["goods_sign"]
    this.data.goods_sign = goods_sign
    let goods_sign_list = new Array();
    goods_sign_list[0]=goods_sign;
    this.setData({
      goods_id: options["gid"],
      search_id: options["search_id"],
      goods_sign: goods_sign,
      goods_sign_list : goods_sign_list
    });
    this.reloadData();
  },
  formatDate(datetime) {
    var date = new Date(datetime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear(),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        sdate = ("0" + date.getDate()).slice(-2);
    var result = year + "-"+ month +"-"+ sdate;
    return result;
  },
  reloadData() {
    wx.showLoading({
      title: '加载中...',
    });
    let data = {
      goodsSign: this.data.goods_sign,
      searchId: this.data.search_id,
    }
    let that = this;
    apis.pddGoodsDetail(data)
    .then(res => {
      if (res &&  res.goods_detail_response.goods_details) {
        const list = res.goods_detail_response.goods_details;
        if (list && list.length > 0) {
          list[0].coupon_start_time_format = this.formatDate(list[0].coupon_start_time * 1000);
          list[0].coupon_end_time_format = this.formatDate(list[0].coupon_end_time * 1000);
          that.setData({
            detail: list[0],
          });
        }
      }
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }).catch(err => {
      wx.stopPullDownRefresh();
      wx.hideLoading();
    });
  },
  onPullDownRefresh: function() {
    this.reloadData();
  },
  onShareAppMessage: function(e) {
    let path = '/pages/detail/detail?goods_sign=' + this.data.goods_sign + '&search_id=' + this.data.search_id;
    return {
      title: "这里有好多拼多多券可以领取哦~",
      path: path,
　　　imageUrl: this.data.detail.goods_thumbnail_url,
    };
  },
  buy() {
    wx.showLoading({
      title: '处理中...',
    });
    let data=  {
      goodsSign: this.data.goods_sign,
      searchId: this.data.search_id,
    }
    apis.pddGoodsGenerate(data)
    .then(res => {
      wx.hideLoading();
      if (res && res.goods_promotion_url_generate_response.goods_promotion_url_list) {
        const list = res.goods_promotion_url_generate_response.goods_promotion_url_list;
        if (list.length > 0) {
          const r = list[0];
          if (r.we_app_info) {
            wx.navigateToMiniProgram({
              appId: r.we_app_info.app_id,
              path: r.we_app_info.page_path,
            });
          }
        }
      }
    }).catch(err => {
      wx.hideLoading();
    });
  },
  gohome() {
    wx.switchTab({
      url: '/pages/pddindex/index',
    });
  }
})