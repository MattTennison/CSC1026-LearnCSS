var enableMargins = false;
var enablePadding = false;
var enableBlock = true;
var enableInline = false;
var quizScore = 0;

/* set up the variables used in advanceQuestion() */
var currentQuestion;
var rightAnswer;
var numberOfAnswers;
var rightAnswerPosition;
var wrongAnswers;
var newHtml;
var wrongAnswersPosition;
var questionListCounter = -1; //since we're going to start at the first element of the questionList array, which has the index 0

/*
  set up questions in arrays
  First element = Question
  Second element = Right question
  Third+ elements = Wrong questions
*/
var question1 = ['Does margin include the background?', 'No', 'Yes'];
var question2 = ['What selector do you use to style links the user has previously clicked?', ':visited', ':previous', ':history', ':visit']
var question3 = ['Which display type do you use for a div you want on its own line?', 'block', 'inline', 'inline-block'];
var question4 = ['Does padding get counted in width and height?', 'Only in old versions of IE', 'Yes', 'No'];
var question5 = ['Following on, what property would you use to include padding in width and height?', 'box-sizing: border-box', 'include-padding-sizing: yes', 'padding-in-width: yes', 'width: *width value*, padding-include'];
var questionList = [question1, question2, question3, question4, question5];

$(document).ready(function(){
    /* this function will make the methods on the homepage clickable whilst retaining their odd/even styling */
    $('.hero').click(function() {
        window.location = $(this).find('a').attr('href');
        return false;
    });

    $('#enableMargins').hide();
    $('#paddingCodeBlock').hide();
    $('#enableBlock').hide();
    $('#inlineCodeBlock').hide();
    $('#scoreCircle').hide();
    console.log('Score Circle is hidden');

    /*
      This code is specific for the LearnCSSBoxModel.html page
    */
    $('#enablePadding').click(function(){
      $('#boxModelExample').animate({
        'padding': '20px',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'margin': '0px'
      });
      console.log("Enable Padding Clicked");
      $('#enablePadding').hide();
      $('#enableMargins').show();
      $('#paddingCodeBlock').show();
      $('#marginCodeBlock').hide();
    });

    $('#enableMargins').click(function(){
      console.log("Enable Margin Clicked");
      $('#boxModelExample').animate({
        'margin': '20px',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'padding': '0px'
      });
      $('#enablePadding').show();
      $('#enableMargins').hide();
      $('#paddingCodeBlock').hide();
      $('#marginCodeBlock').show();
    });

    /*
      This code is specific for the LeanCSSDisplay.html page
    */
    $('#enableBlock').click(function(){
      enableBlock = true;
      enableInline = false;
      $('#displayExample').css({
        'display': 'block'
      });
      $('#displayExample').text('Block Element');
      $('#enableInline').show();
      $('#enableBlock').hide();
      $('#inlineCodeBlock').hide();
      $('#blockCodeBlock').show();
      console.log('Enable Block clicked')
    });

    $('#enableInline').click(function(){
      enableInline = true;
      enableBlock = false;
      $('#displayExample').css({
        'display': 'inline'
      });
      $('#displayExample').text('Inline Element');
      $('#enableInline').hide();
      $('#enableBlock').show();
      $('#inlineCodeBlock').show();
      $('#blockCodeBlock').hide();
      console.log('Enable Inline clicked');
    });

    //this is for the quiz page
    $('.quizScore').hide();
    advanceQuestion();
});

function advanceQuestion(){
  questionListCounter = questionListCounter + 1;
  if(questionList.length > questionListCounter){
    //set up variables
    currentQuestion = questionList[questionListCounter];
    rightAnswer = currentQuestion[1];
    numberOfAnswers = currentQuestion.length - 1;
    rightAnswerPosition = Math.floor((Math.random() * numberOfAnswers));
    wrongAnswers = currentQuestion.slice(2, currentQuestion.length);
    newHtml = ''; //this will store the html to be outputted to quizAnswers
    wrongAnswersPosition = 0;

    //shuffle wrongAnswers
    shuffle(wrongAnswers);

    console.log('Advance question!');
    $('.quizQuestion').html(currentQuestion[0]);
    for(i = 0; i < numberOfAnswers; i++){
      if(i == rightAnswerPosition){ //put the right answer here
        newHtml += '<li class="right">' + rightAnswer + '</li>';
      }
      else{ //fill it with another answer
        newHtml += '<li>' + wrongAnswers[wrongAnswersPosition] + '</li>';
        wrongAnswersPosition ++; //increase wrongAnswersPosition
      }
    }

    $('.quizAnswers').html(newHtml);

    $('.quizQuestion, .quizAnswers li').addClass('animated fadeIn');
    $('.quizQuestion, .quizAnswers li').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass('animated fadeIn');
    });

    addClickHandlerAnswers();
  }
  else{
    $('.quizQuestion').hide();
    $('.quizAnswers').hide();
    $('#scoreCircle').addClass('animated FadeOut');
    $('#scoreCircle').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).hide();
    });
    console.log('No new questions');
    $('.quizScore').show();
    $('#scoreValue').html(quizScore);
  }
}

/*
  This function adds click events to all answers in .quizAnswers
  I made it a function since you have to do this everytime you add new answers
*/
function addClickHandlerAnswers(){
  $('.quizAnswers li').click(function(){
    if($(this).attr('class') == 'right'){
      quizScore = quizScore + 1;
      $('#scoreCircle').html(quizScore);
      if(quizScore == 1){
        $('#scoreCircle').show();
      }

      //make scoreCircle 'pulse'
      $('#scoreCircle').addClass('animated wobble');
      $('#scoreCircle').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('#scoreCircle').removeClass('animated wobble');
      });

      console.log(quizScore);
    };
    console.log('Clicked Quiz Answer');
    advanceQuestion();
  });
}

/*
  Shuffle function
  Used under Apache license from: https://github.com/coolaj86/knuth-shuffle
*/
function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
