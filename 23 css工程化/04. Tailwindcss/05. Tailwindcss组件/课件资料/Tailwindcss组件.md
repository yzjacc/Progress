# Tailwindcss组件

在前面的学习中，我们发现很多时候一些标签所应用的原子类是一样的。例如：

```html
<div class="float-left text-center flex items-center bg-blue-100 block"></div>
<div class="float-left text-center flex items-center bg-blue-100 block"></div>
<div class="float-left text-center flex items-center bg-blue-100 block"></div>
<div class="float-left text-center flex items-center bg-blue-100 block"></div>
<div class="float-left text-center flex items-center bg-blue-100 block"></div>
```

像上面的情况，很多标签所应用的原子类都是一样的，那么我们就可以将其封装为一个组件。

在 tailwind 里面，要封装一个组件可以使用 @apply 指令，该指令后面就可以跟上一组原子类，然后给这个指令取一个名字即可。

```css
.item{
  @apply float-right text-center flex items-center bg-blue-100 block
}
```

回头在 html 中只需要挂上 item 这个类即可

```html
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
```



通过组件的方式，可以大大减少我们代码的冗余，提高代码的可维护性。



## 实战案例笔记

在使用深度选择器的时候，我们在 input 上面设置了 peer 这个类，然后在同级的 div 上面设置了 peer:checked

```html
<input type="radio" name="swith" checked class="btn peer"/>
<div class="bg-img-2 bg peer-checked:opacity-100"></div>
```

上面的代码中表示，当 input 被 checked 的时候，div 会应用 opacity-100 这个样式类。

还需要在配置文件中配置一下：

```js
variants: {
    extend: {
      opacity: ["peer-checked"]
    },
 },
```

还需要注意 peer-checked 后面要应用的类必须是 tailwind 里面内置的原子类。
