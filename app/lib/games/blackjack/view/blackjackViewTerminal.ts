import {Blackjack} from '../blackjack';
import {Player} from '../base/player';
import {Card} from '../base/Card';

export class BlackjackViewTerminal {

    constructor() {}

	// print functions below
	public printInitialState(game: Blackjack): void {
		this.printDealerState(game);
		this.printPlayerState(game, 1);
	}

	public printDealerState(game: Blackjack): void {
		console.log('\n==============================\n');
		console.log('check',  game.players[0].cards[0]);
		console.log(`The dealer has ${game.players[0].cards[0].getString()} showing`);
		console.log('--------------------------------\n');
	}

	public printPlayerState(game: Blackjack, playerIndex: number): void {
		console.log(`Player Score : ${game.players[playerIndex].cardValueToString()} = ${game.players[playerIndex].totalVal}`);
		console.log('-------------------------------- \n');
	}

	public printLastDraw(game: Blackjack): void {
		const player: Player =  game.players[game.currentPlayerIndex];
		const cards: any =  game.players[game.currentPlayerIndex].cards;
		console.log(`${player.name} drew ${cards[cards.length - 1].val}`);
		console.log('-------------------------------- \n');
	}

	public printThanks(game: Blackjack): void {
		console.log('\n===================Thanks for playing===================\n');
	}

	public printGameOver(game: Blackjack): void {
		console.log('Game is Over');
	}

	public printYourHandValue(game: Blackjack): void {
		console.log(`Your hand value is now: ${game.players[game.currentPlayerIndex].totalVal}`);
		console.log('-------------------------------- \n');
	}

	public printGameDraw(game: Blackjack): void {
		console.log(`This round was a draw.`);
		console.log('-------------------------------- \n');
	}

	public printDealerScore(dealerScore: number): void {
		console.log(`Dealer score : ${dealerScore}`);
	}

	public printWinner(game: Blackjack): void {
		console.log(`${game.winner.name} won the round with ${game.winner.totalVal}.`);
		console.log('-------------------------------- \n');
	}

	public printDealerNewCard(game: Blackjack): void {
		console.log(`\nThe dealer's new card ${game.players[0].cardValueToString()}`);
	}

	public printDealerBusted(game: Blackjack): void {
		console.log('The Dealer busted!');
	}

	public printPlayerBlackjack(game: Blackjack): void {
		console.log(`Player Score : ${game.players[game.currentPlayerIndex].totalVal}`);
		console.log('Blackjack!');
		console.log('-------------------------------- \n');
	}

	public printPlayerBusted(game: Blackjack): void {
		console.log('Player new score : ' , game.players[game.currentPlayerIndex].totalVal);
		console.log('Busted! You lose that one.');
		console.log('-------------------------------- \n');
	}

	public printAllHands(players: any): void {
		players.forEach((player: Player) => {
			console.log(`${player.name}'s hand:`);
			player.cards.forEach((card: Card) => {
				console.log(card.getString());
			});
		});
	}

    public printAllCards(cards: any): void {
        cards.forEach((card: Card) => {
            console.log(card.getString());
        });
    }
}
