/**
 * @file: device.js
 * @description: This file contains the device-specific configurations and media queries for the Snake game.
 *               It also checks if the game is being played on a mobile device and adjusts the controls accordingly.
 * @author: @Dwijottam-Dutta
 * @date 15-07-2025
 */

// * MISC If the device is not narrow, but short, hide the control buttons
if (shortscreen.matches && !narrowscreen.matches && !narrowestscreen.matches) {
    document.querySelectorAll(".control-btn").forEach((e) => {
        e.style.display = "none";
    });
    document.getElementById("control-btn-mid-section").style.justifyContent = "end";
    document.getElementById("trademark").style.fontSize = "39px";
    
}


// If device is not mobile, show the WASD keys insead of arrow buttons
function isMobileDevice() {
    return window.matchMedia("only screen and (max-width: 768px)").matches;
}
if (!isMobileDevice()) {
    w.innerHTML = "W";
    a.innerHTML = "A";
    s.innerHTML = "S";
    d.innerHTML = "D";
    playGameBtn.innerHTML = `Enter`;
}
if (narrowestscreen.matches || shortestscreen.matches) {
    playGameBtn.innerHTML = `<box-icon name='play' style='transform: scale(1.5);'>`;
}


// Check if the window width is not equal to the initial width, or else reload the page
// This is to prevent the game from breaking when the window is resized
var win = 0;
window.onload = function () {
    win = window.innerWidth;
}
window.onresize = function () {
    if (window.innerWidth != win - 10) {
        location.reload();
    }
}