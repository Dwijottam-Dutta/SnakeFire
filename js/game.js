/**
 * @file js/game.js
 * @description: This file contains the main game logic and gameEngine for the Snake game.
 *               It handles the snake movement, food generation, collision detection, and rendering.
 *               It also manages the game state, including score and speed adjustments, and many moree..
 * 
 * @author: @Dwijottam-Dutta
 * @date 15-07-2025
 */

let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    highScore = localStorage.setItem("highScore", 0);
    highScore = localStorage.getItem("highScore");
    hiscoreBox.innerHTML = "<box-icon type='solid' name='party'></box-icon>&nbsp;HiScore: " + highScore;
}
else {
    hiscoreBox.innerHTML = "<box-icon type='solid' name='party'></box-icon>&nbsp;HiScore: " + highScore;
}


function main(ctime) {
    if (!isPaused) {
        window.requestAnimationFrame(main);
        // console.log(ctime)
        if ((ctime - lastPaintTime) / 500 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
        gameENGINE();
    }
}

// Check if the snake collides with itself or the wall
function isCollide(snake) {

    // If snake bump into itself 
    for (let i = 3; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If snake bump into the wall

    // Small Device Width Adjustments
    if (narrowscreen.matches || shortestscreen.matches) {
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }
    }
    // Smallest deivce Width Adjustments
    if (narrowestscreen.matches) {
        if (snake[0].x >= 16 || snake[0].x <= 0 || snake[0].y >= 16 || snake[0].y <= 0) {
            return true;
        }
    }

    // Normal Device Width Adjustments
    if (snake[0].x >= 21 || snake[0].x <= 0 || snake[0].y >= 21 || snake[0].y <= 0) {
        return true;
    }

    return false;
}


// Fucking made a gameENGINE by myself can't believe it! 😎
function gameENGINE() {

    // Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        // musicSound.pause();
        inputDir = {
            x: 0,
            y: 0
        };

        score = 0;

        // GAME OVER
        scoreBox.innerHTML = "Game Over";

        setTimeout(() => {
            scoreBox.innerHTML = score;
        }, 2000);

        playGameBtn.style.display = "flex";
        document.getElementById("controls-box").style.display = "none";
        if (narrowscreen.matches) {
            document.getElementById("trademark").style.display = "block";
        }
        WASD = false;

        snakeArr = [{
            x: 9,
            y: 8
        }];

        speed = 2; // Reset speed to initial value

        // musicSound.play();
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;

        if (score == 10 || score == 20 || score == 30 || score == 40 || score == 50) {
            speed += 0.5;
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
        var b = 20;
        if (narrowscreen.matches || shortestscreen.matches) {
            a = 2;
            b = 17;
        }
        if (narrowestscreen.matches) {
            a = 2;
            b = 15;
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
    if (WASD) {
        inputDir.x = 0;
        inputDir.y = -1;
    }
    // moveSound.play();
});

a.addEventListener("click", function () {
    if (WASD) {
        inputDir.x = -1;
        inputDir.y = 0;
    }
});

s.addEventListener("click", function () {
    if (WASD) {
        inputDir.x = 0;
        inputDir.y = 1;
    }
});

d.addEventListener("click", function () {
    if (WASD) {
        inputDir.x = 1;
        inputDir.y = 0;
    }
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
    if (narrowscreen.matches) {
        document.getElementById("trademark").style.display = "none";
    }
    WASD = true;
    w.click();
    isPaused = false;
    pauseBtn.innerHTML = "<box-icon name='pause' style='transform: scale(1.5);'></box-icon>";
    score = 0;
});


//Checking user is changing the tab
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== "visible") {
        // musicSound.play();
        if (WASD) {
            isPaused = true;
            pauseBtn.innerHTML = "<box-icon name='play' style='transform: scale(1.5);'></box-icon>";
        }
    }
});

window.addEventListener('keydown', e => {
    e.preventDefault();

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

        case "Enter":
            playGameBtn.click();
            break;


        default:
            break;
    }
});