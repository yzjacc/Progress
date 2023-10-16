# Tailwindcss 实战案例一



## 变体

在 tailwindcss 中，变体允许你根据元素不同状态来应用原子类，例如：

```html
<button class="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200">
  Click me
</button>
```

变体的表现形式一般为 xx:原子类名，表示当元素处于 xx 状态的时候，应用后面的原子类。

常见的状态有：

- hover
- focus
- active
- visited

变体还有分组变体，父元素处于某一个状态的时候，子元素应用对应的原子类：

```html
<div class="group">
  <p class="text-gray-500 group-hover:text-blue-500">Hello, world!</p>
</div>
```

在上面的代码中，当鼠标悬停在 div 或者 p 上面的时候，p 元素应用 text-blue-500 原子类。

深度选择器变体，同级的元素处于特定状态时，该元素应用对应的原子类样式。

```html
<input type="checkbox" class="peer" />
<label class="text-gray-500 peer-checked:text-blue-500">Check me</label>
```

在上面的代码中，当 input 处于 check 状态的时候，label 元素会应用 text-blue-500 原子类。注意，要使用深度选择器，需要安装 @tailwindcss/forms 插件，还需要在配置文件中的 variants 里面做一定的配置。



## 实战笔记

自定义样式类，在配置文件中的 theme 下面的 extend 可以扩展样式类，例如：

```js
theme: {
    extend: {
      backgroundColors: {
        "custom-gray":"#333"
      }
    },
  },
```

- text-xs : font-size: 12px;
- mx-auto: margin-left: auto; margin-right: auto;
- clear-both:  clear: both;
- float-left: float: left;
- leading-10: line-height: 2.5rem; /* 40px */
- py-0: padding-top: 0px; padding-bottom: 0px;
- border: border-width: 1px;
- border-solid: border-style: solid;
- border-r: border-right-width: 1px;
- text-white: color: rgb(255 255 255);
- float-right: float: right;
- relative: position: relative;
- w-full: width: 100%
- h-full: height: 100%
- block: display: block
- text-center: text-align: center
- bg-white: background-color: rgb(255 255 255);
- absolute: position: absolute;
- right-0: right: 0px;
- top-10: top: 2.5rem; /* 40px */
- border-t-0: border-top-width: 0px;
- z-50: z-index: 50;
- overflow-hidden: overflow: hidden;
- hidden: display: none;

接下来我们要做父元素 hover 的时候，子元素显示出来，这里就需要使用到分组变体，分组变体同样需要在配置文件配置一下

```js
variants: {
    extend: {
      display: ["group-hover"],
      backgroundColor: ["group-hover"],
      textColor: ["group-hover"],
    }
 },
```















