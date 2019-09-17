//app.js
App({
  // 测试地址url
  // testRemoteUrl: "http://127.0.0.1",
  testRemoteUrl: "http://590420ec.ngrok.io",
  // 测试地址端口
  // testRemotePort: "8080",
  testRemotePort: "80",
  // 地址 + 端口
  getTestUrl : function(){
    return (this.testRemoteUrl + ":" + this.testRemotePort);
  },
  // 测试完整地址
  getTestRemoteUrlWithPort : function(targetUrl){
    return this.getTestUrl() + targetUrl;
  },

  registerUrl: "/user/register",
  loginUrl: "/user/login",
  logoutUrl: "/user/logout",
  uploadFaceUrl: "/operation/uploadFace",
  userInfoUrl: "/operation/userInfo",
  publisherInfoUrl: "/operation/publisherInfo",
  bgmListUrl: "/bgm/bgmList",
  uploadVideoUrl: "/video/uploadVideo",
  uploadVideoCoverUrl: "/video/uploadVideoCover",
  getAllVideoByPageUrl: "/video/showVideo",
  getVideoByHotTipsUrl: "/video/showVideoByHotTips",
  hotWordsUrl: "/video/hotWords",
  likeVideoUrl: "/video/likeVideo",
  unlikeVideoUrl: "/video/unlikeVideo",
  isLikeVideoUrl: "/video/isLikeVideo",
  
  
  // 用户信息
  // userInfo: null,

  setGlobalUserInfo: function(userInfo){
    wx.setStorageSync("userInfo", userInfo);
  },
  getGlobalUserInfo: function(){
    return wx.getStorageSync("userInfo");
  },
  removeGlobalUserInfo: function(){
    wx.removeStorageSync("userInfo");
  },

  // 操作菜单值
  getWhatYouDoNow:[
    "举报",
    "下载",
    "分享给好友",
    "分享到朋友圈",
    "分享到QQ空间",
    "分享到微博"
  ]
})