"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlackjackViewTerminal = /** @class */ (function () {
    function BlackjackViewTerminal() {
    }
    // print functions below
    BlackjackViewTerminal.prototype.printInitialState = function (game) {
        this.printDealerState(game);
        this.printPlayerState(game, 1);
    };
    BlackjackViewTerminal.prototype.printDealerState = function (game) {
        console.log('\n==============================\n');
        console.log('check', game.players[0].cards[0]);
        console.log("The dealer has " + game.players[0].cards[0].getString() + " showing");
        console.log('--------------------------------\n');
    };
    BlackjackViewTerminal.prototype.printPlayerState = function (game, playerIndex) {
        console.log("Player Score : " + game.players[playerIndex].cardValueToString() + " = " + game.players[playerIndex].totalVal);
        console.log('-------------------------------- \n');
    };
    BlackjackViewTerminal.prototype.printLastDraw = function (game) {
        var player = game.players[game.currentPlayerIndex];
        var cards = game.players[game.currentPlayerIndex].cards;
        console.log(player.name + " drew " + cards[cards.length - 1].val);
        console.log('-------------------------------- \n');
    };
    BlackjackViewTerminal.prototype.printThanks = function (game) {
        console.log('\n===================Thanks for playing===================\n');
    };
    BlackjackViewTerminal.prototype.printGameOver = function (game) {
        console.log('Game is Over');
    };
    BlackjackViewTerminal.prototype.printYourHandValue = function (game) {
        console.log("Your hand value is now: " + game.players[game.currentPlayerIndex].totalVal);
        console.log('-------------------------------- \n');
    };
    BlackjackViewTerminal.prototype.printGameDraw = function (game) {
        console.log("This round was a draw.");
        console.log('-------------------------------- \n');
    };
    BlackjackViewTerminal.prototype.printDealerScore = function (dealerScore) {
        console.log("Dealer score : " + dealerScore);
    };
    BlackjackViewTerminal.prototype.printWinner = function (game) {
        console.log(game.winner.name + " won the round with " + game.winner.totalVal + ".");
        console.log('-------------------------------- \n');
    };
    BlackjackViewTerminal.prototype.printDealerNewCard = function (game) {
        console.log("\nThe dealer's new card " + game.players[0].cardValueToString());
    };
    BlackjackViewTerminal.prototype.printDealerBusted = function (game) {
        console.log('The Dealer busted!');
    };
    BlackjackViewTerminal.prototype.printPlayerBlackjack = function (game) {
        console.log("Player Score : " + game.players[game.currentPlayerIndex].totalVal);
        console.log('Blackjack!');
        console.log('-------------------------------- \n');
    };
    BlackjackViewTerminal.prototype.printPlayerBusted = function (game) {
        console.log('Player new score : ', game.players[game.currentPlayerIndex].totalVal);
        console.log('Busted! You lose that one.');
        console.log('-------------------------------- \n');
    };
    BlackjackViewTerminal.prototype.printAllHands = function (players) {
        players.forEach(function (player) {
            console.log(player.name + "'s hand:");
            player.cards.forEach(function (card) {
                console.log(card.getString());
            });
        });
    };
    BlackjackViewTerminal.prototype.printAllCards = function (cards) {
        cards.forEach(function (card) {
            console.log(card.getString());
        });
    };
    return BlackjackViewTerminal;
}());
exports.BlackjackViewTerminal = BlackjackViewTerminal;
