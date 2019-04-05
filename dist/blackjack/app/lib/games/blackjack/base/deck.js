"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CONFIG_1 = require("./CONFIG");
var card_1 = require("./card");
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = [];
        this.currentCardIndex = 0;
        for (var i = 0; i < Deck.cardValues.length; i++) {
            for (var s = 0; s < Deck.symbols.length; s++) {
                this.cards.push(new card_1.Card(Deck.cardValues[i], Deck.symbols[s]));
            }
        }
        this.shuffle(CONFIG_1.CONFIG.shuffleCounter);
    }
    Deck.prototype.shuffle = function (times) {
        for (var i = 0; i < (times || 1); i++) {
            this.cards.sort(function () { return (0.5 - Math.random()); });
        }
    };
    Deck.prototype.draw = function (forceShuffle) {
        if (forceShuffle === void 0) { forceShuffle = false; }
        var shuffleCards = false;
        if (this.currentCardIndex === this.cards.length - 1) {
            shuffleCards = true;
            this.currentCardIndex = 0;
        }
        if (shuffleCards || forceShuffle) {
            this.shuffle();
        }
        return this.cards[this.currentCardIndex++];
    };
    Deck.symbols = ['♥', '♦', '♠', '♣'];
    Deck.cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    return Deck;
}());
exports.Deck = Deck;
