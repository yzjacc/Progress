# CSS工程化

上一小节介绍了工程化以及工程化与构建工具之间的关系。这一小节我们来聚焦到 *CSS* 工程化相关的内容。

有的人可能会问，书写 *CSS* 也会涉及到工程化的内容么？

如果你只是单纯的书写原生的 *CSS*，那么确实不能够称之为工程化，但是现在书写 *CSS* 也没有那么简单了，多了很多事情要做。



*CSS* 工程化主要体现在以下几个方面：

1. 模块化

模块化是将 *CSS* 代码分解成独立的、可重用的模块，从而提高代码的可维护性和可读性。通常，每个模块都关注一个特定的功能或组件的样式。这有助于减少样式之间的依赖和冲突，也使得找到和修改相关样式变得更容易。模块化的实现可以通过原生的 *CSS* 文件拆分，或使用预处理器（如 *Sass*）的功能（例如 @*import* 和 @*use*）来实现。

2. 命名规范

为 *CSS* 类名和选择器定义一致的命名规范有助于提高代码的可读性和可维护性。

以下是一些常见的命名规范：

*BEM*（*Block*, *Element*, *Modifier*）：*BEM* 是一种命名规范，将类名分为三个部分：块（*Block*）、元素（*Element*）和修饰符（*Modifier*）。这种方法有助于表示组件之间的层级关系和状态变化。例如，*navigation__link--active*。

*OOCSS*（面向对象的 *CSS*）：*OOCSS* 旨在将可重用的样式划分为独立的“对象”，从而提高代码的可维护性和可扩展性。这种方法强调将结构（如布局）与皮肤（如颜色和字体样式）分离。这样可以让你更容易地复用和组合样式，创建更灵活的 UI 组件。

```html
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--secondary">Secondary Button</button>
```
```css
/* 结构样式 */
.btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* 皮肤样式 */
.btn--primary {
  background-color: blue;
  color: white;
}

.btn--secondary {
  background-color: gray;
  color: white;
}
```

*SMACSS*（可扩展和模块化的 *CSS* 架构）：是一种 *CSS* 编写方法，旨在提高 *CSS* 代码的可维护性、可扩展性和灵活性。*SMACSS* 将样式分为五个基本类别：*Base、Layout、Module、State* 和 *Theme*。这有助于组织 *CSS* 代码并使其易于理解和修改。

- *Base*：包含全局样式和元素默认样式，例如：浏览器重置、全局字体设置等。
- *Layout*：描述页面布局的大致结构，例如：页面分区、网格系统等。
- *Module*：表示可重用的 *UI* 组件，例如：按钮、卡片、表单等。
- *State*：表示 *UI* 组件的状态，例如：激活、禁用、隐藏等。通常，状态类会与其他类一起使用以修改其显示。
- *Theme*：表示 *UI* 组件的视觉样式，例如：颜色、字体等。通常，主题类用于支持多个主题或在不同上下文中使用相同的组件。

3. 预处理器

*CSS* 预处理器（如 *Sass、Less* 和 *Stylus*）是一种编程式的 *CSS* 语言，可以在开发过程中提供更高级的功能，如变量、嵌套、函数和混合等。预处理器将这些扩展语法编译为普通的 *CSS* 代码，以便浏览器能够解析。

4. 后处理器

*CSS* 后处理器（如 *PostCSS*）可以在生成的 *CSS* 代码上执行各种操作，如添加浏览器前缀、优化规则和转换现代 *CSS* 功能以兼容旧浏览器等。它通常与构建工具（例如 *Webpack*）一起使用，以自动化这些任务。

5. 代码优化

代码优化旨在减少 *CSS* 文件的大小、删除无用代码和提高性能。一些常见的优化工具包括：

- *CSSO*：*CSSO* 是一个 *CSS* 优化工具，可以压缩代码、删除冗余规则和合并相似的声明。

- *PurgeCSS*：*PurgeCSS* 是一个用于删除无用 *CSS* 规则的工具。它通过分析项目的 *HTML、JS* 和模板文件来检测实际使用的样式，并删除未使用的样式。

- *clean-css*：*clean-css* 是一个高效的 *CSS* 压缩工具，可以删除空格、注释和重复的规则等，以减小文件大小。


6. 版本控制

使用版本控制系统（如 *Git*）可以更好地管理 *CSS* 代码的变更历史、合并冲突和多人协作。此外，它还可以帮助您快速回溯到以前的版本，以便排查和修复问题。

7. 构建工具和自动化

构建工具（如 *Webpack*、*Gulp* 或 *Grunt*）可以帮助您自动化开发过程中的任务，如编译预处理器代码、合并和压缩 *CSS* 文件、优化图片等。这可以提高开发效率，确保项目的一致性，并简化部署流程。这些工具通常可以通过插件和配置来定制，以满足项目的特定需求。

8. 响应式设计和移动优先

响应式设计是一种使网站在不同设备和屏幕尺寸上都能保持良好显示效果的方法。这通常通过使用媒体查询、弹性布局（如 *Flexbox* 和 *CSS Grid*）和其他技术实现。移动优先策略是从最小屏幕尺寸（如手机）开始设计样式，然后逐步增强以适应更大的屏幕尺寸（如平板和桌面）。这种方法有助于保持代码的简洁性，并确保网站在移动设备上的性能优先。

9. 设计系统和组件库

设计系统是一套规范，为开发人员和设计师提供统一的样式指南（如颜色、排版、间距等）、组件库和最佳实践。这有助于提高项目的一致性、可维护性和协作效率。组件库通常包含一系列预定义的可复用组件（如按钮、输入框、卡片等），可以快速集成到项目中。一些流行的组件库和 *UI* 框架包括 *Bootstrap、Foundation* 和 *Material-UI* 等。



因此整个 CSS 都是逐渐在向工程化靠近的，上面所罗列的那么几点都是 CSS 在工程化方面的一些体现。

接下来来介绍一下我们本套课程会聚焦的点：

- 预处理器（以 Sass 为主进行介绍、课程第二章）
- 后处理器（以 Postcss 为主进行介绍、课程的第三章）
- Tailwindcss（课程的第五章）

Tailwindcss 是一个实用类优先的CSS框架，里面提供了一系列的预定义的 CSS 类，允许开发人员通过各种类的组合来构建自定义的样式设计。目前在前端开发中，Tailwindcss 已经非常非常流行，甚至在一些主流框架（Vue、React）中都推荐开发者使用 Tailwindcss 来书写样式。

注意这么课程在讲解 Sass、Postscss、Tailwindcss 不会和构建工具联系到一起，会专注于讲知识本身。