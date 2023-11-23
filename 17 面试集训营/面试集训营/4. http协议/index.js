var xhr = new XMLHttpRequest(); //创建发送请求的对象
xhr.onreadystatechange = function () { //当请求状态发生改变时运行的函数
    // xhr.readyState： 一个数字，用于判断请求到了哪个阶段
    // 0: 刚刚创建好了请求对象，但还未配置请求（未调用open方法）
    // 1: open方法已被调用
    // 2: send方法已被调用
    // 3: 正在接收服务器的响应消息体
    // 4: 服务器响应的所有内容均已接收完毕
    if (xhr.readyState === 4) {
        //服务器的响应已经全部拿到
        var ps = JSON.parse(xhr.responseText)
        var ul = document.getElementById("list");
        for (var i = 0; i < ps.length; i++) {
            var p = ps[i];
            var li = document.createElement("li");
            li.innerText = p.simpleName;
            ul.appendChild(li);
        }
    }

    // xhr.responseText： 获取服务器响应的消息体文本

    // xhr.getResponseHeader("Content-Type") 获取响应头Content-Type
}
// xhr.setRequestHeader("Content-Type", "application/json"); //设置请求头
xhr.open("GET", "/api/local"); //配置请求
xhr.send(null); //构建请求体，发送到服务器