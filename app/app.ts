import { Games } from './lib/games/games';

export class App {
    constructor() {}

    public startGame(): void {
        let game: any = new Games();
        game.start(Games.GAME_BLACKJACK);
    }
}
