const d = () => Math.floor(Math.random() * 6 ) + 1;

const printDice = () => {
	for (let i = 0; i < 5; i++) {
		diceButtons[i].textContent = dice[i];
	};
};

const rollDice = () => {
	dice = [];
	for (let i = 0; i < 5; i++) {
		dice.push(d());
	};
	dice.sort();
	printDice();
};

const reroll = () => {
	for (let i = 0; i < 5; i++) {
		if (diceButtons[i].title === 'Rerolling') {
			dice[i] = d();
		};
	};
	printDice();
};

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

const newRound = () => {
	round++;
	rolls = 2;
	updateRoundCounter();
	updateRollButton();
	if (round === 13) {
		endGame();
	};
};

//endGame()
	//alert/print score
	//update high scores