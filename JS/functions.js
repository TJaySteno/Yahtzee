//Game functions
const d = () => Math.floor(Math.random() * 6 ) + 1;

const rollDice = () => {
	dice = [];
	for (let i = 0; i < 5; i++) {
		dice.push(d());
		diceButtons[i].title = 'Rerolling';
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

const newRound = () => {
	preventYahtzee = false;
	printScores();
	round++;
	if (round > 13) {
		endGame();
	} else {
		rollsLeft = 2;
		printRound();
		printRollButton();
		rollDice();
	};
};

const endGame = () => {
	printScores();
	alert(`Congrats! Your final score was ${total.total}.`);
	//Update high scores
};

//HTML functions
const scrollInput = () => {
	let option;
	for (let i = 0; i < radioInput.length; i++) {
		if (radioInput[i].checked) {
			option = radioInput[i].id;
			radioInput[i].checked = false;
			//Replace radio with '-'
		};
	};
	return option;
};

//Print functions
const printRound = () => roundCounter.textContent = `Round ${round} of 13`;

const printRollButton = () => rollButton.textContent = `${rollsLeft} rolls left`;

const printDice = () => {
	for (let i = 0; i < 5; i++) {
		diceButtons[i].textContent = dice[i];
	};
};

const printScores = () => {
	for (let i = 0; i < radioInput.length; i++) {
		let id = radioInput[i].id;
		if (upperScores[id]) {
			radioInput[i].parentNode.parentNode.parentNode.lastElementChild.textContent = upperScores[id];
		} else if (lowerScores[id]) {
			radioInput[i].parentNode.parentNode.parentNode.lastElementChild.textContent = lowerScores[id];
		};
	};
	getTotal();
	upperScore.textContent = total.upper;
	lowerScore.textContent = total.lower;
	totalScore.textContent = total.total;
};