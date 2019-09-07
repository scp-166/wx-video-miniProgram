//app.js
App({
  // 测试地址url
  testRemoteUrl: "http://127.0.0.1",
  // 测试地址端口
  testRemotePort: "8080",
  // 测试完整地址
  getTestRemoteUrlWithPort : function(targetUrl){
    return this.testRemoteUrl + ":" + this.testRemotePort + targetUrl;
  },

  registerUrl: "/register",
  loginUrl: "/login",
  logoutUrl: "/logout",
  // 用户信息
  userInfo: null
})