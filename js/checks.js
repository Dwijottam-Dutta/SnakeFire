// Check if the window width is not equal to the initial width
var win = 0;
window.onload = function () {
    win = window.innerWidth;
}
window.onresize = function () {
    if (window.innerWidth != win - 10) {
        location.reload();
    }
}