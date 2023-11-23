# *web worker*



在运行大型或者复杂的 *JavaScript* 脚本的时候经常会出现浏览器假死的现象，这是由于 *JavaScript* 这个语言在执行的时候是采用单线程来执行而导致的。采用同步执行的方式进行运行，如果出现阻塞，那么后面的代码将不会执行。例如：

```js
while(true){}
```

那么能不能让这些代码在后台运行，或者让 *JavaScript* 函数在多个进程中同时运行呢？

*HTML5* 所提出的 *Web Worker* 正是为了解决这个问题而出现的。

*HTML5* 的 *Web Worker* 可以让 *Web* 应用程序具备后台的处理能力。它支持多线程处理功能，因此可以充分利用多核 *CPU* 带来的优势，将耗时长的任务分配给 *HTML5* 的 *Web Worker* 运行，从而避免了有时页面反应迟缓，甚至假死的现象。

本文将分为以下几个部分来介绍 *web worker*：

- *web worker* 概述
- *web Worker* 使用示例
- 使用 *web Worker* 实现跨标签页通信



## *web worker* 概述

在 *Web* 应用程序中，*web Worker* 是一项后台处理技术。

在此之前，*JavaScript* 创建的 *Web* 应用程序中，因为所有的处理都是在单线程内执行的，所以如果脚本所需运行时间太长，程序界面就会长时间处于停止状态，甚至当等待时间超出一定的限度，浏览器就会进入假死的状态。

为了解决这个问题，*HTML5* 新增加了一个 *web Worker API*。

使用这个 *API*，用户可以很容易的创建在后台运行的线程，这个线程被称之为 *Worker*。如果将可能耗费较长时间的处理交给后台来执行，则对用户在前台页面中执行的操作没有影响。

*web Worker* 的特点如下：

- 通过加载一个 *JS* 文件来进行大量复杂的计算，而不挂起主进程。通过 *postMessage* 和 *onMessage* 进行通信。

- 可以在 *Worker* 中通过 *importScripts(url)* 方法来加载 *JavaScript* 脚本文件。

- 可以使用 *setTimeout( )，clearTimeout( )，setInterval( ) 和 clearInterval( )* 等方法。

- 可以使用 *XMLHttpRequest* 进行异步请求。

- 可以访问 *navigator* 的部分属性。

- 可以使用 *JavaScript* 核心对象。

除了上述的优点，*web Worker* 本身也具有一定局限性的，具体如下：

- 不能跨域加载 *JavaScript*

- *Worker* 内代码不能访问 *DOM*

- 使用 *Web Worker* 加载数据没有 *JSONP* 和 *Ajax* 加载数据高效。

目前来看，*web Worker* 的浏览器兼容性还是很不错的，基本得到了主流浏览器的一致支持。

![image-20211206154023963](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-06-074024.png)



在开始使用 *web Worker* 之前，我们先来看一下使用 *Worker* 时会遇到的属性和方法，如下：

- *self*：*self* 关键值用来表示本线程范围内的作用域。

- *postMessage( )*：向创建线程的源窗口发送信息。

- *onMessage*：获取接收消息的事件句柄。

- *importScripts(urls)*：*Worker* 内部如果要加载其他脚本，可以使用该方法来导入其它 *JavaScript* 脚本文件。参数为该脚本文件的 *URL* 地址，导入的脚本文件必须与使用该线程文件的页面在同一个域中，并在同一个端口中。

例如：

```js
// 导入了 3 个 JavaScript 脚本
importScripts("worker1.js","worker2.js","worker3.js"); 
```



## *web Worker* 使用示例

接下来我们来看一下 *web Worker* 的具体使用方式。

*web Worker* 的使用方法非常简单，只需要创建一个 *web Worker* 对象，并传入希望执行的 *JavaScript* 文件即可。

之后在页面中设置一个事件监听器，用来监听由 *web Worker* 对象发来的消息。

如果想要在页面与 *web Worker* 之间建立通信，数据需要通过 *postMessage( )* 方法来进行传递。

创建 *web Worker*。步骤十分简单，只要在 *Worker* 类的构造器中，将需要在后台线程中执行的脚本文件的 *URL* 地址作为参数传入，就可以创建 *Worker* 对象，如下：

```js
var worker = new Worker("./worker.js");
```

>注意：在后台线程中是不能访问页面或者窗口对象的，此时如果在后台线程的脚本文件中使用 *window* 或者 *document* 对象，则会引发错误。

这里传入的 *JavaScript* 的 *URL* 可以是相对或者绝对路径，只要是相同的协议，主机和端口即可。

如果想获取 *Worker* 进程的返回值，可以通过 *onmessage* 属性来绑定一个事件处理程序。如下：

```js
var worker = new Worker("./worker.js");
worker.onmessage = function(){
   console.log("the message is back!");
}
```

这里第一行代码用来创建和运行 *Worker* 进程，第 *2* 行设置了 *Worker* 的 *message* 事件，当后台 Worker 的 *postMessage( )* 方法被调用时，该事件就会被触发。

使用 *Worker* 对象的 *postMessage( )* 方法可以给后台线程发送消息。发送的消息需要为文本数据，如果要发送任何 *JavaScript* 对象，需要通过 *JSON.stringify( )* 方法将其转换成文本数据。

```js
worker.postMessage(message);
```

通过获取 *Worker* 对象的 *onmessage* 事件以及 *Worker* 对象的 *postMessage( )* 方法就可以实现线程之间的消息接收和发送。

*Web Worker* 不能自行终止，但是能够被启用它们的页面所终止。

调用 *terminate( )* 函数可以终止后台进程。被终止的 *Web Workers* 将不再响应任何消息或者执行任何其他运算。

终止之后，*Worker* 不能被重新启动，但是可以使用同样的 *URL* 创建一个新的 *Worker*。

下面是 *web Worker* 的一个具体使用示例。

*index.html*

```html
<p>计数：<output id="result"></output></p>
<button id="startBtn">开始工作</button>
<button id="stopBtn">停止工作</button>
```

```js
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var worker; // 用于存储 Worker 进程
// 开始 Worker 的代码
startBtn.onclick = function () {
    // 第一次进来没有 Worker 进程 , 创建一个新的 Worker 进程
    worker = new Worker("worker.js");
    // 接收来自于后台的数据
    worker.onmessage = function (event) {
        document.getElementById("result").innerHTML = event.data;
    };
}
// 停止 Worker 的代码
stopBtn.onclick = function () {
    worker.terminate();
    worker = undefined;
}
```

*worker.js*

```js
var i = 0;
function timedCount() {
    i++;
    // 每次得到的结果都通过 postMessage 方法返回给前台
    postMessage(i);
    setTimeout("timedCount()", 1000);
}
timedCount();
```

在上面的代码中，当用户点击"开始工作"时，会创建一个 *Web Worker* 在后台进行计数。每次计的数都会通过 *postMessage( )* 方法返回给前台。

当用户点击"停止工作"时，则会调用 *terminate( )* 方法来终止 *Web Worker* 的运行。



## 使用 *web Worker* 实现跨标签页通信

*web Worker* 可分为两种类型：

- 专用线程 *dedicated web worker*

- 共享线程 *shared web worker*

*Dedicated web worker* 随当前页面的关闭而结束，这意味着 *Dedicated web worker* 只能被创建它的页面访问。

与之相对应的 *Shared web worker* 共享线程可以同时有多个页面的线程链接。

前面我们示例 *web Worker* 时，实例化的是一个 Worker 类，这就代表是一个 *Dedicated web worker*，而要创建 *SharedWorker* 则需要实例化 *SharedWorker* 类。

```js
var worker = new SharedWorker("sharedworker.js");
```

下面我们就使用 *Shared web worker* 共享线程来实现跨标签页通信。

*index.html*

```html
<body>
    <input type="text" name="" id="content" placeholder="请输入要发送的信息">
    <button id="btn">发送</button>
    <script>
        const content = document.querySelector("#content");
        const btn = document.querySelector("#btn");
        const worker = new SharedWorker('worker.js')
        btn.onclick = function () {
            worker.port.postMessage(content.value);
        }
    </script>
</body>
```

*index2.html*

```html
<body>
    <script>
        const btn = document.querySelector("#btn");
        var worker = new SharedWorker('worker.js');
        worker.port.start()
        worker.port.addEventListener('message', (e) => {
            if(e.data){
                console.log('来自worker的数据：', e.data)
            }
        }, false);

        setInterval(function(){
            // 获取和发送消息都是调用 postMessage 方法，我这里约定的是传递'get'表示获取数据。
            worker.port.postMessage('get')
        },1000);
    </script>
</body>
```

*worker.js*

```js
var data = '';
onconnect = function (e) {
    var port = e.ports[0]
    port.onmessage = function (e) {
        // 如果是 get 则返回数据给客户端
        if (e.data === 'get') {       
            port.postMessage(data);
            data = "";
        } else {    
            // 否则把数据保存                  
            data = e.data
        }
    }
}
```

-------

-*EOF*-