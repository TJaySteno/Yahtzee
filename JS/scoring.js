//Store scores
const upperScores = {};
const lowerScores = {};
const total = {};

//Scoring functions
const myFilter = (num) => dice.filter((value) => value === num);

const sum = (arr) => arr.reduce(( acc, cur) => acc + cur, 0);

const scoreNum = (numeral, name) => {
	let filtered = myFilter(numeral);
	upperScores[name] = sum(filtered);
	newRound();
};

//scoreRuns and scoreSets could be cleaned up
function scoreSets(oak, fh, name) {
	dice.sort();
	let j = 0;
	let k = 0;
	let d = 0;
	for (let i = 0; i < dice.length; i++) {
		if ( dice[i] === dice[i+1] && d === 0 ) {
			j++;
			d = dice[i];
		} else if ( dice[i] === dice[i+1] && d === dice[i] ) {
			j++;
		} else if ( dice[i] === dice[i+1] && d !== dice[i] ) {
			k++;
		};
	};
	if (fh && (( j === 1 && k === 2 ) || ( j === 2 && k === 1 ))) {
		//Score fullHouse
		lowerScores[name] = 25;
		newRound();
	} else if ( oak === 4 && j === oak ) {
		if (!lowerScores.yahtzee) {
			//Score first Yahtzee
			lowerScores[name] = 50;
			newRound();
		} else {
			//Score second Yahtzee
			lowerScores[name] += 100;
			preventYahtzee = true;
			alert('Congrats! Select a second scoring option. The upper section is scored per usual, the lower section is automatically scored.');
		};
	} else if ( !fh && j >= oak ) {
		//Score 3/4 of a kind
		lowerScores[name] = sum(dice);
		newRound();
	} else {
		
		lowerScores[name] = 0;
		newRound();
	}
};

function scoreRuns(len, score, name) {
	dice.sort();
	let j = 0;
	for (let i = 0; i < dice.length; i++) {
		if ( dice[i]+1 === dice [i+1] ) {
			j++;
		};
	};
	if ( j >= len ) {
		lowerScores[name] = score;
	} else {
		lowerScores[name] = 0;
	}
	newRound();
};

const scoring = {
	one: () => scoreNum(1, 'one'),
	two: () => scoreNum(2, 'two'),
	three: () => scoreNum(3, 'three'),
	four: () => scoreNum(4, 'four'),
	five: () => scoreNum(5, 'five'),
	six: () => scoreNum(6, 'six'),
	
	threeOAK: () => scoreSets(2, false, 'threeOAK'),
	fourOAK: () => scoreSets(3, false, 'fourOAK'),
	fullHouse: () => scoreSets(2, true, 'fullHouse'),
	sStraight: () => scoreRuns(3, 30, 'sStraight'),
	lStraight: () => scoreRuns(4, 40, 'lStraight'),
	yahtzee: () => scoreSets(4, false, 'yahtzee'),
	chance: () => {
		lowerScores.chance = sum(dice);
		newRound();
	}
};

const addScore = (obj) => {
	let sum = 0;
	for (let prop in obj) {
		sum += obj[prop];
	};
	return sum;
};

const getTotal = () => {
	total.upper = addScore(upperScores);
	if ( total.upper >= 63 && !upperScores.bonus ) {
		upperScores.bonus = 35;
		document.getElementById('bonus').textContent = upperScores.bonus;
		total.upper = addScore(upperScores);
	};
	total.lower = addScore(lowerScores);
	total.total = total.upper + total.lower;
};