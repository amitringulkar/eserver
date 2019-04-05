"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var dealer_1 = require("./dealer");
var deck_1 = require("./deck");
var CONFIG_1 = require("./CONFIG");
var blackjackViewTerminal_1 = require("../view/blackjackViewTerminal");
var Game = /** @class */ (function () {
    function Game() {
        this.players = [];
        this.deck = new deck_1.Deck();
        this.currentPlayerIndex = 1;
        this.players.push(new dealer_1.Dealer());
        this.mode = Game.MODE_TERMINAL;
    }
    Game.prototype.getView = function () {
        if (!this.view) {
            this.view = this.getViewInstance();
        }
        return this.view;
    };
    Game.prototype.getViewInstance = function () {
        var view;
        switch (this.mode) {
            case Game.MODE_TERMINAL:
            default:
                view = new blackjackViewTerminal_1.BlackjackViewTerminal();
                break;
        }
        return view;
    };
    Game.prototype.deal = function (numberOfCards) {
        for (var i = 0; i < (numberOfCards || 2); i++) {
            for (var p = 0; p < this.players.length; p++) {
                this.draw();
                this.incrementTurn();
            }
        }
    };
    Game.prototype.draw = function (forceShuffle) {
        if (forceShuffle === void 0) { forceShuffle = false; }
        var card = this.deck.draw(forceShuffle);
        this.players[this.currentPlayerIndex].cards.push(card);
    };
    Game.prototype.addPlayer = function (name) {
        this.players.push(new player_1.Player((name || "Player " + (this.players.length + 1))));
    };
    Game.prototype.clearHands = function () {
        for (var p = 0; p < this.players.length; p++) {
            this.players[p].cards = [];
            this.players[p].totalVal = 0;
        }
    };
    Game.prototype.incrementTurn = function () {
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex === this.players.length) {
            this.currentPlayerIndex = 0;
        }
    };
    Game.prototype.calculateHandValue = function (cards, applyCaseDelta) {
        var _this = this;
        if (applyCaseDelta === void 0) { applyCaseDelta = false; }
        var value = 0;
        cards.forEach(function (card) {
            value += card.val;
            if (applyCaseDelta && _this.checkIsCaseDelta(card, value)) {
                value -= 10;
            }
        });
        return value;
    };
    Game.prototype.checkIsCaseDelta = function (card, value) {
        if (card.cards === 'A' && value > CONFIG_1.CONFIG.blackjackValue) {
            return true;
        }
        return false;
    };
    Game.MODE_TERMINAL = 'terminal';
    return Game;
}());
exports.Game = Game;
