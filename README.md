Welcome to Yahtzee!

I created this app as a challenge for myself in the first couple of months I started learning JavaScript (March 2017) and the first version was complete two weeks later. What you see here is the second version of that app which has been refactored to be easier to read and DRY.

My focus with this project and my learning in general has been the JavaScript. At some point I may improve the webpage design, but for now just know that my focus has been on functionality of this and other apps.

Thank you and enjoy!
Trent Stenoien



Future changes to be made:
	Second Yahztee should only be able to score if valid
	Incorporate closures
		Get rid of all global variables
		Create functions with internal function?

To Do later
	High scores
		Find a way to store persistant values
		Use endGame() to store values
	Clean up scoreRuns(), scoreSets()
	printScoreSums(arg) to avoid looping through everything every time
	
localStorage
	Create array high scores
		Track top 10
			Add score to array
			Sort
			
upperScores.one = 6;
upperScores.two = 12;
upperScores.three = 18;
upperScores.four = 24;
upperScores.five = 30;
upperScores.six = 36;

lowerScores.threeOAK = 36;
lowerScores.fourOAK = 36;
lowerScores.fullHouse = 25;
lowerScores.sStraight = 30;
lowerScores.lStraight = 40;
lowerScores.yahtzee = 50;
lowerScores.chance = 36;