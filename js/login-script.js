$(document).ready(function () {
    $("#btnLogIn").click(() => {
        console.log("click");
        if(checkUser('torybolla','123')) {
            $(location).attr('href','../index.html');
        }
    });
});


function checkUser(user,password){
    if(user == 'torybolla' && password == '123')
        return true;

    return false;
}