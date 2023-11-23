# 1. *RN* 基本介绍

本小节主要包含以下知识点：

- 什么是 *RN*
- *RN* 特点
- 谁在使用 *RN*

## 什么是 *RN*

*RN* 英文全称 *ReactNative*，是 *Facebook* 于 *2015* 年 *4* 月开源的跨平台移动应用开发框架，也是 *Facebook* 早先所开源的 *JavaScript* 框架 *React* 在原生移动应用平台的衍生产物，目前支持 *iOS* 和安卓两大平台。

*RN* 使用 *Javascript* 和 *React* 中类似于 *html* 的 *JSX*，以及 *css* 来开发移动应用，因此熟悉 *Web* 前端开发的技术人员只需很少的学习就可以快速进入移动应用开发领域。

*RN* 官网：*https://reactnative.dev/*

![image-20220602141555963](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061556.png)



*RN* 中文网：*https://reactnative.cn/*

![image-20220602141614461](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061614.png)



## *RN* 特点

根据官网的介绍，*RN* 主要有如下的特点：

- 使用 *React* 来创建 *Android* 和 *iOS* 的原生应用
- 预览速度快
- 无缝跨平台

### 使用 *React* 来创建 *Android* 和 *iOS* 的原生应用

目前来讲，我们的移动端应用主要分为三大类：*WebApp*、*NativeApp* 和 *HybridApp*。



*WebApp* 指的是移动端的 *Web* 浏览器，其实和 *PC* 端的 *Web* 浏览器没有任何区别，只不过 *Web* 浏览器所依附的操作系统不再是 *Windows* 和 *Linux* 了，而是 *iOS* 和 *Android*，*WebApp* 采用的技术主要是，传统的 *HTML、JavaScript、CSS* 等 *Web* 技术栈，当然现在 *HTML5* 也得到了广泛的应用。另外，*WebApp* 所访问的页面内容都是放在服务器端的，本质上就是 *Web* 网页，所以天生就是跨平台的。不能在商店中下载，只能在移动设备浏览器中打开。



*NativeApp* 指的是移动端的原生应用，对于 *Android* 是 *apk*，对于 *iOS* 就是 *ipa*。*NativeApp* 是一种基于手机操作系统（*iOS* 和 *Android*），并使用原生程序编写运行的第三方应用程序。*NativeApp* 的开发，*Android* 使用的语言通常是 Java 或者 *Kotlin*，*iOS* 使用的语言是 *Objective-C* 或者 *Swift*。通常来说，*NativeApp* 可以提供比较好的用户体验以及性能，而且可以方便地操作手机本地资源，可在应用商店内进行下载，以 *app* 的形式打包。



*HybridApp*，俗称混合应用，是介于 *WebApp* 和 *NativeApp* 两者之间的一种 *App* 形式，*HybridApp* 利用了 *WebApp* 和 *NativeApp* 的优点，通过一个原生实现的 *Native Container* 展示 *HTML5* 的页面。更通俗的讲法可以归结为，在原生移动应用中嵌入了 *Webview*，然后通过该 *Webview* 来访问网页。*HybridApp* 具有维护更新简单，用户体验优异以及较好的跨平台特性，是目前主流的移动应用开发模式，可在应用商店内进行下载，以 *app* 的形式打开。



那么，使用 *RN* 所开发的应用是属于哪一类呢？

根据官方的介绍，*RN* 所开发最终产品是一个真正的移动应用，从使用感受上和原生应用相比几乎是无法区分的。

![image-20220602141649879](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061650.png)



在 *RN* 中所使用的基础 *UI* 组件会映射到原生应用中的对应组件。

![image-20220602141706862](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061707.png)



### 预览速度快

传统使用 *Objective-C* 或 *Java* 编写的原生应用，要预览效果，需要先将整个项目编译一次，而这个编译时间是比较耗时的。

*RN* 让你可以快速迭代开发应用。比起传统原生应用漫长的编译过程，现在你可以在瞬间刷新你的应用。开启 *Hot Reloading* 的话，甚至能在保持应用运行状态的情况下热替换新代码！

![image-20220602141803449](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061803.png)



### 无缝跨平台

使用 *RN* 所开发的移动端应用是无缝跨平台的，原生代码和 *API* 会被封装到 *RN* 组件中，开发者只需要掌握 *React* 和 *JavaScript* 知识即可进行开发。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061835.png" alt="image-20220602141835452" style="zoom:67%;" />



## 谁在使用 *RN*

*RN* 从 *2015* 年开源至今，已经有非常多的国内外厂商选择使用 *RN* 来开发移动端应用，因为比起以前开发 *Andriod* 和 *iOS* 应用要各自找一波开发工程师，现在只需要找一个前端工程师即可。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061857.png" alt="image-20220602141856881" style="zoom:67%;" />

更多使用厂商，可以参阅：*https://reactnative.dev/showcase*

---

-*EOF*-



