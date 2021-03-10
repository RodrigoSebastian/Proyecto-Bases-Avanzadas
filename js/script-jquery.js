$(window).on("load", function () {
    $("#container").css("opacity","1");
});

$(document).ready(() => {
    // $("#preloader").remove();

    let backRand = Math.floor((Math.random() * 9) + 1);
    $("#backgroundImg").attr("src","img/Background/bg"+ backRand +".jpg")

    $("#newSurvey").hover(function () {
         $(this).css("cursor","pointer");
        });
});