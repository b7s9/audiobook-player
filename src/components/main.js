import React, { Component } from 'react';
import Player from './player';
import AffirmationComposer from './affirmation-composer';

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			affirmation: '',
			showPlayer: false
		}

		this.localStorageNamespace = 'sleepyHarryPotterAndPositive';
		this.affirmationKey = this.localStorageNamespace + '-affirmation'
	}

	showAffirmationComposer = () => {
		this.setState({ showPlayer: true, affirmation: localStorage.getItem(this.affirmationKey) })
	}

	render() {
		let page;

		if (this.state.showPlayer) {
			page =
				<Player
					affirmation={this.state.affirmation}
					localStorageNamespace={this.localStorageNamespace}
				></Player>
		} else {
			page =
				<AffirmationComposer
					storageKey={this.affirmationKey}
					hideMe={this.showAffirmationComposer}
				></AffirmationComposer>
		}
		return (
			<main>
				{page}
			</main>
		)
	}
}

export default Main; // Don’t forget to use export default!
