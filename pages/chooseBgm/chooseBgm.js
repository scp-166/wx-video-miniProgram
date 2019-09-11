// pages/chooseBgm/chooseBgm.js
var myUtils = require("../../utils/myUtils.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayUrl: app.getTestUrl(),
    musicList:[],
    videoInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 将上个页面传来的 video 信息存储
    that.setData({
      videoInfo: options
    })

    myUtils.showLoading();

    wx.request({
      url: app.getTestRemoteUrlWithPort(app.bgmListUrl),
      method: "GET",
      success: function(ret){
        myUtils.hideLoading();

        if(ret.data.status == 200){
          let bgmList = ret.data.data;
          // 设置进去
          that.setData({
            musicList: bgmList
          })
        }
      },
      fail: function(err){
        myUtils.hideLoading();
        console.log(err);
      }
    })
  },

  /**
   * 上传视频
   */
  upload: function(e){
    let that = this;

    let audioId = e.detail.value.bgmId;
    let videoDesc = e.detail.value.inputContent;

    let videoSeconds = that.data.videoInfo.videoSeconds;
    let videoWidth = that.data.videoInfo.videoWidth;
    let videoHeight = that.data.videoInfo.videoHeight;
    let tempFilePath = that.data.videoInfo.tempFilePath;
    let thumbTempFilePath = that.data.videoInfo.thumbTempFilePath;

    myUtils.showLoading();
    // 发送图片
    wx.uploadFile({
      url: app.getTestRemoteUrlWithPort(app.uploadVideoUrl),
      method: "POST",
      filePath: tempFilePath,
      name: 'file', // 后端接受 file 的参数
      formData: {
        userId: app.userInfo.id,

        audioId: audioId,
        videoDesc: videoDesc,

        videoSeconds: videoSeconds,
        videoWidth: videoWidth,
        videoHeight: videoHeight

      },
      success: function(ret){
        let data = JSON.parse(ret.data);
        if(data.status == 200){
          /*
          // 手机端无法获取缩略图，服务端进行存储
          let videoId = data.data;
          // 上传视频缩略图
          wx.uploadFile({
            url: app.getTestRemoteUrlWithPort(app.uploadVideoCoverUrl),
            filePath: thumbTempFilePath,
            name: 'file',
            formData:{
              userId: app.userInfo.id,
              videoId: videoId
            },
            success: function(ret){
              myUtils.hideLoading();
              let data = JSON.parse(ret.data);
              if(data.status == 200){
                myUtils.showSuccessToast("上传视频成功")
                wx.navigateBack({
                  // 回退一次
                  delta: 1,
                })
              } else {
                myUtils.showNoneToast(data.msg);
              }
            }
          })
          */
          myUtils.showSuccessToast(data.msg);
          wx.navigateBack({
            delta: 1,
          })
        } else {
          myUtils.showNoneToast(data.msg);
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