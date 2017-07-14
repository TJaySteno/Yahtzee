const d = () => Math.floor(Math.random() * 6 ) + 1;
const updateRoundCounter = () => roundCounter.textContent = `Round ${round} of 13`;
const updateRollButton = () => rollButton.textContent = `${rollsLeft} rolls left`;

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

const printScores = () => {
	getTotal();
	upperScore.textContent = total.upper;
	lowerScore.textContent = total.lower;
	totalScore.textContent = total.total;
};

const newRound = () => {
	round++;
	rolls = 2;
	updateRoundCounter();
	updateRollButton();
	if (round === 13) {
		endGame();
	} else {
		rollDice();
	};
};

const endGame = () => {
	printScores();
	alert(`Congrats! Your final score was ${total.total}.`);
	//update high scores
};