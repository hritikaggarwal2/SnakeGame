
let canvas = document.getElementById("canvas");
console.log(canvas);

let ctx = canvas.getContext('2d');

let size = 10;

// no of horizontal boxes = width / size
// no of vertical boxes = height / size

let snake = [];

let food;

let dx = size;
let dy = 0;

let width = canvas.width;
let height = canvas.height;

addToSnake(0, 0);
addToSnake(10, 0);
addToSnake(20, 0);


setInterval(update, 100);
addFood();

window.addEventListener("keydown", keys);

function addToSnake(xVal, yVal) {
	snake.push({
		x: xVal,
		y: yVal
	});

	drawRect(xVal, yVal);
}


function update() {

	ctx.clearRect(0, 0, width, height);
	snake.shift();

	if (foodCollide()) {
		addFood();
		addSnake();
	}

	if (selfCollide()) {
		alert("YOU LOST");
	}

	addSnake();
	drawSnake();
	drawRect(food.x, food.y);
}

function foodCollide() {
	let ret = false;
	let headX = snake[snake.length - 1].x;
	let headY = snake[snake.length - 1].y;

	if (headX == food.x && headY == food.y) {
		ret = true;
	}

	return ret;
}

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

function addSnake() {
	let x = snake[snake.length - 1].x + dx;
	let y = snake[snake.length - 1].y + dy;

	if (dx == size &&
		snake[snake.length - 1].x == width) {
		
		x = 0;

	} else if (dx == -size &&
		snake[snake.length - 1].x == 0) {
		
		x = width;

	} else if (dy == -size &&
		snake[snake.length - 1].y == 0) {
		
		y = height;

	} else if (dy == size &&
		snake[snake.length - 1].y == height) {
		
		y = 0;
		
	}

	addToSnake(x, y);
}

function addFood() {
	let xVal = Math.floor(Math.random() * width / size) * size;
	let yVal = Math.floor(Math.random() * height / size) * size;


	console.log(xVal);
	food = {
		x: xVal,
		y: yVal
	}
}

function drawSnake() {
	for (let i = 0; i < snake.length; i++) {
		drawRect(snake[i].x, snake[i].y);
	}
}

function keys(e) {
	if (e.keyCode == 40) { // down
		console.log("DOWN");
		dx = 0;
		dy = size;
	} else if (e.keyCode == 39) { // right
		dx = size;
		dy = 0;
	} else if(e.keyCode == 38) { // up
		dx = 0;
		dy = -size;
	} else if (e.keyCode == 37) { // left
		dx = -size;
		dy = 0;
	}
}

function drawRect(x, y) {
	ctx.fillRect(x, y, size, size);
}