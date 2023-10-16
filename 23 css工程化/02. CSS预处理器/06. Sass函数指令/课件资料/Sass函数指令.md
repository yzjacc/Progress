# Sass函数指令

上一小节所学习的混合指令虽然有点像函数，但是它并不是函数，因为混合指令所做的事情就是单纯的代码的替换工作，里面并不存在任何的计算。在 Sass 里面是支持函数指令。



## 自定义函数

在 Sass 里面自定义函数的语法如下：

```scss
@function fn-name($params...){
  @return XXX;
}
```

具体示例如下：

```scss
@function divide($a, $b){
  @return $a / $b
};

.container {
  width: divide(100px, 2)
}
```

```css
.container {
  width: 50px;
}
```

函数可以接收多个参数，如果不确定会传递几个参数，那么可以使用前面介绍过的不定参数的形式。

```scss
@function sum($nums...) {
  $sum: 0;
  @each $n in $nums {
    $sum: $sum + $n;
  }
  @return $sum;
}

.box1 {
  width: sum(1, 2, 3) + px;
}

.box2 {
  width: sum(1, 2, 3, 4, 5, 6) + px;
}
```

```css
.box1 {
  width: 6px;
}

.box2 {
  width: 21px;
}
```

最后我们还是来看一个实际开发中的示例：

```scss
// 根据传入的 $background-color 返回适当的文字颜色
@function contrast-color($background-color) {
  // 计算背景颜色的亮度
  $brightness: red($background-color) * 0.299 + green($background-color) * 0.587 + blue($background-color) * 0.114;

  // 根据亮度来返回黑色或者白色的文字颜色
  @if $brightness > 128 {
    @return #000;
  } @else {
    @return #fff;
  }
}

.button {
  $background-color: #007bff;
  background-color: $background-color;
  color: contrast-color($background-color);
}
```

在上面的代码示例中，我们首先定义了一个名为 contrast-color 的函数，该函数接收一个背景颜色参数，函数内部会根据这个背景颜色来决定文字应该是白色还是黑色。

```css
.button {
  background-color: #007bff;
  color: #fff;
}
```



## 内置函数

除了自定义函数，Sass 里面还提供了非常多的内置函数，你可以在官方文档：

https://sass-lang.com/documentation/modules



### 字符串相关内置函数

| 函数名和参数类型                        |                  函数作用                   |
| :-------------------------------------- | :-----------------------------------------: |
| quote($string)                          |                  添加引号                   |
| unquote($string)                        |                  除去引号                   |
| to-lower-case($string)                  |                  变为小写                   |
| to-upper-case($string)                  |                  变为大写                   |
| str-length($string)                     |        返回$string的长度(汉字算一个)        |
| str-index($string，$substring)          |        返回$substring在$string的位置        |
| str-insert($string, $insert, $index)    |       在$string的$index处插入$insert        |
| str-slice($string, $start-at, $end-at） | 截取$string的$start-at和$end-at之间的字符串 |

注意索引是从 1 开始的，如果书写 -1，那么就是倒着来的。两边都是闭区间

```scss
$str: "Hello world!";

.slice1{
  content: str-slice($str, 1, 5)
}

.slice2{
  content:str-slice($str, -1)
}
```

```css
.slice1 {
  content: "Hello";
}

.slice2 {
  content: "!";
}
```



### 数字相关内置函数

| 函数名和参数类型        |                           函数作用                           |
| ----------------------- | :----------------------------------------------------------: |
| percentage($number)     |                       转换为百分比形式                       |
| round($number)          |                        四舍五入为整数                        |
| ceil($number)           |                         数值向上取整                         |
| floor($number)          |                         数值向下取整                         |
| abs($number)            |                          获取绝对值                          |
| min($number...)         |                          获取最小值                          |
| max($number...)         |                          获取最大值                          |
| random($number?:number) | 不传入值：获得0-1的随机数；传入正整数n：获得0-n的随机整数（左开右闭） |

```scss
.item{
  width: percentage(2/5);
  height: random(100) + px;
  color: rgb(random(255),random(255),random(255));
}
```

```css
.item {
  width: 40%;
  height: 83px;
  color: rgb(31, 86, 159);
}
```



### 数组相关内置函数

| 函数名和参数类型                 |                           函数作用                           |
| -------------------------------- | :----------------------------------------------------------: |
| length($list)                    |                         获取数组长度                         |
| nth($list, n)                    |                      获取指定下标的元素                      |
| set-nth($list, $n, $value)       |                   向$list的$n处插入$value                    |
| join($list1, $list2, $separator) | 拼接$list1和list2；$separator为新list的分隔符，默认为auto，可选择comma、space |
| append($list, $val, $separator)  | 向$list的末尾添加$val；$separator为新list的分隔符，默认为auto，可选择comma、space |
| index($list, $value)             |                返回$value值在$list中的索引值                 |
| zip($lists…)                     | 将几个列表结合成一个多维的列表；要求每个的列表个数值必须是相同的 |

下面是一个具体的示例：

```scss
// 演示的是 join 方法
$list1: 1px solid, 2px dotted;
$list2: 3px dashed, 4px double;
$combined-list: join($list1, $list2, comma);

// 演示的是 append 方法
$base-colors: red, green, blue;
$extended-colors: append($base-colors, yellow, comma);

// 演示 zip 方法
$fonts: "Arial", "Helvetica", "Verdana";
$weights: "normal", "bold", "italic";
// $font-pair: ("Arial", "normal"),("Helvetica", "bold"),("Verdana","italic")
$font-pair: zip($fonts, $weights);

// 接下来我们来生成一下具体的样式
@each $border-style in $combined-list {
  .border-#{index($combined-list, $border-style)} {
    border: $border-style;
  }
}

@each $color in $extended-colors {
  .bg-#{index($extended-colors, $color)} {
    background-color: $color;
  }
}

@each $pair in $font-pair {
  $font: nth($pair, 1);
  $weight: nth($pair, 2);
  .text-#{index($font-pair, $pair)} {
    font-family: $font;
    font-weight: $weight;
  }
}
```

```css
.border-1 {
  border: 1px solid;
}

.border-2 {
  border: 2px dotted;
}

.border-3 {
  border: 3px dashed;
}

.border-4 {
  border: 4px double;
}

.bg-1 {
  background-color: red;
}

.bg-2 {
  background-color: green;
}

.bg-3 {
  background-color: blue;
}

.bg-4 {
  background-color: yellow;
}

.text-1 {
  font-family: "Arial";
  font-weight: "normal";
}

.text-2 {
  font-family: "Helvetica";
  font-weight: "bold";
}

.text-3 {
  font-family: "Verdana";
  font-weight: "italic";
}
```



### 字典相关内置函数

| 函数名和参数类型        |                 函数作用                 |
| ----------------------- | :--------------------------------------: |
| map-get($map, $key)     |        获取$map中$key对应的$value        |
| map-merge($map1, $map2) |     合并$map1和$map2，返回一个新$map     |
| map-remove($map, $key)  |     从$map中删除$key，返回一个新$map     |
| map-keys($map)          |            返回$map所有的$key            |
| map-values($map)        |           返回$map所有的$value           |
| map-has-key($map, $key) | 判断$map中是否存在$key，返回对应的布尔值 |
| keywords($args)         |  返回一个函数的参数，并可以动态修改其值  |

下面是一个使用了字典内置方法的相关示例：

```scss
// 创建一个颜色映射表
$colors: (
  "primary": #007bff,
  "secondary": #6c757d,
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
  "danger": #dc3545,
);

// 演示通过 map-get 获取对应的值
@function btn-color($color-name){
  @return map-get($colors, $color-name);
}

// 演示通过 map-keys 获取映射表所有的 keys
$color-keys: map-keys($colors);

// 一个新的颜色映射表
$more-colors:(
  "light": #f8f9fa,
  "dark": #343a40
);

// 要将新的颜色映射表合并到 $colors 里面

$all-colors: map-merge($colors, $more-colors);

// 接下来我们来根据颜色映射表生成样式
@each $color-key, $color-value in $all-colors{
  .text-#{$color-key}{
    color:$color-value
  }
}

button {
  color: btn-color("primary");
}
```

```css
.text-primary {
  color: #007bff;
}

.text-secondary {
  color: #6c757d;
}

.text-success {
  color: #28a745;
}

.text-info {
  color: #17a2b8;
}

.text-warning {
  color: #ffc107;
}

.text-danger {
  color: #dc3545;
}

.text-light {
  color: #f8f9fa;
}

.text-dark {
  color: #343a40;
}

button {
  color: #007bff;
}
```



### 颜色相关内置函数

*RGB* 函数

| 函数名和参数类型               |                           函数作用                           |
| ------------------------------ | :----------------------------------------------------------: |
| rgb($red, $green, $blue)       |                     返回一个16进制颜色值                     |
| rgba($red,$green,$blue,$alpha) | 返回一个rgba；$red,$green和$blue可被当作一个整体以颜色单词、hsl、rgb或16进制形式传入 |
| red($color)                    |                   从$color中获取其中红色值                   |
| green($color)                  |                   从$color中获取其中绿色值                   |
| blue($color)                   |                   从$color中获取其中蓝色值                   |
| mix($color1,$color2,$weight?)  |     按照$weight比例，将$color1和$color2混合为一个新颜色      |


*HSL* 函数

| 函数名和参数类型                         | 函数作用                                                     |
| ---------------------------------------- | ------------------------------------------------------------ |
| hsl($hue,$saturation,$lightness)         | 通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色 |
| hsla($hue,$saturation,$lightness,$alpha) | 通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色 |
| saturation($color)                       | 从一个颜色中获取饱和度（saturation）值                       |
| lightness($color)                        | 从一个颜色中获取亮度（lightness）值                          |
| adjust-hue($color,$degrees)              | 通过改变一个颜色的色相值，创建一个新的颜色                   |
| lighten($color,$amount)                  | 通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色           |
| darken($color,$amount)                   | 通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色           |
| hue($color)                              | 从一个颜色中获取亮度色相（hue）值                            |

*Opacity* 函数

| 函数名和参数类型                                            | 函数作用         |
| ----------------------------------------------------------- | ---------------- |
| alpha($color)/opacity($color)                               | 获取颜色透明度值 |
| rgba($color,$alpha)                                         | 改变颜色的透明度 |
| opacify($color, $amount) / fade-in($color, $amount)         | 使颜色更不透明   |
| transparentize($color, $amount) / fade-out($color, $amount) | 使颜色更加透明   |



### 其他内置函数

| 函数名和参数类型               |                           函数作用                           |
| ------------------------------ | :----------------------------------------------------------: |
| type-of($value)                |                       返回$value的类型                       |
| unit($number)                  |                      返回$number的单位                       |
| unitless($number)              | 判断$number是否没用带单位，返回对应的布尔值，没有带单位为 true |
| comparable($number1, $number2) | 判断$number1和$number2是否可以做加、减和合并，返回对应的布尔值 |

示例如下：

```scss
$value: 42;

$value-type: type-of($value); // number

$length: 10px;
$length-unit: unit($length); // "px"

$is-unitless: unitless(42); // true

$can-compare: comparable(1px, 2em); // false
$can-compare2: comparable(1px, 2px); // true

// 根据 type-of 函数的结果生成样式
.box {
  content: "Value type: #{$value-type}";
}

// 根据 unit 函数的结果生成样式
.length-label {
  content: "Length unit: #{$length-unit}";
}

// 根据 unitless 函数的结果生成样式
.unitless-label {
  content: "Is unitless: #{$is-unitless}";
}

// 根据 comparable 函数的结果生成样式
.comparable-label {
  content: "Can compare: #{$can-compare}";
}

.comparable-label2 {
  content: "Can compare: #{$can-compare2}";
}
```

```css
.box {
  content: "Value type: number";
}

.length-label {
  content: "Length unit: px";
}

.unitless-label {
  content: "Is unitless: true";
}

.comparable-label {
  content: "Can compare: false";
}

.comparable-label2 {
  content: "Can compare: true";
}
```

