app.main = (function(){
	var button = document.getElementsByClassName('button')[0],
		input = document.getElementsByTagName('input')[0];
	// setting the run button on click function
	// making sure that a negative number won't be applied
	button.onclick = function () {
		var requiredBallsNumber = parseInt(input.value);
		if (requiredBallsNumber >= 0){
			app.balls.updateBalls(input.value);	
		}
		else {
			alert("Only positive amount of balls is allowed.\nPlease try again");
		}
	}
})();