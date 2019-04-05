"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.cards = [];
        this.totalVal = 0;
    }
    Player.prototype.getString = function () {
        return this.name;
    };
    Player.prototype.cardValueToString = function () {
        var playerHand = '';
        console.log('Player cards in hand :');
        for (var i = 0; i < this.cards.length; i++) {
            console.log(this.cards[i]);
            playerHand += this.cards[i].getString();
            if (i < this.cards.length - 1) {
                playerHand += ' + ';
            }
        }
        return playerHand;
    };
    return Player;
}());
exports.Player = Player;
