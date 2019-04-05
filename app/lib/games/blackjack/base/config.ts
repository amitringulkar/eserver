export const CONFIG = {
	blackjackValue: 21,
	dealerStayValue: 17,
	shuffleCounter: 5,
    prompts: {
		name: [
			{
				type: 'input',
				name: 'name',
				message: ' Your Name : '
			}
		],
        turn: [
			{
			    type: 'list',
			    name: 'turn',
			    message: 'Hit / Stay',
			    choices: [
			      'Hit',
			      'Stay'
			    ]
			}
		],
		keepPlaying: [
			{
			    type: 'list',
			    name: 'keepPlaying',
			    message: 'Do you want to keep playing?',
			    choices: [
			      'Yes',
			      'No'
			    ]
			}

		]
    }
};
