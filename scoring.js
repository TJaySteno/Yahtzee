const dice = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6];
let sorted;

const sortDice = () => sorted = dice.sort();

const myFilter = (num) => dice.filter((value) => value === num);

const sum = (arr) => arr.reduce(( acc, cur) => acc + cur, 0);

function scoreNum(numeral, name) {
	let filtered = myFilter(numeral);
	upperScores[name] = sum(filtered);
};

function scoreSets(oak, fh, name) {
	sortDice();
	let j = 0;
	let k = 0;
	let d = 0;
	for (let i = 0; i < sorted.length; i++) {
		if ( sorted[i] === sorted[i+1] && d === 0 ) {
			j++;
			d = sorted[i];
		} else if ( sorted[i] === sorted[i+1] && d === sorted[i] ) {
			j++;
		} else if ( sorted[i] === sorted[i+1] && d !== sorted[i] ) {
			k++;
		}
	}
	if (fh && (( j === 1 && k === 2 ) || ( j === 2 && k === 1 ))) {
		lowerScores[name] = 25;
	} else if ( oak === 4 && j >= oak ) {
		if (!lowerScores.yahztee) {
			lowerScores[name] = 50;
		} else {
			lowerScores[name] += 100;
		}
	} else if ( !fh && j >= oak ) {
		lowerScores[name] = sum(sorted);
	}
}

function scoreRuns(len, name, score) {
	let j = 0;
	for (let i = 0; i < sorted.length; i++) {
		if ( sorted[i]+1 === sorted [i+1] ) {
			j++;
		}
	}
	if ( j >= len ) {
		lowerScores[name] = score;
	}
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
	sStraight: () => scoreRuns(3, 'sStraight', 30),
	lStraight: () => scoreRuns(4, 'lStraight', 40),
	yahztee: () => scoreSets(4, false, 'yahztee'),
	chance: () => lowerScores.chance = sum(dice)
};

//Store scores
const upperScores = {};
const lowerScores = {};
const total = {};

function scoreSum(obj) {
	let sum = 0;
	for (var prop in obj) {
		sum += obj[prop];
	}
	return sum;
};

//If 63+
	//upperScores.bonus = 35
	//scoreSum
const getTotal = () => {
	total.upper = scoreSum(upperScores);
	if ( total.upper >= 63 && !upperScores.bonus ) {
		upperScores.bonus = 35;
		total.upper = scoreSum(upperScores);
	}
	total.lower = scoreSum(lowerScores);
	total.total = total.upper + total.lower;
	console.log(total);
};

function scrollScores() {
	for (let prop in scoring) {
		scoring[prop]();
	}
	console.log(upperScores);
	console.log(lowerScores);
};

scrollScores();

getTotal();