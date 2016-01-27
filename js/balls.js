app.balls = (function(){
	//var canvas = document.getElementById('canvas'),
	var	canvas = app.config.canvas
		ctx = canvas.getContext('2d'),
		balls = [],// An array that holds all the balls elements
		generalColor = app.config.colors.yellow,
		rightColor = app.config.colors.red,
		leftColor = app.config.colors.green,
		radius = 20,
		maxSpeed = 5,
		requestID = undefined; 

	/* Creating a constractor for a single ball.
	* Holds information about it's location and speed
	* and size.
	*/
	function Ball (radius, speed, xPosition, yPosition){
		this.radius = radius;
		this.speed = speed;
		this.x = xPosition;
		this.y = yPosition;
	}
	/**
	* Updating the balls location
	*
	* @return {number}  Balls x location on the canvas
	*/
	Ball.prototype.updateLocation = function () {
		// In case the next step will cause the ball to cross the left/right
		// border, it's center would be set so the ball would be adjacent to the border.
		// In addition the balls speed would be set to the other direction by multiplying it by -1.
		// In any other case we will move the ball's center to it's next location.
		if (this.x - this.radius < 0){
			this.x = this.radius;
			this.speed = this.speed * -1;
		} else if (this.x + this.radius > canvas.width) {
			this.x = canvas.width - radius;
			this.speed = this.speed * -1;
		} else {
			this.x = this.x + this.speed;
		}
		// returning the x position would use when checking
		// if this is the right most ball or the left most ball
		return this.x;
	}

	/**
	* Drawing the ball on the canvas
	*
	* @parameter {string}  balls color as a string
	*/
	Ball.prototype.drawBall = function (color){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = color;
		ctx.fill();
	}

	/**
	* Updating the amount of balls visible
	*/

	function updateBalls (requiredAmount) {
		// if an animation frame already been set it will cancell it
		if (requestID){
			window.cancelAnimationFrame(requestID);
		}
		// if the required amount is higher then the current amount
		// we will add new balls to the balls array
		if (requiredAmount > balls.length){
			// saving the additional amount as a separate variable
			// because the loops condition can't use the arrays length because it updates in every run.
			var additionalBalls = requiredAmount - balls.length;
			for (var i = 0; i < additionalBalls; i++){
				// setting random starting point and speed
				var tempX = Math.random() * canvas.width,
					tempY = Math.random() * canvas.height,
					tempSpeed = Math.random() * maxSpeed;
				//creating the ball
				var ball = new Ball(radius, tempSpeed, tempX, tempY);
				//inserting the ball to the balls array
				balls.push(ball);
			}
		} else if (requiredAmount < balls.length){
			// when the required amount is lower than the amount of balls
			// currently on the screen (and in the array), using splice to
			// remove balls from the end of the balls array.
			balls.splice(requiredAmount, balls.length);
		}

		draw();
	}
	/**
	* drawing the balls on the canvas
	*/
	function draw () {
		// variables for testing and determining in each draw which is 
		// the most right ball and the most left ball
		var rightBallPosition = -1,
			rightBallIndex = -1,
			leftBallPosition = -1,
			leftBallIndex = -1;
		//clearing the canvas before redrawing
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// First loop:
		// moving the balls one more step and collecting information 
		// on the right/left most balls
		for (var i = 0; i < balls.length; i++) {
			var currentBallPosX = balls[i].updateLocation();
			// checking if this is the right most ball
			if (currentBallPosX > rightBallPosition){
				rightBallIndex = i;
				rightBallPosition = currentBallPosX;
			}
			//checking if it is the left most ball (or the first wer're encountring)
			if (currentBallPosX < leftBallPosition || leftBallIndex === -1){
				leftBallIndex = i;
				leftBallPosition = currentBallPosX;
			}
		}
		// Second Loop:
		// Using for drawing the balls and setting their color
		// according to the data collected regarding their next step
		for (var j = 0; j < balls.length; j++){
			switch (j){
				case leftBallIndex:
					balls[j].drawBall(leftColor);
					break;
				case rightBallIndex:
					balls[j].drawBall(rightColor);
					break;
				default:
					balls[j].drawBall(generalColor);
			}
		}
		
		requestID = window.requestAnimationFrame(draw);
	}


	// The function we want to export is the updateBalls function for the use of the Run button
	return {
		updateBalls: updateBalls
	}

})();