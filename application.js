$(document).ready(function(){
    var game = new Game();
    var remaining = 5;
    function display(message){
        $('#intro').text(message);
    }
    $('#submit').on('click',function(){
        $('#display').slideUp();
        remaining--;
        var input=+$('#player-input').val();
        var dispString=game.playersGuessSubmission(input);
        var gLower=" Try guessing lower.";
        var gHigher=" Try guessing higher.";
        $('#player-input').val('');
        if(remaining>0){
            if(game.isLower()){
                dispString+=gHigher;
            }else{
                dispString+=gLower;
            }
            display(dispString);
        }
        if(remaining===0){
            display(dispString+" The actual number was "+game.winningNumber+". \nTo play again, press \'Reset\' below.");
            $('#hint, #submit').prop("disabled",true);
        }
        $('#guesses ul').append('<li class="guess">'+input+'</li>');
        if(remaining>0)$('#guesses li').first().remove();
    });
    $('#reset').on('click',function(){
        game=newGame();
        $('#hint, #submit').prop("disabled",false);
        location.reload();
    });
    $('#hint').on('click',function(){
        var arr=game.provideHint();
        var disp=arr.join(', ');
        display("It's one of these numbers: "+disp);
    });
});
