import {
    http 
  } from 'http.js'
 
  var url = {
    
    getShareMsg: 'share/message',
    getCouponList:'coupons/list',
    pddSearchGoods:'pdd/goods/search',
    pddGoodsDetail:'pdd/goods/detail',
    pddGoodsGenerate:'pdd/goods/generate',
    pddGoodsStype:'pdd/goods/channel'
  }
  module.exports = {
    getShareMsg(data) { 
      return http({
        url: url.getShareMsg,
        data: data,
      })
    },
    getCouponList( ){
      return http({
        url:url.getCouponList,
        method:'GET'
      })
    },
    pddSearchGoods(data){
      return http({
        url:url.pddSearchGoods,
        data:data
      })
    },
    pddGoodsDetail(data){
      return http({
        url:url.pddGoodsDetail,
        data:data
      })
    },
    pddGoodsGenerate(data){
      return http({
        url:url.pddGoodsGenerate,
        data:data
      })
    },
    pddGoodsStype(data){
      return http({
        url:url.pddGoodsStype,
        data:data
      })
    }
  }