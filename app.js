//app.js
App({
  // 测试地址url
  testRemoteUrl: "http://127.0.0.1",
  // 测试地址端口
  testRemotePort: "8080",
  // 地址 + 端口
  getTestUrl : function(){
    return (this.testRemoteUrl + ":" + this.testRemotePort);
  },
  // 测试完整地址
  getTestRemoteUrlWithPort : function(targetUrl){
    return this.getTestUrl() + targetUrl;
  },

  registerUrl: "/register",
  loginUrl: "/login",
  logoutUrl: "/logout",
  uploadFaceUrl: "/operation/uploadFace",
  userInfoUrl: "/operation/userInfo",
  bgmListUrl: "/bgm/bgmList",
  
  // 用户信息
  userInfo: null
})