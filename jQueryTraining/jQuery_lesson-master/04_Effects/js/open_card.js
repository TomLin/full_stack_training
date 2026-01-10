$(function(){
    $(".openB").on('click',function(){
      $(".left").addClass("open");
      setTimeout(function(){
        $(".right").addClass("open");
      }, 250);
      setTimeout(function(){
        $(".back").addClass("open");
      }, 350);
      $(".closeB").delay(1000).fadeIn();
    });
  
    $(".closeB").on('click',function(){
      setTimeout(function(){
        $(".left").removeClass("open");
      }, 250);
      $(".right").removeClass("open");
      setTimeout(function(){
        $(".back").removeClass("open");
      }, 600);
      $(".closeB").fadeOut();
    });
  });
  