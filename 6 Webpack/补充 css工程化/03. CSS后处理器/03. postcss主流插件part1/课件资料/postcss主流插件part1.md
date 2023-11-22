# postcss主流插件part1

- autoprefixer
- cssnano
- stylelint

## autoprefixer

这里我们再来复习一下：

```css
/* 编译前 */
::placeholder {
    color: gray;
}

.image {
    background-image: url(image@1x.png);
}

@media (min-resolution: 2dppx) {
    .image {
        background-image: url(image@2x.png);
    }
}
```

```css
/* 编译后 */
::-webkit-input-placeholder {
    color: gray;
}

::-moz-placeholder {
    color: gray;
}

:-ms-input-placeholder {
    color: gray;
}

::-ms-input-placeholder {
    color: gray;
}

::placeholder {
    color: gray;
}

.image {
    background-image: url(image@1x.png);
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
    .image {
        background-image: url(image@2x.png);
    }
}
```

关于 autoprefixer 这个插件，本身没有什么好讲的，主要是要介绍 browerslist 这个知识点，这个 browerslist 主要是用来配置兼容的浏览器的范围。从第一款浏览器诞生到现在，浏览的种类以及版本是非常非常多的，因此我们在做兼容的时候，不可能把所有的浏览器都做兼容，并且也没有意义，一般是需要指定范围的。

browserslist 就包含了一些配置规则，我们可以通过这些配置规则来指定要兼容的浏览器的范围：

- last n versions：支持最近的 n 个浏览器版本。last 2 versions 表示支持最近的两个浏览器版本
- n% ：支持全球使用率超过 n% 的浏览器。 > 1% 表示要支持全球使用率超过 1% 的浏览器
- cover n%：覆盖 n% 的主流浏览器
- not dead：支持所有“非死亡”的浏览器，已死亡的浏览器指的是那些已经停止更新的浏览器
- not ie<11：排除 ie 11 以下的浏览器
- chrome>=n ：支持 chrome浏览器大于等于 n 的版本

你可以在 https://github.com/browserslist/browserslist#full-list 看到 browserslist 可以配置的所有的值。

另外你可以在 https://browserslist.dev/?q=PiAxJQ%3D%3D 看到 browserslist 配置的值所对应的浏览器具体范围。

还有一点就是关于 browserslist 配置的值是可以有多个，如果有多条规则，可以使用关键词 or、and、not 来指定多条规则之间的关系。关于这些关键词如何组合不同的规则，可以参阅：https://github.com/browserslist/browserslist#query-composition

接下来我们来看一下如何配置 browserslist，常见的有三种方式：

1. 在项目的根目录下面创建一个 .browerslistrc 的文件，在里面书写范围列表（这种方式是最推荐的）

```js
>1%
last 2 versions of
not dead
```

2. 在 package.json 里面添加一个 browserslist 字段，然后进行配置：

```json
{
  "name": "xxx",
  "version": : "xxx",
  ...
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
```

3. 可以在 postcss.config.js 配置文件中进行配置

```js
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: "last 10 versions",
    }),
  ],
};
```



## cssnano

这是一个使用率非常高的插件，因为该插件做的事情是对 CSS 进行一个压缩

cssnano 对应的官网地址：https://cssnano.co/

使用之前第一步还是安装：

```bash
pnpm add cssnano -D
```

之后就是在配置文件中配置这个插件：

```js
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")
  ],
};
```

简单的使用方式演示完了之后，接下来延伸出来了两个问题：

- 现在我们插件的数量从之前的一个变成多个，插件之间是否有顺序关系？
  - 在 postcss.config.js 文件里面配置插件的时候，一定要注意插件的顺序，这一点是非常重要的，因为有一些插件依赖于其他的插件的输出，你可以将 plugins 对应的数组看作是一个流水线的操作。先交给数组的第一项插件进行处理，之后将处理结果交给数组配置的第二项插件进行处理，以此类推...
- cssnano 是否需要传入配置
  - 理论上来讲，是不需要的，因为 cssnano 默认的预设就已经非常好了，一般我们不需要做其他的配置
  - cssnano 本身又是由一些其他的插件组成的
    - *postcss-discard-comments*：删除 *CSS* 中的注释。
    - *postcss-discard-duplicates*：删除 *CSS* 中的重复规则。
    - *postcss-discard-empty*：删除空的规则、媒体查询和声明。
    - *postcss-discard-overridden*：删除被后来的相同规则覆盖的无效规则。
    - *postcss-normalize-url*：优化和缩短 URL。
    - *postcss-minify-font-values*：最小化字体属性值。
    - *postcss-minify-gradients*：最小化渐变表示。
    - *postcss-minify-params*：最小化@规则的参数。
    - *postcss-minify-selectors*：最小化选择器。
    - *postcss-normalize-charset*：确保只有一个有效的字符集 @规则。
    - *postcss-normalize-display-values*：规范化 display 属性值。
    - *postcss-normalize-positions*：规范化背景位置属性。
    - *postcss-normalize-repeat-style*：规范化背景重复样式。
    - *postcss-normalize-string*：规范化引号。
    - *postcss-normalize-timing-functions*：规范化时间函数。
    - *postcss-normalize-unicode*：规范化 *unicode-range* 描述符。
    - *postcss-normalize-whitespace*：规范化空白字符。
    - *postcss-ordered-values*：规范化属性值的顺序。
    - *postcss-reduce-initial*：将初始值替换为更短的等效值。
    - *postcss-reduce-transforms*：减少变换属性中的冗余值。
    - *postcss-svgo*：优化和压缩内联 SVG。
    - *postcss-unique-selectors*：删除重复的选择器。
    - *postcss-zindex*：重新计算 *z-index* 值，以减小文件大小。

因此我们可以定制具体某一个插件的行为，例如：

```js
// postcss 配置主要其实就是做插件的配置

module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({
      preset: [
        'default',
        {
          discardComments: false,
          discardEmpty: false
        }
      ]
    })
  ],
};
```

配置项目的名字可以在 https://cssnano.co/docs/what-are-optimisations/ 这里找到。



## stylelint

stylelint 是规范我们 CSS 代码的，能够将 CSS 代码统一风格。

```bash
pnpm add stylelint stylelint-config-standard -D
```

这里我们安装了两个依赖：

- stylelint：做 CSS 代码风格校验，但是具体的校验规则它是不知道了，需要我们提供具体的校验规则
- stylelint-config-standard：这是 stylelint 的一套校验规则，并且是一套标准规则

接下来我们就需要在项目的根目录下面创建一个 .stylelintrc ，这个文件就使用用来指定你的具体校验规则

```js
{
    "extends": "stylelint-config-standard"
}
```

在上面的代码中，我们指定了校验规则继承 stylelint-config-standard 这一套校验规则

之后在 postcss.config.js 里面进行插件的配置，配置的时候注意顺序

```js
// postcss 配置主要其实就是做插件的配置

module.exports = {
  plugins: [
    require("stylelint"),
    require("autoprefixer"),
    require("cssnano")
  ],
};
```

- 能否在继承了 stylelint-config-standard 这一套校验规则的基础上自定义校验规则

  - 肯定是可以的。因为不同的公司编码规范会有不同，一套标准校验规则是没有办法覆盖所有的公司编码规范

  ```js
  {
      "extends": "stylelint-config-standard",
      "rules": {
          "comment-empty-line-before": null
      }
  }
  ```

  通过上面的方式，我们就可以自定义校验规则。

  至于有哪些校验规则，可以在 stylelint 官网查询到的：https://stylelint.io/user-guide/rules/

- 检查出来的问题能否自动修复

  - 当然也是可以修复的，但是要注意没有办法修复所有类型的问题，只有部分问题能够被修复
  - 要自动修复非常简单，只需要将 stylelint 插件的 fix 配置项配置为 true 即可

  ```js
  // postcss 配置主要其实就是做插件的配置
  
  module.exports = {
    plugins: [
      require("stylelint")({
        fix: true
      }),
      require("autoprefixer"),
      // require("cssnano")
    ],
  };
  ```

  