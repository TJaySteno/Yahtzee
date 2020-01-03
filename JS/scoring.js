//Store scores
const upperScores = {};
const lowerScores = {};
const total = {};

//Yahtzee variables
let preventYahtzee = false;
let overwriteYahtzee = false;

//Fundamental functions
//Return an array with every instance of 'num'
const is = (num) => dice.filter((value) => value === num);

//Add the sum of an array

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

//Scoring functions
const scoreNum = (num, id) => {
  //Score upper scores
  let filtered = is(num);
  upperScores[id] = sum(filtered);
  newRound();
};

function scoreSets(oak, fh, id) {
  //Score 3, 4, and 5 of a kind
  dice.sort();
  let j = 0;
  let k = 0;
  let d = 0;

  //Check for sets
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] === dice[i + 1] && d === 0) {
      j++;
      d = dice[i];
    } else if (dice[i] === dice[i + 1] && d === dice[i]) {
      j++;
    } else if (dice[i] === dice[i + 1] && d !== dice[i]) {
      k++;
    };
  };

  //Evaluate sets
  if (fh && ((j === 1 && k === 2) || (j === 2 && k === 1))) {
    //Score fullHouse
    lowerScores[id] = 25;
    newRound();
  } else if (oak === 4 && j === 4) {
    //Score Yahtzee
    scoreYahtzee(id);
  } else if (!fh && j >= oak) {
    //Score 3 or 4 of a kind
    lowerScores[id] = sum(dice);
    newRound();
  } else {
    //Failed to score a set
    if (!lowerScores[id]) {
      lowerScores[id] = 0;
    } else {
      overwriteYahtzee = true;
    };

    newRound();
  }
};

const scoreYahtzee = (id) => {
  //Score Yahtzee
  if (!lowerScores.yahtzee) {
    //Score first Yahtzee
    lowerScores[id] = 50;
    newRound();
  } else if (preventYahtzee) {
    //Prevent 2 Yahtzees from being scored with the same dice
    alert("Don't be greedy bro! Please pick something besides another Yahtzee.");
  } else {
    //Score second Yahtzee
    lowerScores[id] += 100;
    preventYahtzee = true;
    alert('Congrats! Select a second scoring option.');
  };
};

function scoreRuns(len, score, id) {
  //Score small and large straights
  dice.sort();
  let j = 0;

  //Check for run
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] + 1 === dice [i + 1]) {
      j++;
    };
  };

  //Evaluate run
  if (j >= len) {
    //Scored a run
    lowerScores[id] = score;
  } else {
    //Failed to score a run
    lowerScores[id] = 0;
  }

  newRound();
};

const score = {
  //Call scoring functions
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
  },
};

const addScore = (obj) => {
  //Add and return scores in 'obj'
  let sum = 0;
  for (let prop in obj) {
    sum += obj[prop];
  };

  return sum;
};

const getTotal = () => {
  //Add and store current points
  total.upper = addScore(upperScores);
  if (total.upper >= 63 && !upperScores.bonus) {
    upperScores.bonus = 35;
    bonus.textContent = upperScores.bonus;
    total.upper = addScore(upperScores);
  };

  total.lower = addScore(lowerScores);
  total.total = total.upper + total.lower;
};
