import React, { Component } from 'react';

class ChapterLoadButton extends Component {

	handleUrlChange = () => {
		this.props.loadChapter(this.props.url)
	}

	render() {
		return (
			<button
				key={this.props.index}
				className='mt-2 mr-2 px-4 py-2 block rounded shadow text-white bg-green-600 active:bg-green-700'
				onClick={this.handleuUrlChange}
			>
				{this.props.index + '. ' + this.props.title}
			</button>
		)
	}
}

export default ChapterLoadButton;
