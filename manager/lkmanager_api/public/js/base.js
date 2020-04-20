// 顶部特效进度条
NProgress.start();
NProgress.done();

// 侧边栏伸缩
$('.navs ul').prev('a').on('click', function () {
  $(this).next().slideToggle();
});

