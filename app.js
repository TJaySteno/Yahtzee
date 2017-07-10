//Get html elements

//Round
	//Roll dice
	//Choose dice to reroll (twice)
	//Choose scoring option
		//Score
			//Update scorecard
			//Store scores

rollDice();
console.log(dice);

function scrollScores() {
	for (let prop in scoring) {
		scoring[prop]();
	}
	console.log(upperScores);
	console.log(lowerScores);
};

scrollScores();

getTotal();