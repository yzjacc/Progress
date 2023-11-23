# 通过 *React Native CLI* 搭建环境

目前为止，我们都是通过 *expo* 来快速的搭建 *RN* 的学习开发环境，

但是正如官方文档所说，如果你是作为学习，那么可以使用 *expo* 来快速的体验 *RN*，但是如果是要开发正式的项目，那么官方还是推荐使用 *React Native CLI* 来搭建完整的项目，里面的各种配置也会更加完整一些。

这里，我们就来跟着官方文档的步骤，使用 *React Native CLI* 搭建正式项目的开发环境。

本文主要包含以下内容：

- *React Native CLI* 搭建开发环境
- 目录分析

## *React Native CLI* 搭建开发环境

>备注 1: 在开始之前，还是再次强调，请自行解决科学上网的问题，很多依赖都需要科学上网的环境下才能下载

>备注 2: 如果是 *macOS* 系统电脑，可以搭建 *iOS* 和 *Andriod* 的环境，但是如果 *Windows* 系统电脑，只能搭建 *Andriod* 的环境。

>备注 3: 本次演示步骤示例，*Development OS* 为 *macOS*，*target* 为 *Andriod*

接下来，我们就根据官方的步骤，一步一步来操作。

![image-20220720105820154](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-025820.png)

首先整体的依赖有：

- *Node*
- *Watchman*
- *React Native command line interface*
- *JDK*
- *Android Studio*

![image-20220720105840341](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-025840.png)

*Node* 大家已经很熟悉了，而且大家都已经安装了，官方还推荐了一个叫做 *watchman* 的工作，根据官方的描述“*Watchman* 是 *Facebook* 的一个工具，用于观察文件系统的变化。强烈建议您安装它以获得更好的性能。”

这里在安装的时候，还是推荐大家使用 *Homebrew* 来进行安装，安装过程中如果遇到 *fatal: not in a git directory* 错误，可以参阅：*https://blog.csdn.net/Wbl752134268/article/details/125186635*

安装完毕后可以通过 *watchman -v* 命令来查看版本，如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-025900.png" alt="image-20220720105900213" style="zoom:50%;" />

>如果在安装 *Homebrew* 时遇到问题，可以尝试使用国内镜像安装，命令为：
>/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"

### 安装 *JDK*

搭建 *Android* 开发环境需要 *Java* 环境的支持，因此需要下载和安装操作系统对应的 *JDK* 版本。

![image-20220720105931006](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-025931.png)

官方推荐使用 *Homebrew* 来进行安装，当然你也可以选择直接去 [*Java* 的官网](https://www.oracle.com/java/technologies/downloads/)下载安装。

关于 *JDK* 的安装，你可以在网上轻松的找到详细的说明，这里不再赘述。

>*macOS* 安装：*https://www.jianshu.com/p/199cd1abd570*
>*Windows* 安装：*https://www.cnblogs.com/maoning/p/10701349.html*

最后输入 *javac -version* 能查看版本号，例如：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-025950.png" alt="image-20220720105950341" style="zoom:50%;" />

### *Android* 开发环境

如果你之前没有接触过 *Android* 的开发环境，那么请做好心理准备，这一过程相当繁琐。

首先下载安装 [*Andriod Studio*](https://developer.android.google.cn/studio/)

![image-20220720110051649](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030051.png)

点击官网的下载，可能出现无法下载的情况，将下载地址的 *https* 协议修改为 *http* 即可。

安装好 *Andriod Studio* 后，接下来需要安装 *Android SDK*，根据官网的描述，目前编译 *React Native* 应用需要的是 *Android 11 (R)* 版本的 *SDK*，可以在 *Android Studio* 的 *SDK Manager* 中选择安装各版本的 *SDK*。

![image-20220720110112615](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030113.png)

根据官网下方的描述，安装对应的 *SDK* 工具：

![image-20220720110130176](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030130.png)

根据官网的描述，接下来我们需要安装上图中框选的组件，但是第一次是无法选择的，因为没有选择 *Android SDK* 的 *Location*，点击右侧的 *Edit*，先安装一个默认的 *Android SDK* 版本，目前默认的是 *Andriod API 33*，展开 *Android 11 (R)*，勾选上图中框选的组件

![image-20220720110148405](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030148.png)

点击"SDK Tools"选项卡，同样勾中右下角的"Show Package Details"。展开"Android SDK Build-Tools"选项，确保选中了 React Native 所必须的30.0.2版本。你可以同时安装多个其他版本。

![image-20220720110205934](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030206.png)

在"SDK Tools"选项卡，点击"NDK (Side by side)"，同样勾中右下角的"Show Package Details"，选择20.1.5948944版本。最后再勾选上"Android SDK Command-line Tools (latest)"。

![image-20220720110222974](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030223.png)

最后点击 *Apply* 来下载安装这些组件。

![image-20220720110247857](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030247.png)

接下来需要配置 *ANDROID_SDK_ROOT* 环境变量

![image-20220720110302867](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030303.png)

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030321.png" alt="image-20220720110321356" style="zoom:50%;" />

通过 *vi ~/.zshrc* 来打开这个配置文件（没有会自动新建），然后按 *i* 键进入 *insert* 模式，粘贴上面的配置，然后按 *Esc* 键退出编辑模式，之后 :wq 保存退出

![image-20220720110348986](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030349.png)

接下来就是让上面的配置生效，按照官网的步骤操作即可：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030404.png" alt="image-20220720110404020" style="zoom:50%;" />

### 创建新项目

接下来我们通过 *npx react-native init <项目名>* 来创建新的项目

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030425.png" alt="image-20220720110425193" style="zoom:67%;" />

接下来我们需要准备预览环境，你可以准备真机，也可以用模拟器。

真机首先第一步需要开启 USB 调试，不同的机器开启方式不一样，例如小米手机可以参阅如下文档：

*https://jingyan.baidu.com/article/f71d60379ad6065bb641d1ac.html*

接下来进入【开发者选项】，打开如下的开关

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-062040.png" alt="image-20220720142040143" style="zoom:50%;" />



> 连接之前，要确保手机和电脑在同一个网络里面，否则无法连接上 *Metro* 服务器

接下来执行 *npx react-native run-android* 命令来启动整个项目

![image-20220720110448705](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030449.png)

此时会启动一个 *Metro* 服务器，该服务器类似于 *webpack* 中的 *webpack-dev-server*，能够实现代码热更新的效果。

![image-20220720110504925](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030505.png)

## 目录分析

接下来我们来分析一下使用 *React Native CLI* 所搭建的项目的目录结构。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-030525.png" alt="image-20220720110524782" style="zoom:50%;" />

*React Native* 工程的目录和文件说明如下表：

| 目录文件     | 说明                           |
| ------------ | ------------------------------ |
| \__test__    | React Native工程单元测试文件夹 |
| android      | 原生Android工程文件夹          |
| ios          | 原生iOS工程文件夹              |
| node_modules | React Native工程依赖的第三方库 |
| index.js     | React Native工程入口文件       |
| package.json | React Native工程配置文件       |

当然，在整个搭建项目的途中，我也踩了很多坑，并且这些坑根据你不同的操作系统，以及搭建的不同的目标环境会有所不同，这里有两篇汇总，记录如下：

*https://blog.csdn.net/weixin_40466351/article/details/125078877*

*https://blog.csdn.net/weixin_44058725/article/details/116146452*

-*EOF*-