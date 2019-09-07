var myUtils = require("../../utils/myUtils.js")

// 可以获得 app.js 中的内容
const app = getApp()

Page({
    data: {

    },

  doRegist: function(e){
    // form 表单提交的内容都在 value 中
    let value = e.detail.value;

    // 判断下 form 表单
    if( value.username.length == 0 || value.password.length == 0){
      myUtils.showNoneToast("用户名或者密码不能为空");
    } else {
      // 显示等待
      myUtils.showLoading("请等待");
      wx.request({
        url: app.getTestRemoteUrlWithPort(app.registerUrl),
        method: "POST",
        data: {
          "username": value.username,
          "password": value.password
        },
        header: {
          "content-Type": "application/json" // 这是默认的
        },
        success: function(e){
          // 隐藏 loading
          myUtils.hideLoading();

          let status = e.data.status;
          if(status == 200){
            myUtils.showSuccessToast("注册成功");
            // 保存后端返回的用户信息
            app.userInfo = e.data.data;
            console.log(app.userInfo);
          } else {
            myUtils.showNoneToast(e.data.msg);
          }
          
        },
      
        fail: function(err){
          // 隐藏 loading
          myUtils.hideLoading();

          console.log("失败");
          console.log(err);
        }
      })
    }
},

goLoginPage: function(){
  wx.navigateTo({
    url: '../userLogin/login',
  })
}
   
})