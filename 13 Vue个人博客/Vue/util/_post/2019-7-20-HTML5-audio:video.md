## audio

### 基本用法：

`<a**loop** 循环播放

 `<audio src="成都.mp3" autoplay controls loop preload="auto"></audio> `

### 多类型音频文件可放在source标签下

（同一个音乐不同文件类型  按顺序查找  若第一个文件类型浏览器可识别 则播放第一个）

 ` <audio id="music">                                   `

`                      <source src="成都.mp3" type="audio/mpeg">                                     `                      

`<source src="成都.mp3" type="audio/mpeg">`                      `                      

`               </audio> `

### 动态创建audio 标签

var audio = new Audio('./laojie.mp3');

var  audio = document.createElement('audio');

#### controls/loop/preload/autoplay属性

audio.controls = true;

audio.loop = 'loop';

audio.preload = 'auto';

audio.autoplay = true; // 谷歌66的时候做了处理  为了避免标签产生随机噪音

#### audio 对象方法

1、play() 方法 播放

2、pause() 方法  暂停

3、load()方法  重新加载视频/音频元素，用于在更改来源或其他设置后对音频/视频元素进行更新

4、canPlayType() 方法 是否支持音频文件类型

#### audio 对象属性

1.volume   音量属性 介于0(静音)~1(最大音量)之间，默认1

2.muted    是否静音

3.playbackRate 播放速率 用于指定媒体播放的速度。该属性值为1.0表示正常速度，大于1则表示”快进”，0~1之间表示”慢放"，负值表示回放。

4.currentTime 获取当前音乐播放时间 单位是秒

5.duration  返回当前音频/视频的总时长(window.onload) 单位是秒

6.played 返回已经播放(看过)的时间段 返回一个TimeRanges对象，可以用audio.played.length获取用户共播放了多少个时间段，  用audio.played.start(0) 获取第一个时间段的起始时间为多少，用audio.played.end(0)  获取第一个时间段的结束时间是多少。

7.buffered  返回当前缓冲的时间段， 同样返回一个TimeRanges对象，同样有start方法和end方法  使用与played相同

8.seekable  返回用户可以跳转的时间段  返回值和played buffered相同 用法也相同

9.paused 是否为暂停状态   返回一个布尔值  true代表是暂停状态

10.seeking 播放器是否正在调到一个新的播放点  返回一个布尔值  true 代表播放器正在调到一个新的播放点

11.ended 播放器是否播放完并停止：返回一个布尔值

如果播放器播放完媒体并且停下来，则ended属性为true。

12.readyState属性音频的当前就绪状态  (存在0 ， 1， 2， 3， 4四个值)：

​    0 = HAVE_NOTHING - 没有关于音频是否就绪的信息

​    1 = HAVE_METADATA - 关于音频就绪的元数据

​    2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒

​    3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的

​    4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放

13.networkState 属性返回音频的当前网络状态

​    表示音频/视频元素的当前网络状态：

​    0 = NETWORK_EMPTY - 音频/视频尚未初始化

​    1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络

​    2 = NETWORK_LOADING - 浏览器正在下载数据

​    3 = NETWORK_NO_SOURCE - 未找到音频/视频来源

### 事件

play 开始播放触发

pause 暂停触发

loadedmetadata 浏览器获取完媒体的元数据触发

loadeddata 浏览器已经加载完当前帧数据，准备播放时触发，注意IE8

ended 当前播放结束后触发

error 事件在音频/视频(audio/video)加载发生错误时触发  会出现四种错误类型：

​    MediaError 对象的 code 属性返回一个数字值，它表示音频/视频的错误状态：

​    1 = MEDIA_ERR_ABORTED - 取回过程被用户中止

​    2 = MEDIA_ERR_NETWORK - 当下载时发生错误

​    3 = MEDIA_ERR_DECODE - 当解码时发生错误

​    4 = MEDIA_ERR_SRC_NOT_SUPPORTED - 不支持音频/视频

## video

### 基本用法

` <video id="audio" src="./成都.mp3"></video>`

### 属性

与aduio相同

比audio多出一个属性poster

poster (video 独有)

当视频不可用时，使用一张图片替代，否则是空白

`<video src="成都.mp4" poster="封面.jpg" controls></video>` 