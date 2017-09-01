//Need Yahtzee to cover up one category
	//Gray out category and move onto next round
	//Don't reroll
//Create local storage for high scores values
//Streamline functions with 'this'
//Update scores; rewrite using an argument to simplify
//Replace radio with - or X or nothing

/**********************************************************
LET'S GET STARTED
**********************************************************/

//Updates rounds, resets rollsLeft, resets/rolls dice, updates scores
//for loop
const nextRound = () => {
	rollsLeft = 2;
	updateRollButton();
	for(let i = 0; i < diceButtons.length; i++){
		diceButtons[i].title = 'Rerolling';
	}
	// diceButtons.forEach(function(button) {
	// 	button.title = 'Rerolling';
	// });
	round++;
	updateRound();
	rollDice();
	updateScores();
	if(round===13){
		alert(`Your final score was ${upperLower}`);
	//Add scoreSum.total to high scores
	}
}

nextRound();