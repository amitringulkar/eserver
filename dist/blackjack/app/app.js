"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var games_1 = require("./lib/games/games");
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.startGame = function () {
        var game = new games_1.Games();
        game.start(games_1.Games.GAME_BLACKJACK);
    };
    return App;
}());
exports.App = App;
