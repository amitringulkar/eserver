"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = /** @class */ (function () {
    function Card(cards, symbol) {
        this.cards = cards;
        this.symbol = symbol;
        switch (cards) {
            case 'A':
                this.val = 11;
                break;
            case 'K':
            case 'Q':
            case 'J':
                this.val = 10;
                break;
            default:
                this.val = parseInt(cards, 10);
                break;
        }
    }
    Card.prototype.getString = function () {
        return "" + this.cards;
    };
    return Card;
}());
exports.Card = Card;
