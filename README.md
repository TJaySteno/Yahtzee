Welcome to Yahtzee!

Currently in development.

I created a Yahtzee game as a challenge for myself and turns out it's quite a bit more challenging than I thought. I have 99% of the code done, but I'm having trouble with one last thing and I was hoping I could get some help.

What's happening is that as the user uses different options on the scorecard, I replace the HTML radio input with a string, '---'.

When I go to loop through the radio buttons, my function returns the first one that's been replaced and overwrites the score in place. For example if I score 1 then 2, the first round will be fine then when I score the second round, upperScores[one] is overwritten and the following error shows. "Uncaught TypeError: Cannot read property 'parentNode' of null at printTR (functions.js:80) at HTMLButtonElement.<anonymous> (htmlElements.js:48)"