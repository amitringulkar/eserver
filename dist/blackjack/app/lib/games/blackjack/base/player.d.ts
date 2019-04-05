import { Card } from './Card';
export declare class Player {
    name: string;
    cards: Card[];
    totalVal: number;
    constructor(name: string);
    getString(): string;
    cardValueToString(): string;
}
