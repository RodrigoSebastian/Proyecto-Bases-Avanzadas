let questions = [];

$(document).ready(() => {
    /*
    $('#questionType').bind('change', () => {
        let option = $('#questionType').val();

        if($("#questionContainer").children().length > 0)
            $("#questionContainer").children().remove();

        switch(parseInt(option)){
            case 1: {
                openQuestion();
                break;
            }
            case 2: {
                multipleSelection();
                break;
            }
            case 3: {
                singleSelection();
                break;
            }
            default : {
                break;
            }
        }
    });
    */

    questionss.push(new Question())
});

class Question {
    rootTag;
    constructor(){
        this.CreateCard();
    }

    CreateCard() {
        this.rootTag = document.createElement('div');

        div.className = "uk-card uk-card-default uk-card-hover uk-card-body";
        $('#questionContainer').append(this.rootTag);

        let title = document.createElement('h3');
        title.className = "uk-card-title";
        this.rootTag.append(title);

        let div = document.createElement('div');
        div.className = "uk-margin uk-card-title";
        let input = document.createElement('input');
            input.className = "uk-input";
            input.type = "text";
            div.append(input)
        this.rootTag.append(div);

        this.QuestionBody()
    }

    QuestionBody() {
        let questionType = document.createElement('h4');
        questionType.textContent = 'Qustrion type';
        this.rootTag.append(questionType);
    }

    MultipleSelection() {

    }

    SingleSelectio() {

    }

    OpenQuestion() {

    }
}

function multipleSelection() {
    let div = document.createElement('div');
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