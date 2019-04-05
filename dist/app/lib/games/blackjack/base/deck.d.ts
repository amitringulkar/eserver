import { Card } from './card';
export declare class Deck {
    static symbols: string[];
    static cardValues: string[];
    cards: Card[];
    currentCardIndex: number;
    constructor();
    shuffle(times?: number): void;
    draw(forceShuffle?: boolean): Card;
}
