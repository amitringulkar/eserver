"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./base/game");
var player_1 = require("./base/player");
var CONFIG_1 = require("./base/CONFIG");
var inquirer = require('inquirer');
var Blackjack = /** @class */ (function (_super) {
    __extends(Blackjack, _super);
    function Blackjack() {
        var _this = _super.call(this) || this;
        _this.mode = game_1.Game.MODE_TERMINAL;
        return _this;
    }
    Blackjack.prototype.init = function () {
        this.namePrompt();
    };
    // prompt functions below
    Blackjack.prototype.namePrompt = function () {
        var _this = this;
        inquirer.prompt(CONFIG_1.CONFIG.prompts.name)
            .then(function (answers) {
            _this.processNameAndStart(answers.name);
        });
    };
    Blackjack.prototype.turnPrompt = function () {
        var _this = this;
        inquirer.prompt(CONFIG_1.CONFIG.prompts.turn)
            .then(function (answers) {
            _this.processTurn(answers.turn);
        });
    };
    Blackjack.prototype.roundPrompt = function () {
        var _this = this;
        inquirer.prompt(CONFIG_1.CONFIG.prompts.keepPlaying).then(function (answers) {
            _this.processKeepPlaying(answers.keepPlaying);
        });
    };
    // process functions below
    Blackjack.prototype.processNameAndStart = function (name) {
        this.addPlayer(name);
        this.start();
    };
    Blackjack.prototype.processTurn = function (turn) {
        switch (turn) {
            case 'Hit':
                this.hit();
                break;
            case 'Stay':
                this.stay();
                break;
        }
    };
    Blackjack.prototype.processKeepPlaying = function (keepPlaying) {
        switch (keepPlaying) {
            case 'Yes':
                this.clearHands();
                this.start();
                break;
            case 'No':
                this.getView().printThanks(this);
                break;
        }
    };
    // actions below
    Blackjack.prototype.start = function () {
        this.currentPlayerIndex = 1;
        this.deal(2);
        this.getView().printInitialState(this);
        this.evaluateState();
    };
    Blackjack.prototype.quit = function () {
        this.getView().printGameOver(this);
    };
    Blackjack.prototype.hit = function () {
        this.draw(true);
        this.getView().printLastDraw(this);
        if (this.players[this.currentPlayerIndex].totalVal < CONFIG_1.CONFIG.blackjackValue) {
            this.getView().printYourHandValue(this);
        }
        this.evaluateState();
    };
    Blackjack.prototype.stay = function () {
        this.incrementTurn();
        this.evaluateState();
    };
    Blackjack.prototype.draw = function (forceShuffle) {
        if (forceShuffle === void 0) { forceShuffle = false; }
        _super.prototype.draw.call(this, forceShuffle);
        var handValue = this.calculateHandValue(this.players[this.currentPlayerIndex].cards, true);
        this.players[this.currentPlayerIndex].totalVal = handValue;
    };
    // evaluate function below
    Blackjack.prototype.evaluateDealer = function () {
        var _this = this;
        var draw = false;
        var dealerScore = this.players[0].totalVal;
        var dealerScoreReset = false;
        this.getView().printDealerNewCard(this);
        while (this.players[0].totalVal <= CONFIG_1.CONFIG.dealerStayValue) {
            this.draw();
            var gameDealer = this;
            gameDealer.currentPlayerIndex = 0;
            this.getView().printLastDraw(gameDealer);
            if (this.players[0].totalVal > CONFIG_1.CONFIG.blackjackValue) {
                this.getView().printDealerBusted(gameDealer);
                this.players[0].totalVal = 0;
                dealerScoreReset = true;
                break;
            }
        }
        this.players.forEach(function (player) {
            if (player.totalVal > _this.winner.totalVal) {
                _this.winner = player;
                draw = false;
            }
            else if (player.totalVal === _this.winner.totalVal) {
                draw = true;
            }
        });
        if (!dealerScoreReset) {
            dealerScore = this.players[0].totalVal;
        }
        if (draw) {
            this.getView().printDealerScore(dealerScore);
            this.getView().printGameDraw(this);
        }
        else {
            this.getView().printDealerScore(dealerScore);
            this.getView().printWinner(this);
        }
        this.roundPrompt();
    };
    Blackjack.prototype.evaluatePlayer = function () {
        if (this.players[this.currentPlayerIndex].totalVal === CONFIG_1.CONFIG.blackjackValue) {
            var dealerScore = this.players[0].totalVal;
            this.getView().printDealerScore(dealerScore);
            this.getView().printPlayerBlackjack(this);
            this.currentPlayerIndex++;
            this.roundPrompt();
        }
        else if (this.players[this.currentPlayerIndex].totalVal > CONFIG_1.CONFIG.blackjackValue) {
            var dealerScore = this.players[0].totalVal;
            this.getView().printDealerScore(dealerScore);
            this.getView().printPlayerBusted(this);
            this.players[this.currentPlayerIndex].totalVal = 0;
            this.currentPlayerIndex++;
            this.roundPrompt();
        }
        else {
            this.turnPrompt();
        }
    };
    Blackjack.prototype.evaluateState = function () {
        this.winner = new player_1.Player('No One');
        if (this.currentPlayerIndex === 0) {
            this.evaluateDealer();
        }
        else {
            this.evaluatePlayer();
        }
    };
    return Blackjack;
}(game_1.Game));
exports.Blackjack = Blackjack;
