function generateWinningNumber(){

return Math.ceil(Math.random()*100)
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var Game = function(){
	this.playersGuess = null
	this.pastGuesses = []
	this.winningNumber = generateWinningNumber()
}

Game.prototype.difference = function(){
	return Math.abs(this.playersGuess - this.winningNumber)
}
Game.prototype.isLower = function(){
return this.playersGuess<this.winningNumber;
}

Game.prototype.checkGuess = function(){
	if(this.playersGuess == this.winningNumber){
		$('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
		return "You Win!"
	}
	else if(this.pastGuesses.indexOf(this.playersGuess) > -1){
		return "You have already guessed that number."
	}
	else if(this.playersGuess != this.winningNumber 
		&& this.pastGuesses.indexOf(this.playersGuess) == -1){
		this.pastGuesses.push(this.playersGuess)
		$('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
	}
	if(this.pastGuesses.length == 5){
		 $('#hint, #submit').prop("disabled",true);
         $('#subtitle').text("Press the Reset button to play again!")
		return 'You Lose.'
	}
	if(this.isLower()) {
        $('#subtitle').text("Guess Higher!")
    } 
    if(!this.isLower()){
        $('#subtitle').text("Guess Lower!")
    }
	if(this.difference() < 10){
		return "You\'re burning up!"
	}
	if(this.difference() >= 10 && this.difference()<25){
		return "You\'re lukewarm."
	}
	if(this.difference() >= 25 && this.difference()<50){
		return "You\'re a bit chilly."
	}
	if(this.difference() >= 50 && this.difference()<100){
		return "You\'re ice cold!"
	}
}



Game.prototype.playersGuessSubmission = function(guess){
  this.playersGuess = guess
  if(guess<1 || guess>100 || typeof guess != 'number'){
    throw "That is an invalid guess."
  }
  return this.checkGuess();
}

var newGame = function(){
  return new Game()
}

Game.prototype.provideHint = function(){
	var array = []
	array[0] = this.winningNumber
	array[1] = generateWinningNumber()
	array[2] = generateWinningNumber()
	array = shuffle(array)
	return array
}

var x = newGame()

var submitguess = function(){
	var input = $('#player-input').val()
	var output = x.playersGuessSubmission(Number(input))
	$('#player-input').val('')
	$('#title').text(output);
}

$('#submit').click(submitguess)
$('body').on('keypress', function(e){
	if(e.keyCode == 13){
		submitguess()
	}
})

$('#reset').click(function(){
	x = new Game()
	$('#title').text('Guessing Game!')
	$('#subtitle').text('Guess a Number Between 1-100')
	$('#hint, #submit').prop("disabled",false);
	$('.guess').text("-")

})
$('#hint').click(function(){
	$('#title').text('Hints:  ' + x.provideHint().join("  or  "))
})















       