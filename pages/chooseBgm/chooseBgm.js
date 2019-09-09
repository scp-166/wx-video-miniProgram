// pages/chooseBgm/chooseBgm.js
var myUtils = require("../../utils/myUtils.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayUrl: app.getTestUrl(),
    musicList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    myUtils.showLoading();

    wx.request({
      url: app.getTestRemoteUrlWithPort(app.bgmListUrl),
      method: "GET",
      success: function(ret){
        myUtils.hideLoading();

        if(ret.data.status == 200){
          let bgmList = ret.data.data;
          console.log(bgmList);
          // 设置进去
          that.setData({
            musicList: bgmList
          })
          console.log(that.data.musicList);
        }
      },
      fail: function(err){
        myUtils.hideLoading();
        console.log(err);
      }
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