const d = () => Math.floor(Math.random() * 6 ) + 1;
const updateRoundCounter = () => roundCounter.textContent = `Round ${round} of 13`;
const updateRollButton = () => rollButton.textContent = `${rollsLeft} rolls left`;

const printDice = () => {
	for (let i = 0; i < 5; i++) {
		diceButtons[i].textContent = dice[i];
	};
};

const printScores = () => {
	for (let i = 0; i < radioInput; i++) {
		let id = radioInput[i].id;
		console.log(id);
		//get id
		//if id
		//radioInput[i].parentNode.parentNode.parentNode.lastElementChild.textContent = //upperScore.id
	}
		/*
		const radioInput = document.querySelectorAll('input');
		input.div.td.tr.lasttd
				<tr class="scorecard" id="two">
					<td>
						<div class="radio">
							<input type="radio" name="optradio" id="two">
						</div>
					</td>
					<td>
						<div class="radiotext">
							<label>Twos</label>
						</div>
					</td>
					<td>
						<div class="radiotext">
							<label>Sum of twos</label>
						</div>
					</td>
					<td></td>
				</tr> */
		//console.log(upperScore[word]);
		// let scorecard = document.getElementById(prop).lastElementChild;
	getTotal();
	upperScore.textContent = total.upper;
	lowerScore.textContent = total.lower;
	totalScore.textContent = total.total;
};

const rollDice = () => {
	dice = [];
	for (let i = 0; i < 5; i++) {
		dice.push(d());
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
	round++;
	rollsLeft = 2;
	updateRoundCounter();
	updateRollButton();
	if (round === 13) {
		endGame();
	} else {
		rollDice();
	};
};

const endGame = () => {
	printScores();
	alert(`Congrats! Your final score was ${total.total}.`);
	//update high scores
};