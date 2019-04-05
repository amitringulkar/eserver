import { Game } from './base/game';
export declare class Blackjack extends Game {
    winner: any;
    constructor();
    init(): void;
    namePrompt(): void;
    turnPrompt(): void;
    roundPrompt(): void;
    processNameAndStart(name: string): void;
    processTurn(turn: string): void;
    processKeepPlaying(keepPlaying: string): void;
    start(): void;
    quit(): void;
    hit(): void;
    stay(): void;
    draw(forceShuffle?: boolean): void;
    evaluateDealer(): void;
    evaluatePlayer(): void;
    evaluateState(): void;
}
