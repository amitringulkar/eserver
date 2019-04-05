"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blackjack_1 = require("./blackjack/blackjack");
var Games = /** @class */ (function () {
    function Games() {
    }
    Games.prototype.start = function (name) {
        switch (name) {
            case Games.GAME_BLACKJACK:
                var game = new blackjack_1.Blackjack();
                game.init();
                break;
            default:
                console.log('Game is not available');
                break;
        }
    };
    Games.GAME_BLACKJACK = 'blackjack';
    return Games;
}());
exports.Games = Games;
