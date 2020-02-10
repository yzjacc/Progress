### Css3历史

css2 演化为- - > css3（提出了新的标准）

google/safari 等当部分浏览器首先实现了css3功能 所以加上了-webkit-等前缀

举例：-webkit-border-radius;

当基本上所有浏览器都实现该属性，随着浏览器更新

开始支持 取消前缀形式和前缀形式 都适用的形式了

| prefix（前缀） | Browser       |
| -------------- | :------------ |
| -webkit        | Chrome safari |
| -moz           | firefox       |
| -ms            | IE            |
| -o             | opera         |

##### 查询属性的兼容性权威网站

reference manual website: http://css.doyoe.com

Authoritative inquiry website : http://www.caniuse.com

### 预处理器 pre-processor

定义了一套语法规则 根据该语法规则编写 后生成css规范编码形式（方便编写代码）

less/sass/cssNext（插件）

cssNext（用来实现一些未来的标准 未完全在各大浏览器实现的 ）

```html
<!-- :root在html中相当于html -->
:root{ 
  --headline-color:#333; 
}
@custom-selector: --healine h1,h2,h3,h4,h5;
:--healine { 
  color:var( --headline-color ); 
}
```

sass：

```html
$font-stack:arail,...; 
$mysituation-color: #444; 
div{ 
  span{ 
    color:$mysituation-color; 
    p{ 
      font:100% $font-stack;
    } 
  } 
}
```



### 后处理器 post-processor

autoprefixer：后处理器的插件

```html
div { 
  border-radius: ; 
} 
div { border-radius: ; 
  -webkit-border-radius: ;
  -moz-border-radius: ;
}
```

先编写css代码 但是最后根据环境下的条件下补齐前缀  根据 http://www.caniuse.com网站规则

其实相同的功能 预处理器也可以做 但是假如有一天都不需要加前缀时 可以直接撤掉后处理器 这样可维护性较强

### possCss（工具）

用js实现的css的抽象的语法树 AST（Abstract Syntax Tree）

最常用的就是结合autoprefixer 或者 cssNext 使用

将css解析成语法树 剩下的事留给后人来做 （运用插件）

postCss + 插件（充分体现扩展性， 200多个）

插件基于该工具语法树才能使用。

