import { Player } from './player';
import { Deck } from './deck';
import { Card } from './card';
export declare class Game {
    static MODE_TERMINAL: string;
    private view;
    mode: string;
    players: Player[];
    deck: Deck;
    currentPlayerIndex: number;
    constructor();
    getView(): any;
    private getViewInstance;
    deal(numberOfCards?: number): void;
    draw(forceShuffle?: boolean): void;
    addPlayer(name?: string): void;
    clearHands(): void;
    incrementTurn(): void;
    calculateHandValue(cards: Card[], applyCaseDelta?: boolean): number;
    checkIsCaseDelta(card: Card, value: number): boolean;
}
