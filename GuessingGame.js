function Game(){
    this.playersGuess=null;
    this.pastGuesses=[];
    this.winningNumber=generateWinningNumber();
}

Game.prototype.difference=function(){
    return Math.abs(this.playersGuess-this.winningNumber);
};

Game.prototype.isLower=function(){
    return this.playersGuess<this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(guess){
    if(guess<1||guess>100||typeof guess!=='number'){
        throw "That is an invalid guess.";
    }
    this.playersGuess=guess;
    return this.checkGuess();
};

Game.prototype.checkGuess=function(){
    var result="";
    if(this.playersGuess===this.winningNumber)return "You Win!";
    if(this.pastGuesses.includes(this.playersGuess))return "You have already guessed that number.";
    this.pastGuesses.push(this.playersGuess);
    if(this.pastGuesses.length>4)return "You Lose.";
    var diff=this.difference();
    if(diff<10)return "You're burning up!";
    if(diff<25)return "You're lukewarm.";
    if(diff<50)return "You're a bit chilly.";
    if(diff<100)return "You're ice cold!";
};

function generateWinningNumber(){
    return 1+Math.floor((100*Math.random()));
}

function shuffle(array){
    var m=array.length, buff ,i;

    while(m){
        i=Math.floor(Math.random()*m--);

        buff=array[m];
        array[m]=array[i];
        array[i]=buff;
    }
    return array;
}

function newGame(){
    return new Game();
}

Game.prototype.provideHint=function(){
    return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]);
}
