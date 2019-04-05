import {CONFIG} from './CONFIG';
import {Card} from './card';

export class Deck {
    public static symbols = ['♥', '♦', '♠', '♣'];
    public static cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    public cards: Card[];
    public currentCardIndex: number;

    constructor() {
        this.cards = [];
        this.currentCardIndex = 0;
        for (let i: number = 0; i < Deck.cardValues.length; i++) {
            for (let s: number = 0; s < Deck.symbols.length; s++) {
                this.cards.push(new Card(Deck.cardValues[i], Deck.symbols[s]));
            }
        }
        this.shuffle(CONFIG.shuffleCounter);
    }

    public shuffle(times?: number): void {
        for (let i: number = 0; i < (times || 1); i++) {
            this.cards.sort(() => { return (0.5 - Math.random()); });
        }
    }

    public draw(forceShuffle: boolean = false): Card {
        let shuffleCards: boolean = false;
        if (this.currentCardIndex === this.cards.length - 1) {
            shuffleCards = true;
            this.currentCardIndex = 0;
        }
        if(shuffleCards || forceShuffle) {
            this.shuffle();
        }

        return this.cards[this.currentCardIndex++];
    }
}
