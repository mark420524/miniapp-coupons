import {
    http 
  } from 'http.js'
 
  var url = {
    
    getShareMsg: 'share/message',
    getCouponList:'coupons/list',
    pddSearchGoods:'pdd/goods/search'
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
    }
  }