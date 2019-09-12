function uploadVideo() {
  let that = this;

  // 选择视频，tx会自动存储该文件
  // https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseVideo.html
  wx.chooseVideo({
    sourceType: ["album"],
    maxDuration: 10,
    success: function(ret) {
      console.log(ret);
      let duration = ret.duration;

      if (duration > 11) {
        myUtils.showNoneToast("视频不能大于10s");
      } else if (duration < 1) {
        myUtils.showNoneToast("视频不能小于1s");
      } else {
        let height = ret.height;
        let width = ret.width;
        let size = ret.size;
        let tempFilePath = ret.tempFilePath;
        let thumbTempFilePath = ret.thumbTempFilePath;
        // 切换到 选择 音乐上传 页面
        wx.navigateTo({
          url: '/pages/chooseBgm/chooseBgm' + "?videoSeconds=" + duration +
            "&videoWidth=" + width +
            "&videoHeight=" + height +
            "&tempFilePath=" + tempFilePath +
            "&thumbTempFilePath=" + thumbTempFilePath
        })
      }
    },
    fail: function(err) {
      console.log(err);
    }
  })
}

module.exports.uploadVideo =  uploadVideo;