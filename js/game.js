let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "ArrowRight":
            keyboard.RIGHT = true;
        break;
        case "ArrowLeft":
            keyboard.LEFT = true;
        break;
        case "ArrowUp":
            keyboard.UP = true;
        break;
        case "ArrowDown":
            keyboard.DOWN = true;
        break;
        case " ":
            keyboard.SPACE = true;
        break;
        case "d":
            keyboard.D = true;
        break;
        default:
        break;
    }
});

window.addEventListener("keyup", (event) => {
    switch(event.key) {
        case "ArrowRight":
            keyboard.RIGHT = false;
        break;
        case "ArrowLeft":
            keyboard.LEFT = false;
        break;
        case "ArrowUp":
            keyboard.UP = false;
        break;
        case "ArrowDown":
            keyboard.DOWN = false;
        break;
        case " ":
            keyboard.SPACE = false;
        break;
        case "d":
            keyboard.D = false;
        break;
        default:
        break;
    }
});