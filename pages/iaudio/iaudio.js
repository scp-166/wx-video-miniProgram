// pages/iaudio/iaudio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 用于设置 audio 的播放地址
    path: String,
    author: String,
    name: String,
    musicDuration: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    mp3Obj: {},
    // mp3 是否正在播放
    running: false,
    // MP3 图标，默认等待播放
    musicImage: "mp3_start"
  },

  // 生命周期函数
  ready() {
    // 创建 audio 上下文对象
    let mp3Obj = wx.createInnerAudioContext();
    // 取消自动播放
    mp3Obj.autoplay = false;
    // 设置播放地址
    mp3Obj.src = this.data.path;

    console.log(this.data.path);

    // 设置MP3
    this.setData({
      mp3Obj: mp3Obj
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    display: function(){
      let running = this.data.running;
      let musicImage;
      // 如果没有播放
      if(!running){
        // 实例开始播放
        console.log("播放");
        this.data.mp3Obj.play();
        // 改为播放中
        running = true;
        // 改为等待暂停图标
        musicImage = "mp3_pause";
      } else {
        // 实例暂停播放
        this.data.mp3Obj.pause();
        running = false;
        musicImage = "mp3_start";
      }
      this.setData({
        running: running,
        musicImage: musicImage
      })
    }
  }
})
