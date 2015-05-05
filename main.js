var enableMargins = false;
var enablePadding = false;
var enableBlock = true;
var enableInline = false;

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
      console.log('Enable Inline clicked')
    });
});
