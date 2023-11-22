# Tailwindcss实战案例二



## 自定义主题

在开始本小节的实战之前，我们先来介绍一下 *Tailwind CSS* 中如何自定义主题。

在 *Tailwind CSS* 中，虽然提供了大量预设样式，但有时您可能需要自定义样式以满足特定需求。*Tailwind* 提供了多种方法来自定义样式，包括扩展现有配置、添加新配置、编写自定义 *CSS* 和创建插件。

1. 扩展现有主题

要自定义现有的 *Tailwind* 主题，您需要在项目根目录下创建一个名为 *tailwind.config.js* 的文件。通过在这个文件中的 *theme.extend* 对象中添加配置，您可以扩展或覆盖默认配置。以下是一个示例：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#1D3557',
        'secondary': '#457B9D',
      },
      textColor: {
        'primary': '#1D3557',
        'secondary': '#457B9D',
      },
    },
  },
  variants: {},
  plugins: [],
};
```

在这个例子中，我们扩展了背景颜色和文本颜色的配置，添加了新的 *primary* 和 *secondary* 颜色。现在，您可以在项目中使用这些新的颜色类：

```html
<div class="bg-primary text-primary">
  <!-- Your content goes here -->
</div>
```

2. 添加新主题

除了扩展现有主题，您还可以在 *tailwind.config.js* 文件中添加全新的配置。例如，假设您想要添加自定义的阴影配置：

```js
// tailwind.config.js
module.exports = {
  theme: {
    boxShadow: {
      'custom': '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    extend: {
      // Your other configurations go here
    },
  },
  variants: {},
  plugins: [],
};
```

在这个例子中，我们为阴影添加了一个名为 *custom* 的新配置。现在，您可以在项目中使用这个新的阴影类：

```html
<div class="shadow-custom">
  <!-- Your content goes here -->
</div>
```

但是需要注意的是，**在这种情况下将完全替换默认的阴影预设**，而不仅仅是扩展它们。请谨慎使用此方法，因为它会删除所有其他预定义的阴影预设。

3. 编写自定义 *CSS*

有时，您可能需要编写自定义 *CSS* 来实现特定的样式。为此，您可以在项目中创建一个单独的 *CSS* 文件，并在其中编写自定义样式。然后，确保在您的 HTML 文件中引用这个 *CSS* 文件。

例如，创建一个名为 *custom.css* 的文件，并添加以下内容：

```css
/* custom.css */
.custom-border {
  border: 2px solid #1D3557;
}
```

在 *HTML* 文件中，首先引用 *Tailwind CSS*，然后引用您的自定义 *CSS* 文件：

```html
<head>
  <link href="/path/to/tailwind.css" rel="stylesheet">
  <link href="/path/to/custom.css" rel="stylesheet">
</head>
```

现在，您可以在项目中使用这个自定义边框类：

```html
<div class="custom-border">
  <!-- Your content goes here -->
</div>
```



## 实战笔记

在使用原生 CSS 来书写效果的时候，我们使用到了伪元素选择器：

```html
<span class="girl"></span>
```

```css
.girl::before {
    background-color: hotpink;
}
```

但是在 Tailwindcss 里面，并没有支持伪元素的原子类，但是有很多的替代方案，例如可以使用之前书写 CSS 的方式，也可以修改一下结构，例如我们将上面的结构修改为如下：

```html
<div>
  <div></div>
</div>
```



- m-0: margin:0px
- p-0: padding:0px
- w-screen: width:100vw;
- h-screen: height:100vh
- flex: display: flex;
- justify-center: justify-content: center;
- items-center: align-items: center;
- w-32: width: 8rem; /* 128px */

首先我们的 container 盒子的宽度需要为 280px，在 tailwindcss 里面，width 对应了大多数 rem 单位的值，我们这里设置字体的大小为 35px，280/35 = 8rem ---> w-32

- justify-between: justify-content: space-between;



最后是关于动画，一般来讲，需要在配置文件中配置动画，配置分为两个方面：keyframes 和 animation

```js
// 这里配置了一个名为 slide 的针对对象
keyframes: {
        slide: {
          "0%": {
            transform: "translateX(0)",
            filter: "brightness(1)",
          },
          "100%": {
            transform: "translateX(236px)",
            filter: "brightness(1.45)",
          },
        },
}
// 定义了一个名为 slide 的动画类
animation: {
        slide:"slide 1.5s ease-in-out infinite alternate",
}
```

之后就可以在 html 里面使用这个动画类，注意使用的时候前缀为 animate-xxx，例如：

```html
<div class="aniamte-slide"></div>
```

