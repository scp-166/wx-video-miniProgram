// pages/videoInfo/videoInfo.js
var videoUtils = require("../../utils/videoUtils.js");
var myUtils = require("../../utils/myUtils.js");
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
    src:"",

    // 标识当前用户是否喜欢该视频
    likeVideoFlag: false,
    // 发布者信息
    publisherInfo: ""
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
   * 跳转个人信息页
   */
  showMe: function(){
    wx.navigateTo({
      url: '../mine/mine',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // 将 video 组件绑定到 theVideo 组件上
    that.theVideo = wx.createVideoContext("myVideo", that);

    // 将首页传过来的视频信息进行保存
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

    // 查询当前用户是否点赞过该视频
    let userInfo = app.getGlobalUserInfo();
      // 未登录则说明肯定未点赞
    if(userInfo == null || userInfo == "" || userInfo == undefined){
      that.setData({
        likeVideoFlag: false
      })
    } else{
      wx.request({
        url: app.getTestRemoteUrlWithPort(app.isLikeVideoUrl),
        method: "POST",
        data: {
          userId: userInfo.id,
          videoId: that.data.videoItem.id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "userId": userInfo,
          "userToken": userInfo.uuidToken
        },
        success: function(ret){
          if(ret.data.msg === "no"){
            that.setData({
              likeVideoFlag: false
            })
          } else {
            that.setData({
              likeVideoFlag: true
            })
          }
        },
        fail: function(err){
          console.log(err);
        }
      })
    }
    console.log(videoItem);
    // 查询发布者信息
    wx.request({
      url: app.getTestRemoteUrlWithPort(app.publisherInfoUrl),
      method: "POST",
      data: {
        "userId": videoItem.userId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(ret){
        that.setData({
          publisherInfo: ret.data.data
        })
      },
      fail: function(err){
        console.log(err);
      }
    })
  },

  /**
   * 点赞视频按钮
   */
  likeVideoOrNot: function(){
    let that = this;
    let userInfo = app.getGlobalUserInfo();
    if(userInfo == null || userInfo == ""){
      wx.navigateTo({
        url: '../userLogin/login',
      })
    }
    let url;
    if(that.data.likeVideoFlag){
      url = app.getTestRemoteUrlWithPort(app.unlikeVideoUrl);
    } else {
      url = app.getTestRemoteUrlWithPort(app.likeVideoUrl);
    }

    wx.request({
      url: url,
      method: "POST",
      data:{
        userId: userInfo.id,
        videoId: that.data.videoItem.id,
        videoAuthorId: that.data.videoItem.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "userId": userInfo.id,
        "userToken": userInfo.uuidToken
      },

      success: function(ret){
        if(ret.statusCode === 400){
          myUtils.showNoneToastWithSuccessCallback("请登录", function(){
            wx.navigateTo({
              url: '../userLogin/login',
            })
          });
          return;
        }
        that.setData({
          likeVideoFlag: !that.data.likeVideoFlag
        })
        if(that.data.likeVideoFlag){
          myUtils.showSuccessToast("点赞成功");
        } else {
          myUtils.showSuccessToast("取消点赞成功");
        }
      }, 

      fail: function(err){
        myUtils.showNoneToast("点赞出现异常");
        console.log(err);
      }
    })
    
  },

  /**
   * 显示发布者信息
   */
  showPublisherInfo: function(){
    let that = this;
    wx.navigateTo({
      url: '../mine/mine' + "?publisherInfo=" + JSON.stringify(that.data.publisherInfo),
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