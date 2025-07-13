// Game Constants & Variables
let inputDir = {
    x: 0,
    y: 0
};
const foodSound = new Audio('assets/food.mp3');
const gameOverSound = new Audio('assets/gameover.mp3');
const moveSound = new Audio('assets/move.mp3');
// const musicSound = new Audio('assets/music1.mp3');

// Screen Width Media Queries Constants
const narrowscreen = window.matchMedia('(max-width: 562px)');
const narrowestscreen = window.matchMedia('(max-width: 435px)');

// W-A-S-D BUTTONS
const w = document.getElementById("up-btn");
const a = document.getElementById("left-btn");
const s = document.getElementById("down-btn");
const d = document.getElementById("right-btn");

const pauseBtn = document.getElementById("pause-btn");
const playGameBtn = document.getElementById("play-btn-game");
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    highScore = localStorage.setItem("highScore", 0);
    highScore = localStorage.getItem("highScore");
    hiscoreBox.innerHTML = "My HiScore: " + highScore;
}
else {
    hiscoreBox.innerHTML = "My HiScore: " + highScore;
}
let speed = 6;          // Initial speed of the snake
let score = 0;          // Initial score of the game
let lastPaintTime = 0;
var isPaused = false;   // Initial state of the game

let snakeArr = [{
    x: 9,
    y: 8
}];

var food = {
    x: 6,
    y: 7
};

function main(ctime) {
    if (!isPaused) {
        window.requestAnimationFrame(main);
        // console.log(ctime)
        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
        gameENGINE();
    }
}

// Check if the snake collides with itself or the wall
function isCollide(snake) {
    // If snake bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If snake bump into the wall small width device
    if (narrowscreen.matches) {
        if (snake[0].x >= 16 || snake[0].x <= 0 || snake[0].y >= 16 || snake[0].y <= 0) {
            return true;
        }
    }
    // If you bump into the wall smallest width deivce
    if (narrowestscreen.matches) {
        if (snake[0].x >= 13 || snake[0].x <= 0 || snake[0].y >= 13 || snake[0].y <= 0) {
            return true;
        }
    }

    // If you bump into the wall normal width device
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
           return true;
    }
    
    return false;
}



function gameENGINE() {

    // Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        // musicSound.pause();
        inputDir = {
            x: 0,
            y: 0
        };

        // alert("Game Over.. !!");

        playGameBtn.style.display = "flex";
        document.getElementById("controls-box").style.display = "none";
        if (narrowestscreen.matches) {
            document.getElementById("trademark").style.display = "block";
        }

        snakeArr = [{
            x: 9,
            y: 8
        }];
        score = 0;
        scoreBox.innerHTML = "Game Over";

        setTimeout(() => {
            scoreBox.innerHTML = score;
        }, 2000);
        speed = 6;
        // musicSound.play();
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;

        if (score == 10 || score == 20 || score == 30 || score == 40 || score == 50) {
            speed += 1;
            congo();
        }

        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            hiscoreBox.innerHTML = "My HiScore: " + highScore;
            
        }

        scoreBox.innerHTML = score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });

        var a = 2;
        var b = 17;
        if (narrowscreen.matches) {
            a = 2;
            b = 13;
        }
        if (narrowestscreen.matches) {
            a = 2;
            b = 11;
        }
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {
            ...snakeArr[i]
        };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Displaying the snake 🐍
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}







// Here we gooo!!!!
window.requestAnimationFrame(main);

w.addEventListener("click", function () {
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = -1;
    w.style.boxShadow = "0px 3px var(--title-color)";
    w.style.transform = "translateY(4px)";
    setTimeout(() => {
        w.style.boxShadow = "3px 3px var(--title-color)";
        w.style.transform = "none";
    }, 300);
});

a.addEventListener("click", function () {
    moveSound.play();
    inputDir.x = -1;
    inputDir.y = 0;
    a.style.boxShadow = "0px 3px var(--title-color)";
    a.style.transform = "translateY(4px)";
    setTimeout(() => {
        a.style.boxShadow = "3px 3px var(--title-color)";
        a.style.transform = "none";
    }, 300);
});

s.addEventListener("click", function () {
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = 1;
    s.style.boxShadow = "0px 3px var(--title-color)";
    s.style.transform = "translateY(4px)";
    setTimeout(() => {
        s.style.boxShadow = "3px 3px var(--title-color)";
        s.style.transform = "none";
    }, 300);
});

d.addEventListener("click", function () {
    moveSound.play();
    inputDir.x = 1;
    inputDir.y = 0;
    d.style.boxShadow = "0px 3px var(--title-color)";
    d.style.transform = "translateY(4px)";
    setTimeout(() => {
        d.style.boxShadow = "3px 3px var(--title-color)";
        d.style.transform = "none";
    }, 300);
});

pauseBtn.addEventListener("click", function () {
    isPaused = !isPaused;
    pauseBtn.innerHTML = isPaused ? "<box-icon name='play' style='transform: scale(1.5);'></box-icon>" : "<box-icon name='pause' style='transform: scale(1.5);'></box-icon>";
    if (!isPaused) {
        requestAnimationFrame(main);
    }
});


playGameBtn.addEventListener("click", function () {
    playGameBtn.style.display = "none";
    document.getElementById("controls-box").style.display = "flex";
    if (narrowestscreen.matches) {
        document.getElementById("trademark").style.display = "none";
    }
});




// If device is not mobile, show the WASD keys insead of arrow buttons
function isMobileDevice() {
    return window.matchMedia("only screen and (max-width: 768px)").matches;
}
if (!isMobileDevice()) {
    w.innerHTML = "W";
    a.innerHTML = "A";
    s.innerHTML = "S";
    d.innerHTML = "D";
}


//Checking user is changing the tab
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        // musicSound.play();
    } else {
        // musicSound.pause();
        alert("RESUME ?")
    }

});

window.addEventListener('keydown', e => {
    e.preventDefault();

    // Start the game
    playGameBtn.click();
    // musicSound.play(); // if stopped background music then start again
    switch (e.key) {
        case "w":
            w.click();
            break;

        case "s":
            s.click();
            break;

        case "a":
            a.click();
            break;

        case "d":
            d.click();
            break;

        case "q":
            pauseBtn.click();
            break;


        default:
            break;
    }
});