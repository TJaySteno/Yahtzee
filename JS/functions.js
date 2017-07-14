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
	let element;
	for (let i = 0; i < radioInput.length; i++) {
		if (radioInput[i].checked) {
			element = radioInput[i];
			radioInput[i].checked = false; //If we replace radio with - no need to remove check
		};
	};
	return element;
};

//Print functions
const printRound = () => roundCounter.textContent = `Round ${round} of 13`;

const printRollButton = () => rollButton.textContent = `${rollsLeft} rolls left`;

const printDice = () => {
	for (let i = 0; i < 5; i++) {
		diceButtons[i].textContent = dice[i];
	};
};

const removeRadio = (element, tr) => {
	if (element.id !== 'yahtzee' || ((lowerScores.yahtzee === 0) || overwriteYahtzee === true)) {
		tr.firstElementChild.innerHTML = '---';
	};
};

const printOneScore = (element, tr) => {
	if (upperScores[element.id] || upperScores[element.id] === 0) {
		tr.lastElementChild.textContent = upperScores[element.id];
	} else if (lowerScores[element.id] || lowerScores[element.id] === 0) {
		tr.lastElementChild.textContent = lowerScores[element.id];
	};
};

const printTR = (element) => {
	//Passed from scoreButton evt
	let tr = element.parentNode.parentNode.parentNode;
	removeRadio(element, tr);
	printOneScore(element, tr);
};

const printScores = () => {
	getTotal();
	upperScore.textContent = total.upper;
	lowerScore.textContent = total.lower;
	totalScore.textContent = total.total;
};