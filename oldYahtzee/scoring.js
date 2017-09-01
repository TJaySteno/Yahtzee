/**********************************************************
SCORING AND POINTS
**********************************************************/

//Scoring functions
const getSum = () => dice.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0);

//DRY: creating single function for upper section scoring
// function scoreNumber(numeral, word) {
// 	function findNumber(value, numeral) {
// 		return value === numeral;
// 	}
// 	var filtered = dice.filter(findNumber);
// 	let store = `storeScores[${word}]`;
// 	store = getSum(filtered);
// };

//Evaluate score conditions and award points
const scoringFunctions = {
	//Upper
	//DRY: Create a function with an argument to pass on
	one: () => {
		function isOne(value) {
			return value === 1;
		}
		var filtered = dice.filter(isOne);
		upperScores[1] = filtered.reduce(( acc, cur) => acc + cur, 0);
	},
	two: () => {
		function isTwo(value) {
			return value === 2;
		}
		var filtered = dice.filter(isTwo);
		upperScores[2] = filtered.reduce(( acc, cur) => acc + cur, 0);
	},
	three: () => {
		function isThree(value) {
			return value === 3;
		}
		var filtered = dice.filter(isThree);
		upperScores[3] = filtered.reduce(( acc, cur) => acc + cur, 0);
	},
	four: () => {
		function isFour(value) {
			return value === 4;
		}
		var filtered = dice.filter(isFour);
		upperScores[4] = filtered.reduce(( acc, cur) => acc + cur, 0);
	},
	five: () => {
		function isFive(value) {
			return value === 5;
		}
		var filtered = dice.filter(isFive);
		upperScores[5] = filtered.reduce(( acc, cur) => acc + cur, 0);
	},
	six: () => {
		function isSix(value) {
			return value === 6;
		}
		var filtered = dice.filter(isSix);
		upperScores[6] = filtered.reduce(( acc, cur) => acc + cur, 0);
	},
	//Refine bonus: update scorecard when awarded, create var/func to replace condition
	bonus: () => {
		if ( getSum(upperScores) >= 63 ) {
			upperScores[0] = 35;
		}
	},

	//Lower
	//DRY: Create function to simplify 3oak, 4 oak, FH, yahtzee
	//DRY: Create func to simp sStraight, lStraight
	//Move j,k,l=0 to end of code
	threeOAK: () => {
		j = 0;
		for (let i = 0; i < dice.length; i++) {
			if (dice[i]===dice[i+1]) {
				j++;
				if ( j >= 2){
					lowerScores.threeOAK = getSum();
					break;
				}
			} else if (dice[i] != dice[i+1]) {
				j = 0;
			}
		}
	},
	fourOAK: () => {
		j = 0;
		for (let i = 0; i < dice.length; i++) {
			if (dice[i]===dice[i+1]) {
				j++;
				if ( j >= 3){
					lowerScores.fourOAK = getSum();
					break;
				}
			} else if (dice[i] !== dice[i+1]) {
				j = 0;
			}
		}
	},
	fullHouse: () => {
		j = 0;
		k = 0;
		l = 0;
		for (let i = 0; i < dice.length; i++) {
			if ( dice[i] === dice[i+1] && l === 0) {
				j++;
				l = dice[i];
			} else if ( dice[i] === dice[i+1] && l === dice[i] ) {
				j++;
			} else if ( dice[i] === dice[i+1] && l !== dice[i] ) {
				k++;
			}
		}
		if (( j === 1 && k === 2 ) || ( j === 2 && k === 1 )) {
			lowerScores.fullHouse = 25;
		} else {
			lowerScores.fullHouse = 0;
		}
	},
	sStraight: () => {
		j = 0;
		for (let i = 0; i < dice.length; i++) {
			if ( dice[i]+1 === dice [i+1] ) {
				j++;
			}
		}
		if ( j >= 3 ) {
			lowerScores.sStraight = 30;
		}
	},
	lStraight: () => {
		j = 0;
		for (let i = 0; i < dice.length; i++) {
			if ( dice[i]+1 === dice [i+1] ) {
				j++;
			}
		}
		if ( j >= 4 ) {
			lowerScores.lStraight = 40;
		}
	},
	//Double check double Yahtzee code
	yahtzee: () => {
		j = 0;
		scoredYahtzee = false;
		for (let i = 0; i < dice.length; i++) {
			if (dice[i]===dice[i+1]) {
				j++;
				if ( j == 4 ) {
					if (!firstYahtzee) {
						lowerScores.yahtzee += 50;
						firstYahtzee = true;
					} else {
						lowerScores.yahtzee += 100;
					}
				}
			}
		}
	},
	chance: () => {
		lowerScores.chance = getSum();
	}
}

const scoreSum = {
	//Use var/func from bonus if statement for upper and modify
	upper: () => {
		let upper = getSum(upperScores)
		return upper;
	},
	lower: () => {
		let sum = lowerScores.threeOAK + lowerScores.fourOAK + lowerScores.fullHouse + lowerScores.sStraight + lowerScores.lStraight + lowerScores.yahtzee + lowerScores.chance;
		lowerScores.lower = sum;
	},
	total: () => upperLower = upperScores.value + lowerScores.value
}

//Update scores
//DRY: Rewrite using an argument to simplify?
const updateScores = () => {
	scoreSum.upper();
	scoreSum.lower();
	scoreSum.total();
	upperScore.lastElementChild.firstElementChild.firstElementChild.textContent = scoreSum.upper();
	lowerScore.lastElementChild.firstElementChild.firstElementChild.textContent = scoreSum.lower();
	totalScore.lastElementChild.firstElementChild.firstElementChild.textContent = scoreSum.total();
}