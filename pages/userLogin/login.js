var myUtils = require("../../utils/myUtils.js")

// 可以获得 app.js 中的内容
const app = getApp()

Page({
    data: {

    },

doLogin: function(e){
  // form 表单提交的内容都在 value 中
  console.log(e.detail.value);
  let value = e.detail.value;

  // 判断下 form 表单
  if( value.username.length == 0 || value.password.length == 0){
    myUtils.showNoneToast("用户名或者密码不能为空");
  } else {
    // 显示等待
    myUtils.showLoading("请等待");
    wx.request({
      url: app.getTestRemoteUrlWithPort(app.loginUrl),
      method: "POST",
      data: {
        "username": value.username,
        "password": value.password
      },
      header: {
        "content-Type": "application/json" // 这是默认的
      },
      success: function(e){
        console.log(e);
        // 隐藏 loading
        myUtils.hideLoading();

        let status = e.data.status;

        if(status == 200){
          myUtils.showSuccessToast("登录成功");
          // 保存后端返回的用户信息
          app.setGlobalUserInfo(e.data.data);
          // 跳转 个人信息页
          wx.navigateTo({
            url: '../mine/mine',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          myUtils.showNoneToast(e.data.msg);
        }
        
      },
    
      fail: function(err){
        // 隐藏 loading
        myUtils.hideLoading();
        myUtils.showNoneToast("登录出现问题")
        console.log(err);
      }
    })
  }
},

goRegistPage: function(){
  wx.navigateTo({
    url: '../userRegist/regist',
  })
}
   
})