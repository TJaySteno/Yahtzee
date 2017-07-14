//Find page elements
const roundCounter = document.querySelector('#roundCounter');
const diceDiv = document.querySelector('.dice');
const diceButtons = Array.from(diceDiv.children);
const rollButton = document.querySelector('#rollButton');
const scoreButton = rollButton.nextElementSibling;
const radioInput = document.querySelectorAll('input');
const upperScore = document.querySelector('#upperScore').lastElementChild;
const lowerScore = document.querySelector('#lowerScore').lastElementChild;
const totalScore = document.querySelector('#totalScore').lastElementChild;

//Create variables
let dice = [];
let rollsLeft = 2;
let round = 0;

const scrollInput = () => {
	let option;
	for (let i = 0; i < radioInput.length; i++) {
		if (radioInput[i].checked) {
			option = radioInput[i].id;
			radioInput[i].checked = false;
			//Replace radio with '-'
		};
	};
	return option;
};

for (let i = 0; i < 5; i++) {
	diceButtons[i].addEventListener('click', function() {
		if (diceButtons[i].title === 'Rerolling') {
			diceButtons[i].title = 'Keeping';
		} else {
			diceButtons[i].title = 'Rerolling';
		};
	});
};

rollButton.addEventListener('click', function() {
	if (rollsLeft > 0) {
		reroll();
		rollsLeft--;
		updateRollButton();
	};
});

scoreButton.addEventListener('click', function() {
	let option = scrollInput();
	if (!option) {
		alert('Please choose a scoring option');
	} else {
		scoring[option]();
		printScores();
		newRound();
	};
});