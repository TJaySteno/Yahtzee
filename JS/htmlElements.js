/**********************************************************
VARIABLES
**********************************************************/

//Find page elements
const roundCounter = document.querySelector('#roundCounter');
const diceDiv = document.querySelector('.dice');
const diceButtons = Array.from(diceDiv.children);
const rollButton = document.querySelector('#rollButton');
const scoreButton = rollButton.nextElementSibling;
const radioInput = document.querySelectorAll('input');
const upperScore = document.querySelector('#upperScore');
const lowerScore = document.querySelector('#lowerScore');
const totalScore = document.querySelector('#totalScore');

//Create variables
let dice = [];
let rollsLeft = 2;

//Event listeners
	//Dice buttons
	//Roll button
	//Score button
	//Radio buttons?