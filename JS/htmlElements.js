//Find page elements
const roundCounter = document.querySelector('#roundCounter');
const diceDiv = document.querySelector('.dice');
const diceButtons = Array.from(diceDiv.children);
const rollButton = document.querySelector('#rollButton');
const scoreButton = rollButton.nextElementSibling;
const highScore = scoreButton.parentNode.nextElementSibling.firstElementChild;
const radioInput = document.querySelectorAll('input');
const upperScore = document.querySelector('#upperScore').lastElementChild;
const lowerScore = document.querySelector('#lowerScore').lastElementChild;
const totalScore = document.querySelector('#totalScore').lastElementChild;
const bonus = document.getElementById('bonus');

//Create variables
let dice = [];
let rollsLeft = 2;
let round = 0;

//Add event listeners
for (let i = 0; i < 5; i++) {
	//Select which dice to keep vs reroll
	diceButtons[i].addEventListener('click', function() {
		if (diceButtons[i].title === 'Rerolling') {
			diceButtons[i].title = 'Keeping';
		} else {
			diceButtons[i].title = 'Rerolling';
		};
	});
};

rollButton.addEventListener('click', function() {
	//Reroll selected dice
	if (rollsLeft > 0) {
		reroll();
		rollsLeft--;
		printRollButton();
	};
});

scoreButton.addEventListener('click', function() {
	//Find selected scoring option and run scoring function
	let element = scrollInput();
	if (!element) {
		alert('Please choose a scoring option.');
	} else {
		score[element.id]();
		printTR(element);
	};
});
