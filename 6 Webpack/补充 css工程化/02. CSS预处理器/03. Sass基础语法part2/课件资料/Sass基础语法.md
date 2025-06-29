# Sass基础语法

- 注释
- 变量
- 数据类型
- 嵌套语法
- 插值语法
- 运算



## 注释

CSS 里面的注释 /* */ ，Sass 中支持 // 来进行注释，// 类型的注释再编译后是会消失

```scss
/*
  Hello
*/

// World
```

```css
/*
  Hello
*/
```

如果是压缩输出模式，那么注释也会被去掉，这个时候可以在多行注释的第一个字符书写一个 ! ，此时即便是在压缩模式，这条注释也会被保留，通常用于添加版权信息

```scss
/*!
  该 CSS 作者 XXX
  创建于 xxxx年xx月xx日
*/

.test{
  width: 300px;
}
```

```css
/*!
  该 CSS 作者 XXX
  创建于 xxxx年xx月xx日
*/.test{width:300px}
```



## 变量

这是当初 Sass 推出时一个极大的亮点，支持变量的声明，声明方式很简单，通过 $ 开头来进行声明，赋值方法和 CSS 属性的写法是一致的。

```scss
// 声明变量
$width: 1600px;
$pen-size: 3em;

div{
  width: $width;
  font-size: $pen-size;
}
```

```css
div {
  width: 1600px;
  font-size: 3em;
}
```

变量的声明时支持块级作用域的，如果是在一个嵌套规则内部定义的变量，那么就只能在嵌套规则内部使用（局部变量），如果不是在嵌套规则内定义的变量那就是全局变量。

```scss
// 声明变量
$width: 1600px;

div{
  $width: 800px;
  $color: red;

  p.one{
    width: $width; /* 800px */
    color: $color; /* red */
  }
  
}

p.two{
  width: $width; /* 1600px */
  color: $color; /* 报错，因为 $color 是一个局部变量 */
}
```

可以通过一个 !global 将一个局部变量转换为全局变量

```scss
// 声明变量
$width: 1600px;

div{
  $width: 800px;
  $color: red !global;

  p.one{
    width: $width;
    color: $color;
  }
  
}

p.two{
  width: $width;
  color: $color;
}
```

```css
div p.one {
  width: 800px;
  color: red;
}

p.two {
  width: 1600px;
  color: red;
}
```



## 数据类型

因为 CSS 预处理器就是针对 CSS 这一块融入编程语言的特性进去，所以自然会有数据类型。

在 Sass 中支持 7 种数据类型：

- 数值类型：1、2、13、10px
- 字符串类型：有引号字符串和无引号字符串 "foo"、'bar'、baz
- 布尔类型：true、false
- 空值：null
- 数组（list）：用空格或者逗号来进行分隔，1px 10px 15px 5px、1px,10px,15px,5px
- 字典（map）：用一个小括号扩起来，里面是一对一对的键值对 (key1:value1, key2:value2)
- 颜色类型：blue、#04a012、rgba(0,0,12,0.5)



### 数值类型

Sass里面支持两种数值类型：<u>带单位数值</u> 和 <u>不带单位的数值</u>，数字可以是正负数以及浮点数

```scss
$my-age: 19;
$your-age: 19.5;
$height: 120px;
```



### 字符串类型

支持两种：<u>有引号字符串</u> 和 <u>无引号字符串</u>

并且引号可以是单引号也可以是双引号

```scss
$name: 'Tom Bob';
$container: "top bottom";
$what: heart;

div{
  background-image: url($what + ".png");
}
```

```css
div {
  background-image: url(heart.png);
}
```



### 布尔类型

该类型就两个值：true 和 false，可以进行逻辑运算，支持 and、or、not 来做逻辑运算

```scss
$a: 1>0 and 0>5; // false
$b: "a" == a; // true
$c: false; // false
$d: not $c; // true
```



### 空值类型

就一个值：null 表示为空的意思

```scss
$value: null;
```

因为是空值，因此不能够使用它和其他类型进行算数运算



### 数组类型

数组有两种表示方式：<u>通过空格来间隔</u> 以及 <u>通过逗号来间隔</u>

例如：

```scss
$list0: 1px 2px 5px 6px;
$list1: 1px 2px, 5px 6px;
$list2: (1px 2px) (5px 6px);
```

关于数组，有如下的注意事项：

1. 数组里面可以包含子数组，例如 1px 2px, 5px 6px 就是包含了两个数组，1px 2px 是一个数组，5px 6px 又是一个数组，如果内外数组的分隔方式相同，例如都是采用空格来分隔，这个时候可以使用一个小括号来分隔 (1px 2px) (5px 6px)
2. 添加了小括号的内容最终被编译为 CSS 的时候，是会被去除掉小括号的，例如  (1px 2px) (5px 6px) ---> 1px 2px 5px 6px

```scss
$list0: 1px 2px 5px 6px;
$list1: 1px 2px, 5px 6px;
$list2: (1px 2px) (5px 6px);

div{
  padding: $list2;
}
```

```css
div {
  padding: 1px 2px 5px 6px;
}
```

3. 小括号如果为空，则表示是一个空数组，空数组是不可以直接编译为 CSS 的

```scss
$list2: ();

div{
  padding: $list2; // 报错
}
```

但是如果是数组里面包含空数组或者 null 空值，编译能够成功，空数组以及空值会被去除掉

```scss
$list2: 1px 2px null 3px;
$list3: 1px 2px () 3px;

div{
  padding: $list2;
}

.div2{
  padding: $list3;
}
```

4. 可以使用 nth 函数去访问数组里面的值，注意数组的下标是从 1 开始的。

```scss
// 创建一个 List
$font-sizes: 12px 14px 16px 18px 24px;

// 通过索引访问 List 中的值
$base-font-size: nth($font-sizes, 3);

// 使用 List 中的值为元素设置样式
body {
  font-size: $base-font-size;
}

```

```css
body {
  font-size: 16px;
}
```

最后我们来看一个实际开发中用到数组的典型案例：

```scss
$sizes: 40px 50px 60px;

@each $s in $sizes {
  .icon-#{$s} {
    font-size: $s;
    width: $s;
    height: $s;
  }
}
```

```css
.icon-40px {
  font-size: 40px;
  width: 40px;
  height: 40px;
}

.icon-50px {
  font-size: 50px;
  width: 50px;
  height: 50px;
}

.icon-60px {
  font-size: 60px;
  width: 60px;
  height: 60px;
}
```



### 字典类型

字典类型必须要使用小括号扩起来，小括号里面是一对一对的键值对

```scss
$a: (
	$key1: value1,
  $key2: value2
)
```

可以通过 map-get 方法来获取字典值

```scss
// 创建一个 Map
$colors: (
  "primary": #4caf50,
  "secondary": #ff9800,
  "accent": #2196f3,
);


$primary: map-get($colors, "primary");

button{
  background-color: $primary;
}
```

```css
button {
  background-color: #4caf50;
}
```

接下来还是看一个实际开发中的示例：

```scss
$icons: (
  "eye": "\f112",
  "start": "\f12e",
  "stop": "\f12f",
);

@each $key, $value in $icons {
  .icon-#{$key}:before {
    display: inline-block;
    font-family: "Open Sans";
    content: $value;
  }
}

```

```css
.icon-eye:before {
  display: inline-block;
  font-family: "Open Sans";
  content: "\f112";
}

.icon-start:before {
  display: inline-block;
  font-family: "Open Sans";
  content: "\f12e";
}

.icon-stop:before {
  display: inline-block;
  font-family: "Open Sans";
  content: "\f12f";
}
```



### 颜色类型

支持原生 CSS 中各种颜色的表示方式，十六进制、RGB、RGBA、HSL、HSLA、颜色英语单词。

Sass 还提供了内置的 Colors 相关的各种函数，可以方便我们对颜色进行一个颜色值的调整和操作。

- lighten 和 darken：调整颜色的亮度，lighten是增加亮度、darken是减少亮度

```scss
$color : red;

.div1{
  width: 200px;
  height: 200px;
  background-color: lighten($color, 10%); // 亮度增加10%
}

.div2{
  width: 200px;
  height: 200px;
  background-color: darken($color, 10%); // 亮度减少10%
}
```

```css
.div1 {
  width: 200px;
  height: 200px;
  background-color: #ff3333;
}

.div2 {
  width: 200px;
  height: 200px;
  background-color: #cc0000;
}
```

- saturate 和 desaturate：调整颜色的饱和度

```scss
$color:#4caf50;

.div1{
  width: 200px;
  height: 200px;
  background-color: saturate($color, 10%); // 饱和度增加10%
}

.div2{
  width: 200px;
  height: 200px;
  background-color: desaturate($color, 10%); // 饱和度减少10%
}
```

- *Adjust Hue*：通过调整颜色的色相来创建新颜色。

```scss
$color: #4caf50;
$new-hue: adjust-hue($color, 30); // 色相增加 30 度
```

- *RGBA*：为颜色添加透明度。    

```scss
$color: #4caf50;
$transparent: rgba($color, 0.5); // 添加 50% 透明度
```

- *Mix*：混合两种颜色。

```scss
$color1: #4caf50;
$color2: #2196f3;
$mixed: mix($color1, $color2, 50%); // 混合两种颜色，权重 50%
```

- *Complementary*：获取颜色的补充颜色。

```scss
$color: #4caf50;
$complementary: adjust-hue($color, 180); // 色相增加 180 度，获取补充颜色
```

如果想要查阅具体有哪些颜色相关的函数，可以参阅官方文档：https://sass-lang.com/documentation/modules/color



## 嵌套语法

嵌套语法也是 Sass 刚推出来的时候的一大亮点，嵌套语法让我们开发在书写 CSS 的时候节省了很多的代码量。

例如：

```scss
$color: skyblue;

.container {
  width: 500px;
  height: 500px;

  .div1 {
    color: $color;
    width: 200px;
    height: 200px;
  }

  p {
    width: 400px;
    background-color: red;
  }
}
```

```css
.container {
  width: 500px;
  height: 500px;
}
.container .div1 {
  color: skyblue;
  width: 200px;
  height: 200px;
}
.container p {
  width: 400px;
  background-color: red;
}
```

另外还支持一个 & 符号，表示和父选择器结合。如果你不写 &，那么最终编译的时候，会编译为后代选择器，如果书写了 & 符号，则会和父选择器结合到一起

```scss
a {
  color: yellow;
  &:hover {
    color: green;
  }
  &:active {
    color: red;
  }
}

div{
  width: 100px;
  height: 100px;
  &.one{
    background-color: red;
  }
}
```

```css
a {
  color: yellow;
}
a:hover {
  color: green;
}
a:active {
  color: red;
}

div {
  width: 100px;
  height: 100px;
}
div.one {
  background-color: red;
}
```

另外还允许属性的嵌套

```scss
.test {
  font: {
    family: "Helvetica Neue";
    size: 20px;
    weight: bold;
  }
}
```

```css
.test {
  font-family: "Helvetica Neue";
  font-size: 20px;
  font-weight: bold;
}
```



## 插值语法

通过 #{ } 进行插值，也就是在 #{ } 可以放入变量，回头可以解析 #{ } 变量对应的值，类似于 ES6 里面的模板字符串。

```scss
$name: foo;
$attr: border;
$base-font-size: 16px;
$line-height: 1.5;

p.#{$name} {
  color: red;
  #{$attr}-color: blue;
}
```

```css
p.foo {
  color: red;
  border-color: blue;
}
```

插值语法可以避免 Sass 去运行运算表达式（ calc ），直接编译为带有运算表达式的原生 CSS 代码。

```scss
.div1 {
  padding: calc($base-font-size * $line-height * 2);
}

.div2 {
  padding: calc(#{$base-font-size * $line-height} * 2);
}
```

```css
.div1 {
  padding: 48px;
}

.div2 {
  padding: calc(24px * 2);
}
```

插值在注释里面也是可以使用的

```scss
$author: xiejie;
/*!
  Author:#{$author}
*/
```

```css
/*!
  Author:xiejie
*/
```



## 运算

关于运算相关的一些函数：

- calc
- max 和 min
- clamp



### calc

该方法是 CSS3 提供的一个方法，用于做属性值的计算。

```scss
.container {
  width: 80%;
  padding: 0 20px;

  .element {
    width: calc(100% - 40px);
  }

  .element2{
    width: calc(100px - 40px);
  }
}
```

```css
.container {
  width: 80%;
  padding: 0 20px;
}
.container .element {
  width: calc(100% - 40px);
}
.container .element2 {
  width: 60px;
}
```

注意，在上面的编译当中，如果单位相同，Sass 在做编译的时候会直接运行 calc 运算表达式，得到计算出来的最终值，但是如果单位不相同，会保留 calc 运算表达式。



### min 和 max

min 是在一组数据里面找出最小值，max 就是在一组数据里面找到最大值。

```scss
$width1: 500px;
$width2: 600px;

.element{
  width: min($width1, $width2);
}
```

```css
.element {
  width: 500px;
}
```





### clamp

这个也是 CSS3 提供的函数，语法为：

```css
clamp(min, value, max)
```

min代表下限，max 代表上限，value 是需要限制的值。clamp 的作用就是将 value 限制在 min 和 max 之间，如果 value 小于了 min 那么就取 min 作为值，如果 vlaue 大于了 max，那么就取 max 作为值。如果value 在 min 和 max 之间，那么就返回 value 值本身。

```scss
$min-font-size: 16px;
$max-font-size: 24px;

body {
  font-size: clamp($min-font-size, 1.25vw + 1rem, $max-font-size);
}
```

```css
body {
  font-size: clamp(16px, 1.25vw + 1rem, 24px);
}
```

在上面的 CSS 代码中，我们希望通过视口宽度动态的调整 body 的字体大小。value 部分为 1.25vw + 1rem（这个计算会在浏览器环境中进行计算）。当视口宽度较小时，1.25vw + 1rem 计算结果可能是小于 16px，那么此时就取 16px。当视口宽度较大时，1.25vw + 1rem 计算结果可能大于 24px，那么此时就取 24px。如果 1.25vw + 1rem 计算值在 16px - 24px 之间，那么就取计算值结果。