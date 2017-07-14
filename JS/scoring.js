const myFilter = (num) => dice.filter((value) => value === num);
const sum = (arr) => arr.reduce(( acc, cur) => acc + cur, 0);

const scoreNum = (numeral, name) => {
	let filtered = myFilter(numeral);
	upperScores[name] = sum(filtered);
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
		lowerScores[name] = 25;
	} else if ( oak === 4 && j >= oak ) {
		if (!lowerScores.yahtzee) {
			lowerScores[name] = 50;
		} else {
			lowerScores[name] += 100;
			//Select second option
		};
	} else if ( !fh && j >= oak ) {
		lowerScores[name] = sum(dice);
	};
};

function scoreRuns(len, score, name) {
	let j = 0;
	for (let i = 0; i < dice.length; i++) {
		if ( dice[i]+1 === dice [i+1] ) {
			j++;
		};
	};
	if ( j >= len ) {
		lowerScores[name] = score
	};
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
	chance: () => lowerScores.chance = sum(dice)
};

//Store scores
const upperScores = {};
const lowerScores = {};
const total = {};

function scoreSum(obj) {
	let sum = 0;
	for (let prop in obj) {
		sum += obj[prop];
	};
	return sum;
};
	
const getTotal = () => {
	total.upper = scoreSum(upperScores);
	if ( total.upper >= 63 && !upperScores.bonus ) {
		upperScores.bonus = 35;
		total.upper = scoreSum(upperScores);
	};
	total.lower = scoreSum(lowerScores);
	total.total = total.upper + total.lower;
};