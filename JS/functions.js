const d = () => Math.floor(Math.random() * 6 ) + 1;

const rollDice = () => {
	dice = [];
	for (let i = 0; i < 5; i++) {
		dice.push(d());
	};
};


//rollDice()
	//get html
	//roll dice
	//sort
	//write dice to buttons
	
//roll()
	//forEach
		//if 'rerolling'
			//roll
			//print roll

//updateScores()
	//get html
		//upper
		//lower
		//total
	//calculate totals
	//update html

//score()
	//scoringFunction()
	//updateScores()

//updateRoundCounter()
	//get html
	//count rounds
	//display rounds

//updateRollButton()?
	//get html
	//print rolls

//newRound()
	//round++
	//rolls = 3
	//updateRoundCounter()
	//updateRollButton()

//endGame()
