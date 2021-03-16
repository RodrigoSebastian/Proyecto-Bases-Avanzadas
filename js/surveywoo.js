let rootTag;

$(document).ready(() => {
    rootTag = $('#questionContainer');
    CreateCard();

    $('#btnNewQuestion').click(CreateCard);
})

function CreateCard() {
    let cardNumber = rootTag.children().length

    var divRoot = $('<div></div>');
    divRoot.attr('id', 'card' + cardNumber);
    rootTag.append(divRoot);

    var cardCore = $('<div></div>');
    cardCore.addClass('uk-card uk-card-default uk-card-hover uk-card-body');
    divRoot.append(cardCore);

    var cardTitle = $('<h3></h3>')
    cardTitle.addClass('uk-card-title')
    cardTitle.text('Question Title');
    cardCore.append(cardTitle);

    var div = $('<div></div>');
    div.addClass('uk-margin uk-card-title');

    var input = $('<input></input>');
    input.addClass('uk-input');
    div.append(input);
    cardCore.append(div);

    let questionType = $('<h4></h4>');
    questionType.text('Question type');
    cardCore.append(questionType);

    var div = $('<div></div>');
    div.addClass('uk-margin');
    cardCore.append(div);

    var selector = $('<select></select>');
    selector.addClass('uk-select');
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

function buildQuestionType(element){
    let questionNumber = element.target.id[element.target.id.length - 1];
    let content = '#' + "answerContent" + questionNumber;


    if($(content).children().length > 0){
        $(content).children().remove();
    }

    let selectorVal = $("#" + element.target.id).val();
    console.log(selectorVal);

    switch (parseInt(selectorVal)){
        case 1:{
            buildOpen(content, questionNumber)
            break;
        }
        case 2: {
            let button = $('<button></button>')
            button.addClass('uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom')
            button.text('Add another answer');
            button.attr('id', 'singleBtn' + questionNumber);
            $(content).append(button);
            $('#singleBtn' + questionNumber).click(buildMultiple)
            break;
        }
        case 3: {
            let button = $('<button></button>')
            button.addClass('uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom')
            button.text('Add another answer');
            button.attr('id', 'singleBtn' + questionNumber);
            $(content).append(button);
            $('#singleBtn' + questionNumber).click(buildSingle)
            break;
        }
    }
}

function buildOpen(content, questionNumber) {
    let div = $('<div></div>')
    div.addClass('uk-margin')
    let textarea = $('<textarea></textarea>')
    textarea.addClass('uk-textarea')
    textarea.attr('disabled', 'disabled')
    textarea.attr('rows', '5')
    textarea.attr('id', 'answer' + questionNumber)
    div.append(textarea)
    $(content).append(div);
}

function buildSingle(element) {
    var questionNumber = element.target.id[element.target.id.length - 1];
    var subAnswer = $('#' + 'answerContent' + questionNumber).children().length - 1;

    if(subAnswer < 5){
       
        var grid = $('<div uk-grid></div>')
        var div = $('<div></div>')

        div.addClass('uk-margin');

        var input = $('<input></input>');
        input.addClass('uk-input');
        input.attr('type', 'text');
        input.attr('placeholder', 'Answer' + subAnswer);
        input.attr('id', 'answerI' + questionNumber + '-' + subAnswer);
        div.append(input)
        grid.append(div)

        var div = $('<div></div>');
        var checkbox = $('<input></input>');
        checkbox.addClass('uk-radio');
        checkbox.attr('type', 'radio');
        checkbox.attr('id', 'answerC' + questionNumber + '-' + subAnswer);
        div.append(checkbox);
        grid.append(div);

        $('#' + 'answerContent' + questionNumber).append(grid);
    }
}

function buildMultiple(element) {
    var questionNumber = element.target.id[element.target.id.length - 1];
    var subAnswer = $('#' + 'answerContent' + questionNumber).children().length - 1;

    if(subAnswer < 5) {
        var grid = $('<div uk-grid></div>')
        var div = $('<div></div>')

        div.addClass('uk-margin');

        var input = $('<input></input>');
        input.addClass('uk-input');
        input.attr('type', 'text');
        input.attr('placeholder', 'Answer' + subAnswer);
        input.attr('id', 'answerI' + questionNumber + '-' + subAnswer);
        div.append(input)
        grid.append(div)

        var div = $('<div></div>')
        var checkbox = $('<input></input>')
        checkbox.addClass('uk-checkbox')
        checkbox.attr('type', 'checkbox')
        checkbox.attr('id', 'answerC' + questionNumber + '-' + subAnswer);
        div.append(checkbox);
        grid.append(div);

        $('#' + 'answerContent' + questionNumber).append(grid);
    }
}