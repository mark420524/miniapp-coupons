//index.js

//获取应用实例
const app = getApp()
const apis = app.apis;


Page({
  onShareAppMessage: function() {
    return {
      title: "券多省钱通",
      path: "/pages/pddindex/index",
    }
  },
  data: { 
    s_category_oid: 8569,
    categorys: [
      {
        text: "精选",
        oid: 8569,
      },
      {
        text: "百货",
        oid: 15,
      },
      {
        text: "母婴",
        oid: 4,
      },
      {
        text: "食品",
        oid: 1,
      },
      {
        text: "女装",
        oid: 14,
      },
      {
        text: "电器",
        oid: 18,
      },
      {
        text: "鞋包",
        oid: 1281,
      },
      {
        text: "内衣",
        oid: 1282,
      },
      {
        text: "美妆",
        oid: 16,
      },
      {
        text: "男装",
        oid: 743,
      },
      {
        text: "水果",
        oid: 13,
      },
      {
        text: "家纺",
        oid: 818,
      },
      {
        text: "文具",
        oid: 2478,
      },
      {
        text: "运动",
        oid: 1451,
      },
      {
        text: "汽车",
        oid: 2048,
      },
      {
        text: "家装",
        oid: 1917,
      },
      {
        text: "家具",
        oid: 2974,
      },
      {
        text: "医药",
        oid: 3279,
      },
    ],
    productions: [],
    list_id: "",
    request_id: "",
    search_id: "",
    total_count: 0,
    // 排序方式:0-综合排序;3-按价格升序;4-按价格降序;6-按销量降序;12-按照加入多多进宝时间降序;;8-优惠券金额排序降序
    sort_type: 0,
    page: 1,
  },
  
  gotoStype: function(event) {
    //console.log(event);
    wx.navigateTo({
      url: '/pages/stype/stype?type=' + event.currentTarget.dataset.type + "&title=" + event.currentTarget.dataset.title + "&banner=" + event.currentTarget.dataset.banner,
    });
  },
  onPullDownRefresh: function() {
    this.reloadData();
  },
  onReachBottom: function() {
    this.loadNext();
  },
  reloadData() {
    wx.showLoading({
      title: '加载中...',
    })
    this.data.page = 1;
    let data = {
      sortType: this.data.sort_type,
      optId: this.data.s_category_oid,
      page:this.data.page
    }
    
    apis.pddSearchGoods(data)
    .then(res => {
      if (res && res.goods_search_response.goods_list) {
        const list = res.goods_search_response.goods_list;
        this.setData({
          productions: list,
          list_id:  res.goods_search_response.list_id,
          request_id:  res.goods_search_response.request_id,
          search_id:  res.goods_search_response.search_id,
          total_count:  res.goods_search_response.total_count,
        });
      }
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }).catch(err => {
      wx.stopPullDownRefresh();
      wx.hideLoading();
    });
  },
  loadNext() {
    wx.showLoading({
      title: '加载中...',
    })
    let data= {
      sortType: this.data.sort_type,
      optId: this.data.s_category_oid,
      page: this.data.page + 1,
      listId: this.data.list_id,
    }
    apis.pddSearchGoods(data).then(res => {
      wx.hideLoading();
      if (res && res.goods_search_response.goods_list) {
        const list = res.goods_search_response.goods_list;
        this.setData({
          productions: this.data.productions.concat(list),
          list_id:  res.goods_search_response.list_id,
          request_id:  res.goods_search_response.request_id,
          search_id:  res.goods_search_response.search_id,
          total_count:  res.goods_search_response.total_count,
          page: this.data.page + 1
        });
      }
    }).catch(err => {
      wx.hideLoading();
    });
  },
  changeCategoryId: function(event) {
    if (event && event.target && event.target.dataset) {
      if (event.target.dataset.oid) {
        if (this.data.s_category_oid !== event.target.dataset.oid) {
          this.setData({
            s_category_oid: event.target.dataset.oid
          });
          this.reloadData();
        }
      }
    }
  },
  changeSortType: function(event) {
    let isChange = false;
    if (event && event.target && event.target.dataset) {
      if (event.target.dataset.type) {
        switch(event.target.dataset.type) {
          case "zh":
            if (this.data.sort_type !== 0) {
              this.setData({
                sort_type: 0
              });
              isChange = true;
            }
            break;
          case "yhq":
            if (this.data.sort_type !== 8) {
              this.setData({
                sort_type: 8
              });
              isChange = true;
            }
            break;
          case "xl":
            if (this.data.sort_type !== 6) {
              this.setData({
                sort_type: 6
              });
              isChange = true;
            }
            break;
          case "jg":
            if (this.data.sort_type !== 3 && this.data.sort_type !== 4) {
              this.setData({
                sort_type: 3
              });
              isChange = true;
            } else {
              this.setData({
                sort_type: this.data.sort_type === 3 ? 4 : 3
              });
              isChange = true;
            }
            break;
          default:
            break;
        }
        if (isChange) {
          this.reloadData();
        }
      }
    }
  },
  onLoad: function () {
    this.reloadData();
  },
  onShow(){ 
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          
        this.getTabBar().setData({
          active: 0,
        })
      }
  }
})
