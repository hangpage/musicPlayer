# musicPlayer
init
当浏览器开始寻找指定的音频/视频时，会发生 loadstart 事件。即当加载过程开始时。
当音频/视频处于加载过程中时，会依次发生以下事件：
 1. loadstart
 2. durationchange
 3. loadedmetadata
 4. loadeddata
 5. progress
 6. canplay
 7. canplaythrough


## duration
在获得duration需要监听loadedmetadata

` ` ` 
audio|video.addEventListener("loadedmetadata", function()
  {
  console.log(audio.duration)
  }
);
` ` ` 

