export class Card {
    symbol: string;
    cards: string;
    val: number;

    constructor(cards: string, symbol: string) {
        this.cards = cards;
        this.symbol = symbol;

        switch (cards) {
            case 'A':
                this.val = 11;
                break;
            case 'K':
            case 'Q':
            case 'J':
                this.val = 10;
                break;
            default:
                this.val = parseInt(cards, 10);
                break;
        }
    }

    public getString(): string {
        return `${this.cards}`;
    }
}
