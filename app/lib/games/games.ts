import {Blackjack} from './blackjack/blackjack';

export class Games {

    public static GAME_BLACKJACK: string = 'blackjack';

    constructor() {}

    public start(name: string): void {
        switch (name) {
            case Games.GAME_BLACKJACK:
                const game: any = new Blackjack();
                game.init();
                break;
            default:
                console.log('Game is not available');
                break;
        }
    }
}
