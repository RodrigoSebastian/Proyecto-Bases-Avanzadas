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

    $("#newSurvey").click(() => {
        $(location).attr('href','../survey.html');
        
        // let preg = {
        //     hao: "1",
        //     hao2: "13",
        //     hao25: "14"
        // };

        // let obj = {
        //     name: "PerroHTML",
        //     password: "PerroPasswordHTML",
        //     ppgg: preg
        // };

        // saveText(JSON.stringify(obj),'json_testo.json')
        // console.log(obj);
    });

    let saveText = (text, filename) => {
        let a = document.createElement('a');
        $(a).attr('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click()
    }
});