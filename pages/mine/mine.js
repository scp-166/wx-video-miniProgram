var myUtils = require("../../utils/myUtils.js");

const app = getApp()

Page({
  data: {
    faceUrl: "../resource/images/noneface.png",
   
  },

  logout: function(){
    // 显示等待
    myUtils.showLoading("请等待");
    if(app.userInfo == null){
      wx.navigateTo({
        url: '../userLogin/login',
      })
      return;
    }
    console.log(app.userInfo);

    wx.request({
      url: app.getTestRemoteUrlWithPort(app.logoutUrl),
      method: "POST",
      data: {
        "userId": app.userInfo.id
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
          app.userInfo = null;
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
  }

})
