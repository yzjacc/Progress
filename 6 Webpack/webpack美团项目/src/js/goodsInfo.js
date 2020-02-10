
import '../css/reset.css';
import '../webfont/iconfont.css';
import '../css/meituanDetail.css';

import $ from 'jquery';
window.$ = $;

function getGoodsInfo() {
    var _url = 'http://localhost:9191/api/list.json';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _url,
        timeout: 8000,
        success: function (data) {
            getData(data);
            console.log(data);
        },
        error: function (data) {
            alert('商品详情数据获取失败');
        }
    })
}
getGoodsInfo();

function getData(data) {
    var dataList = data.list;
    var idNum = window.location.search.slice(4);
    console.log(idNum);
    var len = dataList.length;
    for (var i = 0; i < len; i++) {
        if (dataList[i].id == idNum) {
            addDom(dataList[i]);
            return;
        }
    }
}


function addDom(dataList) {
    var str = '';
    var info = dataList.info;
    $('.bigimg').find('img').attr('src', info.imgurl);
    $('.bigimg').find('.name').text(info.name);
    $('.bigimg').find('.des').text(info.des);
    $('.price-box .price').find('strong').text(info.price);
    $('.seller .address').find('h4').text(info.receive);
    $('.seller .address').find('p').text(info.adderess);
    var comment = dataList.info.comment;
    comment.forEach(function (ele, index) {
        str += '<li class="item-evaluate"><div class="foot-user clearfix">\
            <img src="'+ ele.pic + '" alt=""><div class="user-strart">\
                <h5>'+ ele.user + '</h5></div>\
            <p class="evaluate-date">'+ ele.date + '</p></div>\
        <div class="evaluate-content"><p>'+ ele.content + '</p>\
            <p><span><img src="'+ ele.img + '" alt=""></span></p>\
        </div><div class="locale"><a href="###">'+ info.receive + '</a></div></li>';
    })
    $('.food-evaluate').find('ul').html(str);
}
