/**
 * @file: $.js
 * @description: This file contains the main game constants and variables for further use.
 * @author: @Dwijottam-Dutta
 * @date 15-07-2025
 */


let inputDir = {
    x: 0,
    y: 0
};
const foodSound = new Audio('assets/food.mp3');
const gameOverSound = new Audio('assets/gameover.mp3');
const moveSound = new Audio('assets/move.mp3');
// const musicSound = new Audio('assets/music1.mp3');

let speed = 2;              // Initial speed of the snake
let score = 0;              // Initial score of the game
let lastPaintTime = 0;
var isPaused = false;       // Initial state of the game animation
var WASD = false;           // Whether the game is being played with WASD keys or not


let snakeArr = [{
    x: 9,
    y: 8
}];                         // Initial snake position

var food = {
    x: 6,
    y: 7
};                          // Initial food position


// Screen Width Media Queries Constants
const narrowscreen = window.matchMedia('(max-width: 562px)');
const narrowestscreen = window.matchMedia('(max-width: 435px)');
const shortestscreen = window.matchMedia('(max-height: 750px)');
const shortscreen = window.matchMedia('(max-height: 830px)');



// W-A-S-D BUTTONS
const w = document.getElementById("up-btn");
const a = document.getElementById("left-btn");
const s = document.getElementById("down-btn");
const d = document.getElementById("right-btn");

const pauseBtn = document.getElementById("pause-btn");
const playGameBtn = document.getElementById("play-btn-game");