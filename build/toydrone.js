(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var keys;
(function (keys) {
    keys[keys["RETURN"] = 13] = "RETURN";
    keys[keys["SPACE"] = 32] = "SPACE";
    keys[keys["LEFT"] = 37] = "LEFT";
    keys[keys["UP"] = 38] = "UP";
    keys[keys["RIGHT"] = 39] = "RIGHT";
    keys[keys["DOWN"] = 40] = "DOWN";
    keys[keys["C"] = 67] = "C";
    keys[keys["G"] = 71] = "G";
    keys[keys["J"] = 74] = "J";
    keys[keys["K"] = 75] = "K";
})(keys || (keys = {}));
const UNITS = 10;
const SIZE = 50;
const MARGIN = 60;
const SLOWEST = 250;
const FASTEST = 0;
// panel constants
const PANELTOP = 150;
const PANELLEFT = 100;
const PANELMARGIN = 100;
const IMAGE_DRONE = "drone-moving.gif";
const IMAGE_BLAST = "blast.gif";

var Utils;
(function (Utils) {
    function rand(min, max, reduce = SIZE) {
        let num = Math.floor(Math.random() * (max - min)) + min;
        return num - (num % reduce);
    }
    Utils.rand = rand;
    function snap(num, point = SIZE) {
        let bottom = num - num % point;
        let top = bottom + point;
        return num - bottom <= top - num ? bottom : top;
    }
    Utils.snap = snap;
    function removeNode(el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }
    Utils.removeNode = removeNode;
    function bound(num, min, max) {
        return Math.max(Math.min(num, max), min);
    }
    Utils.bound = bound;
})(Utils || (Utils = {}));
var Utils$1 = Utils;

var Locations;
(function (Locations) {
    let data = {};
    function set(x, y) {
        data[`${x}:${y}`] = true;
    }
    Locations.set = set;
    function remove(x, y) {
        delete data[`${x}:${y}`];
    }
    Locations.remove = remove;
    function has(x, y) {
        return data[`${x}:${y}`] === true;
    }
    Locations.has = has;
})(Locations || (Locations = {}));
var Locations$1 = Locations;

class Piece {
    constructor(x, y, type = "body", direction = "RIGHT") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.direction = direction;
        this.position = { x: 1, y: 1 };
        this.el = document.createElement("img");
        this.el.src = IMAGE_DRONE;
        this.next = null;
        // Enable for a neat effect
        this.setType(type);
        this.setPos(this.x, this.y);
        // document.body.appendChild(this.el);
        const panel = document.getElementById("panel");
        panel.appendChild(this.el);
    }
    static getSizePerUnit() {
        let width = document.body.clientWidth - PANELMARGIN;
        let sizePerUnit = Math.floor(width / UNITS);
        sizePerUnit = SIZE;
        return sizePerUnit;
    }
    static getPanelWidth() {
        let width = document.body.clientWidth - PANELMARGIN;
        let sizePerUnit = Math.floor(width / UNITS);
        let panelWidth = sizePerUnit * UNITS;
        panelWidth = UNITS * SIZE;
        return panelWidth;
    }
    static getPanelHeight() {
        let height = document.body.clientHeight - PANELMARGIN;
        let sizePerUnit = Math.floor(height / UNITS);
        let panelHeight = sizePerUnit * UNITS;
        panelHeight = UNITS * SIZE;
        return panelHeight;
    }
    static getPanelTop() {
        let panel = document.getElementById("panel");
        return panel ? panel.offsetTop : PANELTOP;
    }
    static getPanelLeft() {
        let panel = document.getElementById("panel");
        return panel ? panel.offsetLeft : PANELLEFT;
    }
    static getXByPositionX(positionX) {
        let x;
        x = ((positionX - 1) * SIZE) + Piece.getPanelLeft();
        return x;
    }
    static getPositionX(x) {
        let positionX;
        positionX = (x - Piece.getPanelLeft()) / SIZE + 1;
        return positionX;
    }
    static getYByPositionY(positionY) {
        let y;
        y = ((positionY - 1) * SIZE) + Piece.getPanelTop();
        return y;
    }
    static getPositionY(y) {
        let positionY;
        positionY = (y - Piece.getPanelTop()) / SIZE + 1;
        return positionY;
    }
    static getDirectionText(piece) {
        let direction;
        switch (piece.direction) {
            case "DOWN":
                direction = "SOUTH";
                break;
            case "LEFT":
                direction = "WEST";
                break;
            case "UP":
                direction = "NORTH";
                break;
            case "RIGHT":
            default:
                direction = "EAST";
                break;
        }
        return direction;
    }
    static clearBlast(x, y) {
        let className = "blast_" + x + "_" + y;
        let elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    static setBlast(x, y) {
        let el = document.createElement("img");
        let type = "image";
        let className = "blast_" + x + "_" + y;
        el.src = IMAGE_BLAST;
        el.style.top = `${y}px`;
        el.style.left = `${x}px`;
        el.classList.add("blast", type);
        el.classList.add(className, type);
        // document.body.appendChild(el);
        const panel = document.getElementById("panel");
        panel.appendChild(el);
    }
    static showStatus(piece) {
        const status = document.getElementById("status");
        let el = document.createElement("span");
        el.innerHTML = `Position - X: ${Piece.getPositionX(piece.x)}, Y: ${Piece.getPositionY(piece.y)}, Direction: ${Piece.getDirectionText(piece)}`;
        status.innerHTML = "";
        status.appendChild(el);
    }
    setPos(x, y) {
        // CSS nove the element
        this.el.style.top = `${y}px`;
        this.el.style.left = `${x}px`;
        // this.el.style.transform = `translate(${x}px, ${y}px)`;
        // reset CSS classnames basically
        this.applyClass();
        // Save the location of this piece to occupied spaces
        // - Head cannot collide with itself
        if (this.type !== "head" && this.type !== "food") {
            Locations$1.set(x, y);
        }
    }
    move(x, y, direction = "RIGHT") {
        // Transition through walls
        if (x === Piece.getPanelLeft() && y === Piece.getPanelTop()) {
            x = Piece.getPanelLeft();
            y = Piece.getPanelTop();
        }
        else if (x < Piece.getPanelLeft()) {
            x = Piece.getPanelLeft();
        }
        else if (y < Piece.getPanelTop()) {
            y = Piece.getPanelTop();
        }
        else if (x >= (Piece.getPanelWidth() + Piece.getPanelLeft())) {
            x = (Piece.getPanelWidth() + Piece.getPanelLeft()) - SIZE;
        }
        else if (y >= (Piece.getPanelHeight() + Piece.getPanelTop())) {
            y = (Piece.getPanelHeight() + Piece.getPanelTop()) - SIZE;
        }
        // Save the old direction
        let tdirection = this.direction;
        // Set new direction of the piece
        this.direction = direction;
        // Move HTML Element to new spot
        this.setPos(x, y);
        // If there is a next piece move it to old position
        if (this.next !== null) {
            // direction instead of old one this is needed to have a fluid motion
            this.next.move(x, y, this.type === "head" ? this.direction : tdirection);
        }
        else {
            // We are the last piece, previous position
            // is now empty, clear it
            Locations$1.remove(this.x, this.y);
        }
        // if I"m part of body and no one is following me
        // then I must be the tail
        if (this.next === null && this.type === "body") {
            this.el.classList.add("tail");
        }
        // if me and the piece following me are at the same spot
        // then piece following me must be the food we just swallowed
        if (this.next !== null && this.next.x === x && this.next.y === y) {
            this.next.el.classList.add("gulp");
        }
        // Bendy corners
        if (this.next !== null && this.direction !== this.next.direction) {
            this.el.classList.add(`${this.direction}-${this.next.direction}`);
        }
        // store new values
        this.x = x;
        this.y = y;
        Piece.showStatus(this);
    }
    setType(type) {
        this.type = type;
        this.applyClass();
    }
    applyClass() {
        this.el.className = "";
        this.el.classList.add("cell", this.type, this.direction);
    }
    remove() {
        // Remove the piece, it"s location and HTML element
        // This is needed to free up memory
        Utils$1.removeNode(this.el);
        Locations$1.remove(this.x, this.y);
        // Do the same for all linked pieces
        if (this.next) {
            this.next.remove();
            this.next = null;
        }
    }
}

var Directions;
(function (Directions) {
    let queue = [];
    let current = keys.RIGHT;
    function set(key) {
        queue.push(key);
    }
    Directions.set = set;
    function get() {
        return current;
    }
    Directions.get = get;
    function pop() {
        if (queue.length > 0) {
            current = queue.shift();
        }
        return get();
    }
    Directions.pop = pop;
    function flush() {
        queue = [];
        current = keys.RIGHT;
    }
    Directions.flush = flush;
    function peek() {
        return queue.length > 0 ? queue[queue.length - 1] : current;
    }
    Directions.peek = peek;
})(Directions || (Directions = {}));
var Directions$1 = Directions;

const removeElements = (elms) => elms.forEach(el => el.remove());
class Game {
    constructor(levels) {
        this.levels = levels;
        this.length = 0;
        this.highScore = 0;
        this.score = 0;
        this.currentLevel = null;
        this.moving = false;
        this.paused = false;
        this.reset = false;
        this.gridVisible = false;
        this.debugSpeed = 0;
        this.noClip = false;
        this.init();
        this.setEvents();
    }
    clearGameObjects() {
        this.clearBlasts();
        this.clearCell();
        this.head = null;
    }
    init() {
        // clear objects if any
        this.clearGameObjects();
        Directions$1.flush();
        this.head = new Piece(Piece.getPanelLeft(), Piece.getPanelTop(), "head");
        this.drawGrid();
        this.resetHead();
        this.handleFood();
        this.clearBlasts();
    }
    getRandomLevel() {
        return this.levels[Math.floor(Math.random() * this.levels.length)];
    }
    // Remove the old chain, put HEAD in the starting position
    resetHead() {
        if (this.head.next) {
            this.head.next.remove();
            this.head.next = null;
        }
        let x = Piece.getPanelLeft();
        let y = Piece.getPanelTop();
        this.head.move(x, y);
        // this.head.next = new Piece(x - SIZE, y);
        // this.head.next.next = new Piece(x - SIZE * 2, y, "tail");
    }
    /**
     * Reset all values and restart the game
     */
    start() {
        this.drawGrid();
        // Don"t restart already running game
        {
            this.resetHead();
            this.length = 0;
            this.debugSpeed = 0;
            this.score = 0;
            Directions$1.flush();
            this.showScore();
            this.moving = true;
            requestAnimationFrame(this.frame.bind(this));
        }
    }
    /**
     * GAME OVER
     */
    over() {
        this.moving = false;
        let el = document.querySelector(".score");
        el.innerHTML = `
      Game over! Score: ${this.length * 1000}.
      <button id="start">Click here to try again.</button>
    `;
    }
    /**
     * Get a random empty location for food
     */
    getFoodLocation() {
        let x = Utils$1.rand(MARGIN, document.body.clientWidth - MARGIN, SIZE);
        let y = Utils$1.rand(MARGIN, document.body.clientHeight - MARGIN, SIZE);
        // If random spot is already filled, pick a new one
        // Pick until you find an empty spot
        // ..... nothing can go wrong with this
        if (Locations$1.has(x, y)) {
            [x, y] = this.getFoodLocation();
        }
        return [x, y];
    }
    handleFood() {
        // If the there is no food, create a random one.
        
    }
    getSpeed() {
        const initialSpeed = 150;
        const calculated = (initialSpeed - this.length * 0.5) + this.debugSpeed;
        return Utils$1.bound(calculated, FASTEST, SLOWEST);
    }
    updateScore() {
        if (this.noClip === true) {
            return this.score;
        }
        const level = 500;
        const speed = this.getSpeed();
        const val = (SLOWEST - speed) * this.length;
        let leveled = Utils$1.snap(val, level);
        // You should not get zero points
        if (leveled < level) {
            leveled = level;
        }
        return this.score += leveled;
    }
    showScore() {
        let el = document.querySelector(".score");
        if (!el) {
            return;
        }
        this.highScore = this.highScore < this.score ? this.score : this.highScore;
        el.innerHTML = `
            Score: ${this.score}, High Score: ${this.highScore}
        `;
    }
    redrawDrone() {
        this.reset = true;
        this.head.x = Piece.getXByPositionX(this.head.position.x);
        this.head.y = Piece.getYByPositionY(this.head.position.y);
        requestAnimationFrame(this.frame.bind(this));
    }
    move() {
        requestAnimationFrame(this.frame.bind(this));
    }
    attack() {
        let direction = Directions$1.pop();
        let targetX = this.head.x;
        let targetY = this.head.y;
        let blast = false;
        const targetAt = SIZE * 3;
        if (direction === keys["LEFT"]) {
            let target = this.head.x - targetAt;
            if (target >= Piece.getPanelLeft()) {
                targetX = target;
                blast = true;
            }
        }
        else if (direction === keys["UP"]) {
            let target = this.head.y - targetAt;
            if (target >= Piece.getPanelTop()) {
                targetY = target;
                blast = true;
            }
        }
        else if (direction === keys["RIGHT"]) {
            let target = this.head.x + targetAt;
            if (target < Utils$1.snap(Piece.getPanelWidth()) + Piece.getPanelLeft()) {
                targetX = target;
                blast = true;
            }
        }
        else if (direction === keys["DOWN"]) {
            let target = this.head.y + targetAt;
            if (target < Utils$1.snap(Piece.getPanelHeight()) + Piece.getPanelTop()) {
                targetY = target;
                blast = true;
            }
        }
        if (blast === true) {
            Piece.setBlast(targetX, targetY);
            setTimeout(function () { Piece.clearBlast(targetX, targetY); }, 5000);
        }
    }
    clearCell() {
        removeElements(document.querySelectorAll(".cell"));
    }
    clearBlasts() {
        removeElements(document.querySelectorAll(".blast"));
    }
    frame() {
        /*if (this.moving) {
            setTimeout(() => {
                requestAnimationFrame(this.frame.bind(this));
            }, this.getSpeed()); // higher the score, faster the snake
        }*/
        if (this.paused) {
            return; // just pause
        }
        // If head hits an occupied space, GAME OVER
        if (Locations$1.has(this.head.x, this.head.y) && this.noClip === false) {
            return this.over();
        }
        // If Game is not over, then move the snake to requested direction
        let direction = Directions$1.pop();
        /*if ((this.head.y - SIZE) < 0 && direction === keys["UP"]) {
            Directions.set(keys["DOWN"]);
        } else if ((this.head.y + SIZE) >= (Piece.getPanelHeight() + Piece.getPanelTop()) && direction === keys["DOWN"]) {
            Directions.set(keys["UP"]);
        } else if ((this.head.x - SIZE) < 0 && direction === keys["LEFT"]) {
            Directions.set(keys["RIGHT"]);
        } else if ((this.head.x + SIZE) >= (Piece.getPanelWidth() + Piece.getPanelLeft()) && direction === keys["RIGHT"]) {
            Directions.set(keys["LEFT"]);
        }*/
        // update direction
        direction = Directions$1.pop();
        if (true === this.reset) {
            this.head.move(this.head.x, this.head.y, keys[direction]);
            this.reset = false;
        }
        else if (direction === keys.RIGHT) {
            this.head.move(this.head.x + SIZE, this.head.y, keys[direction]);
        }
        else if (direction === keys.LEFT) {
            this.head.move(this.head.x - SIZE, this.head.y, keys[direction]);
        }
        else if (direction === keys.DOWN) {
            this.head.move(this.head.x, this.head.y + SIZE, keys[direction]);
        }
        else if (direction === keys.UP) {
            this.head.move(this.head.x, this.head.y - SIZE, keys[direction]);
        }
        // Check if we caught caught the food
        // or we need to place a new food
        // this.handleFood();
    }
    /**
     * Don"t let snake to go backwards
     */
    notBackwards(key) {
        let lastDirection = Directions$1.peek();
        if (lastDirection === keys.UP && key === keys.DOWN
            || lastDirection === keys.DOWN && key === keys.UP
            || lastDirection === keys.LEFT && key === keys.RIGHT
            || lastDirection === keys.RIGHT && key === keys.LEFT) {
            return false;
        }
        return true;
    }
    setEvents() {
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                // Attack
                case keys.SPACE:
                    this.attack();
                    e.preventDefault();
                    break;
                // Start/Restart the game
                case keys.RETURN:
                    this.init();
                    break;
                // Arrow keys or nothing
                default:
                    // Select levels
                    // 0 = remove level
                    // 1-9 = render level if exists
                    if (e.keyCode >= 48 && e.keyCode <= 57) {
                        let num = e.keyCode - 48; // to get the pressed number
                        if (num === 0) {
                            if (this.currentLevel) {
                                this.currentLevel.remove();
                                this.currentLevel = null;
                            }
                        }
                        else if (num - 1 in this.levels) {
                            if (this.currentLevel) {
                                this.currentLevel.remove();
                            }
                            this.currentLevel = this.levels[num - 1];
                            this.currentLevel.render();
                        }
                    }
                    if (e.keyCode in keys && this.notBackwards(e.keyCode)) {
                        Directions$1.set(e.keyCode);
                        e.preventDefault();
                    }
            }
            // move head one place
            let direction = Directions$1.pop();
            if ((e.keyCode === keys.DOWN && direction === keys.DOWN)
                || (e.keyCode === keys.LEFT && direction === keys.LEFT)
                || (e.keyCode === keys.UP && direction === keys.UP)
                || (e.keyCode === keys.RIGHT && direction === keys.RIGHT)) {
                this.move();
            }
        });
        document.addEventListener("click", (e) => {
            let el = e.target;
            if (el.id === "start") {
                this.start();
            }
            if (el.id === "move") {
                this.move();
            }
        });
        window.addEventListener("resize", () => {
            //this.init(); // reset location
            if (this.currentLevel) {
                this.currentLevel.remove();
                this.currentLevel.render();
            }
            if (this.gridVisible) {
                this.removeGrid();
                this.drawGrid();
            }
        });
    }
    removeGrid() {
        let grids = document.querySelectorAll(".vertical-grid, .horizontal-grid");
        [].forEach.call(grids, (div) => {
            Utils$1.removeNode(div);
        });
        this.gridVisible = false;
    }
    drawGrid() {
        this.removeGrid();
        this.gridVisible = true;
        for (let x = Piece.getPanelLeft(); x <= Piece.getPanelWidth() + Piece.getPanelLeft(); x += Piece.getSizePerUnit()) {
            let div = document.createElement("div");
            div.style.top = `${Piece.getPanelTop()}px`;
            div.style.left = `${x}px`;
            div.style.height = `${Piece.getPanelHeight()}px`;
            div.classList.add("vertical-grid");
            // document.body.appendChild(div);
            const panel = document.getElementById("panel");
            panel.appendChild(div);
        }
        for (let x = Piece.getPanelTop(); x <= Piece.getPanelHeight() + Piece.getPanelTop(); x += Piece.getSizePerUnit()) {
            let div = document.createElement("div");
            div.style.left = `${Piece.getPanelLeft()}px`;
            div.style.top = `${x}px`;
            div.style.width = `${Piece.getPanelWidth()}px`;
            div.classList.add("horizontal-grid");
            // document.body.appendChild(div);
            const panel = document.getElementById("panel");
            panel.appendChild(div);
        }
        this.gridVisible = true;
    }
}

class Level {
    constructor(generatorFunction) {
        this.generatorFunction = generatorFunction;
        this.pieces = [];
    }
    translate(x, y) {
        return [Math.floor(x) * SIZE, Math.floor(y) * SIZE];
    }
    remove() {
        this.pieces.forEach((piece) => {
            piece.remove();
        });
    }
    line(x0, y0, x1, y1) {
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1;
        let sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;
        while (true) {
            // Waiting for proposal
            // https://github.com/Microsoft/TypeScript/issues/5296
            // this.pieces.push(new Piece(...this.translate(x0, y0), "wall"));
            let [tx0, ty0] = this.translate(x0, y0);
            this.pieces.push(new Piece(tx0, ty0, "wall"));
            // break when line is done
            if (Math.abs(x0 - x1) <= 0.5 && Math.abs(y0 - y1) <= 0.5)
                break;
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }
    render() {
        let cols = Math.floor(document.body.clientHeight / SIZE);
        let rows = Math.floor(document.body.clientWidth / SIZE);
        let level = this.generatorFunction(rows, cols);
        level.forEach((line) => {
            let [x0, y0] = line[0];
            let [x1, y1] = line[1];
            this.line(x0, y0, x1, y1);
        });
    }
}

var level1 = new Level((rows, cols) => {
    let [halfCols, halfRows] = [cols / 2, rows / 2];
    return [
        // top walls
        [[3, 3], [halfRows - 3, 3]],
        [[halfRows + 3, 3], [rows - 3, 3]],
        // right walls
        [[rows - 3, 3], [rows - 3, halfCols - 3]],
        [[rows - 3, halfCols + 3], [rows - 3, cols - 3]],
        // bottom walls
        [[rows - 3, cols - 3], [halfRows + 3, cols - 3]],
        [[halfRows - 3, cols - 3], [3, cols - 3]],
        // Left walls
        [[3, cols - 3], [3, halfCols + 3]],
        [[3, halfCols - 3], [3, 3]],
    ];
});

let g = new Game([
    level1
]);

})));
