import React, { Component } from 'react';

class Player extends Component {
	render() {
		return (
			<div className="player">
				<h2 className="font-bold">Name of Book</h2>
				<h3><span>1. </span>Name of Chapter</h3>
				<div className="container my-4 justify-between bg-gray-200 rounded">
					<button id="play" className="p-4 bg-green-500 rounded font-bold">Play</button>
					<button id="pause" className="p-4 bg-white rounded font-bold">Pause</button>
				</div>
				<div className="container my-4 place-content-between bg-gray-200 rounded">
					<button id="rew" className="p-4 bg-white rounded font-bold">Rewind -15 sec.</button>
					<button id="fwd" className="p-4 bg-white rounded font-bold">Forward +15 sec.</button>
				</div>
			</div>
		)
	}
}

export default Player; // Don’t forget to use export default!
