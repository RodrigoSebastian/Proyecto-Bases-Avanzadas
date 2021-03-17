var questions = [];

$(document).ready(() => {
    let firstQuestion = new Question();
    questions.push(firstQuestion)
});

class Question {
    rootTag;
    questionNumber;
    selector;
    that;

    constructor(){
        this.that = this;
        this.that.CreateCard();
    }

    CreateCard() {
        this.that.questionNumber = parseInt(questions.length);
        this.that.rootTag = $('<div></div>');

        this.that.rootTag.addClass('uk-card uk-card-default uk-card-hover uk-card-body cardQuestion');
        $('#questionContainer').append(this.that.rootTag);

        let title = $('<h3></h3>');
        title.addClass('uk-card-title');
        title.text('Question title');
        this.that.rootTag.append(title);

        let div = $('<div></div>');
        div.addClass('uk-margin uk-card-title');

        let input = $('<input>');
        input.addClass('uk-input');
        input.type = "text";
        div.append(input)
        this.that.rootTag.append(div);

        this.that.QuestionBody()
    }

    QuestionBody() {

        let questionType = $('<h4></h4>');
        questionType.text('Question type');
        this.that.rootTag.append(questionType);

        let div = $('<div></div>');
        div.addClass('uk-margin');
        this.that.rootTag.append(div);

        this.that.selector = $('<select></select>');
        this.that.selector.addClass('uk-select');
        this.that.selector.attr("id", "selector" + String(this.that.questionNumber));
        div.append(this.that.selector);

        var option = $('<option></option>');
        option.attr("value", "0");
        option.attr('selected', 'selected');
        option.attr('disabled', 'disabled');
        option.text('Select an option');
        this.that.selector.append(option);

        var option = $('<option></option>');
        option.attr("value", "1");
        option.text('Open question');
        this.that.selector.append(option);

        var option = $('<option></option>');
        option.attr("value", "2");
        option.text('Multiple option');
        this.that.selector.append(option);

        var option = $('<option></option>');
        option.attr("value", "3");
        option.text('Single option');
        this.that.selector.append(option);

        let questionContent = $('<div></div>');
        questionContent.id = "questionContent" + String(this.that.questionNumber);
        this.that.rootTag.append(questionContent);

        let core = "#selector" + String(this.that.questionNumber)

        const optionCX = this.OptionSet;
        const questionNumber = this.that.questionNumber

        document.getElementById('selector' + questionNumber).addEventListener('change', () => {
            if($("#questionContent" + String(questionNumber)).children().length > 0)
                $("#questionContent" + String(questionNumber)).children().remove();

        switch(parseInt(option)){
            case 1: {
                that.OpenQuestion();
                break;
            }
            case 2: {
                that.MultipleSelection();
                break;
            }
            case 3: {
                that.SingleSelection();
                break;
            }
            default : {
                break;
            }
        }
        });
    }

    OptionSet(questionNumberX) {
        let option = $('#selector' + String(questionNumberX)).val();
        console.log(questionNumberX);
    }

    MultipleSelection() {
        console.log('MS')
    }

    SingleSelection() {
        console.log('SS')
    }

    OpenQuestion() {
        console.log('OP')
    }
}

function multipleSelection() {
    let div = $('<div></div>');
    div.className = "uk-margin uk-grid-small uk-child-width-auto uk-grid multiSection";
    $("#questionContainer").append(div);
    addCheckBox();

    let addMore = document.createElement('button')
    addMore.className = `uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom`;
    addMore.textContent = "Add other answer";
    addMore.setAttribute("id", "addOtherAnswerMS");
    $("#questionContainer").append(addMore);

    $('#addOtherAnswerMS').bind('click', addCheckBox);
}

function addCheckBox() {
    $("button").
    this.parentNode.innerHTML = `<input class="uk-checkbox" type="checkbox" checked>
                        <input class="uk-input" type="text" placeholder="Answer 1">`;
}

function singleSelection() {
    console.log('SS');
}

function openQuestion() {
    let div = document.createElement('div');
    div.className = "uk-margin";
    let textArea = document.createElement('textarea');
    textArea.className = "uk-textarea";
    textArea.setAttribute("rows", "5");
    textArea.setAttribute("placeholder", "Answer Area");
    textArea.setAttribute("disabled", "disabled");
    div.append(textArea);
    $("#questionContainer").append(div);
}