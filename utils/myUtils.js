/**
 * 显示 无图标 toast
 */
function showNoneToast(title) {
  showToast(title, "none", 2000, null);
}

/**
 * 显示 无图标 toast，结束后执行回调
 */
function showNoneToastWithSuccessCallback(title, successCallBack) {
  showToast(title, "none", 2000, successCallBack)
}

/**
 * 显示 成功 toast
 */
function showSuccessToast(title){
  showToast(title, "success", 2000, null);
}

/**
 * 显示 成功 toast，结束后执行回调
 */
function showSuccessToastWithSuccessCallback(title, successCallBack) {
  showToast(title, "none", 2000, successCallBack)
}

function showToast(title, icon, time, successCallBack){
  wx.showToast({
    // 显示内容
    title: title,
    // 显示图标，选填
    icon: icon,
    // 显示时间 ms
    duration: time,
    // 执行成功回调
    success: function(){
      if (successCallBack != null){
        setTimeout(function(){
          successCallBack()
        }, time)
      }
    }
  })
}

/**
 * 显示 等待图标
 */
function showLoading(){
  wx.showLoading({
    title: '等待中',
  })
}

/**
 * 隐藏 等待图标
 */
function hideLoading(){
  wx.hideLoading();
}



module.exports.showNoneToast = showNoneToast;
module.exports.showNoneToastWithSuccessCallback = showNoneToastWithSuccessCallback;
module.exports.showSuccessToast = showSuccessToast;
module.exports.showSuccessToastWithSuccessCallback = showSuccessToastWithSuccessCallback;
module.exports.showToast = showToast;

module.exports.showLoading = showLoading;
module.exports.hideLoading = hideLoading;
