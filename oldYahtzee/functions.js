/**********************************************************
FUNCTIONS
**********************************************************/

//Basic functions
const updateRollButton = () => rollButton.textContent = `${rollsLeft} rolls left`;

const updateRound = () => roundCounter.textContent = `Round ${round} of 13`;

const d = () => Math.floor(Math.random() * 6 ) + 1;

const rollDice = () => {
	dice = [];
	for (let i = 0; i < diceButtons.length; i++) {
		dice.push(d())
	}
	dice.sort();
	for (let j = 0; j < diceButtons.length; j++) {
		if (diceButtons[j].title === 'Rerolling') {
			diceButtons[j].textContent = dice[j];
		}
	}
};

let round = 0;

//Basic variables
let firstYahtzee = false;
let j = 0;
let k = 0;
let l = 0;

const upperScores = [0, 0, 0, 0, 0, 0, 0];

const lowerScores = {
	threeOAK: 0,
	fourOAK: 0,
	fullHouse: 0,
	sStraight: 0,
	lStraight: 0,
	yahtzee: 0,
	chance: 0,
	lower: 0,
};

let upperLower;