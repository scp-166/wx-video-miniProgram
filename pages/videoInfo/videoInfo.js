// pages/videoInfo/videoInfo.js
var videoUtils = require("../../utils/videoUtils.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认是支持竖向视频
    mode: "cover",
    videoItem: {},
    serverUrl: app.getTestUrl(),
    src:""
  },

  uploadVideo: function(){
    videoUtils.uploadVideo();
  },

  // 存储 video 组件
  theVideo: {},

  /**
   * 跳转查询
   */
  showSearch: function() {
    wx.navigateTo({
      url: '../searchVideo/searchVideo',
    })
  },

  /**
   * 跳转首页
   */
  showIndex: function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // 将 video 组件绑定到 theVideo 组件上
    that.theVideo = wx.createVideoContext("myVideo", that);

    let videoItem = JSON.parse(options.videoItem);
    let mode = "cover";
    let videoWidth = videoItem.videoWidth;
    let videoHeight = videoItem.videoHeight;
    // 如果是横线视频，则objectFit为 contain
    if(videoWidth > videoHeight){
      mode = "contain";
    }

    that.setData({
      videoItem: videoItem,
      src: videoItem.videoPath,
      mode: mode
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    that.theVideo.play();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let that = this;
    that.theVideo.pause();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})