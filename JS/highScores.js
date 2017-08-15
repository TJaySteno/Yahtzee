//High scores
const highScores = (finalScore, name) => {
	if (localStorage.highScore < finalScore) {
		localStorage.highScore = finalScore;
		localStorage.nombre = name;
	};
};

	//localStorage
		//Create array high scores
			//Track top 10
				//Add score to array
				//Sort
				//pop(?)
			