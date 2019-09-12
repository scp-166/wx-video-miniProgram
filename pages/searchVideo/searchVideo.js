// pages/searchVideo/searchVideo.js
var WxSearch = require('../../utils/wxSearchView/wxSearchView.js');
var myUtils = require('../../utils/myUtils.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 2 搜索栏初始化
    var that = this;
    wx.request({
      url: app.getTestRemoteUrlWithPort(app.hotWordsUrl),
      method: "GET",
      success: function(ret){
        let hotWordList = ret.data.data;
        WxSearch.init(
          that,  // 本页面一个引用
          hotWordList, // 热点搜索推荐，[]表示不使用
          hotWordList,// 搜索匹配，[]表示不使用
          that.mySearchFunction, // 提供一个搜索回调函数
          that.myGobackFunction //提供一个返回回调函数
        );
      }
    })
  },

  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 4 搜索回调函数  
  mySearchFunction: function (value) {
    console.log("搜索");
    wx.redirectTo({
      url: '../../pages/index/index?searchContent=' + value
    })
  },

  // 5 返回回调函数
  // 点击 返回 触发(返回2字也可以修改)
  myGobackFunction: function () {
    // do your job here
    // 示例：返回
    console.log('返回');
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})