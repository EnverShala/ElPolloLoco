let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    console.log("My Character is ", world.character);
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
        default:
        break;
    }
});