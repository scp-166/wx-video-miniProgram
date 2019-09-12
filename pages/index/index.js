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
    videoList: [],

    // 查询内容
    searchContent: "",
    // 查询接口切换标识
    useSeachFlag: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获得手机宽度
    let screenWidth = wx.getSystemInfoSync().screenWidth;
    
    that.setData({
      screenWidth: screenWidth
    })

    // 搜索栏进来的话则全部变量初始化
    if(options.searchContent != null){
      that.setData({
        currentPage: 1,
        totalPages: 1,
        searchContent: options.searchContent,
        useSeachFlag: true,
        videoList: []
      })
    }

    if (!that.data.useSeachFlag){
      that.getVideoListByPage();
    } else {
      that.getVideoListBySearch();
    }

    

  },

  /**
   * 视频描述模糊分页搜索
   */
  getVideoListBySearch: function(){
    let that = this;
    myUtils.showLoading();
    wx.request({
      url: app.getTestRemoteUrlWithPort(app.getVideoByHotTipsUrl) + "?pageNum=" + that.data.currentPage,
      data: {
        videoDesc: that.data.searchContent
      },
      method: "POST",
      success: function (ret) {
        myUtils.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();

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
 * 分页搜索
 */
  getVideoListByPage: function(){
    let that = this;
    myUtils.showLoading();
    wx.request({
      url: app.getTestRemoteUrlWithPort(app.getAllVideoByPageUrl) + "?pageNum=" + that.data.currentPage,
      method: "POST",
      success: function (ret) {
        myUtils.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    wx.showNavigationBarLoading();

    // 判断是否还能加载
    if (this.data.currentPage === this.data.totalPages) {
      wx.hideNavigationBarLoading();
      wx.onpull
      myUtils.showNoneToast("没有更多的视频啦");
      return;
    }

    // 初始化首页
    this.data.currentPage = 1;
    // this.data.currentPage++;

    if(!that.data.useSeachFlag){
      that.getVideoListByPage();
    } else {
      that.getVideoListBySearch();
    }
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
    if(!that.data.useSeachFlag){
      that.getVideoListByPage();
    } else {
      that.getVideoListBySearch();
    }
    
  },

  showVideoInfo: function(e){
    let that = this;
    let videoList = that.data.videoList;
    let index = e.target.dataset.arrindex;
    // 页面传参需要将 obj 转为 str
    let videoItem = JSON.stringify(videoList[index]);
    console.log(videoItem);
    wx.navigateTo({
      url: '../videoInfo/videoInfo' + "?videoItem=" + videoItem
    })
  }
})