let dice = [];

const d = () => Math.floor(Math.random() * 6 ) + 1;

const rollDice = () => {
	dice = [];
	for (let i = 0; i < 6; i++) {
		dice.push(d());
	}
}