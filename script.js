
//Variables & Constants
let snakeDir = {x: 0, y: 0};
const gameSound = new Audio("../audio/music.mp3");
const moveSound = new Audio("../audio/move.mp3");
const foodSound = new Audio("../audio/food.mp3");
const gameOverSound = new Audio("../audio/gameover.mp3");
let gameBoard = document.querySelector(".gameBoard");
let speed = 6;
let scoreBox = document.querySelector(".scoreBoard");
let score = 0;
let highscore = localStorage.getItem("highscore");
let highscoreBox = document.querySelector(".highScore");
let lastPaintTime = 0;
let snakeSize = [{x: 15, y: 15}]
let food = {x: 7, y: 5};

//speed increasing
// setInterval(() => {
//     speed += 0.5;
// }, 4000);

// All functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if snake bumo into itself
    for (let i = 1; i < snakeSize.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if snake bump into the wall
    if (snake[0].x >= 26 || snake[0].x <= 0 || snake[0].y >= 26 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

//gameEngine
function gameEngine() {
    //part 1 : Display the snake and food
    //display the snake
    gameBoard.innerHTML = "";
    snakeSize.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        gameBoard.appendChild(snakeElement);
    });
    
        //display the food
        foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add("food");
        gameBoard.appendChild(foodElement);

    //part 2 : update the snake and food
    //in case of collision
    if (isCollide(snakeSize)) {
        gameOverSound.play();
        gameSound.pause();
        snakeDir = {x: 0, y: 0};
        speed = 6;
        alert("Game Over! Press any key to start the game again");
        snakeSize = [{x: 15, y: 15}]
        gameSound.play();
        score = 0;
    }

    //if snake has eaten the food, increment the score and regenrate the food
    if (snakeSize[0].x === food.x && snakeSize[0].y === food.y) {
        foodSound.play();
        setTimeout(() => {
            speed += 0.3;
        }, 500);
        score += 1;
        if (score > highscoreVal) {
            highscoreVal = score;
            localStorage.setItem("highscore", JSON.stringify(highscore));
            highscoreBox.innerHTML = "High Score : " + highscoreVal;
        }
        scoreBox.innerText = "Score : " + score;
        snakeSize.unshift({x: snakeSize[0].x + snakeDir.x, y: snakeSize[0].y + snakeDir.y});
        let a = 2;
        let b = 19;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};
    }

    //moving the snake
    for (let i = snakeSize.length - 2; i >= 0; i--) {
        snakeSize[i+1] = {...snakeSize[i]};
    }
    snakeSize[0].x += snakeDir.x;
    snakeSize[0].y += snakeDir.y;
}


// Main Logics
window.requestAnimationFrame(main);
gameSound.play();
if (highscore === null) {
    highscoreVal = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreVal));
} else {
    highscoreVal = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score : " + highscore;
}
window.addEventListener("keydown", e => {
    snakeDir = {x: 0, y: 1} //start the game
    moveSound.play();
    scoreBox.innerText = "Score : " + score;
    switch (e.key) {
        case "ArrowUp":
            snakeDir.x = 0;
            snakeDir.y = -1;
            
            break;
        case "ArrowDown":
            snakeDir.x = 0;
            snakeDir.y = 1;
            
            break;
        case "ArrowLeft":
            snakeDir.x = -1;
            snakeDir.y = 0;
            
            break;
        case "ArrowRight":
            snakeDir.x = 1;
            snakeDir.y = 0;
            
            break;
    
        default:
            break;
    }
});
