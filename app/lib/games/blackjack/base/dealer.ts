import {Player} from './Player';

export class Dealer extends Player {
    constructor(name1?: string) {
        super(name1 || 'Dealer');
    }
}
