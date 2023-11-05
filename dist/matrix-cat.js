class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.chracters =
            "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
        this.text = "";
    }

    draw(context) {
        // generating a random symbol from characters string
        this.text = this.chracters.charAt(
            Math.floor(Math.random() * this.chracters.length)
        );
        //drawing text
        context.textAlign = "center";
        context.font = this.fontSize + "px monospace";
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    }
    // resetting y-axis to 0 if it crosses the height of the window
    // otherwise incerementing y-axis value by 1
    update() {
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}
class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 9;
        this.columns = canvasWidth / this.fontSize;
        console.log(this.columns);
        this.symbols = [];
        this.#initialize();
    }

    #initialize() {
        // initializing symbols array with Symbol objects
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    //function will be called when window resize event occurs
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}
const parent = document.getElementById("canvas-parent");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

//single color
const singleColor = "#0aff0a";

// default color
let defaultColor = singleColor;

// creating effect object which initializes symbols array with Symbol objects
const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 50;
const nextframe = 1000 / fps; //for fps = 50, nextFrame = 20
let timer = 0;

function animate(timeStamp) {
    // checking paint time difference
    const deltaTime = timeStamp - lastTime;
    //updating lastTime = current elapsed time to  paint the screen
    lastTime = timeStamp;
    // if time exceeds nextframe value then paint
    // and reset timer to zero else add delta time
    if (timer > nextframe) {
        // drawing transparent rectangle over text to hide previous text
        ctx.fillStyle = "rgba(0,0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // text color
        ctx.fillStyle = defaultColor;
        //drawing text column
        effect.symbols.forEach((symbol) => {
            symbol.draw(ctx);
            symbol.update();
        });
        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}
animate(0);

// resize event to handle columns adjustment on window resize
window.addEventListener("resize", () => {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    effect.resize(canvas.width, canvas.height);
});

//referenced and modified from: https://github.com/sumitKcs/matrix-effect/tree/master
