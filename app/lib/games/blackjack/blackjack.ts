import {Game} from './base/game';
import {Player} from './base/player';
import {CONFIG} from './base/CONFIG';

const inquirer: any = require('inquirer');

export class Blackjack extends Game {
	public winner: any;
	constructor() {
		super();
		this.mode = Game.MODE_TERMINAL;
	}

	public init(): void {
		this.namePrompt();
	}

	// prompt functions below
	public namePrompt(): void {
        inquirer.prompt(CONFIG.prompts.name)
        .then((answers: any) => {
			this.processNameAndStart(answers.name);
		});
	}

	public turnPrompt(): void {
		inquirer.prompt(CONFIG.prompts.turn)
		.then(( answers: any ) => {
			this.processTurn(answers.turn);
		});
	}

	public roundPrompt(): void {
		inquirer.prompt(CONFIG.prompts.keepPlaying).then((answers: any) => {
			this.processKeepPlaying(answers.keepPlaying);
		});
	}

	// process functions below
	public processNameAndStart(name: string): void {
		this.addPlayer(name);
		this.start();
	}

	public processTurn(turn: string): void {
		switch (turn) {
			case 'Hit':
				this.hit();
				break;

			case 'Stay':
				this.stay();
				break;
		}
	}

	public processKeepPlaying(keepPlaying: string): void {
		switch (keepPlaying) {
			case 'Yes':
				this.clearHands();
				this.start();
				break;
			case 'No':
				this.getView().printThanks(this);
				break;
		}
	}

	// actions below
	public start(): void {
		this.currentPlayerIndex = 1;
		this.deal(2);
		this.getView().printInitialState(this);
		this.evaluateState();
	}

	public quit(): void {
		this.getView().printGameOver(this);
	}

	public hit(): void {
		this.draw(true);
		this.getView().printLastDraw(this);
		if (this.players[this.currentPlayerIndex].totalVal < CONFIG.blackjackValue) {
			this.getView().printYourHandValue(this);
		}
		this.evaluateState();
	}

	public stay(): void {
		this.incrementTurn();
		this.evaluateState();
	}

	public draw(forceShuffle: boolean = false): void {
		super.draw(forceShuffle);
		const handValue: number = this.calculateHandValue(this.players[this.currentPlayerIndex].cards, true);
		this.players[this.currentPlayerIndex].totalVal = handValue;
	}

	// evaluate function below
	public evaluateDealer(): void {
		let draw: boolean = false;
		let dealerScore: number = this.players[0].totalVal;
		let dealerScoreReset: boolean = false;

		this.getView().printDealerNewCard(this);
		while (this.players[0].totalVal <= CONFIG.dealerStayValue) {
			this.draw();
			const gameDealer: any = this;
			gameDealer.currentPlayerIndex = 0;
			this.getView().printLastDraw(gameDealer);
			if (this.players[0].totalVal > CONFIG.blackjackValue) {
				this.getView().printDealerBusted(gameDealer);
				this.players[0].totalVal = 0;
				dealerScoreReset = true;
				break;
			}
		}

		this.players.forEach((player) => {
			if (player.totalVal > this.winner.totalVal) {
				this.winner = player;
				draw = false;
			} else if (player.totalVal === this.winner.totalVal) {
				draw = true;
			}

		});

		if (!dealerScoreReset) {
			dealerScore = this.players[0].totalVal;
		}

		if (draw) {
			this.getView().printDealerScore(dealerScore);
			this.getView().printGameDraw(this);
		} else {
			this.getView().printDealerScore(dealerScore);
			this.getView().printWinner(this);
		}
		this.roundPrompt();
	}

	public evaluatePlayer(): void {
		if (this.players[this.currentPlayerIndex].totalVal === CONFIG.blackjackValue) {
			let dealerScore: number = this.players[0].totalVal;
			this.getView().printDealerScore(dealerScore);
			this.getView().printPlayerBlackjack(this);
			this.currentPlayerIndex++;
			this.roundPrompt();
		} else if (this.players[this.currentPlayerIndex].totalVal > CONFIG.blackjackValue) {
			let dealerScore: number = this.players[0].totalVal;
			this.getView().printDealerScore(dealerScore);
			this.getView().printPlayerBusted(this);
			this.players[this.currentPlayerIndex].totalVal = 0;
			this.currentPlayerIndex++;
			this.roundPrompt();

		} else {
			this.turnPrompt();
		}
	}

	public evaluateState(): void {
		this.winner = new Player('No One');
		if (this.currentPlayerIndex === 0) {
			this.evaluateDealer();
		} else {
			this.evaluatePlayer();
		}
	}
}
