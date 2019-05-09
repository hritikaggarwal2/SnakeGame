(function() {

	// A constant for size of single part of the snake / food
	const size = 10;

	// Step 1 : Getting the reference to the element
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext('2d');
	
	// Step 2 : Diving the screen to understand the logic
		// no of horizontal boxes = width / size
		// no of vertical boxes = height / size

	// Placeholder for storing the position of different parts of the snake
	let snake = [];

	// Placeholder for storing the position of the food object
	let food;

	// Change in x direction of snake at every update
	let dx = size;

	// Change in y direction of snake at every update
	let dy = 0;

	// Width of the canvas screen
	let width = canvas.width;

	// Height of the canvas screen
	let height = canvas.height;

	// Initial conditions to make the starter snake
	addToSnake(0, 0);
	addToSnake(10, 0);
	addToSnake(20, 0);

	// Initial conditions to make the starter food
	addFood();

	// Adds keyboard functionality by checking if any key is pressed
	window.addEventListener("keydown", keys);

	// Updating the screen after every set interval
	let timer = setInterval(update, 100);

	/**
	*	Step 3 : Adds a new snake body part at the end of the snake object,
	*	such that the part added becomes the head of the snake
	*	@param {Number} x - x position of the rectangle to be filled
	*	@param {Number} y - y position of the rectangle to be filled
	*/
	function drawRect(x, y) {
		ctx.fillRect(x, y, size, size);
	}

	/**
	*	Step 4 : Adds a new snake body part at the end of the snake object,
	*	such that the part added becomes the head of the snake
	*	@param {Number} xVal - x position of the snake
	*	@param {Number} yVal - y position of the snake
	*/
	function addToSnake(xVal, yVal) {
		snake.push({
			x: xVal,
			y: yVal
		});
	}

	/**
	*	Step 5 : Draws out a rectangular snake based in the snake array
	*/
	function drawSnake() {
		for (let i = 0; i < snake.length; i++) {
			drawRect(snake[i].x, snake[i].y);
		}
	}

	/**
	*	Step 6 : Adds a new snake object (a single body part of snake) at the
	*	position next to the head in the direction of snake's motion. It also
	*	checks for end cases that might have been countered when the snake
	*	crosses any of the borders of the canvas
	*/
	function addSnake() {
		let x = snake[snake.length - 1].x + dx;
		let y = snake[snake.length - 1].y + dy;

		if (dx == size && snake[snake.length - 1].x == width) {
			/**
			*	When the snake is moving in the right direction and it reaches
			*	the right most end of the canvas, place the head of the snake
			*	at the left-most end.
			*/
			x = 0;
		} else if (dx == -size && snake[snake.length - 1].x == 0) {
			/**
			*	When the snake is moving in the left direction and it reaches
			*	the left most end of the canvas, place the head of the snake
			*	at the right-most end.
			*/
			x = width;
		} else if (dy == -size && snake[snake.length - 1].y == 0) {
			/**
			*	When the snake is moving in the up direction and it reaches
			*	the top end of the canvas, place the head of the snake
			*	at the bottom.
			*/
			y = height;
		} else if (dy == size && snake[snake.length - 1].y == height) {
			/**
			*	When the snake is moving in the down direction and it reaches
			*	the bottom end of the canvas, place the head of the snake
			*	at the top.
			*/
			y = 0;
		}

		addToSnake(x, y);
	}

	/**
	*	Step 7 : Update the snake to make it move by one step in the direction of motion
	*	given by 'dx' and 'dy' placeholders set above
	*/
	function update() {
		// Clears the canvas
		ctx.clearRect(0, 0, width, height);
		
		// Removes the tail of the snake
		snake.shift();

		// Checks if the snake head collided with the food
		if (foodCollide()) {
			addFood();
			addSnake();
		}

		/**
		*	Checks if the snake head collided with any other body part of the snake (i.e.
		*	if snake collides with itself)
		*/
		if (selfCollide()) {
			alert("YOU LOST");
			clearInterval(timer);
		}

		// Adds a new head to the snake to compensate for the removed tail
		addSnake();
		
		// Redraws the snake
		drawSnake();

		// Redraws the food
		drawRect(food.x, food.y);
	}

	/**
	*	Step 8 : Adds 'up', 'right', 'down', and 'left' arrow key functionalities to the
	*	snake game
	*	@param {Object} e - keyboard event object
	*/
	function keys(e) {
		if (e.keyCode == 40) {
			// Down arrow key pressed
			dx = 0;
			dy = size;
		} else if (e.keyCode == 39) {
			// Right arrow key pressed
			dx = size;
			dy = 0;
		} else if(e.keyCode == 38) {
			// Up arrow key pressed
			dx = 0;
			dy = -size;
		} else if (e.keyCode == 37) {
			// Left arrow key pressed
			dx = -size;
			dy = 0;
		}
	}

	/**
	*	Step 9 : Checks if snake head collides with any other part of snake or not
	*	@returns {boolean} true if snake collides with itself and false otherwise
	*/
	function selfCollide() {
		let ret = false;

		for (let i = 0; i < snake.length - 1; i++) {
			if (snake[i].x == snake[snake.length - 1].x &&
				snake[i].y == snake[snake.length - 1].y) {
				ret = true;
			}
		}

		return ret;
	}

	/**
	*	Step 10 : Adds a food object at a random position inside the canvas
	*/
	function addFood() {
		let xVal = Math.floor(Math.random() * width / size) * size;
		let yVal = Math.floor(Math.random() * height / size) * size;

		food = {
			x: xVal,
			y: yVal
		}
	}

	/**
	*	Step 11 : Checks if snake head collides with the food or not
	*	@returns {boolean} true if snake collides with the food and false otherwise
	*/
	function foodCollide() {
		let ret = false;
		let headX = snake[snake.length - 1].x;
		let headY = snake[snake.length - 1].y;

		if (headX == food.x && headY == food.y) {
			ret = true;
		}

		return ret;
	}

})();
