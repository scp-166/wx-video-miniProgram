// pages/videoInfo/videoInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 存储 video 组件
  theVideo: {},

  showSearch: function() {
    wx.navigateTo({
      url: '../searchVideo/searchVideo',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // 将 video 组件绑定到 theVideo 组件上
    that.theVideo = wx.createVideoContext("myVideo", that);
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