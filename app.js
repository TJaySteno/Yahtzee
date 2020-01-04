const yahtzee = (function () {

  /**************************
    HTML ELEMENTS
  **************************/

  /* Find page elements */
  const roundCounter = document.querySelector('#roundCounter');
  const diceDiv = document.querySelector('.dice');
  const diceButtons = Array.from(diceDiv.children);
  const rollButton = document.querySelector('#rollButton');
  const scoreButton = rollButton.nextElementSibling;
  const highScore = scoreButton.parentNode.nextElementSibling.firstElementChild;
  const radioInput = document.querySelectorAll('input');
  const radioYahtzee = radioInput[11];
  const upperScore = document.querySelector('#upperScore').lastElementChild;
  const lowerScore = document.querySelector('#lowerScore').lastElementChild;
  const totalScore = document.querySelector('#totalScore').lastElementChild;
  const bonus = document.getElementById('bonus');

  /* Create game state variables */
  let dice = [];
  let rollsLeft = 2;
  let round = 0;

  /* Event listeners */
  for (let i = 0; i < 5; i++) {
    /* Select which dice to keep vs reroll */
    diceButtons[i].addEventListener('click', function () {
      if (diceButtons[i].title === 'Rerolling') {
        diceButtons[i].title = 'Keeping';
      } else {
        diceButtons[i].title = 'Rerolling';
      };
    });
  };

  rollButton.addEventListener('click', function () {
    /* Reroll selected dice */
    if (rollsLeft > 0) {
      reroll();
      rollsLeft--;
      printRollButton();
    };
  });

  scoreButton.addEventListener('click', function () {
    if (this.textContent === 'Score Now') {
      /* Find selected scoring option and run scoring function */
      let element = scrollInput();
      if (!element) {
        alert('Please choose a scoring option.');
      } else {
        score[element.id]();
        printTableRow(element);
      };
    } else {
      newGame();
    }
  });

  /**************************
    FUNCTIONS
  **************************/

  const d = () => Math.floor(Math.random() * 6) + 1;

  const firstRoll = () => {
    dice = [];
    if (radioYahtzee.disabled = true) {
      radioYahtzee.disabled = false;
    }

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
    printScoreSums();
    round++;

    if (round > 13) {
      highScore.textContent = `Congrats! Your final score was ${total.total}.`;
      scoreButton.textContent = 'Play Again?';
    } else {
      rollsLeft = 2;
      printRound();
      printRollButton();
      firstRoll();
    };
  };

  const scrollInput = () => {
    /* Find selected radio input */
    for (let i = 0; i < radioInput.length; i++) {
      if (radioInput[i].checked) {
        const radio = radioInput[i];
        return radio;
      };
    };
  };

  const printRound = () => roundCounter.textContent = `Round ${round} of 13`;
  const printRollButton = () => rollButton.textContent = `${rollsLeft} rolls left`;

  const printDice = () => {
    /* Update dice html elements with proper values */
    for (let i = 0; i < 5; i++) {
      diceButtons[i].textContent = dice[i];
    };
  };

  const disableRadio = (radio, tr) => {
    /* Remove radio input from used scoring option */
    if (radio.id !== 'yahtzee' || ((lowerScores.yahtzee === 0) || disallowFutureYahtzees === true)) {
      radio.checked = false;
      radio.disabled = true;
    };
  };

  const printScore = (element, tr) => {
    if (upperScores[element.id] || upperScores[element.id] === 0) {
      tr.lastElementChild.textContent = upperScores[element.id];
    } else if (lowerScores[element.id] || lowerScores[element.id] === 0) {
      tr.lastElementChild.textContent = lowerScores[element.id];
    };
  };

  const printTableRow = radio => {
    let tr = radio.parentNode.parentNode.parentNode;
    disableRadio(radio, tr);
    printScore(radio, tr);
  };

  const printScoreSums = () => {
    getTotal();
    upperScore.textContent = total.upper;
    lowerScore.textContent = total.lower;
    totalScore.textContent = total.total;
  };

  /**************************
    SCORING FUNCTIONS
  **************************/

  /* Scoring variables */
  const upperScores = {};
  const lowerScores = {};
  const total = {};
  let disallowFutureYahtzees = false;

  /* Return an array with every instance of given number */
  const is = num => dice.filter((value) => value === num);

  /* Add the sum of an array */
  const sum = arr => arr.reduce((acc, cur) => acc + cur, 0);

  /* Score anything in the upper section */
  const scoreNum = (num, id) => {
    let filtered = is(num);
    upperScores[id] = sum(filtered);
    newRound();
  };

  /* Score all sets: 3 of a kind, 4, Yahztee, or full house */
  function scoreSets(oak, fh, id) {
    dice.sort();
    let x = 1;
    let y = 1;
    let z = 1;
    let d = 0;

    /* Tally up instances of dice */
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] === dice[i + 1] && d === 0) {
        x++;
        d = dice[i];
      } else if (dice[i] === dice[i + 1] && d === dice[i]) {
        x++;
      } else if (dice[i] === dice[i + 1] && d !== dice[i]) {
        y++;
      };
    };

    /* Ensure we know which tally is highest (z) */
    z = x > y ? x : y;
    y = x < y ? x : y;

    if (fh && z === 3 && y === 2) {
      /* Successful full house */
      lowerScores[id] = 25;
      newRound();
    } else if (oak === 5 && z === 5) {
      /* Successful Yahtzee */
      scoreYahtzee(id);
    } else if (!fh && z >= oak) {
      /* Successful 3 or 4 of a kind */
      lowerScores[id] = sum(dice);
      newRound();
    } else {
      /* Failed to score a set */
      if (!lowerScores[id]) {
        lowerScores[id] = 0;
      } else {
        disallowFutureYahtzees = true;
      };

      newRound();
    }
  };

  const scoreYahtzee = (id) => {
    /* Score Yahtzee */
    if (!lowerScores.yahtzee) {
      /* Score first Yahtzee */
      lowerScores[id] = 50;
      newRound();
    } else {
      /* Score second Yahtzee */
      lowerScores[id] += 100;
      alert('Congrats! Select a second scoring option.');
      radioYahtzee.disabled = true;
    };
  };

  function scoreRuns(len, score, id) {
    /* Score small and large straights */
    dice.sort();
    let x = 0;

    /* Check for run */
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] + 1 === dice [i + 1]) {
        x++;
      };
    };

    /* Evaluate run */
    if (x >= len) {
      /* Scored a run */
      lowerScores[id] = score;
    } else {
      /* Failed to score a run */
      lowerScores[id] = 0;
    }

    newRound();
  };

  const score = {
    /* Call scoring functions */
    one: () => scoreNum(1, 'one'),
    two: () => scoreNum(2, 'two'),
    three: () => scoreNum(3, 'three'),
    four: () => scoreNum(4, 'four'),
    five: () => scoreNum(5, 'five'),
    six: () => scoreNum(6, 'six'),

    threeOAK: () => scoreSets(3, false, 'threeOAK'),
    fourOAK: () => scoreSets(4, false, 'fourOAK'),
    fullHouse: () => scoreSets(3, true, 'fullHouse'),
    sStraight: () => scoreRuns(3, 30, 'sStraight'),
    lStraight: () => scoreRuns(4, 40, 'lStraight'),
    yahtzee: () => scoreSets(5, false, 'yahtzee'),
    chance: () => {
      lowerScores.chance = sum(dice);
      newRound();
    },
  };

  const addScore = (obj) => {
    /* Add and return scores in 'obj' */
    let sum = 0;
    for (let prop in obj) {
      sum += obj[prop];
    };

    return sum;
  };

  const getTotal = () => {
    /* Add and store current points */
    total.upper = addScore(upperScores);
    if (total.upper >= 63 && !upperScores.bonus) {
      upperScores.bonus = 35;
      bonus.textContent = upperScores.bonus;
      total.upper = addScore(upperScores);
    };

    total.lower = addScore(lowerScores);
    total.total = total.upper + total.lower;
  };

  const newGame = () => {
    /* Reset game state */
    dice = [];
    rollsLeft = 2;
    round = 0;
    disallowFutureYahtzees = false;
    for (var score in upperScores) delete upperScores[score];
    for (var score in lowerScores) delete lowerScores[score];
    for (var score in total) delete total[score];

    /* Reset game board */
    scoreButton.textContent = 'Score Now';
    printScoreSums();
    for (let i = 0; i < radioInput.length; i++) {
      radioInput[i].disabled = false;
      radioInput[i].parentNode.parentNode.parentNode.lastElementChild.textContent = '';
    }

    newRound();
  };

  return {
    init: newRound,
  };

})();

yahtzee.init();
