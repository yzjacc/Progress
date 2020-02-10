# 表单元素

一系列元素，主要用于收集用户数据

## input元素

输入框

- type属性：输入框类型

type: text， 普通文本输入框
type：password，密码框
type: date, 日期选择框，兼容性问题
type: search, 搜索框，兼容性问题
type: number，数字输入框
type: checkbox，多选框
type: radio，单选框

- value属性：输入框的值
- placeholder属性：显示提示的文本，文本框没有内容时显示


input元素可以制作按钮

当type值为reset、button、submit时，input表示按钮。

## select元素

下拉列表选择框

通常和option元素配合使用

## textarea元素

文本域，多行文本框

## 按钮元素

button

type属性：reset、submit、button，默认值submit

## 表单状态

readonly属性：布尔属性，是否只读，不会改变表单显示样式

disabled属性：布尔属性，是否禁用，会改变表单显示样式

## 配合表单元素的其他元素

### label

普通元素，通常配合单选和多选框使用

- 显示关联

可以通过for属性，让label元素关联某一个表单元素，for属性书写表单元素id的值

- 隐式关联

### datalist

数据列表

该元素本身不会显示到页面，通常用于和普通文本框配合

### form元素

通常，会将整个表单元素，放置form元素的内部，作用是当提交表单时，会将form元素内部的表单内容以合适的方式提交到服务器。

form元素对开发静态页面没有什么意义。

### fieldset元素

表单分组