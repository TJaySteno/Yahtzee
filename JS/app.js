//Get html elements

//Round
	//Roll dice
	//Choose dice to reroll (twice)
	//Choose scoring option
		//Score
			//Update scorecard
			//Store scores

function scrollScores() {
	for (let prop in scoring) {
		scoring[prop]();
	};
};

newRound();

scrollScores();

printScores();