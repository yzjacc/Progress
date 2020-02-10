function bindEvent() {
  var temp = 0;
  var conWidth = $(".wrapper").width();
  var conHeight = $(".wrapper").height();

  $(".content").on("click", function(e) {
    console.log(temp);
    if (e.clientX >= (conWidth / 2)) {

    if(temp > - $('.content').width() + 215 )
      temp = temp - 216;
      $(".content").css({ left: temp + "px" });
      console.log(e);
    } else {

    if(temp!=0)
      temp = temp + 216;
      $(".content").css({ left: temp + "px" });
      console.log(temp);
    }
  });
}
bindEvent();
