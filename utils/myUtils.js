function showNoneToast(title) {
  showNoneToastWithTime(title, 2000)
}

function showNoneToastWithTime(title, time){
  wx.showToast({
    // 显示内容
    title: title,
    // 显示图标，选填
    icon: "none",
    // 显示时间 ms
    duration: time
  })
}

module.exports.showNoneToast = showNoneToast;
module.exports.showNoneToastWithTime = showNoneToastWithTime;
