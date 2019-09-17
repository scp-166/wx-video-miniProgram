var myUtils = require("../../utils/myUtils.js");
var videoUtils = require("../../utils/videoUtils.js");

const app = getApp()

Page({
  data: {
    faceUrl: "../resource/images/noneface.png",
    nickname: "",
    fansCounts: 0,
    followCounts: 0,
    receiveLikeCounts: 0,
    isMe: false,

    publisherInfo:{},

    returnPageNum: "0"
  },

/**
 * 先加载用户信息
 */
  onLoad: function(params){
    let that = this;

    let userInfo;
    let url;
    // 如果是从 videoInfo 页面点击发布者信息传递过来
    if (params != null && params.publisherInfo != null){
      userInfo = JSON.parse(params.publisherInfo);
      url = app.getTestRemoteUrlWithPort(app.publisherInfoUrl);
      
      let cacheUserInfo = app.getGlobalUserInfo();
      if(cacheUserInfo.id == userInfo.id){
        this.setData({
          isMe: true,
          publisherInfo: userInfo
        })
      } else {
        this.setData({
          isMe: false,
          publisherInfo: userInfo
        })
      }
      
    } else {
      // 正常是当前用户的信息
      userInfo = app.getGlobalUserInfo();
      url = app.getTestRemoteUrlWithPort(app.userInfoUrl);

      this.setData({
        isMe: true
      })

      if (userInfo == null) {
        myUtils.showNoneToastWithSuccessCallback("请先登录", function () {
          wx.navigateTo({
            url: '../userLogin/login',
          })
        })
        return;
      }
    }

    // 获取数据
    wx.request({
      url: url,
      data:{
        "userId": userInfo.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "userId": userInfo.id,
        "userToken": userInfo.uuidToken
      },
      method: "POST",
      success: function(ret){
        console.log(ret);
        if (ret.statusCode === 400) {
          myUtils.showNoneToastWithSuccessCallback(ret.data.msg, function () {
            wx.navigateTo({
              url: '../userLogin/login' + "?returnPageNum=" + "1",
            })
          })
          return;
        }
        if(ret.data.status == 200){
          myUtils.showSuccessToast("获取信息成功");
          let data = ret.data.data;
          let faceImage = "../resource/images/noneface.png";
          console.log(data);

          if(data.faceImage != null && data.faceImage != "" && data.faceImage != undefined)          {
            faceImage = app.getTestUrl() + data.faceImage;
          }
          // 準備加載數據
          that.setData({
            faceUrl: faceImage,
            nickname: data.nickname,
            fansCounts: data.fansCounts,
            followCounts: data.followCounts,
            receiveLikeCounts: data.receiveLikeCounts
          })
        }
      },
      fail: function(err){
        myUtils.showNoneToast("加载用户数据出现异常");
        console.log(err);
      }
    })
  },

  logout: function(){
    // 显示等待
    myUtils.showLoading("请等待");

    if (app.getGlobalUserInfo() == null){
      wx.navigateTo({
        url: '../userLogin/login',
      })
      return;
    }
    let userInfo = app.getGlobalUserInfo();

    wx.request({
      url: app.getTestRemoteUrlWithPort(app.logoutUrl),
      method: "POST",
      data: {
        "userId": userInfo.id
      },
      header: {
        "content-Type": "application/x-www-form-urlencoded", // 表单格式
      },
      success: function (e) {
        // 隐藏 loading
        myUtils.hideLoading();

        let status = e.data.status;

        if (status == 200) {
          myUtils.showSuccessToastWithSuccessCallback("注销成功", function(){
            // 清空用户信息
            app.removeGlobalUserInfo();
            // 跳转登录页面
            wx.navigateTo({
              url: '../userLogin/login',
            })
          });
          
        } else {
          myUtils.showNoneToast(e.data.msg);
        }
      },

      fail: function (err) {
        // 隐藏 loading
        myUtils.hideLoading();
        myUtils.showNoneToast("注销出现异常");
        console.log(err);
      }
    })
  },

  changeFace: function(e){
    let that = this;

    let userInfo = app.getGlobalUserInfo();

    // https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html
    wx.chooseImage({
      count: 1,
      // 图片尺寸 original:原图 compressed: 压缩
      sizeType: ["compressed"],
      success: function (res) {
        console.log(res.tempFilePaths);
        console.log(res.tempFiles);
        myUtils.showLoading();
        // https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html
        // 注意，成功后的回调函数 ret.data 是 String，而不是 Object
        wx.uploadFile({
          url: app.getTestRemoteUrlWithPort(app.uploadFaceUrl),
          filePath: res.tempFiles[0].path,
          // 对应后端文件参数名
          name: 'file',
          formData:{
            "userId": app.getGlobalUserInfo().id
          },
          header: {
            "userId": userInfo.id,
            "userToken": userInfo.uuidToken
          },
          success: function(ret){
            myUtils.hideLoading();
            // 和 wx.request 不同，wx.uploadFile 的 ret.data 是 String 而不是 Object
            let data = JSON.parse(ret.data);

            if (ret.statusCode === 400) {
              myUtils.showNoneToastWithSuccessCallback(data.msg, function(){
                wx.navigateTo({
                  url: '../userLogin/login',
                })
              })
              return;
            }
          
            if(data.status == 200){
              myUtils.showSuccessToast("上传成功");
            
              // 设置 头像 url
              that.setData({
                faceUrl: (app.getTestUrl() + data.data)
              })
            } else {
              myUtils.showNoneToast(ret.data.msg);
            }
          },
          fail: function(error){
            myUtils.showNoneToast("上传视频出现问题")
            console.log(error);
          }
        })
      }
    })
  },

  /**
   * 上传 视频
   */
  uploadVideo: function(){
    videoUtils.uploadVideo();
  }
})