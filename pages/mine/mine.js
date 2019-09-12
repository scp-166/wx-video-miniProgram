var myUtils = require("../../utils/myUtils.js");
var videoUtils = require("../../utils/videoUtils.js");

const app = getApp()

Page({
  data: {
    faceUrl: "../resource/images/noneface.png",
    nickname: "",
    fansCounts: 0,
    followCounts: 0,
    receiveLikeCounts: 0
  },

/**
 * 先加载用户信息
 */
  onLoad: function(ret){
    let that = this;

    let userInfo = app.getGlobalUserInfo();
    console.log(userInfo);
    if(userInfo == null){
      myUtils.showNoneToast("请先登录!");
      setTimeout(function(){
        wx.redirectTo({
          url: '../userLogin/login',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        });
      }, 1000)
      return;
    }
    // 获取数据
    wx.request({
      url: app.getTestRemoteUrlWithPort(app.userInfoUrl) + "?userId=" + userInfo.id,
      method: "GET",
      success: function(ret){
        if(ret.data.status == 200){
          myUtils.showSuccessToast("获取信息成功");
          let data = ret.data.data;
          let faceImage = "../resource/images/noneface.png";

          if(data.faceImage != null && data.faceImage != "" && data.faceImage != undefined)          {
            faceImage = app.getTestUrl() + data.faceImage;
          }

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
        console.log(err);
      }
    })
  },

  logout: function(){
    // 显示等待
    myUtils.showLoading("请等待");
    if(app.getGlobaluserInfo == null){
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
        "content-Type": "application/x-www-form-urlencoded" // 表单格式
      },
      success: function (e) {
        // 隐藏 loading
        myUtils.hideLoading();

        let status = e.data.status;

        if (status == 200) {
          myUtils.showSuccessToast("注销成功");
          // 清空用户信息
          wx.removeStorageSync("userInfo");
          wx.navigateTo({
            url: '../userLogin/login',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })

        } else {
          myUtils.showNoneToast(e.data.msg);
        }

      },

      fail: function (err) {
        // 隐藏 loading
        myUtils.hideLoading();

        console.log("失败");
        console.log(err);
      }
    })
  },

  changeFace: function(e){
    let that = this;
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
          success: function(ret){
            myUtils.hideLoading();
            // 和 wx.request 不同，wx.uploadFile 的 ret.data 是 String 而不是 Object
            
            let data = JSON.parse(ret.data);
            console.log(data);
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
