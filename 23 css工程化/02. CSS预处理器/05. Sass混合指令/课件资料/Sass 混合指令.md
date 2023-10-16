# Sass 混合指令

在 Sass 里面存在一种叫做混合指令的东西，它最大的特点就是允许我们创建可以重用的代码片段，从而避免了代码的重复，提供代码的可维护性。



## 混合指令基本的使用

首先要使用混合指令，我们需要先定义一个混合指令：

```scss
@mixin name {
  // 样式。。。。
}
```

例如：

```scss
// 创建了一个指令
@mixin large-text {
  font: {
    family: "Open Sans", sans-serif;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

接下来是如何使用指令，需要使用到 @include，后面跟上混合指令的名称即可。

```scss
// 创建了一个指令
@mixin large-text {
  font: {
    family: "Open Sans", sans-serif;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

p {
  @include large-text;
  padding: 20px;
}

div {
  width: 200px;
  height: 200px;
  background-color: #fff;
  @include large-text;
}
```

```css
p {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 20px;
}

div {
  width: 200px;
  height: 200px;
  background-color: #fff;
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
}
```

我们发现，混合指令编译之后，就是将混合指令内部的 CSS 样式放入到了 @include 的地方，因此我们可以很明显的感受到混合指令就是提取公共的样式出来，方便复用和维护。

在混合指令中，我们也可以引用其他的混合指令：

```scss
@mixin background {
  background-color: #fc0;
}

@mixin header-text {
  font-size: 20px;
}

@mixin compound {
  @include background;
  @include header-text;
}

p{
  @include compound;
}
```

```css
p {
  background-color: #fc0;
  font-size: 20px;
}
```



混合指令是可以直接在最外层使用的，但是对混合指令本身有一些要求。要求混合指令的内部要有选择器。

```scss
@mixin background {
  background-color: #fc0;
}

@mixin header-text {
  font-size: 20px;
}

@mixin compound {
  div{
    @include background;
    @include header-text;
  }
  
}

@include compound;
```

```css
div {
  background-color: #fc0;
  font-size: 20px;
}
```

例如在上面的示例中，compound 混合指令里面不再是单纯的属性声明，而是有选择器在里面，这样的话就可以直接在最外层使用。

一般来讲，我们要在外部直接使用，我们一般会将其作为一个后代选择器。例如：

```scss
.box{
  @include compound;
}
```

```css
.box div {
  background-color: #fc0;
  font-size: 20px;
}
```



## 混合指令的参数

混合指令能够设置参数，只需要在混合指令的后面添加一对圆括号即可，括号里面书写对应的形参。

例如：

```scss
@mixin bg-color($color, $radius) {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: $color;
  border-radius: $radius;
}

.box1 {
  @include bg-color(red, 10px);
}

.box2 {
  @include bg-color(blue, 20px);
}
```

```css
.box1 {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: red;
  border-radius: 10px;
}

.box2 {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: blue;
  border-radius: 20px;
}
```

既然在定义混合指令的时候，指定了参数，那么在使用的时候，传递的参数的个数一定要和形参一致，否则编译会出错。

在定义的时候，支持给形参添加默认值，例如：

```scss
@mixin bg-color($color, $radius:20px) {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: $color;
  border-radius: $radius;
}

.box1 {
  @include bg-color(blue);
}
```

上面的示例是可以通过编译的，因为在定义 bg-color 的时候，我们为 $radius 设置了默认值。所以在使用的时候，即便没有传递第二个参数，也是 OK 的，因为会直接使用默认值。

在传递参数的时候，还支持关键词传参，就是指定哪一个参数是对应的哪一个形参，例如：

```scss
@mixin bg-color($color: blue, $radius) {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: $color;
  border-radius: $radius;
}

.box1 {
  @include bg-color($radius: 20px, $color: pink);
}

.box2 {
  @include bg-color($radius: 20px);
}
```

```css
.box1 {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: pink;
  border-radius: 20px;
}

.box2 {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: blue;
  border-radius: 20px;
}
```



在定义混合指令的时候，如果不确定使用混合指令的地方会传入多少个参数，可以使用 ... 来声明（类似于 js 里面的不定参数），Sass 会把这些值当作一个列表来进行处理。

```scss
@mixin box-shadow($shadow...){
  // ...
  box-shadow: $shadow;
}

.box1{
  @include box-shadow(
    0 1px 2px rgba(0,0,0,.5)
  )
}

.box2{
  @include box-shadow(
    0 1px 2px rgba(0,0,0,.5),
    0 2px 5px rgba(100,0,0,.5)
  )
}
```

```css
.box1 {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.box2 {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 5px rgba(100, 0, 0, 0.5);
}
```

在 Sass 中，... 有些时候也可以表示为参数展开的含义，例如：

```scss
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}

$values: red, blue, pink;

.box{
  @include colors($values...)
}
```



## @content

@content 表示占位的意思，在使用混合指令的时候，会将指令大括号里面的内容放置到 @content 的位置，有点类似于插槽。

```scss
@mixin test {
  html {
    @content
  }
};

@include test {
  background-color: red;
  .logo {
    width: 600px;
  }
}

@include test {
  color : blue;
  .box {
    width: 200px;
    height: 200px;
  }
}
```

```css
html {
  background-color: red;
}
html .logo {
  width: 600px;
}

html {
  color: blue;
}
html .box {
  width: 200px;
  height: 200px;
}
```

下面是一个实际开发中的例子：

```scss
@mixin button-theme($color) {
  background-color: $color;
  border: 1px solid darken($color, 15%);

  &:hover {
    background-color: lighten($color, 5%);
    border-color: darken($color, 10%);
  }

  @content
};


.button-primary{
  @include button-theme(#007bff){
    width: 500px;
    height: 400px;
  }
}

.button-secondary{
  @include button-theme(#6c757d){
    width: 300px;
    height: 200px;
  }
}
```

```css
.button-primary {
  background-color: #007bff;
  border: 1px solid #0056b3;
  width: 500px;
  height: 400px;
}
.button-primary:hover {
  background-color: #1a88ff;
  border-color: #0062cc;
}

.button-secondary {
  background-color: #6c757d;
  border: 1px solid #494f54;
  width: 300px;
  height: 200px;
}
.button-secondary:hover {
  background-color: #78828a;
  border-color: #545b62;
}
```

最后我们需要说一先关于 @content 的作用域的问题。

在混合指令的局部作用域里面所定义的变量不会影响 @content 代码块中的变量，同样，在 @content 代码块中定义的变量不会影响到混合指令中的其他变量，**两者之间的作用域是隔离的**。

```scss
@mixin scope-test {
  $test-variable: "mixin";

  .mixin{
    content: $test-variable
  }

  @content
};

.test {
  $test-variable: "test";
  @include scope-test {
    .content {
      content : $test-variable
    }
  }
}
```

```css
.test .mixin {
  content: "mixin";
}
.test .content {
  content: "test";
}
```

