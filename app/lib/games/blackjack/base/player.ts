import {Card} from './Card';

export class Player {
    public name: string;
    public cards: Card[];
    public totalVal: number;

    constructor(name: string) {
        this.name = name;
        this.cards = [];
        this.totalVal = 0;
    }

    public getString(): string {
        return this.name;
    }

    public cardValueToString(): string {
        let playerHand: string = '';
        console.log('Player cards in hand :');
        for (let i: number = 0; i < this.cards.length; i++) {
            console.log(this.cards[i]);
            playerHand += this.cards[i].getString();
            if (i < this.cards.length - 1) {
                playerHand += ' + ';
            }
        }

        return playerHand;
    }
}
