$(document).ready(function () {
    $("#btnLogIn").click(() => {
        let json = {usuario:$("#txtUser").val(),contrasenia:$("#txtPassword").val()};

        fetch(`http://${miPerro}/cuestionario/user/${JSON.stringify(json)}`,{ method: 'GET',
        mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            // console.log("perro: ",data)

            if(data[0][0].Count > 0){
                $(location).attr('href','../index.html');
            }
            else{
                alert("Usuario inexistente");
            }
        })
    });
});