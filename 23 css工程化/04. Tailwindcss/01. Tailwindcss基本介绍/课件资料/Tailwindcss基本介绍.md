# Tailwindcss基本介绍

*Tailwind CSS* 是一个<u>高度可定制</u>的、<u>实用类优先</u>的 CSS 框架，用于快速构建现代用户界面。它旨在通过提供一组实用类，使您可以直接在 *HTML* 标记中应用样式，从而轻松地为 *Web* 应用程序设置样式。您可以通过**组合**这些实用类来设计样式，而不是编写自定义 *CSS*，这使得编写过程更快速，维护更容易。

本小节我们将会介绍关于 *Tailwind CSS* 如下的内容：

- 理解 *Tailwind CSS* 的基本概念
- 开始使用 *Tailwind CSS*

## 理解 *Tailwind CSS* 的基本概念

*Tailwind CSS* 是由 *Adam Wathan* 和 *Jonathan Reinink* 于 *2017* 年创立的。它起初是作为一个实验性项目开始的，目的是探讨一种新的、实用类优先的 *CSS* 方法。这种方法强调使用预先定义的实用类直接在 *HTML* 中设置样式，而不是编写传统的 *CSS* 代码。随着时间的推移，这个项目逐渐发展壮大，形成了现在的 *Tailwind CSS* 框架。

创始人 *Adam Wathan* 一直对前端开发技术有浓厚兴趣，他在尝试了许多现有的 *CSS* 框架和方法后，发现它们不能完全满足他的需求。于是，他开始构思一个实用类优先的 *CSS* 框架，以解决他在前端开发过程中遇到的问题。他将这个框架命名为 *Tailwind CSS*，并将其发布到了 *GitHub*。

在 *Tailwind CSS* 的早期版本中，它主要关注创建响应式布局，提供了一组实用类用于快速构建响应式网站。随着项目的发展，*Tailwind CSS* 不断扩展，添加了更多的实用类和功能，例如定制性、插件支持和与现代构建工具的集成。自推出以来，*Tailwind CSS* 获得了广泛的关注和支持，迅速成为了一种受欢迎的 *CSS* 框架。开发者社区也逐渐壮大，为框架的发展提供了持续的动力。

*Tailwind CSS* 目前最新的版本为 *3.x*，官网地址：*https://tailwindcss.com/*

![16876522969428](https://resource.duyiedu.com/xiejie/2023-07-03-012045.jpg)



下面我们来介绍一下 *Tailwind CSS* 的一些特点：

1. 实用类优先方法

*Tailwind CSS* 提倡实用类优先的方法，这意味着您将使用预定义的实用类直接在 *HTML* 标记中应用样式。这种方法鼓励组合性，避免过度定制，这可能导致臃肿且难以维护的 *CSS*。

2. 响应式设计

*Tailwind CSS* 内置了响应式设计支持，允许您为不同屏幕尺寸定义不同的样式。通过使用响应式变体，如 *sm、md、lg* 和 *xl*，您可以轻松应用仅在特定断点生效的样式。

3. 定制性

*Tailwind CSS* 设计为高度可定制化。您可以根据项目需求修改默认配置，例如颜色、字体、间距、断点等。您还可以通过添加自己的实用类或使用插件来扩展框架。

4. 集成 *PurgeCSS*

为了使最终的 *CSS* 文件保持小巧和优化，*Tailwind CSS* 集成了 *PurgeCSS*，这是一个从生产构建中删除未使用 *CSS* 的工具。这样，您只需包含在项目中实际使用的实用类，从而使 *CSS* 文件更小、加载时间更快。

5. 活跃的社区

*Tailwind CSS* 拥有一个活跃的开发者社区，这意味着您可以在线找到丰富的资源、教程和支持。社区还为 *Tailwind CSS* 的插件和工具的开发做出了贡献。

6. 日益增长的采用率

*Tailwind CSS* 在开发者和公司中越来越受欢迎，许多项目已经开始采用它，取代了旧的 *CSS* 框架或方法。其实用类优先的方法和易于定制的特性使其成为现代 *Web* 开发的首选。

最后，我们再来看一看 *Tailwind CSS* 与其他 *CSS* 框架（如 *Bootstrap*、*Bulma* 等）的比较：

1. 设计哲学

*Tailwind CSS* 一个重要特点是高度可定制。采用实用类优先的方法，鼓励直接在 *HTML* 中使用预定义的实用类来设置样式，而不是依赖预构建的组件。这种方法提倡组合性和功能的重用，让开发者有更大的自由度来设计和定制用户界面，开发者可以轻松地修改默认配置，包括颜色、字体、间距、断点等。这使得 *Tailwind CSS* 非常适合创建具有独特设计的项目。

例如下面是一个使用 *Tailwind CSS* 书写的 *button*：

```html
<button class="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded">
    Click Me
</button>
```

相比之下，*Bootstrap* 和 *Bulma* 等框架更注重组件化。它们提供了一组预构建的、样式化的组件，如按钮、导航栏、表格等，这使得开发者能够快速构建用户界面，但可能在定制方面受到限制。要实现自定义样式，通常需要编写额外的 *CSS* 代码来覆盖默认样式。

例如下面是一个使用 *Bootstrap* 书写的 *button*：

```html
<button class="btn btn-primary">Click</button>
```

2. 学习曲线

由于 *Tailwind CSS* 使用实用类优先的方法，初次使用时可能需要一定的时间来适应。然而，一旦掌握了其方法和实用类，开发者通常发现它非常直观且易于维护。

与之相反，*Bootstrap* 和 *Bulma* 等框架由于其组件化的特性，可能会更容易上手。开发者只需理解如何在 *HTML* 中使用预定义的组件，而不必学习大量的实用类。

3. 文件大小和性能

*Tailwind CSS* 集成了 *PurgeCSS*，可以在生产版本中自动删除未使用的 *CSS*，从而使最终文件大小保持较小。这有助于提高页面加载速度和性能。

*Bootstrap* 和 *Bulma* 通常会包含许多预构建组件和样式，这可能导致较大的文件大小。虽然可以通过自定义构建来减小文件大小，但这需要额外的配置和工作。



## 快速上手案例

首先我们需要创建一个新的项目 tailwindcss-demo，然后使用 pnpm init 进行初始化。安装 tailwindcss

```bash
pnpm add tailwindcss -D
```

接下来我们需要生成一个 tailwindcss 的配置文件：

```bash
npx tailwindcss init
```

并且修改 content 内容，配置模板文件路径：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

接下来在 src 下面创建一个 styles.css，然后书写如下的代码：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- base: 这个指定表示导入 tailwindcss 的基本样式，里面会包含一些预设样式，主要目的是重置浏览器的样式，重置了浏览器样式之后，可以保证所有的浏览器中的外观是一致的。
- components：组件样式，默认情况下没有任何的组件样式，后期我们可以在配置文件里面自定义我们的组件样式，以及使用第三方插件添加一些组件样式，这一条指令是为了让自定义组件样式以及其他第三方组件样式能够生效。
- utilities：这个指令就是导入实用的原子类。

接下来在 src 目录下面创建一个 index.html

```html
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="/dist/output.css">
  </head>
  <body class="bg-gray-100">
    <div class="flex items-center justify-center min-h-screen">
      <button
        class="bg-yellow-400 hover:bg-yellow-600 focus:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded"
      >
        Click Me
      </button>
    </div>
  </body>
```

在上面的代码中，我们大量的使用到了 tailwindcss 所提供的原子类，并且引入了一个 output.css 的文件，该文件是经过 tailwindcss 编译后的文件。

```js
"start": "npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch"
```

上面的脚本表示实用 tailwindcss 对 src/styles.css 文件进行编译，编译生成 output.css，--watch 表示监听，当原文件发生改变的时候，重新执行编译。
