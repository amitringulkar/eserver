import { SIZE, MARGIN, SLOWEST, FASTEST, keys } from "./constants";
import Piece from "./Piece";
import Utils from "./Utils";
import Locations from "./Locations";
import Directions from "./Directions";
const removeElements = (elms) => elms.forEach(el => el.remove());
export default class Game {
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
        Directions.flush();
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
        if (true || this.moving === false) {
            this.resetHead();
            this.length = 0;
            this.debugSpeed = 0;
            this.score = 0;
            Directions.flush();
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
        let x = Utils.rand(MARGIN, document.body.clientWidth - MARGIN, SIZE);
        let y = Utils.rand(MARGIN, document.body.clientHeight - MARGIN, SIZE);
        // If random spot is already filled, pick a new one
        // Pick until you find an empty spot
        // ..... nothing can go wrong with this
        if (Locations.has(x, y)) {
            [x, y] = this.getFoodLocation();
        }
        return [x, y];
    }
    handleFood() {
        // If the there is no food, create a random one.
        if (false && this.food == null) {
            let [foodX, foodY] = this.getFoodLocation();
            this.food = new Piece(foodX, foodY, "food");
        }
        // if head and food collided, replace head with the food
        // set the correct type for each piece
        if (false && this.head.x === this.food.x && this.head.y === this.food.y) {
            this.food.next = this.head; // put food at the top of the chain
            this.food.direction = this.head.direction; // Needs to go to same direction where head was going
            this.head.setType("body"); // head is not body
            this.food.setType("head"); // food is now head
            this.head = this.food; // Update the Game instance with new head
            this.food = null; // food is gone now
            // Do not count baits grabbed while
            // in no clip mode
            if (this.noClip === false) {
                this.length++; // Snake got bigger
            }
            this.updateScore(); // Calculate the new score
            this.showScore(); // Update the score
        }
    }
    getSpeed() {
        const initialSpeed = 150;
        const calculated = (initialSpeed - this.length * 0.5) + this.debugSpeed;
        return Utils.bound(calculated, FASTEST, SLOWEST);
    }
    updateScore() {
        if (this.noClip === true) {
            return this.score;
        }
        const level = 500;
        const speed = this.getSpeed();
        const val = (SLOWEST - speed) * this.length;
        let leveled = Utils.snap(val, level);
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
        let direction = Directions.pop();
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
            if (target < Utils.snap(Piece.getPanelWidth()) + Piece.getPanelLeft()) {
                targetX = target;
                blast = true;
            }
        }
        else if (direction === keys["DOWN"]) {
            let target = this.head.y + targetAt;
            if (target < Utils.snap(Piece.getPanelHeight()) + Piece.getPanelTop()) {
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
        if (Locations.has(this.head.x, this.head.y) && this.noClip === false) {
            return this.over();
        }
        // If Game is not over, then move the snake to requested direction
        let direction = Directions.pop();
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
        direction = Directions.pop();
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
        let lastDirection = Directions.peek();
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
                        Directions.set(e.keyCode);
                        e.preventDefault();
                    }
            }
            // move head one place
            let direction = Directions.pop();
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
            Utils.removeNode(div);
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
