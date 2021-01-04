import React, { Component } from 'react';
// import Player from './player';
import AffirmationComposer from './affirmation-composer';

class Main extends Component {
	constructor(props) {
		super(props)

		this.localStorageNamespace = 'sleepyHarryPotterAndPositive';
		this.affirmationKey = this.localStorageNamespace + '-affirmation'
		this.state = {
			affirmation: ''
		}
	}


	render() {
		return (
			<main>
				{/* <h1 className="font-serif my-6 text-right font-bold text-xl text-gray-800 dark:text-gray-100">Go to Sleep 💚</h1> */}
				<AffirmationComposer storageKey={this.affirmationKey}></AffirmationComposer>
				{/* <Player></Player> */}
			</main>
		)
	}
}

export default Main; // Don’t forget to use export default!
