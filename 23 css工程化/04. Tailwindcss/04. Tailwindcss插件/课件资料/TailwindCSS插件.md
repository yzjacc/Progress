# TailwindCSS插件

TailwindCSS中是允许我们自定义插件和组件的。需要注意一下两者之间的区别，插件一般指的是实现某一个具体的功能，组件一般是指封装了一段公共的代码。



## 自定义插件

要创建一个自定义插件，非常的简单，只需要在 tailwindcss 的配置文件中配置 plugins 配置项，该配置项对应的是一个数组，因为插件可以配置多个。数组里面的每一项是一个函数，该函数就是一个插件。

```js
// tailwind.config.js
module.exports = {
  // ...other configurations...
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.bg-skew-12': {
          transform: 'skewY(-12deg)',
        },
        '.bg-skew-6': {
          transform: 'skewY(-6deg)',
        },
        '.bg-skew-0': {
          transform: 'skewY(0deg)',
        },
        '.bg-skew-6-reverse': {
          transform: 'skewY(6deg)',
        },
        '.bg-skew-12-reverse': {
          transform: 'skewY(12deg)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

```

在上面的代码中，我们创建了一个自定义插件，该插件用于添加了一组倾斜的背景效果。之后使用addUtilities方法将这些样式类添加到项目里面。

自定义了插件之后，我们就可以在 HTML 里面使用插件中所定义的样式类

```html
<div class="bg-skew-12"></div>
```

下面是关于插件的另外一个例子：

```js
// tailwind.config.js
module.exports = {
  theme: {
    // Your other configurations go here
  },
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        '.spin': {
          animation: 'spin 1s linear infinite',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
```

在上面的代码中，我们创建了一个名为 spin 的自定义动画类，之后我们就可以在 HTML 中使用这个动画类：

```html
<div class="spin"></div>
```



## 使用社区的插件

使用社区的插件那就更简单了，只需要安装，之后在配置文件中配置该插件即可。

例如有一个名为 @tailwindcss/typography

```bash
pnpm add @tailwindcss/typography -D
```

然后在配置文件中导入该插件：

```js
module.exports = {
  // ....
  plugins: [
    require('@tailwindcss/typography')
  ]
}
```

参阅插件文档使用就可以了，例如：

```html
<div class="prose"></div>
```



目前关于 tailwindcss 的插件，有一些，但是官方没有一个完整的列表，你可以参阅下面的资源来寻找 tailwindcss 插件：

- *Tailwind CSS* 官方插件：*Tailwind* 团队开发了一些官方插件，您可以在官网左侧的 *Official Plugins* 看到这些插件：
    - *Typography*：用于排版样式的预设。
    - *Aspect Ratio*：用于控制元素的宽高比。
    - *Forms*：为表单元素提供美观且一致的默认样式。
    - *Line Clamp*：用于限制文本行数和显示省略号。
- *Awesome Tailwind CSS*：*Awesome Tailwind CSS* 是一个 *GitHub* 仓库，收集了许多与 *Tailwind CSS* 相关的资源，包括插件、组件、模板等。仓库地址：https://github.com/aniftyco/awesome-tailwindcss
- *npm* 搜索：您还可以在 *npm* 上搜索带有 "*tailwindcss*" 关键字的插件。虽然这种方法可能会返回较多结果，但它可以帮助您找到一些非常具体或新发布的插件。