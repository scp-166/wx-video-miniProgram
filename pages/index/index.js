// pages/index/index.js
var myUtils = require("../../utils/myUtils.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: 300,

    currentPage: 1,
    totalPages: 1,

    serverUrl: app.getTestUrl(),
    videoList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let screenWidth = wx.getSystemInfoSync().screenWidth;
    console.log(screenWidth);
    that.setData({
      screenWidth: screenWidth
    })

    that.getVideoListByPage();

  },

  getVideoListByPage: function(){
    let that = this;
    myUtils.showLoading();
    wx.request({
      url: app.getTestRemoteUrlWithPort(app.getAllVideoByPage) + "?pageNum=" + that.data.currentPage,
      method: "POST",
      success: function (ret) {
        myUtils.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();

        console.log(ret.data);

        // 清空所有数据，避免后续上拉下拉出现问题
        if (that.data.currentPage === 1) {
          that.setData({
            videoList: []
          })
        }
        let oldVideoList = that.data.videoList;
        let newVideoList = ret.data.data.rows;
        // 设置初始化的分页
        that.setData({
          // 拼接新老 videoList
          videoList: oldVideoList.concat(newVideoList),
          currentPage: ret.data.data.currentPage,
          totalPages: ret.data.data.totalPages
        })
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
    let that = this;
    wx.showNavigationBarLoading();

    // 判断是否还能加载
    if (this.data.currentPage === this.data.totalPages) {
      myUtils.showNoneToast("没有更多的视频啦");
      return;
    }

    // 初始化首页
    this.data.currentPage = 1;

    that.getVideoListByPage();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;

    // 判断是否还能加载
    if(this.data.currentPage === this.data.totalPages){
      myUtils.showNoneToast("没有更多的视频啦");
      return;
    }

    this.data.currentPage++;

    that.getVideoListByPage();
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})