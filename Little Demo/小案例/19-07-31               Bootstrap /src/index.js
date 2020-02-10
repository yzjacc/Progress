$('.toggle-btn').on('click', function () {
    $('.leftMenu').show();
    $('.wrap .right-content').css('paddingLeft', '220px');
});

$('#btn').on('click', function () {
    $("#btn").toggleClass(" glyphicon-triangle-right");
    $("#btn").toggleClass(" glyphicon-triangle-bottom");
});

$('.list-group-item').on('click', function () {
    $('.active').removeClass('active');
    var id = $(this).attr('data-id');
    $(this).addClass('active');
    $('#' + id).addClass('active');
});