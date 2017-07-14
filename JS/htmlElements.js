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
let preventYahtzee = false;

//Add event listeners
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
		printRollButton();
	};
});

scoreButton.addEventListener('click', function() {
	let option = scrollInput();
	if (!option) {
		alert('Please choose a scoring option.');
	} else if (preventYahtzee === true && option === 'yahtzee') {
		alert("Don't be greedy bro! Please pick something besides another Yahtzee.");
	} else {
		scoring[option]();
	};
});