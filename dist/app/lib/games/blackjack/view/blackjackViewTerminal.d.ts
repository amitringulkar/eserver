import { Blackjack } from '../blackjack';
export declare class BlackjackViewTerminal {
    constructor();
    printInitialState(game: Blackjack): void;
    printDealerState(game: Blackjack): void;
    printPlayerState(game: Blackjack, playerIndex: number): void;
    printLastDraw(game: Blackjack): void;
    printThanks(game: Blackjack): void;
    printGameOver(game: Blackjack): void;
    printYourHandValue(game: Blackjack): void;
    printGameDraw(game: Blackjack): void;
    printDealerScore(dealerScore: number): void;
    printWinner(game: Blackjack): void;
    printDealerNewCard(game: Blackjack): void;
    printDealerBusted(game: Blackjack): void;
    printPlayerBlackjack(game: Blackjack): void;
    printPlayerBusted(game: Blackjack): void;
    printAllHands(players: any): void;
    printAllCards(cards: any): void;
}
