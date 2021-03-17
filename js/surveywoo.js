let rootTag;

$(document).ready(() => {
    rootTag = $('#questionContainer');
    CreateCard();

    $('#btnNewQuestion').click(CreateCard);

    $('#btnFinish').click( () => {
        let json = generarJson();
        if(json != null){
            saveText(JSON.stringify(json),'json_testo.json')
        }
    });

    $("#btnDelete").click(deleteQuestion);
})

function generarJson() {
    let objJson = [];
    let nombreJ = $("#txtSurveyName").val();
    let descripcionJ = $("#txtSuveyDescription").val();
    let cantidad = $("#questionContainer").find('.card-js').length;

    if(nombreJ != '' && descripcionJ != '') {
        let numPregunta = 1;
        let preguntasJson = [];

        for(let i = 0; i < cantidad; i++) {

            let pregunta = $("#name" + i).val();
            let tipo_pregunta = $("#selector" + i).val();
            let cantidad_respuestas = 0;

            if(pregunta != '' && (tipo_pregunta != 1 || tipo_pregunta != 2 || tipo_pregunta != 3)){
                let respuestasJson = [];

                if(tipo_pregunta == 1) {
                    cantidad_respuestas = 1;
                    respuestasJson.push({respuesta:"0"});
                }
                else {
                    cantidad_respuestas = $("#answerContent" + i).find('.uk-grid').length;

                    for(let j = 0; j < cantidad_respuestas; j++){
                        let respuesta = $("#answerI"+ i + "-" + j).val();
                        let correctaBool = $("#answerC" + i + "-" + j).prop('checked');
                        if(respuesta != ''){
                            respuestasJson.push({respuesta:respuesta,opcion_correcta:correctaBool});
                        }
                        else {
                            alert("Datos Faltantes: Respuesta " + j + " Pregunta: " + i);
                            return null;
                        }
                    }
                }
                preguntasJson.push({pregunta:pregunta,tipo_pregunta:tipo_pregunta,respuestas:respuestasJson});
            }
            else{
                alert("Datos Faltante: Titulo Pregunta "+ i +"/ Tipo Respuestas");
                return null;
            }
        }
        objJson.push({nombre:nombreJ,descripcion:descripcionJ,preguntas:preguntasJson});
        console.log("JSON Generado")
    }
    else{
        alert("Datos Faltantes: Nombre o Descripción")
        return null;
    }

    return objJson;
}

let saveText = (text, filename) => {
    let a = document.createElement('a');
    $(a).attr('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
}


function CreateCard() {
    let cardNumber = rootTag.children().length

    var divRoot = $('<div></div>');
    divRoot.attr('id', 'card' + cardNumber);
    divRoot.attr('class', 'card-js');
    rootTag.append(divRoot);

    var cardCore = $('<div></div>');
    cardCore.addClass('uk-card uk-cardX uk-border-rounded uk-card-default uk-card-hover uk-card-body uk-animation-scale-up');
    divRoot.append(cardCore);

    var cardTitle = $('<h3></h3>')
    cardTitle.addClass('uk-card-title')
    cardTitle.text('Question Title');
    cardCore.append(cardTitle);

    var div = $('<div></div>');
    div.addClass('uk-margin uk-card-title');

    var input = $('<input></input>');
    input.addClass('uk-input uk-border-rounded');
    input.attr('id','name' + cardNumber)
    div.append(input);
    cardCore.append(div);

    let questionType = $('<h4></h4>');
    questionType.text('Question type');
    cardCore.append(questionType);

    var div = $('<div></div>');
    div.addClass('uk-margin');
    cardCore.append(div);

    var selector = $('<select></select>');
    selector.addClass('uk-select uk-border-rounded');
    selector.attr("id", "selector" + String(cardNumber));
    cardCore.append(selector);

    var option = $('<option></option>');
    option.attr("value", "0");
    option.attr('selected', 'selected');
    option.attr('disabled', 'disabled');
    option.text('Select an option');
    selector.append(option);

    var option = $('<option></option>');
    option.attr("value", "1");
    option.text('Open question');
    selector.append(option);

    var option = $('<option></option>');
    option.attr("value", "2");
    option.text('Multiple option');
    selector.append(option);

    var option = $('<option></option>');
    option.attr("value", "3");
    option.text('Single option');
    selector.append(option);

    var questionContent = $('<div></div>');
    questionContent.attr('id', "answerContent" + String(cardNumber));
    cardCore.append(questionContent);

    $(selector).bind('change', buildQuestionType);
}

function deleteQuestion() {
    if(parseInt(rootTag.children().length) > 0)
        rootTag.children()[rootTag.children().length - 1].remove();
}

function deleteAnswer(element) {
    let questionNumber = element.target.id[element.target.id.length - 1];
    let elements = parseInt($('#answerContent' + questionNumber).children().length)
    
    if(elements - 1 > 2)
        $('#answerContent' + questionNumber).children()[$('#answerContent' + questionNumber).children().length - 1].remove();
}

function buildQuestionType(element){
    let questionNumber = element.target.id[element.target.id.length - 1];
    let content = '#' + "answerContent" + questionNumber;

    if($(content).children().length > 0)
        $(content).children().remove();

    let selectorVal = $("#" + element.target.id).val();
    console.log(selectorVal);

    $(content).append($('<br>'))

    let button = $('<button></button>')
    button.addClass('uk-button uk-border-rounded uk-button-primary uk-width-1-1 uk-margin-small-bottom')
    button.text('Add another answer');
    button.attr('id', 'singleBtn' + questionNumber);
    $(content).append(button);

    let deleteAnswerBtn = $('<button></button>')
    deleteAnswerBtn.addClass('uk-button uk-border-rounded uk-button-primary uk-width-1-1 uk-margin-small-bottom')
    deleteAnswerBtn.text('Delete last answer');
    deleteAnswerBtn.attr('style', 'background-color: #f4511e; color: white;');
    deleteAnswerBtn.attr('id', 'deleteBtn' + questionNumber);
    $(content).append(deleteAnswerBtn);
    $(deleteAnswerBtn).click(deleteAnswer);

    switch (parseInt(selectorVal)){
        case 1:{
            buildOpen(content, questionNumber)
            break;
        }
        case 2: {
            $('#singleBtn' + questionNumber).click(buildMultiple)
            break;
        }
        case 3: {

            $('#singleBtn' + questionNumber).click(buildSingle)
            break;
        }
    }
}

function buildOpen(content, questionNumber) {
    let div = $('<div></div>')
    div.addClass('uk-margin')
    let textarea = $('<textarea></textarea>')
    textarea.addClass('uk-textarea uk-border-rounded')
    textarea.attr('disabled', 'disabled')
    textarea.attr('rows', '5')
    textarea.attr('id', 'answer' + questionNumber)
    div.append(textarea)
    $(content).append(div);
}

function buildSingle(element) {
    var questionNumber = element.target.id[element.target.id.length - 1];
    var subAnswer = $('#' + 'answerContent' + questionNumber).children().length - 1;

    if(subAnswer < 7){
       
        var grid = $('<div uk-grid></div>')
        var div = $('<div></div>')

        div.addClass('uk-margin');

        var input = $('<input></input>');
        input.addClass('uk-input uk-border-rounded');
        input.attr('type', 'text');
        input.attr('placeholder', 'Answer' + subAnswer);
        input.attr('id', 'answerI' + questionNumber + '-' + subAnswer);
        div.append(input)
        grid.append(div)

        var div = $('<div></div>');
        var checkbox = $('<input></input>');
        checkbox.addClass('uk-radio');
        checkbox.attr('type', 'radio');
        checkbox.attr("name", "radio" + questionNumber);
        checkbox.attr('id', 'answerC' + questionNumber + '-' + subAnswer);
        div.append(checkbox);
        grid.append(div);

        $('#' + 'answerContent' + questionNumber).append(grid);
    }
}

function buildMultiple(element) {
    var questionNumber = element.target.id[element.target.id.length - 1];
    var subAnswer = $('#' + 'answerContent' + questionNumber).children().length - 1;

    if(subAnswer < 7) {
        var grid = $('<div uk-grid></div>')
        var div = $('<div></div>')

        div.addClass('uk-margin');

        var input = $('<input></input>');
        input.addClass('uk-input uk-border-rounded');
        input.attr('type', 'text');
        input.attr('placeholder', 'Answer' + subAnswer);
        input.attr('id', 'answerI' + questionNumber + '-' + subAnswer);
        div.append(input)
        grid.append(div)

        var div = $('<div></div>')
        var checkbox = $('<input></input>')
        checkbox.addClass('uk-checkbox uk-border-rounded')
        checkbox.attr('type', 'checkbox')
        checkbox.attr('id', 'answerC' + questionNumber + '-' + subAnswer);
        div.append(checkbox);
        grid.append(div);

        $('#' + 'answerContent' + questionNumber).append(grid);
    }
}