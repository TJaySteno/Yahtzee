//High scores
let highScores;

if (localStorage.highScores) {
	//Parse existing high scores or start a new set
	highScores = JSON.parse(localStorage.highScores);
} else {
	highScores = new Array();
}

const sortHighScores = () => {
	//Sort scores from highest to lowest and keep only the top 10
	highScores.sort(function (a, b) { return b.score - a.score; });
	if (highScores.length > 10) {
		highScores.pop();
	}
}

const updateHighScores = () => {
	//Store high scores in local storage
	sortHighScores();
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("highScores", JSON.stringify(highScores));
	} else {
		throw Error('Sorry! No Web Storage support');
	}
}