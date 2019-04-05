import {Player} from './player';
import {Dealer} from './dealer';
import {Deck} from './deck';
import {Card} from './card';
import {CONFIG} from './CONFIG';
import {BlackjackViewTerminal} from '../view/blackjackViewTerminal';

export class Game {
	public static MODE_TERMINAL = 'terminal';

	private view: any;
	public mode: string;
	public players: Player[];
	public deck: Deck;
	public currentPlayerIndex: number;

	constructor() {
		this.players = [];
		this.deck = new Deck();
		this.currentPlayerIndex = 1;
		this.players.push(new Dealer());
		this.mode = Game.MODE_TERMINAL;
	}

	public getView(): any {
		if (!this.view) {
			this.view = this.getViewInstance();
		}
		return this.view;
	}

	private getViewInstance(): any {
		let view: any;
		switch (this.mode) {
			case Game.MODE_TERMINAL:
			default:
				view = new BlackjackViewTerminal();
				break;
		}

		return view;
	}

	public deal(numberOfCards?: number): void {
		for (let i: number = 0; i < (numberOfCards || 2); i++) {
			for (let p:number = 0; p < this.players.length; p++) {
				this.draw();
				this.incrementTurn();
			}
		}
	}

	public draw(forceShuffle: boolean = false): void {
		const card: Card = this.deck.draw(forceShuffle);
		this.players[this.currentPlayerIndex].cards.push(card);
	}

	public addPlayer(name?: string): void {
		this.players.push(new Player((name || `Player ${this.players.length + 1}`)));
	}

	public clearHands(): void {
		for (let p: number = 0; p < this.players.length; p++) {
			this.players[p].cards = [];
			this.players[p].totalVal = 0;
		}
	}

	public incrementTurn(): void {
		this.currentPlayerIndex++;
		if (this.currentPlayerIndex === this.players.length) {
			this.currentPlayerIndex = 0;
		}
	}

	public calculateHandValue(cards: Card[], applyCaseDelta: boolean = false): number {
		let value: number = 0;
		cards.forEach((card) => {
			value += card.val;
			if (applyCaseDelta && this.checkIsCaseDelta(card, value)) {
				value -= 10;
			}
		});

		return value;
	}

	public checkIsCaseDelta(card: Card, value: number): boolean {
		if (card.cards === 'A' && value > CONFIG.blackjackValue) {
			return true;
		}

		return false;
	}
}
