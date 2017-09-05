/**********************************************************
VARIABLES
**********************************************************/

//Find page elements
const roundCounter = document.querySelector('#roundCounter');
const diceDiv = document.querySelector('.dice');
const diceButtons = diceDiv.children;
const rollButton = document.querySelector('#rollButton');
const scoreButton = rollButton.nextElementSibling;
const radioInput = document.querySelectorAll('input');
const upperScore = document.querySelector('#upperScore');
const lowerScore = document.querySelector('#lowerScore');
const totalScore = document.querySelector('#totalScore');

//Create variables
let dice = [];
let rollsLeft = 2;



/**********************************************************
EVENT LISTENERS
**********************************************************/

//Dice evt listener: Keeping vs rerolling
for (let i = 0; i < diceButtons.length; i++) {
	diceButtons[i].addEventListener('click',  () => {
		if (diceButtons[i].title === 'Keeping') {
			diceButtons[i].title = 'Rerolling';
		} else {
			diceButtons[i].title = 'Keeping';
		}
	});
}

//Roll button
rollButton.addEventListener('click', () => {
	if ( rollsLeft > 0 ) {
		for (let i = 0; i < diceButtons.length; i++) {
			if (diceButtons[i].title === 'Rerolling') {
				dice[i] = d();
				diceButtons[i].textContent = dice[i];
			}
		}
		rollsLeft--;
		updateRollButton();
	}
});

//Score button
scoreButton.addEventListener('click', (event) => {
	let radioSelected = false;
	dice.sort();
	//Use event target instead of for loop
	for (let i = 0; i < radioInput.length; i++) { //Scroll through to find selected radio
		if (radioInput[i].checked) { //If true, score
			const radio = radioInput[i]; //Select radio button
			const id = radio.id; //Get id of scoring option
			const tr = radio.parentNode.parentNode.parentNode; //Select tr
			const td1 = tr.firstElementChild; //td for radio
			const td2 = tr.lastElementChild; //td for points
			radioSelected = true; //Change var for later
			scoringFunctions[id]();
			if (id !== "yahtzee") {
				//Shit...
			}
			if (radioInput[i] <= 5) {
				td2.textContent = upperScores[i+1];
			} else {
				td2.textContent = lowerScores[id];
			}
			radio.checked = false;
		}
	}
	if (!radioSelected) {
		alert('Please choose a scoring option');
	} else {
		nextRound();
	}
});