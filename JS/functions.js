// Game functions

const d = () => Math.floor(Math.random() * 6) + 1;

const rollDice = () => {
  //Reset dice and roll new values
  dice = [];
  for (let i = 0; i < 5; i++) {
    dice.push(d());
    diceButtons[i].title = 'Rerolling';
  };

  dice.sort();
  printDice();
};

const reroll = () => {
  //Reroll selected dice
  for (let i = 0; i < 5; i++) {
    if (diceButtons[i].title === 'Rerolling') {
      dice[i] = d();
    };
  };

  printDice();
};

const newRound = () => {
  //Reset round and start the next one
  preventYahtzee = false;
  printScoreSums();
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
  //Update and store scores
  const name = prompt(`Congrats! Your final score was ${total.total}. Please enter your name.`);
  const date = new Date();
  const finalScore = {
    score: total.total,
    name: name,
    date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
  };

  highScores.push(finalScore);
  updateHighScores();
  printHighScores();
};

//HTML functions
const scrollInput = () => {
  //Find selected radio input
  for (let i = 0; i < radioInput.length; i++) {
    if (radioInput[i].checked) {
      const radio = radioInput[i];
      return radio;
    };
  };
};

//Print functions
const printRound = () => roundCounter.textContent = `Round ${round} of 13`;
const printRollButton = () => rollButton.textContent = `${rollsLeft} rolls left`;

const printDice = () => {
  //Update dice html elements with proper values
  for (let i = 0; i < 5; i++) {
    diceButtons[i].textContent = dice[i];
  };
};

const removeRadio = (element, tr) => {
  //Remove radio input from used scoring option
  if (element.id !== 'yahtzee' || ((lowerScores.yahtzee === 0) || overwriteYahtzee === true)) {
    element.checked = false;
    tr.firstElementChild.textContent = '---';
  };
};

const printScore = (element, tr) => {
  //Update the points column with the current score
  if (upperScores[element.id] || upperScores[element.id] === 0) {
    tr.lastElementChild.textContent = upperScores[element.id];
  } else if (lowerScores[element.id] || lowerScores[element.id] === 0) {
    tr.lastElementChild.textContent = lowerScores[element.id];
  };
};

const printTR = (element) => {
  //Remove radio input and update score for selected element
  let tr = element.parentNode.parentNode.parentNode;
  removeRadio(element, tr);
  printScore(element, tr);
};

const printScoreSums = () => {
  //Update point totals on the scorecard
  getTotal();
  upperScore.textContent = total.upper;
  lowerScore.textContent = total.lower;
  totalScore.textContent = total.total;
};

const printHighScores = () => {
  //Update highScore element with current high score
  if (highScores.length) {
    let message = '<p style="text-align: center;"><strong>High scores</strong></p>';
    highScores.forEach(function (highScore) {
      message += `<p>${highScore.name}, ${highScore.score} points - ${highScore.date}</p>`;
    });

    highScore.innerHTML = message;
  }
};
