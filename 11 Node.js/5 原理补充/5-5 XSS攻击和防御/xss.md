# XSS攻击和防御

XSS：Cross Site Scripting 跨站脚本攻击



## 存储型XSS

1. 恶意用户提交了恶意内容到服务器
2. 服务器没有识别，保存了恶意内容到数据库



1. 正常用户访问服务器
2. 服务器在不知情的情况下，给予了之前的恶意内容，让正常用户遭到攻击



## 反射型

1. 恶意用户分享了一个正常网站的链接，链接中带有恶意内容
2. 正常用户点击了该链接
3. 服务器在不知情的情况，把链接的恶意内容读取了出来，放进了页面中，让正常用户遭到攻击



## DOM型

1. 恶意用户通过任何方式，向服务器中注入了一些dom元素，从而影响了服务器的dom结构
2. 普通用户访问时，运行的是服务器的正常js代码