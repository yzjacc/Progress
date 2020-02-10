// 国家，省份，城市，区域，街道

// 选择国家，

// 回调地狱最大的问题是，不好维护。

$.ajax({
    url: "根据国家，查询省份",
    data:"",
    success: searchProvince
});

function searchProvince() {
    $.ajax({
        url: "根据省份，查询城市",
        data: "",
        success: searchArea
    });
}

function searchArea() {
    $.ajax({
        url: "根据城市，查询区域",
        data: "",
        success: searchRoad
    });
}

function searchRoad () {
    $.ajax({
        url: "根据区域，查询街道",
        data: "",
        success: function () {
            //最后查出分店位置。
        }
    });
}

// 我是一段代码

// 回调地狱，本质到底有什么问题？
// 污染全局变量
// 异步变同步，（对性能没有任何改变，同步的代码更容易读。）